import {DamageType}              from "../../data/constants";
import {DamageTreeLeafNodeBuff}  from "./DamageTreeLeafNodeBuff";
import {DamageTreeNode}          from "./DamageTreeNode";
import {DamageTreeNodeTag}       from "./DamageTreeNodeTag";
import {DamageTreeNodeType}      from "./DamageTreeNodeType";
import {IDamageTreeLeafNodeBuff} from "./IDamageTreeLeafNodeBuff";
import {IDamageTreeNode}         from "./IDamageTreeNode";


export class DamageTree
{
    constructor(private readonly root: IDamageTreeNode)
    {}

    public applyBuff(buff: IDamageTreeLeafNodeBuff): void
    {
        this.root.applyBuff(buff);
    }

    public resetBuffs()
    {
        this.root.resetBuffs();
    }

    public computeDPR(expectedDef: number = 15,
                      expectedRes: ReadonlyMap<DamageType, number> = new Map())
        : ReadonlyMap<DamageType, number>
    {
        return this.root.computeDPR(expectedDef, expectedRes);
    }
}


export function testDamageTree()
{
    const damageTree = new DamageTree(
        new DamageTreeNode(DamageTreeNodeType.And, [
            // Actions
            new DamageTreeNode(DamageTreeNodeType.Or, [
                new DamageTreeNode(DamageTreeNodeType.And, [
                    new DamageTreeNode(
                        DamageTreeNodeType.Leaf, [],
                        new Map([
                            [DamageType.Slashing, {
                                damagePerAttack: 10.5,
                                attacksPerRound: 2,
                                accuracyRating: 9
                            }]
                        ]),
                        new Set([DamageTreeNodeTag.WeaponAttack,
                                 DamageTreeNodeTag.MeleeAttack,
                                 DamageTreeNodeTag.OnAction]),
                        "Longsword"
                    ),
                    new DamageTreeNode(
                        DamageTreeNodeType.Leaf, [],
                        new Map([
                            [DamageType.Radiant, {
                                damagePerAttack: 9,
                                attacksPerRound: 0.25,
                                accuracyRating: 9
                            }]
                        ]),
                        new Set([DamageTreeNodeTag.WeaponAttack,
                                 DamageTreeNodeTag.SpellAttack]),
                        "Divine Smite"
                    )
                ]),
                new DamageTreeNode(
                    DamageTreeNodeType.Leaf, [],
                    new Map([
                        [DamageType.Radiant, {
                            damagePerAttack: 10,
                            attacksPerRound: 1,
                            accuracyRating: 9
                        }]
                    ]),
                    new Set([DamageTreeNodeTag.RangedAttack,
                             DamageTreeNodeTag.SpellAttack,
                             DamageTreeNodeTag.OnAction]),
                    "Cantrip [Range:120]"
                )
            ]),
            // Bonus Actions
            new DamageTreeNode(DamageTreeNodeType.Or, [
                new DamageTreeNode(DamageTreeNodeType.And, [
                    new DamageTreeNode(
                        DamageTreeNodeType.Leaf, [],
                        new Map([
                            [DamageType.Slashing, {
                                damagePerAttack: 10.5,
                                attacksPerRound: 1,
                                accuracyRating: 9
                            }]
                        ]),
                        new Set([DamageTreeNodeTag.WeaponAttack,
                                 DamageTreeNodeTag.MeleeAttack,
                                 DamageTreeNodeTag.OnBonusAction]),
                        "Longsword"
                    ),
                    new DamageTreeNode(
                        DamageTreeNodeType.Leaf, [],
                        new Map([
                            [DamageType.Radiant, {
                                damagePerAttack: 9,
                                attacksPerRound: 0.125,
                                accuracyRating: 9
                            }]
                        ]),
                        new Set([DamageTreeNodeTag.WeaponAttack,
                                 DamageTreeNodeTag.SpellAttack]),
                        "Divine Smite"
                    )
                ]),
            ])
        ])
    );

    let dpr = damageTree.computeDPR(15);
    console.assert(
        dpr.get(DamageType.Slashing) == 23.625,
        `Expected slashing damage: 0, ` +
        `Actual slashing damage ${dpr.get(DamageType.Slashing)}`
    );

    console.assert(
        dpr.get(DamageType.Radiant) == 2.53125,
        `Expected radiant damage: 0,` +
        `Actual radiant damage: ${dpr.get(DamageType.Radiant)}`
    );


    dpr = damageTree.computeDPR(15,
                                new Map([
                                    [DamageType.Slashing, 0.75],
                                    [DamageType.Radiant, 0]
                                ]));


    console.assert(
        dpr.get(DamageType.Slashing) == 1.96875,
        `Expected slashing damage: 0, ` +
        `Actual slashing damage ${dpr.get(DamageType.Slashing)}`
    );

    console.assert(
        dpr.get(DamageType.Radiant) == 8.34375,
        `Expected radiant damage: 0,` +
        `Actual radiant damage: ${dpr.get(DamageType.Radiant)}`
    );

    damageTree.applyBuff(
        new DamageTreeLeafNodeBuff(
            (node) => node.tags.has(DamageTreeNodeTag.WeaponAttack) &&
                      node.tags.has(DamageTreeNodeTag.OnAction),
            (baseParams) => {
                const buffParams: Map<DamageType, IDamageParams> = new Map();
                for (const [damageType, params] of baseParams.entries()) {
                    buffParams.set(damageType, {
                        accuracyRating: params.accuracyRating,
                        attacksPerRound: params.attacksPerRound + 1,
                        damagePerAttack: params.damagePerAttack
                    });
                }
                return buffParams;
            }
        )
    )

    dpr = damageTree.computeDPR(15,
                                new Map([
                                    [DamageType.Slashing, 0.75],
                                    [DamageType.Radiant, 0]
                                ]));

    console.assert(
        dpr.get(DamageType.Slashing) == 7.875,
        `Expected slashing damage: 0, ` +
        `Actual slashing damage ${dpr.get(DamageType.Slashing)}`
    );

    console.assert(
        dpr.get(DamageType.Radiant) == 2.53125,
        `Expected radiant damage: 0,` +
        `Actual radiant damage: ${dpr.get(DamageType.Radiant)}`
    );

    damageTree.resetBuffs();

    console.log("Damage Computation Tests performed.")
}
