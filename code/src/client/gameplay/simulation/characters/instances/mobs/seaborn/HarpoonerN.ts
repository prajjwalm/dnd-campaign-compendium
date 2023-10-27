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
import {D1, D12, D8}              from "../../../../../rolling/Dice";
import {Action}                   from "../../../../action/Action";
import {wrapDamageType, wrapRoll} from "../../../../action/Wrap";
import {Character}                from "../../../Character";

export function setupHarpoonerN()
{
    const harpoonerN = new Character(NpcID.HarpoonerN);

    harpoonerN.core.name = "Harpooner (Nourished)";
    harpoonerN.core.imgPath = "mob_tokens/seaborn/HarpoonerN.png";

    harpoonerN.dStats.initializeStats(23, 15, 17, 14, 11, 13);
    harpoonerN.dStats.pb = Prof.get(4);

    harpoonerN.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    harpoonerN.dSKills.finalizeSkills();

    harpoonerN.opinions.isOpinionated = false;

    harpoonerN.combat.addBioHpDice(D8.countHavingE(90, Character.get(NpcID.Harpooner).CON), D8);
    harpoonerN.combat.computeHP();

    harpoonerN.combat.setSave(DStat.Int, ProficiencyLevel.Prof);

    harpoonerN.combat.setSpeed(Speed.Walking, 25);
    harpoonerN.combat.setSpeed(Speed.Swimming, 35);

    harpoonerN.combat.setRes(DamageType.Hellfire,    -100);
    harpoonerN.combat.setRes(DamageType.Lightning,   -100);
    harpoonerN.combat.setRes(DamageType.Fire,        -100);
    harpoonerN.combat.setRes(DamageType.Psychic,      50);
    harpoonerN.combat.setRes(DamageType.Physical,     50);
    harpoonerN.combat.setRes(DamageType.Cold,         50);
    harpoonerN.combat.setRes(DamageType.Acid,         100);
    harpoonerN.combat.setRes(DamageType.Poison,       100);

    harpoonerN.combat.setSense(Sense.BlindSight, 20);

    harpoonerN.combat.addAction(new Action(
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

    harpoonerN.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Harpoon!!.</strong></em> The harpooner launches its 
        harpoon in a straight line towards the target with great force. It 
        attempts an ${wrapRoll(harpoonerN.STR + harpoonerN.Prof + 2)} attack roll 
        against the primary target and another at disadvantage for all other 
        creatures in a 300 ft line behind the target. 
        Targets who are hit take ${wrapRoll([[7, D12], [harpoonerN.STR, D1]])} 
        ${wrapDamageType(DamageType.Piercing)} damage. The harpoon is blocked if
        it encounters an obstacle immune to piercing damage (which <u>might</u> 
        be a creature whose armor blocked the shot, in such a case the creature 
        must make a DC ${harpoonerN.dc(DStat.Str) + 2} save to avoid falling prone)). 
         </p>`
    ));


    harpoonerN.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><em><strong>Harpoon...</strong></em> The harpooner launches its 
        harpoon in a straight line towards the target with significant force. It 
        attempts an ${wrapRoll(harpoonerN.STR + harpoonerN.Prof)} attack roll 
        against the primary target and another at disadvantage for all other 
        creatures in a 300 ft line behind the target. 
        Targets who are hit take ${wrapRoll([[7, D12]])} 
        ${wrapDamageType(DamageType.Piercing)} damage. The harpoon is blocked if
        it encounters an obstacle immune to piercing damage (which <u>might</u> 
        be a creature whose armor blocked the shot, in such a case the creature 
        must make a DC ${harpoonerN.dc(DStat.Str)} save to avoid falling prone)).
         </p>`
    ));

    harpoonerN.sheet.cr = new CRValue(7);

    harpoonerN.sheet.size = CreatureSize.Medium;

    harpoonerN.sheet.subtitle = " Seaborn, Neutral Evil";
    harpoonerN.sheet.acDesc = " (Natural Armor)";
    harpoonerN.sheet.category = "seaborn";

    harpoonerN.finalize();
}