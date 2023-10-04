import {
    Activation,
    CreatureSize,
    CRValue,
    DamageType,
    DSkill,
    DStat,
    Hidden,
    Prof,
    ProficiencyLevel,
    Sense,
    Speed
}                                            from "../../../../../data/constants";
import {
    NpcID
}                                            from "../../../../../data/npcIndex";
import {D20, D6, D8}                         from "../../../../../rolling/Dice";
import {Action}                              from "../../../../action/Action";
import {wrapDamageType, wrapRoll, wrapSense} from "../../../../action/Wrap";
import {Character}                           from "../../../Character";

export function setupSlider()
{
    const slider = new Character(NpcID.Slider);

    slider.core.name = "Slider";
    slider.core.imgPath = "mob_tokens/seaborn/Slider.png";

    slider.dStats.initializeStats(16, 16, 13, 9, 11, 10);
    slider.dStats.pb = Prof.get(2);

    slider.dSKills.setSkillProficiency(DSkill.Performance, Hidden, ProficiencyLevel.Expert);
    slider.dSKills.finalizeSkills();

    slider.opinions.isOpinionated = false;

    slider.combat.addBioHpDice(D8.countHavingE(28, slider.CON), D8);
    slider.combat.computeHP();

    slider.combat.setSave(DStat.Wis);
    slider.combat.setSave(DStat.Cha);

    slider.combat.setSpeed(Speed.Walking, 40);
    slider.combat.setSpeed(Speed.Swimming, 40);

    slider.combat.setRes(DamageType.Hellfire,    -100);
    slider.combat.setRes(DamageType.Lightning,   -100);
    slider.combat.setRes(DamageType.Psychic,      50);
    slider.combat.setRes(DamageType.Cold,         50);
    slider.combat.setRes(DamageType.Physical,     50);
    slider.combat.setRes(DamageType.Acid,         100);
    slider.combat.setRes(DamageType.Poison,       100);

    slider.combat.setSense(Sense.Darkvision, 90);

    slider.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Tentacle wrap.</strong></em> The slider attempts to wrap
        one of its appendages around a target upto two times. The target must 
        make a DC ${slider.dc(DStat.Dex)} DEX save. If all three rolls succeed,
        the slider has missed and nothing happens. If any succeeds, the target 
        must then make a DC ${slider.dc(DStat.Con)} CON save to attempt to 
        resist the neurotoxin it injects. On failure, the target takes ${wrapRoll([8, D6])} 
        ${wrapDamageType(DamageType.Neural)} damage. On success, they take half damage.</p>`
    ));

    slider.sheet.cr = new CRValue(2);

    slider.sheet.size = CreatureSize.Medium;

    slider.sheet.subtitle = " Seaborn, Chaotic Evil";
    slider.sheet.acDesc = " (Natural Armor)";
    slider.sheet.category = "seaborn";

    slider.finalize();
}