import {Activation, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                               from "../../../../../data/npcIndex";
import {D6, D8}                                                                              from "../../../../../rolling/Dice";
import {Action}                                                                                      from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                    from "../../../../action/Wrap";
import {Character}                                                                                   from "../../../Character";

export function setupSlider()
{
    const c = new Character(NpcId.Slider);

    c.core.name = "Slider";
    c.core.imgPath = "mob_tokens/seaborn/Slider.png";
    c.core.finalize();

    c.dStats.initializeStats(16, 16, 13, 9, 11, 10);
    c.dStats.pb = 2;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Performance, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    c.combat.addBioHpDice(D8.countHavingE(28, c.CON), D8);
    c.combat.computeHP();

    c.combat.setSave(DStat.Wis);
    c.combat.setSave(DStat.Cha);

    c.combat.setSpeed(Speed.Walking, 40);
    c.combat.setSpeed(Speed.Swimming, 40);

    c.combat.setRes(DamageType.Hellfire,    -100);
    c.combat.setRes(DamageType.Lightning,   -100);
    c.combat.setRes(DamageType.Psychic,      50);
    c.combat.setRes(DamageType.Cold,         50);
    c.combat.setRes(DamageType.Physical,     50);
    c.combat.setRes(DamageType.Acid,         100);
    c.combat.setRes(DamageType.Poison,       100);

    c.combat.setSense(Sense.Darkvision, 90);

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Tentacle wrap.</strong></em> The slider attempts to wrap
        one of its appendages around a target upto two times. For each time, it 
        rolls a melee attack as ${wrapRoll(c.DEX + c.Prof)}. If all attacks miss,
        nothing happens. If any fails, the target must then make a DC 
        ${c.dc(DStat.Con)} CON save to attempt to resist the neurotoxin it 
        injects. On failure, the target takes ${wrapRoll([8, D6])} 
        ${wrapDamageType(DamageType.Neural)} damage. On success, they take half damage.</p>`
    ));

    c.combat.cr = 2;
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn, Chaotic Evil";
    c.sheet.acDesc = " (Natural Armor)";
    c.sheet.category = "seaborn";

    c.sheet.finalize();
}