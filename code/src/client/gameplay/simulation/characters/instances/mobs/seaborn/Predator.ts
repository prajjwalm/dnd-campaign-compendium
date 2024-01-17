import {numberToText}                                                                                                          from "../../../../../../common/common";
import {Activation, Condition, CreatureSize, CRValue, DamageType, DSkill, DStat, Hidden, Prof, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                                 from "../../../../../data/npcIndex";
import {D1, D12, D8}                                                                                                           from "../../../../../rolling/Dice";
import {Action}                                                                                                                from "../../../../action/Action";
import {wrapCondition, wrapDamageType, wrapRoll}                                                                               from "../../../../action/Wrap";
import {Character}                                                                                                             from "../../../Character";
import {CharacterVariant}                                                                                                      from "../../../CharacterVariant";


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
    const pred = new Character(NpcID.Predator);

    pred.core.name = "Predator";
    pred.core.imgPath = "mob_tokens/seaborn/Predator.png";

    pred.dStats.initializeStats(17, 18, 15, 11, 13, 15);
    pred.dStats.pb = Prof.get(3);

    pred.dSKills.setSkillProficiency(DSkill.Stealth, Hidden, ProficiencyLevel.Expert);
    pred.dSKills.setSkillProficiency(DSkill.Acrobatics, Hidden, ProficiencyLevel.Expert);
    pred.dSKills.finalizeSkills();

    pred.opinions.isOpinionated = false;

    const predHpDice = D8.countHavingE(40, pred.CON);
    pred.combat.addBioHpDice(predHpDice, D8);
    pred.combat.computeHP();

    pred.combat.setLightArmor(13);

    pred.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);

    pred.combat.setSpeed(Speed.Walking, 35);
    pred.combat.setSpeed(Speed.Swimming, 40);

    pred.combat.setRes(DamageType.Acid,           50);
    pred.combat.setRes(DamageType.Poison,         50);
    pred.combat.setRes(DamageType.Radiant,      -100);
    pred.combat.setRes(DamageType.Lightning,    -100);
    pred.combat.setRes(DamageType.Fire,         -100);

    pred.combat.setSense(Sense.Darkvision, 300);

    pred.combat.addAction(new Action(
        Activation.Special,
        generateBlurring(80, 10)
    ), "blurring");

    pred.combat.addAction(new Action(
        Activation.Action,
        generateMultiattack(3)
    ), "multiattack");

    pred.combat.addAction(new Action(
        Activation.Action,
        c => `<p><em><strong>Bite.</strong></em> Melee Attack.  
        ${wrapRoll(c.STR + c.Prof)} to hit. ${wrapRoll([[c.SemiProf, D12], [c.STR, D1]])}
        ${wrapDamageType(DamageType.Piercing)} damage.
         </p>`
    ));

    pred.sheet.cr = new CRValue(3);
    pred.sheet.size = CreatureSize.Medium;
    pred.sheet.subtitle = " Seaborn, Lawful Evil";
    pred.sheet.acDesc   = " (Natural Armor)";
    pred.sheet.category = "seaborn";

    pred.finalize();



    const predN = new CharacterVariant(NpcID.PredatorN, NpcID.Predator);

    predN.core.name = "Nourished Predator";
    predN.core.imgPath = "mob_tokens/seaborn/PredatorN.png";

    predN.dStats.initializeStats(24, 24, 24, 11, 13, 15);
    predN.dStats.pb = Prof.get(5);

    predN.combat.addBioHpDice(predHpDice, D8);
    predN.combat.computeHP();

    predN.combat.setLightArmor(14);

    predN.combat.setSave(DStat.Dex, ProficiencyLevel.Expert);
    predN.combat.setSave(DStat.Int, ProficiencyLevel.Prof);

    predN.combat.setSpeed(Speed.Walking, 55);
    predN.combat.setSpeed(Speed.Swimming, 70);

    predN.combat.addAction(new Action(
        Activation.Special,
        generateBlurring(90, 30)
    ), "blurring");

    predN.combat.addAction(new Action(
        Activation.Action,
        generateMultiattack(4)
    ), "multiattack");

    predN.sheet.cr    = new CRValue(8);
    predN.sheet.theme = "danger_1";

    predN.finalize();
}