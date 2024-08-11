import {DStat} from "../../../data/constants";


/**
 * Interface dictating that the object potentially supports core D&D stats.
 */
export interface IDStats
{
    /**
     * Return a map from each {@link DStat} to their value.
     */
    get stats(): ReadonlyMap<DStat, number>;

    /**
     * Acronym for {@link stats}.get(stat).mod
     * This is common enough to merit a shortcut.
     */
    mod(stat:DStat): number;

    /**
     * Return the proficiency bonus to be associated with the stat modifiers
     * wherever applicable.
     */
    get pb(): number;
}