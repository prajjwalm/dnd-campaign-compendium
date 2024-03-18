import {Activation, CreatureSize, DamageType, DSkill, DStat, Hidden, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                       from "../../../../../data/npcIndex";
import {D1, D6}                                                                                      from "../../../../../rolling/Dice";
import {Action}                                                                                      from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                    from "../../../../action/Wrap";
import {Character}                                                                                   from "../../../Character";

export function setupSucker()
{
    const c = new Character(NpcID.Sucker);

    c.core.name = "Sucker";
    c.core.imgPath = "mob_tokens/seaborn/Sucker.png";
    c.core.finalize();

    c.dStats.initializeStats(12, 11, 18, 7, 13, 6);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Stealth, Hidden, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    c.combat.addBioHpDice(D6.countHavingE(40, c.CON), D6);
    c.combat.computeHP();

    c.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Flying, 70);
    c.combat.setSpeed(Speed.Swimming, 70);

    c.combat.setRes(DamageType.Piercing,    -100);
    c.combat.setRes(DamageType.Bludgeoning, -100);
    c.combat.setRes(DamageType.Thunder,     -100);
    c.combat.setRes(DamageType.Lightning,   -100);
    c.combat.setRes(DamageType.Cold,          50);

    c.combat.setSense(Sense.Darkvision, 120);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Food Cycle.</strong></em> While they mainly feed on carcasses,
        suckers don't mind the occasional living prey either. It is their instinct and
        destiny to eat as much as they can and then be eaten when they are completely bloated.
        As such they can gain temporary HP over their maximum upto 3 times their maximum.
        When a sucker has more than its maximum HP, its speed drops to 45. It further
        drops to 20 when it has more than double its max HP.<p>
        Seaborn of size medium or larger may feed on suckers as a bonus action, 
        granting them half of the HP a sucker carries over its current maximum. 
        Their instincts are such that suckers will typically be fed upon when their
        HP exceeds twice their current maximum.  
         </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Suck.</strong></em> Melee Attack.  
        ${wrapRoll(c.CON + c.Prof)} to hit. ${wrapRoll([[3, D6], [c.CON, D1]])}
        ${wrapDamageType(DamageType.Necrotic)} damage. The Sucker gains HP equal 
        to the damage dealt.
         </p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><em><strong>Evac.</strong></em> The sucker disengages, dashes and 
        hides, if possible (always possible if it's below double HP and not in 
        bright light), as a bonus action.
         </p>`
    ));

    c.combat.cr = 5
    c.combat.finalize();

    c.sheet.size = CreatureSize.Small;

    c.sheet.subtitle = " Seaborn, Neutral Evil";
    c.sheet.acDesc = " (Natural Armor)";
    c.sheet.category = "seaborn";

    c.sheet.finalize();
}