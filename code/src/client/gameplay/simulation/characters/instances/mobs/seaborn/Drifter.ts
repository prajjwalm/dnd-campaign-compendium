import {Activation, CreatureSize, DamageType, DSkill, DStat, Hidden, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                       from "../../../../../data/npcIndex";
import {D1, D4, D6}                                                                                  from "../../../../../rolling/Dice";
import {Action}                                                                                      from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                    from "../../../../action/Wrap";
import {Character}                                                                                   from "../../../Character";

export function setupDrifter()
{
    const c = new Character(NpcID.Drifter);

    c.core.name = "Drifter";
    c.core.imgPath = "mob_tokens/seaborn/Drifter.png";
    c.core.finalize();

    c.dStats.initializeStats(12, 15, 11, 5, 8, 8);
    c.dStats.pb = 2;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Prof);
    c.dSkills.finalize();

    c.combat.addBioHpDice(D6.countHavingE(30, c.CON), D6);
    c.combat.computeHP();

    c.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Flying, 30);
    c.combat.setSpeed(Speed.Swimming, 30);

    c.combat.setRes(DamageType.Hellfire,    -100);
    c.combat.setRes(DamageType.Fire,        -100);
    c.combat.setRes(DamageType.Thunder,      50);
    c.combat.setRes(DamageType.Acid,         50);
    c.combat.setRes(DamageType.Poison,       50);
    c.combat.setRes(DamageType.Cold,         100);

    c.combat.setSense(Sense.Darkvision, 90);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Drift.</strong></em> At the end of each of its turns, a 
        Drifter moves anywhere between 10ft to 100ft depending on the wind or 
        water current speed.
         </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Spit.</strong></em> Ranged Attack. Range 60ft.  
        ${wrapRoll(c.DEX + c.Prof)} to hit. ${wrapRoll([[1, D6], [c.DEX, D1]])}
        ${wrapDamageType(DamageType.Bludgeoning)} and ${wrapRoll([[1, D4], [c.CON, D1]])}
        ${wrapDamageType(DamageType.Acid)} damage.
         </p>`
    ));

    c.combat.cr = 1
    c.combat.finalize();

    c.sheet.size = CreatureSize.Small;

    c.sheet.subtitle = " Seaborn, Chaotic Evil";
    c.sheet.acDesc = " (Natural Armor)";
    c.sheet.category = "seaborn";

    c.sheet.finalize();
}