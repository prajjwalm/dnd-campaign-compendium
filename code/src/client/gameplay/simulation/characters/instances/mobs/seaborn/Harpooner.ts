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
    Speed
}                                 from "../../../../../data/constants";
import {NpcID}       from "../../../../../data/npcIndex";
import {D1, D12, D8} from "../../../../../rolling/Dice";
import {Action}      from "../../../../action/Action";
import {wrapDamageType, wrapRoll} from "../../../../action/Wrap";
import {Character}                from "../../../Character";

export function setupHarpooner()
{
    const harpooner = new Character(NpcID.Harpooner);

    harpooner.core.name = "Harpooner";
    harpooner.core.imgPath = "mob_tokens/seaborn/Harpooner.png";

    harpooner.dStats.initializeStats(20, 14, 12, 13, 10, 11);
    harpooner.dStats.pb = Prof.get(3);

    harpooner.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    harpooner.dSKills.finalizeSkills();

    harpooner.opinions.isOpinionated = false;

    harpooner.combat.addBioHpDice(D8.countHavingE(90, harpooner.CON), D8);
    harpooner.combat.computeHP();

    harpooner.combat.setSave(DStat.Int, ProficiencyLevel.Prof);

    harpooner.combat.setSpeed(Speed.Walking, 25);
    harpooner.combat.setSpeed(Speed.Swimming, 35);

    harpooner.combat.setRes(DamageType.Hellfire,    -100);
    harpooner.combat.setRes(DamageType.Lightning,   -100);
    harpooner.combat.setRes(DamageType.Fire,        -100);
    harpooner.combat.setRes(DamageType.Psychic,      50);
    harpooner.combat.setRes(DamageType.Physical,     50);
    harpooner.combat.setRes(DamageType.Cold,         50);
    harpooner.combat.setRes(DamageType.Acid,         100);
    harpooner.combat.setRes(DamageType.Poison,       100);

    harpooner.combat.setSense(Sense.BlindSight, 20);

    harpooner.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Investiture Radar.</strong></em> The harpooner doesn't 
        have regular sight but can detect the amounts of investiture(HP) creatures
        within 300 ft of it have. It will try to target the creature with the 
        least HP within range, unless there is any magical barrier between them 
        (e.g. Wall of Force, Shield spell) or a physical obstacle within the 
        harpooner's blindsight range or the harpooner feels the attack will 
        fail (e.g. the last attack didn't reduce the target's HP and neither 
        have moved since then).</p>`
    ));

    harpooner.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Harpoon!!.</strong></em> The harpooner launches its 
        harpoon in a straight line towards the target with significant force. It 
        attempts an ${wrapRoll(harpooner.STR + harpooner.Prof)} attack roll 
        against the primary target and another at disadvantage for all other 
        creatures in a 300 ft line behind the target. 
        Targets who are hit take ${wrapRoll([[5, D12], [harpooner.STR, D1]])} 
        ${wrapDamageType(DamageType.Piercing)} damage. The harpoon is blocked if
        it encounters an obstacle immune to piercing damage (which <u>might</u> 
        be a creature whose armor blocked the shot, in such a case the creature 
        must make a DC ${harpooner.dc(DStat.Str)} save to avoid falling prone)). 
         </p>`
    ));


    harpooner.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><em><strong>Harpoon...</strong></em> The harpooner launches its 
        harpoon in a straight line towards the target with moderate force. It 
        attempts an ${wrapRoll(harpooner.STR + harpooner.Prof - 2)} attack roll 
        against the primary target and another at disadvantage for all other 
        creatures in a 300 ft line behind the target. 
        Targets who are hit take ${wrapRoll([[5, D12]])} 
        ${wrapDamageType(DamageType.Piercing)} damage. The harpoon is blocked if
        it encounters an obstacle immune to piercing damage (which <u>might</u> 
        be a creature whose armor blocked the shot, in such a case the creature 
        must make a DC ${harpooner.dc(DStat.Str) - 2} save to avoid falling prone)).
         </p>`
    ));

    harpooner.sheet.cr = new CRValue(5);

    harpooner.sheet.size = CreatureSize.Medium;

    harpooner.sheet.subtitle = " Seaborn, Neutral Evil";
    harpooner.sheet.acDesc = " (Natural Armor)";
    harpooner.sheet.category = "seaborn";

    harpooner.finalize();
}