import {numberToText}                                                                                                          from "../../../../../../common/common";
import {Activation, Condition, CreatureSize, CRValue, DamageType, DSkill, DStat, Hidden, Prof, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                                 from "../../../../../data/npcIndex";
import {D1, D10, D12, D8}                                                                                                      from "../../../../../rolling/Dice";
import {Action}                                                                                                                from "../../../../action/Action";
import {wrapCondition, wrapDamageType, wrapRoll}                                                                               from "../../../../action/Wrap";
import {Character}                                                                                                             from "../../../Character";
import {CharacterVariant}                                                                                                      from "../../../CharacterVariant";


function harpoonAttackGenerator(harpoonStrength: number,
                                harpoonCount: number,
                                targetConstraint: string = "the target")
{
    const p: { forceStr: string, range: number, title: string } = new Map([
        [3,  { "forceStr": "insane",      "range": 300,  "title": "Harpoon!!." }],
        [1,  { "forceStr": "great",       "range": 150,  "title": "Harpoon!."  }],
        [0,  { "forceStr": "significant", "range": 120,  "title": "Harpoon."   }],
        [-1, { "forceStr": "moderate",    "range": 90,   "title": "Harpoon..." }],
    ]).get(harpoonStrength);

    const harpoonCountText = numberToText(harpoonCount);
    const s = harpoonCount > 1 ? "s" : "";

    return (c: Character) => `
    <p><em><strong>${p.title}</strong></em> The harpooner launches ${harpoonCountText}
     harpoon${s} in a straight line towards ${targetConstraint} with ${p.forceStr}
     force, attempting to strike all creatures in a ${p.range} ft line. To hit: 
     ${wrapRoll(c.STR + c.Prof + harpoonStrength)}, which is reduced by 
     ${5 - harpoonStrength} for creatures behind the first to be hit. 
     Targets who are hit take ${wrapRoll([[4 + harpoonStrength, D12], [c.STR, D1]])} 
     ${wrapDamageType(DamageType.Piercing)} damage. The harpoon is blocked if
     it encounters an obstacle immune to piercing damage (which <u>might</u>
     be a creature whose armor blocked the shot, in such a case the creature
     must make a DC ${c.dc(DStat.Str) + harpoonStrength} save to avoid falling 
     ${wrapCondition(Condition.Prone)})).</p>`;
}

export function setupHarpooners()
{
    const harpooner = new Character(NpcID.Harpooner);

    harpooner.core.name = "Harpooner";
    harpooner.core.imgPath = "mob_tokens/seaborn/Harpooner.png";

    harpooner.dStats.initializeStats(20, 14, 12, 13, 10, 11);
    harpooner.dStats.pb = Prof.get(3);

    harpooner.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    harpooner.dSKills.finalizeSkills();

    harpooner.opinions.isOpinionated = false;

    const harpoonerHitDiceCount = D8.countHavingE(90, harpooner.CON);
    harpooner.combat.addBioHpDice(harpoonerHitDiceCount, D8);
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
        harpoonAttackGenerator(1, 1, "a target")
    ), "harpoon_major_new");

    harpooner.combat.addAction(new Action(
        Activation.BonusAction,
        harpoonAttackGenerator(-1, 1, "a target")
    ), "harpoon_minor_new");

    harpooner.sheet.cr       = new CRValue(5);
    harpooner.sheet.size     = CreatureSize.Medium;
    harpooner.sheet.subtitle = " Seaborn, Neutral Evil";
    harpooner.sheet.acDesc   = " (Natural Armor)";
    harpooner.sheet.category = "seaborn";

    harpooner.finalize();


    const harpoonerN = new CharacterVariant(NpcID.HarpoonerN, NpcID.Harpooner);

    harpoonerN.core.name = "Nourished Harpooner";
    harpoonerN.core.imgPath = "mob_tokens/seaborn/HarpoonerN.png";

    harpoonerN.dStats.initializeStats(25, 15, 17, 14, 11, 13);
    harpoonerN.dStats.pb = Prof.get(4);

    harpoonerN.combat.addBioHpDice(harpoonerHitDiceCount, D10);
    harpoonerN.combat.computeHP();

    harpoonerN.combat.addAction(new Action(
        Activation.Action,
        harpoonAttackGenerator(3, 2, "the same target")
    ), "harpoon_major_new");

    harpoonerN.combat.addAction(new Action(
        Activation.BonusAction,
        harpoonAttackGenerator(0, 2, "two distinct targets")
    ), "harpoon_minor_new");

    harpoonerN.sheet.cr    = new CRValue(9);
    harpoonerN.sheet.size  = CreatureSize.Large;
    harpoonerN.sheet.theme = "danger_1";

    harpoonerN.finalize();
}