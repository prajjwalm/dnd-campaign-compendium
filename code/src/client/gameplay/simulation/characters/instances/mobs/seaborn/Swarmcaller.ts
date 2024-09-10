import {Activation, Condition, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                                          from "../../../../../data/npcIndex";
import {D1, D10, D12}                                                                                   from "../../../../../rolling/Dice";
import {Action}                                                                                                 from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                               from "../../../../action/Wrap";
import {Character}                                                                                              from "../../../Character";

export function setupSwarmCaller()
{
    const c = new Character(NpcId.SwarmCaller);

    c.core.name = "SwarmCaller";
    c.core.imgPath = "mob_tokens/seaborn/Swarmcaller.png";
    c.core.finalize();

    c.dStats.initializeStats(12, 16, 20, 16, 14, 16);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Intimidation, ProficiencyLevel.Half);
    c.dSkills.setSkillProficiency(DSkill.Performance, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Athletics, ProficiencyLevel.Prof);
    c.dSkills.finalize();

    c.combat.addBioHpDice(D10.countHavingE(100, c.CON), D10);
    c.combat.computeHP();

    c.combat.setSave(DStat.Str, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Con, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Walking, 5);
    c.combat.setSpeed(Speed.Swimming, 10);

    c.combat.setRes(DamageType.Hellfire,    -100);
    c.combat.setRes(DamageType.Lightning,   -100);
    c.combat.setRes(DamageType.Thunder,     -100);
    c.combat.setRes(DamageType.Fire,         100);
    c.combat.setRes(DamageType.Psychic,      100);
    c.combat.setRes(DamageType.Slashing,     100);
    c.combat.setRes(DamageType.Bludgeoning,  100);
    c.combat.setRes(DamageType.Acid,         100);
    c.combat.setRes(DamageType.Cold,         100);
    c.combat.setRes(DamageType.Poison,       100);

    c.combat.addConditionImmunity(Condition.Charmed);
    c.combat.addConditionImmunity(Condition.Frightened);

    c.combat.setSense(Sense.TremorSense, 120);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>LifeSoup Orbs.</strong></em> The SwarmCaller controls 
         ${c.pb} orbs apparently made of pure essence of one of the Firstborn. All 
         its abilities involve manipulation of these orbs. Each orb has 50 HP, 
         15 AC and ${wrapRoll(c.DEX + 5)} to DEX saves - other saves mirror
         those of the SwarmCaller. Each orb can be in the dormant, active or 
         broken state. While dormant, the orbs take 10% damage (rounded down) 
         from any source, but can't use any abilities. A destroyed orb re-forms 
         after 24 hours. Until both orbs are broken, the SwarmCaller takes 10% 
         damage from any source and regenerates 
         ${wrapRoll([[3, D10], [2*c.Prof, D1]])} HP at turn start.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Brand Catalyst.</strong></em> The brand grows twice as 
        fast while the swarmcaller stands on it.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
         c => `<p><em><strong>NetherSea Echoes.</strong></em> If any orb is active, 
         the SwarmCaller and each of its active orbs become sources of nethersea 
         echoes, each dealing ${wrapRoll([[c.CON, D12], [c.CHA, D1]])}
         ${wrapDamageType(DamageType.Psychic)} damage (once per round) to each
         creature that comes within 20 ft of them at any point of time.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c => `<p><strong><em>Calling We Many.</em> (1/Day)</strong> The SwarmCaller
        opens a portal summoning the Nethersea Brand underneath itself and seaborn
        it has previously branded to itself. The seaborn are summoned at 
        ${c.Prof} per round for upto 1 minute and must have a combined CR less 
        than ${10 * c.Prof}. This ability can only be used if it stands on a 
        ground not made of Silver, Aluminium or any other nullifying material.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><em><strong>Stirring the Soup.</strong></em> The SwarmCaller 
         activates or deactivates any of its LifeSoup orbs close to it and then 
         moves any number of active orbs upto 30ft in a way that none move more
         than 120ft from itself.
         </p>`
    ));

    c.combat.cr = 6
    c.combat.finalize();

    c.sheet.size = CreatureSize.Large;

    c.sheet.subtitle = " Seaborn, Lawful Evil";
    c.sheet.acDesc = " (Natural Dex)";
    c.sheet.category = "seaborn";

    c.sheet.finalize();
}