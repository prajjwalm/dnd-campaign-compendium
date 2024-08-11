import {DStat, statMod} from "../../../data/constants";
import {Character}      from "../Character";
import {BaseAspect}     from "./BaseAspect";
import {IDStats}        from "./IDStats";
import {IDStatsFactory} from "./IDStatsFactory";


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
    private readonly _stats: Map<DStat, number>;

    private _pb: number;

    /**
     * CTOR.
     */
    constructor(c: Character)
    {
        super(c);
        this._stats = new Map();
        this._pb = null;
    }

    public duplicate(other: Character): this
    {
        const aspect = new DStatsAspect(other);
        for (const [stat, val] of this._stats.entries()) {
            aspect._stats.set(stat, val);
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
        this._stats.set(DStat.Str, str);
        this._stats.set(DStat.Dex, dex);
        this._stats.set(DStat.Con, con);
        this._stats.set(DStat.Int, int);
        this._stats.set(DStat.Wis, wis);
        this._stats.set(DStat.Cha, cha);
    }

    /**
     * @inheritDoc
     */
    public get stats(): ReadonlyMap<DStat, number>
    {
        return this._stats;
    }

    /**
     * @inheritDoc
     */
    public get pb(): number
    {
        return this._pb;
    }

    /**
     * @inheritDoc
     */
    public set pb(val: number)
    {
        this._pb = val;
    }

    /**
     * @inheritDoc
     */
    public mod(stat: DStat): number
    {
        return statMod(this._stats.get(stat));
    }
}
