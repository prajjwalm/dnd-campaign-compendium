import {numberToText}                                                                                           from "../../../../../../common/common";
import {Activation, Condition, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                                          from "../../../../../data/npcIndex";
import {D1, D12, D8}                                                                                    from "../../../../../rolling/Dice";
import {Action}                                                                                                 from "../../../../action/Action";
import {wrapCondition, wrapDamageType, wrapRoll}                                                                from "../../../../action/Wrap";
import {Character}                                                                                              from "../../../Character";
import {CharacterVariant}                                                                                       from "../../../CharacterVariant";


function generateBlurring(dodgePercent: number,
                          teleportDistance: number)
{
    return () =>
        `<p><strong><em>Nethersea Blurring.</em></strong> When standing on the
         nethersea brand, (and not ${wrapCondition(Condition.Stunned)}) the
         Predator gains ${dodgePercent}% dodge chance to any source of damage (except 
         Almighty) and can teleport ${teleportDistance}ft as a bonus action.
         </p>`;
}

function generateMultiattack(count: number)
{
    return () =>
        `<p><em><strong>MultiAttack.</strong></em> The Predator makes ${numberToText(count)}
        bite attacks.</p>`
}

export function setupPredators()
{
    const c = new Character(NpcId.Predator);

    c.core.name = "Predator";
    c.core.imgPath = "mob_tokens/seaborn/Predator.png";
    c.core.finalize();

    c.dStats.initializeStats(17, 18, 15, 11, 13, 15);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Stealth, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Acrobatics, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    const predHpDice = D8.countHavingE(40, c.CON);
    c.combat.addBioHpDice(predHpDice, D8);
    c.combat.computeHP();

    c.combat.setLightArmor(13);

    c.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Cha, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Walking, 35);
    c.combat.setSpeed(Speed.Swimming, 40);

    c.combat.setRes(DamageType.Acid,           50);
    c.combat.setRes(DamageType.Poison,         50);
    c.combat.setRes(DamageType.Radiant,      -100);
    c.combat.setRes(DamageType.Lightning,    -100);
    c.combat.setRes(DamageType.Fire,         -100);

    c.combat.setSense(Sense.Darkvision, 300);

    c.combat.addAction(new Action(
        Activation.Special,
        generateBlurring(80, 10)
    ), "blurring");

    c.combat.addAction(new Action(
        Activation.Action,
        generateMultiattack(3)
    ), "multiattack");

    c.combat.addAction(new Action(
        Activation.Action,
        c => `<p><em><strong>Bite.</strong></em> Melee Attack.  
        ${wrapRoll(c.STR + c.Prof)} to hit. ${wrapRoll([[c.SemiProf, D12], [c.STR, D1]])}
        ${wrapDamageType(DamageType.Piercing)} damage.
         </p>`
    ));

    c.combat.cr = 3
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn, Lawful Evil";
    c.sheet.acDesc   = " (Natural Armor)";
    c.sheet.category = "seaborn";
    c.sheet.finalize();

    const n = new CharacterVariant(NpcId.PredatorN, NpcId.Predator);

    n.core.name = "Nourished Predator";
    n.core.imgPath = "mob_tokens/seaborn/PredatorN.png";
    n.core.finalize();

    n.dStats.initializeStats(24, 24, 24, 11, 13, 15);
    n.dStats.pb = 5;
    n.dStats.finalize();

    n.combat.addBioHpDice(predHpDice, D8);
    n.combat.computeHP();

    n.combat.setLightArmor(14);

    n.combat.setSave(DStat.Dex, ProficiencyLevel.Expert);
    n.combat.setSave(DStat.Int, ProficiencyLevel.Prof);

    n.combat.setSpeed(Speed.Walking, 55);
    n.combat.setSpeed(Speed.Swimming, 70);

    n.combat.addAction(new Action(
        Activation.Special,
        generateBlurring(90, 30)
    ), "blurring");

    n.combat.addAction(new Action(
        Activation.Action,
        generateMultiattack(4)
    ), "multiattack");

    n.combat.cr = 8
    n.combat.finalize();

    n.sheet.danger = 1;
    n.sheet.finalize();
}