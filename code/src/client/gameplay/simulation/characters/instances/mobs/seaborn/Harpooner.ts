import {numberToText}                                                                                           from "../../../../../../common/common";
import {Activation, Condition, CreatureSize, DamageType, DSkill, DStat, Hidden, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                  from "../../../../../data/npcIndex";
import {D1, D10, D12, D8}                                                                                       from "../../../../../rolling/Dice";
import {Action}                                  from "../../../../action/Action";
import {AttackAbstraction, DebuffT3}             from "../../../../action/AttackAbstraction";
import {wrapCondition, wrapDamageType, wrapRoll} from "../../../../action/Wrap";
import {CombatTreeNode}                                                                                         from "../../../aspects/CombatTreeNode";
import {ECombatTreeNodeType}                                                                                    from "../../../aspects/ECombatTreeNodeType";
import {Character}                                                                                              from "../../../Character";
import {CharacterVariant}                                                                                       from "../../../CharacterVariant";


function harpoonAttackGenerator(harpoonStrength: number,
                                harpoonCount: number,
                                targetConstraint: string = "the target",
                                c: Character)
    : [string, AttackAbstraction]
{
    const p: { forceStr: string, range: number, title: string } = new Map([
        [3,  { "forceStr": "insane",      "range": 300,  "title": "Harpoon!!." }],
        [1,  { "forceStr": "great",       "range": 150,  "title": "Harpoon!."  }],
        [0,  { "forceStr": "significant", "range": 120,  "title": "Harpoon."   }],
        [-1, { "forceStr": "moderate",    "range": 90,   "title": "Harpoon..." }],
    ]).get(harpoonStrength);

    const harpoonCountText = numberToText(harpoonCount);
    const s = harpoonCount > 1 ? "s" : "";

    return [`
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
     ${wrapCondition(Condition.Prone)})).</p>`,
        new AttackAbstraction([[4+harpoonStrength, D12, DamageType.Piercing],
                                [c.STR,            D1,  DamageType.Piercing]],
                              c.STR + c.Prof + harpoonStrength,
                              null)
    ];
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
    c.combat.setSense(Sense.SteelSight, 300);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Investiture Radar.</em> (D3)</strong> The harpooner doesn't 
        have regular sight but can detect the amounts of investiture(HP) creatures
        within 300 ft of it have. It will try to target the creature with the 
        least HP within range, unless there is any magical barrier between them 
        (e.g. Wall of Force, Shield spell) or a physical obstacle within the 
        harpooner's blindsight range or the harpooner feels the attack will 
        fail (e.g. the last attack didn't reduce the target's HP and neither 
        have moved since then).</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, DebuffT3
        ))
    );

    let [ht1, ha1] = harpoonAttackGenerator(1, 1, "a target", c);

    c.combat.addAction(new Action(Activation.Action, ht1), "harpoon_major_new");
    c.combat.root.n(Activation.Action).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, ha1)
    );

    let [ht2, ha2] = harpoonAttackGenerator(-1, 1, "a target", c);
    c.combat.addAction(new Action(Activation.BonusAction, ht2), "harpoon_minor_new");
    c.combat.root.n(Activation.BonusAction).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, ha2)
    );

    c.combat.cr = 6;
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

    // Cause of its blindsight.
    n.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, DebuffT3
        ))
    );

    let [ht3, ha3] = harpoonAttackGenerator(3, 2, "the same target", n);
    n.combat.addAction(new Action(Activation.Action, ht3), "harpoon_major_new");
    n.combat.root.n(Activation.Action).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, ha3, 2)
    );

    let [ht4, ha4] = harpoonAttackGenerator(0, 2, "two distinct targets", n);
    n.combat.addAction(new Action(Activation.BonusAction, ht4), "harpoon_minor_new");
    n.combat.root.n(Activation.BonusAction).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, ha4, 2)
    );

    n.combat.cr = 10;
    n.combat.finalize();

    n.sheet.size  = CreatureSize.Large;
    n.sheet.theme = "danger_1";
    n.sheet.finalize();
}