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

export function setupSucker()
{
    const sucker = new Character(NpcID.Sucker);

    sucker.core.name = "Sucker";
    sucker.core.imgPath = "mob_tokens/seaborn/Sucker.png";

    sucker.dStats.initializeStats(12, 11, 18, 7, 13, 6);
    sucker.dStats.pb = Prof.get(3);

    sucker.dSKills.setSkillProficiency(DSkill.Stealth, Hidden, ProficiencyLevel.Expert);
    sucker.dSKills.finalizeSkills();

    sucker.opinions.isOpinionated = false;

    sucker.combat.addBioHpDice(D6.countHavingE(40, sucker.CON), D6);
    sucker.combat.computeHP();

    sucker.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);

    sucker.combat.setSpeed(Speed.Flying, 70);
    sucker.combat.setSpeed(Speed.Swimming, 70);

    sucker.combat.setRes(DamageType.Piercing,    -100);
    sucker.combat.setRes(DamageType.Bludgeoning, -100);
    sucker.combat.setRes(DamageType.Thunder,     -100);
    sucker.combat.setRes(DamageType.Lightning,   -100);
    sucker.combat.setRes(DamageType.Cold,          50);

    sucker.combat.setSense(Sense.Darkvision, 120);

    sucker.combat.addAction(new Action(
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

    sucker.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Suck.</strong></em> Melee Attack.  
        ${wrapRoll(sucker.CON + sucker.Prof)} to hit. ${wrapRoll([[3, D6], [sucker.CON, D1]])}
        ${wrapDamageType(DamageType.Necrotic)} damage. The Sucker gains HP equal 
        to the damage dealt.
         </p>`
    ));

    sucker.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><em><strong>Evac.</strong></em> The sucker disengages, dashes and 
        hides, if possible (always possible if it's below double HP and not in 
        bright light), as a bonus action.
         </p>`
    ));

    sucker.sheet.cr = new CRValue(5);

    sucker.sheet.size = CreatureSize.Small;

    sucker.sheet.subtitle = " Seaborn, Neutral Evil";
    sucker.sheet.acDesc = " (Natural Armor)";
    sucker.sheet.category = "seaborn";

    sucker.finalize();
}