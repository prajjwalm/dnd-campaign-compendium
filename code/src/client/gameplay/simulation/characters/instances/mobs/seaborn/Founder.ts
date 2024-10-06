import {numberToText}                                                                from "../../../../../../common/common";
import {Activation, CreatureSize, DamageType, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                       from "../../../../../data/npcIndex";
import {D1, D6, D8}                                                                  from "../../../../../rolling/Dice";
import {Action}                                                                      from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                    from "../../../../action/Wrap";
import {Character}                                                                   from "../../../Character";
import {CharacterVariant}                                                            from "../../../CharacterVariant";

function generateMultiattack(count: number)
{
    return () =>
        `<p><em><strong>MultiAttack.</strong></em> The Founder makes ${numberToText(count)} attacks.</p>`
}

export function setupFounders()
{
    const c = new Character(NpcId.Founder);

    c.core.name = "Founder";
    c.core.imgPath = "mob_tokens/seaborn/Founder.png";
    c.core.finalize();

    c.dStats.initializeStats(14, 14, 18, 21, 21, 21);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.finalize();

    const predHpDice = D6.countHavingE(70, c.CON);
    c.combat.addBioHpDice(predHpDice, D6);
    c.combat.computeHP();

    c.combat.setHeavyArmor(17);

    c.combat.setSave(DStat.Int, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Wis, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Cha, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Walking,  30);
    c.combat.setSpeed(Speed.Swimming, 30);

    c.combat.setRes(DamageType.Physical, -100);
    c.combat.setRes(DamageType.All, 100);

    c.combat.setSense(Sense.Darkvision, 60);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Outside Existence.</strong></em> A founder is a deviation, 
         an existence that emerged from the nethersea brand and that is untouchable
         by most forms of investiture. It is immune to all damage.
         </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Hollow Skull.</strong></em> A chitinous skull has grown
        inexplicably within this creature. There are no organs that it covers. 
        It is vulnerable to non-magical physical damage. Breaking the skull 
        causes it to devolve into the Nethersea Brand.
         </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        generateMultiattack(2)
    ), "multiattack");

    c.combat.addAction(new Action(
        Activation.Action,
        c => `<p><em><strong>Refraction.</strong></em> Melee Spell Attack.  
        ${wrapRoll(c.INT + c.Prof)} to hit. ${wrapRoll([[c.Prof, D8], [c.INT, D1]])}
        ${wrapDamageType(DamageType.Cold)} damage. The damage type is 
        ${wrapDamageType(DamageType.Neural)} instead if the hit roll is 18 or more.
         </p>`
    ), "refraction");

    c.combat.cr = 5;
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn, Lawful Evil";
    c.sheet.acDesc   = " (Natural Armor)";
    c.sheet.category = "seaborn";
    c.sheet.finalize();

    const n = new CharacterVariant(NpcId.FounderN, NpcId.Founder);

    n.core.name = "Nourished Founder";
    n.core.imgPath = "mob_tokens/seaborn/FounderN.png";
    n.core.finalize();

    n.dStats.initializeStats(18, 18, 24, 25, 25, 25);
    n.dStats.pb = 5;
    n.dStats.finalize();

    n.combat.addBioHpDice(predHpDice, D6);
    n.combat.computeHP();

    n.combat.setHeavyArmor(21);

    n.combat.setSave(DStat.Int, ProficiencyLevel.Expert);
    n.combat.setSave(DStat.Wis, ProficiencyLevel.Expert);
    n.combat.setSave(DStat.Cha, ProficiencyLevel.Expert);

    n.combat.setSpeed(Speed.Walking, 35);
    n.combat.setSpeed(Speed.Swimming, 35);

    n.combat.addAction(new Action(
        Activation.Action,
        c => `<p><em><strong>Refraction.</strong></em> Melee Spell Attack.  
        ${wrapRoll(c.INT + c.Prof)} to hit. ${wrapRoll([[c.Prof, D8], [c.INT, D1]])}
        ${wrapDamageType(DamageType.Lightning)} damage. The damage type is 
        ${wrapDamageType(DamageType.Neural)} instead if the hit roll is 16 or more.
         </p>`
    ), "refraction");

    n.combat.addAction(new Action(
        Activation.Action,
        generateMultiattack(3)
    ), "multiattack");

    n.combat.cr = 6;
    n.combat.finalize();

    n.sheet.danger = 1;
    n.sheet.finalize();
}