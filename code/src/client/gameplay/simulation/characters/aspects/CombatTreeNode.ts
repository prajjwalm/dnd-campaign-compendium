import {Activation}          from "../../../data/constants";
import {AttackAbstraction}   from "../../action/AttackAbstraction";
import {ECombatTreeNodeType} from "./ECombatTreeNodeType";


/**
 * The node of a tree that helps us to measure the danger posed by a creature's
 * actions.
 */
export class CombatTreeNode
{
    public static constructActionTreeBase()
    {
        const root     = new CombatTreeNode(ECombatTreeNodeType.And,
                                            -1);

        const special  = new CombatTreeNode(ECombatTreeNodeType.And,
                                            Activation.Special);

        const actions  = new CombatTreeNode(ECombatTreeNodeType.Or,
                                            Activation.Action);

        const bonus    = new CombatTreeNode(ECombatTreeNodeType.Or,
                                            Activation.BonusAction);

        const reaction = new CombatTreeNode(ECombatTreeNodeType.Or,
                                            Activation.Reaction);

        const lair     = new CombatTreeNode(ECombatTreeNodeType.Or,
                                            Activation.LairAction);

        const legend   = new CombatTreeNode(ECombatTreeNodeType.Or,
                                            Activation.LegendaryAction);

        root.addChild(special);
        root.addChild(actions);
        root.addChild(bonus);
        root.addChild(reaction);
        root.addChild(lair);
        root.addChild(legend);

        return root;
    }

    /**
     * The child nodes. Null for leaf nodes.
     */
    private readonly children: Map<number, CombatTreeNode>;

    /**
     * The damage evaluated at this node's subtree. Assumed to be > 0 if valid.
     */
    private _damageMetric: number = 0;

    /**
     * The severity evaluated at this node's subtree. Assumed to be > 0 if
     * valid, and > 1 if beneficial.
     */
    private _severityMetric: number = 1;

    /**
     * The maximum among the indices assigned to the children.
     */
    private maxChildIndex: number = -1;

    /**
     * CTOR.
     *
     * @param type The type of node this is.
     * @param index A number to uniquely identify this among its siblings.
     * @param abstraction The attack abstraction, null for non-leaf nodes.
     * @param repeat Some nodes can repeat their actions multiple times, this
     *               simplifies that and avoids creating n number of nodes under
     *               an 'and' node.
     */
    public constructor(public readonly type: ECombatTreeNodeType,
                       public index: number | null = null,
                       public readonly abstraction: AttackAbstraction = null,
                       public repeat: number = 1)
    {
        this.children = this.type != ECombatTreeNodeType.Leaf ? new Map() : null;
    }

    /**
     * Add a child to this node's subtree.
     */
    public addChild(child: CombatTreeNode)
    {
        const index = child.index;
        const childIndex = index != null ? index: this.maxChildIndex + 1;

        this.maxChildIndex = Math.max(this.maxChildIndex, childIndex);

        this.children.set(childIndex, child);
        child.index = childIndex;
    }

    /**
     * Returns the child with the given index.
     */
    public n(idx: number): CombatTreeNode
    {
        return this.children.get(idx);
    }

    /**
     * Computes and saves the damage/severity metric. This should obviously be
     * called only after the subtree is complete.
     */
    public computeMetrics(cr: number): void
    {
        switch (this.type) {
        case ECombatTreeNodeType.And:
            this._damageMetric   = 0;
            this._severityMetric = 1;
            for (const child of this.children.values()) {
                child.computeMetrics(cr);
                this._damageMetric   += child._damageMetric;
                this._severityMetric += (child._severityMetric - 1);
            }
            break;
        case ECombatTreeNodeType.Or:
            this._damageMetric   = 0;
            this._severityMetric = 1;
            for (const child of this.children.values()) {
                child.computeMetrics(cr);
                this._damageMetric   = Math.max(this._damageMetric,   child._damageMetric);
                this._severityMetric = Math.max(this._severityMetric, child._severityMetric);
            }
            break;
        case ECombatTreeNodeType.Leaf:
            this._damageMetric   = this.abstraction.computeScore(cr);
            this._severityMetric = 1 + this.abstraction.severity / 100;
            break;
        }
        this._damageMetric *= this.repeat;
        this._severityMetric = Math.max(0.05, this._severityMetric);

        // Severity is not multiplied on repeats. Most effects like stun/fear
        // don't stack.
    }

    public get damageMetric(): number
    {
        return this._damageMetric;
    }

    public get severityMetric(): number
    {
        return this._severityMetric;
    }
}
