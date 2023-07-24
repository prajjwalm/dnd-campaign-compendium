import {Prof} from "../../../../homebrew/definitions/constants";


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
     * Set the proficiency bonus.
     */
    set pb(val: Prof);
}
