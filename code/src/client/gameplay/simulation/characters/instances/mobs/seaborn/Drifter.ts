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
}                                 from "../../../../../data/constants";
import {NpcID}                    from "../../../../../data/npcIndex";
import {D1, D12, D4, D6}          from "../../../../../rolling/Dice";
import {Action}                   from "../../../../action/Action";
import {wrapDamageType, wrapRoll} from "../../../../action/Wrap";
import {Character}                from "../../../Character";

export function setupDrifter()
{
    const drifter = new Character(NpcID.Drifter);

    drifter.core.name = "Drifter";
    drifter.core.imgPath = "mob_tokens/seaborn/Drifter.png";

    drifter.dStats.initializeStats(12, 15, 11, 5, 8, 8);
    drifter.dStats.pb = Prof.get(2);

    drifter.dSKills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Prof);
    drifter.dSKills.finalizeSkills();

    drifter.opinions.isOpinionated = false;

    drifter.combat.addBioHpDice(D6.countHavingE(30, drifter.CON), D6);
    drifter.combat.computeHP();

    drifter.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);

    drifter.combat.setSpeed(Speed.Flying, 30);
    drifter.combat.setSpeed(Speed.Swimming, 30);

    drifter.combat.setRes(DamageType.Hellfire,    -100);
    drifter.combat.setRes(DamageType.Fire,        -100);
    drifter.combat.setRes(DamageType.Thunder,      50);
    drifter.combat.setRes(DamageType.Acid,         50);
    drifter.combat.setRes(DamageType.Poison,       50);
    drifter.combat.setRes(DamageType.Cold,         100);

    drifter.combat.setSense(Sense.Darkvision, 90);

    drifter.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Drift.</strong></em> At the end of each of its turns, a 
        Drifter moves anywhere between 10ft to 100ft depending on the wind or 
        water current speed.
         </p>`
    ));

    drifter.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Spit.</strong></em> Ranged Attack. Range 60ft.  
        ${wrapRoll(drifter.DEX + drifter.Prof)} to hit. ${wrapRoll([[1, D6], [drifter.DEX, D1]])}
        ${wrapDamageType(DamageType.Bludgeoning)} and ${wrapRoll([[1, D4], [drifter.CON, D1]])}
        ${wrapDamageType(DamageType.Acid)} damage.
         </p>`
    ));

    drifter.sheet.cr = new CRValue(1);

    drifter.sheet.size = CreatureSize.Small;

    drifter.sheet.subtitle = " Seaborn, Chaotic Evil";
    drifter.sheet.acDesc = " (Natural Armor)";
    drifter.sheet.category = "seaborn";

    drifter.finalize();
}