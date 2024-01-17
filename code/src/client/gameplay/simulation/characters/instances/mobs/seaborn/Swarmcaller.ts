import {Activation, Condition, CreatureSize, CRValue, DamageType, DSkill, DStat, Hidden, Prof, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                                 from "../../../../../data/npcIndex";
import {D1, D10, D12}                                                                                                          from "../../../../../rolling/Dice";
import {Action}                                                                                                                from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                                              from "../../../../action/Wrap";
import {Character}                                                                                                             from "../../../Character";

export function setupSwarmCaller()
{
    const swarmC = new Character(NpcID.SwarmCaller);

    swarmC.core.name = "SwarmCaller";
    swarmC.core.imgPath = "mob_tokens/seaborn/Swarmcaller.png";

    swarmC.dStats.initializeStats(12, 16, 20, 16, 14, 16);
    swarmC.dStats.pb = Prof.get(3);

    swarmC.dSKills.setSkillProficiency(DSkill.Intimidation, Hidden, ProficiencyLevel.Half);
    swarmC.dSKills.setSkillProficiency(DSkill.Performance, Hidden, ProficiencyLevel.Expert);
    swarmC.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Prof);
    swarmC.dSKills.finalizeSkills();

    swarmC.opinions.isOpinionated = false;

    swarmC.combat.addBioHpDice(D10.countHavingE(100, swarmC.CON), D10);
    swarmC.combat.computeHP();

    swarmC.combat.setSave(DStat.Str, ProficiencyLevel.Prof);
    swarmC.combat.setSave(DStat.Con, ProficiencyLevel.Prof);

    swarmC.combat.setSpeed(Speed.Walking, 5);
    swarmC.combat.setSpeed(Speed.Swimming, 10);

    swarmC.combat.setRes(DamageType.Hellfire,    -100);
    swarmC.combat.setRes(DamageType.Lightning,   -100);
    swarmC.combat.setRes(DamageType.Thunder,     -100);
    swarmC.combat.setRes(DamageType.Fire,         100);
    swarmC.combat.setRes(DamageType.Psychic,      100);
    swarmC.combat.setRes(DamageType.Slashing,     100);
    swarmC.combat.setRes(DamageType.Bludgeoning,  100);
    swarmC.combat.setRes(DamageType.Acid,         100);
    swarmC.combat.setRes(DamageType.Cold,         100);
    swarmC.combat.setRes(DamageType.Poison,       100);

    swarmC.combat.addConditionImmunity(Condition.Charmed);
    swarmC.combat.addConditionImmunity(Condition.Frightened);

    swarmC.combat.setSense(Sense.TremorSense, 120);

    swarmC.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>LifeSoup Orbs.</strong></em> The SwarmCaller controls 
         two orbs apparently made of pure essence of one of the Firstborn. All 
         its abilities involve manipulation of these orbs. Each orb has 20 HP, 
         15 AC and ${wrapRoll(swarmC.DEX + 5)} to DEX saves - other saves mirror
         those of the SwarmCaller. Each orb can be in the dormant, active or 
         broken state. While dormant, the orbs take 10% damage (rounded down) 
         from any source, but can't use any abilities. A destroyed orb re-forms 
         after 24 hours. Until both orbs are broken, the SwarmCaller takes 10% 
         damage from any source and regenerates 
         ${wrapRoll([[3, D10], [2*swarmC.Prof, D1]])} HP at turn start.</p>`
    ));

    swarmC.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Brand Catalyst.</strong></em> The brand grows twice as 
        fast while the swarmcaller stands on it.</p>`
    ));

    swarmC.combat.addAction(new Action(
        Activation.Special,
         c => `<p><em><strong>NetherSea Echoes.</strong></em> If any orb is active, 
         the SwarmCaller and each of its active orbs become sources of nethersea 
         echoes, each dealing ${wrapRoll([[3, D12], [c.CHA, D1]])}
         ${wrapDamageType(DamageType.Psychic)} damage (once per round) to each
         creature that comes within 20 ft of them at any point of time.</p>`
    ));

    swarmC.combat.addAction(new Action(
        Activation.Action,
        c => `<p><strong><em>Calling We Many.</em> (1/Day)</strong> The SwarmCaller
        opens a portal summoning the Nethersea Brand underneath itself and seaborn
        it has previously branded to itself. The seaborn are summoned at 
        ${c.Prof} per round for upto 1 minute and must have a combined CR less 
        than ${10 * c.Prof}. This ability can only be used if it stands on a 
        ground not made of Silver, Aluminium or any other nullifying material.</p>`
    ));

    swarmC.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><em><strong>Stirring the Soup.</strong></em> The SwarmCaller 
         activates or deactivates any of its LifeSoup orbs close to it and then 
         moves any number of active orbs upto 30ft in a way that none move more
         than 120ft from itself.
         </p>`
    ));

    swarmC.sheet.cr = new CRValue(6);

    swarmC.sheet.size = CreatureSize.Large;

    swarmC.sheet.subtitle = " Seaborn, Lawful Evil";
    swarmC.sheet.acDesc = " (Natural Dex)";
    swarmC.sheet.category = "seaborn";

    swarmC.finalize();
}