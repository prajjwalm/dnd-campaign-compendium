import {numberToText}                                                                                           from "../../../../../../common/common";
import {Activation, Condition, CreatureSize, DamageType, DSkill, DStat, Hidden, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                  from "../../../../../data/npcIndex";
import {D1, D10, D12, D8}                                                                                       from "../../../../../rolling/Dice";
import {Action}                                                                                                 from "../../../../action/Action";
import {wrapCondition, wrapDamageType, wrapRoll}                                                                from "../../../../action/Wrap";
import {Character}                                                                                              from "../../../Character";
import {CharacterVariant}                                                                                       from "../../../CharacterVariant";


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
    const c = new Character(NpcID.Harpooner);

    c.core.name = "Harpooner";
    c.core.imgPath = "mob_tokens/seaborn/Harpooner.png";
    c.core.finalize();

    c.dStats.initializeStats(20, 14, 12, 13, 10, 11);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    const harpoonerHitDiceCount = D8.countHavingE(90, c.CON);
    c.combat.addBioHpDice(harpoonerHitDiceCount, D8);
    c.combat.computeHP();

    c.combat.setSave(DStat.Int, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Walking, 25);
    c.combat.setSpeed(Speed.Swimming, 35);

    c.combat.setRes(DamageType.Hellfire,    -100);
    c.combat.setRes(DamageType.Lightning,   -100);
    c.combat.setRes(DamageType.Fire,        -100);
    c.combat.setRes(DamageType.Psychic,      50);
    c.combat.setRes(DamageType.Physical,     50);
    c.combat.setRes(DamageType.Cold,         50);
    c.combat.setRes(DamageType.Acid,         100);
    c.combat.setRes(DamageType.Poison,       100);

    c.combat.setSense(Sense.BlindSight, 20);

    c.combat.addAction(new Action(
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

    c.combat.addAction(new Action(
        Activation.Action,
        harpoonAttackGenerator(1, 1, "a target")
    ), "harpoon_major_new");

    c.combat.addAction(new Action(
        Activation.BonusAction,
        harpoonAttackGenerator(-1, 1, "a target")
    ), "harpoon_minor_new");

    c.combat.cr = 5
    c.combat.finalize();

    c.sheet.size     = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn, Neutral Evil";
    c.sheet.acDesc   = " (Natural Armor)";
    c.sheet.category = "seaborn";
    c.sheet.finalize();


    const n = new CharacterVariant(NpcID.HarpoonerN, NpcID.Harpooner);

    n.core.name = "Nourished Harpooner";
    n.core.imgPath = "mob_tokens/seaborn/HarpoonerN.png";
    n.core.finalize();

    n.dStats.initializeStats(25, 15, 17, 14, 11, 13);
    n.dStats.pb = 4;
    n.dStats.finalize();

    n.combat.addBioHpDice(harpoonerHitDiceCount, D10);
    n.combat.computeHP();

    n.combat.addAction(new Action(
        Activation.Action,
        harpoonAttackGenerator(3, 2, "the same target")
    ), "harpoon_major_new");

    n.combat.addAction(new Action(
        Activation.BonusAction,
        harpoonAttackGenerator(0, 2, "two distinct targets")
    ), "harpoon_minor_new");

    n.combat.cr = 9
    n.combat.finalize();

    n.sheet.size  = CreatureSize.Large;
    n.sheet.theme = "danger_1";
    n.sheet.finalize();
}