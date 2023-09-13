import {DStat, Prof, VisibilityLevel} from "../../../data/constants";


/**
 * Factory methods required to set up an aspect implementing the {@link IDStats}
 * interface.
 */
export interface IDStatsFactory
{
    /**
     * Sets up the stats.
     */
    initializeStats(str: number,
                    dex: number,
                    con: number,
                    int: number,
                    wis: number,
                    cha: number): void;

    /**
     * Set the visibility level of a particular or all stats.
     */
    setVisibilityLevel(vis: VisibilityLevel, stat?: DStat);

    /**
     * Set the proficiency bonus.
     */
    set pb(val: Prof);
}
