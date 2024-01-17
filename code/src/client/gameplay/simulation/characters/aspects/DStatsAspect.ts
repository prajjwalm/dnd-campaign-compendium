import {DStat, Prof, StatValue, VisibilityLevel} from "../../../data/constants";
import {
    ActionContext
}                                                from "../../action/ActionContext";
import {
    IActionContext
}                                                from "../../action/IActionContext";
import {Character}                               from "../Character";
import {AspectFactoryFlag}                       from "./AspectFactoryFlag";
import {BaseAspect}                              from "./BaseAspect";
import {IDStats}                                 from "./IDStats";
import {IDStatsFactory}                          from "./IDStatsFactory";


/**
 * The default implementation of {@link IDStats}.
 */
export class DStatsAspect
    extends    BaseAspect
    implements IDStatsFactory,
               IDStats
{
    /**
     * The core stats of this character.
     */
    private readonly _stats: Map<DStat, StatValue>;

    private readonly _statVisibilities: Map<DStat, VisibilityLevel>;

    private _pb: Prof;

    /**
     * CTOR.
     */
    constructor(c: Character)
    {
        super(c);
        this._stats = new Map();
        this._statVisibilities = new Map();
        this._pb = null;
    }

    public duplicate(other: Character): this
    {
        const aspect = new DStatsAspect(other);
        for (const [stat, val] of this._stats.entries()) {
            aspect._stats.set(stat, val);
        }
        for (const [stat, vis] of this._statVisibilities.entries()) {
            aspect._statVisibilities.set(stat, vis);
        }
        aspect._pb = this._pb;
        return aspect as this;
    }

    /**
     * @inheritDoc
     */
    public initializeStats(str: number,
                           dex: number,
                           con: number,
                           int: number,
                           wis: number,
                           cha: number): void
    {
        this.setupSentinel(AspectFactoryFlag.DStatsStatsSetup);
        this._stats.set(DStat.Str, new StatValue(str));
        this._stats.set(DStat.Dex, new StatValue(dex));
        this._stats.set(DStat.Con, new StatValue(con));
        this._stats.set(DStat.Int, new StatValue(int));
        this._stats.set(DStat.Wis, new StatValue(wis));
        this._stats.set(DStat.Cha, new StatValue(cha));
    }

    /**
     * @inheritDoc
     */
    public setVisibilityLevel(vis: VisibilityLevel, stat: DStat=null)
    {
        if (stat == null) {
            for (const stat of [DStat.Str,
                                DStat.Dex,
                                DStat.Con,
                                DStat.Int,
                                DStat.Wis,
                                DStat.Cha,])
            {
                this._statVisibilities.set(stat, vis);
            }
        }
        else {
            this._statVisibilities.set(stat, vis);
        }
    }

    /**
     * @inheritDoc
     */
    public get stats(): ReadonlyMap<DStat, StatValue>
    {
        return this._stats;
    }

    /**
     * @inheritDoc
     */
    public get pb(): Prof
    {
        this.ensure(AspectFactoryFlag.DStatsProficiencyDeclared);
        return this._pb;
    }

    /**
     * @inheritDoc
     */
    public set pb(val: Prof)
    {
        this.buildSentinel(AspectFactoryFlag.DStatsProficiencyDeclared,
                           AspectFactoryFlag.DStatsProficiencyFinalized);
        this._pb = val;
    }

    /**
     * @inheritDoc
     */
    public get actionContentAPI(): IActionContext
    {
        return new ActionContext(this);
    }

    /**
     * @inheritDoc
     */
    public mod(stat: DStat): number
    {
        return this._stats.get(stat).mod;
    }

    /**
     * @inheritDoc
     */
    public visibility(stat: DStat): VisibilityLevel
    {
        return this._statVisibilities.has(stat) ? this._statVisibilities.get(stat)
                                                : VisibilityLevel.Hinted;
    }
}
