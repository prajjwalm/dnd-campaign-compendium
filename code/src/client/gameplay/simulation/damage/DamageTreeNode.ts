import {DamageType}        from "../../data/constants";
import {DamageTreeNodeTag} from "./DamageTreeNodeTag";
import {DamageTreeNodeType}      from "./DamageTreeNodeType";
import {IDamageTreeLeafNodeBuff} from "./IDamageTreeLeafNodeBuff";
import {IDamageTreeNode}         from "./IDamageTreeNode";


export class DamageTreeNode
    implements IDamageTreeNode
{
    private readonly _buffs: Set<IDamageTreeLeafNodeBuff>;

    constructor(private readonly _nodeType: DamageTreeNodeType,
                private readonly _children: IDamageTreeNode[],
                private readonly _selfDamage: Map<DamageType, IDamageParams> = null,
                private readonly _tags: Set<DamageTreeNodeTag> = null,
                public readonly comment: string = "")
    {
        if (this._nodeType == DamageTreeNodeType.Leaf) {
            if (this._children.length > 0) {
                throw new Error("Can't have children on a leaf node.");
            }
        }
        else {
            if (this._selfDamage != null ||
                this._tags != null       ||
                this.comment.length > 0)
            {
                throw new Error("Only leaf nodes can have these,");
            }
        }
        this._buffs = new Set();
    }

    public computeDPR(expectedDef: number, expectedRes: ReadonlyMap<DamageType, number>)
        : ReadonlyMap<DamageType, number>
    {
        if (this._nodeType == DamageTreeNodeType.Leaf) {
            const damageMap = new Map();
            let buffedDamage = this._selfDamage;
            for (const buff of this._buffs) {
                if (buff.shouldApply(this)) {
                    buffedDamage = buff.apply(buffedDamage);
                }
            }
            for (const [damageType, params] of buffedDamage.entries()) {
                damageMap.set(
                    damageType,
                    params.damagePerAttack *
                    params.attacksPerRound *
                    Math.min(0.95, Math.max(0.05, (21 + params.accuracyRating - expectedDef) / 20))
                );
                if (expectedRes.has(damageType)) {
                    damageMap.set(damageType,
                                  damageMap.get(damageType) * (1 - expectedRes.get(damageType)));
                }
            }
            return damageMap;
        }
        if (this._nodeType == DamageTreeNodeType.Or) {
            let maxDPR: ReadonlyMap<DamageType, number> = new Map();
            let maxDPRValue = 0;
            for (const child of this._children) {
                const childDPR = child.computeDPR(expectedDef, expectedRes);
                let childDPRValue = 0;
                for (const v of childDPR.values()) {
                    childDPRValue += v;
                }
                if (childDPRValue > maxDPRValue) {
                    maxDPRValue = childDPRValue;
                    maxDPR = childDPR;
                }
            }
            return maxDPR;
        }
        else if (this._nodeType == DamageTreeNodeType.And) {
            const accumulator = new Map();
            for (const child of this._children) {
                const childDPR = child.computeDPR(expectedDef, expectedRes);
                for (const [damageType, dpr] of childDPR.entries()) {
                    const accValue = accumulator.has(damageType) ?
                                     accumulator.get(damageType) : 0;

                    accumulator.set(damageType, accValue + dpr);
                }
            }
            return accumulator;
        }
        else {
            throw new Error("Unrecognized node type.");
        }
    }

    public applyBuff(buff: IDamageTreeLeafNodeBuff)
    {
        if (this._nodeType != DamageTreeNodeType.Leaf) {
            for (const child of this._children) {
                child.applyBuff(buff);
            }
            return;
        }
        this._buffs.add(buff);
    }

    public removeBuff(buff: IDamageTreeLeafNodeBuff)
    {
        if (this._nodeType != DamageTreeNodeType.Leaf) {
            for (const child of this._children) {
                child.removeBuff(buff);
            }
            return;
        }
        this._buffs.delete(buff);
    }

    public resetBuffs()
    {
        this._buffs.clear();
    }

    get tags(): ReadonlySet<DamageTreeNodeTag> {
        return this._tags;
    }

    public get children(): IDamageTreeNode[]
    {
        return this._children;
    }

    public get nodeType(): DamageTreeNodeType
    {
        return this._nodeType;
    }

    public get selfDamage(): ReadonlyMap<DamageType, IDamageParams>
    {
        return this._selfDamage;
    }
}

