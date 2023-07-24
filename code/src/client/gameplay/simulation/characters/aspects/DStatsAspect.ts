import {DStat, Prof, StatValue} from "../../../../homebrew/definitions/constants";
import {ActionContext}          from "../../action/ActionContext";
import {IActionContext}            from "../../action/IActionContext";
import {Character}        from "../Character";
import {AspectFactoryFlag}         from "./AspectFactoryFlag";
import {BaseAspect}                from "./BaseAspect";
import {IDStats}                   from "./IDStats";
import {IDStatsFactory}            from "./IDStatsFactory";


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

    private _pb: Prof;

    /**
     * CTOR.
     */
    constructor(c: Character)
    {
        super(c);
        this._stats = new Map();
        this._pb = null;
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
        this.setupSentinel(AspectFactoryFlag.StatsSetup);
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
    public get stats(): ReadonlyMap<DStat, StatValue>
    {
        return this._stats;
    }

    /**
     * @inheritDoc
     */
    public get pb(): Prof
    {
        this.ensure(AspectFactoryFlag.ProficiencySetup);
        return this._pb;
    }

    /**
     * @inheritDoc
     */
    public set pb(val: Prof)
    {
        this.setupSentinel(AspectFactoryFlag.ProficiencySetup);
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
}
