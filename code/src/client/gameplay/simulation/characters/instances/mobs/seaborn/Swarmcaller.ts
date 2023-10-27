import {
    Activation,
    Condition,
    CreatureSize,
    CRValue,
    DamageType,
    DSkill,
    DStat,
    Hidden,
    Prof,
    ProficiencyLevel,
    Sense,
    Speed,
    StatValue
} from "../../../../../data/constants";
import {
    NpcID
} from "../../../../../data/npcIndex";
import {
    D1, D10,
    D12, D20,
    D4,
    D6,
    D8
} from "../../../../../rolling/Dice";
import {
    Action
} from "../../../../action/Action";
import {
    wrapCondition,
    wrapDamageType,
    wrapRoll,
    wrapSense
} from "../../../../action/Wrap";
import {
    Character
} from "../../../Character";

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
        `<p><em><strong>LifeSoup Orbs.</strong></em> The SwarmCaller is 
         surrounded by two orbs apparently made of essence of one of the 
         Firstborn. All its abilities involve manipulation of these orbs. Each 
         orb has 30 HP, 15 AC and ${wrapRoll(swarmC.DEX + 2)} to DEX saves - 
         other saves mirror those of the SwarmCaller. Each orb can be in the 
         dormant, active or broken state. While dormant, the orbs take 10% damage 
         (rounded down) from any source, but can't use any abilities. A 
         destroyed orb re-forms after 24 hours. Until both orbs are broken, the 
         SwarmCaller takes 10% damage from any source and regenerates 
         ${wrapRoll([[1, D10], [swarmC.Prof, D1]])} HP at turn start.</p>`
    ));

    swarmC.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>NetherSea Echoes.</strong></em> The SwarmCaller deals 
        ${wrapRoll([2, D12])} to each creature within 20 ft of it for each of 
        its orbs which are active. A creature can only take this damage once per 
        round.</p>`
    ));

    swarmC.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Bio Shield.</strong></em> The SwarmCaller summons a few 
        cells from the primordial LifeSoup and makes it corrupt the microbial 
        cells near itself to form a biological shield. Until the shield is 
        broken, it takes damage instead of the SwarmCaller and its orbs. For each 
        orb used in creating the shield, it gains 20 HP, ${wrapRoll([2, D10])} 
        HP regen at turn start and +2 AC / saves (over a base 10 AC, 
        ${wrapRoll(2)} to all saves).</p>`
    ));

    swarmC.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Summon Brand.</strong></em><strong> (1 / Day)</strong> 
         The SwarmCaller summons the NetherSea brand on the ground on which it 
         is standing. This ability can only be used if it stands on a ground not 
         made of Silver, Aluminium or any other nullifying material.
         </p>`
    ));

    swarmC.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><em><strong>Stirring the Soup.</strong></em> The SwarmCaller 
         activates or deactivates any of its LifeSoup orbs.
         </p>`
    ));

    swarmC.sheet.cr = new CRValue(6);

    swarmC.sheet.size = CreatureSize.Large;

    swarmC.sheet.subtitle = " Seaborn, Lawful Evil";
    swarmC.sheet.acDesc = " (Natural Dex)";
    swarmC.sheet.category = "seaborn";

    swarmC.finalize();
}