import {DStat, Prof, StatValue} from "../../../../homebrew/definitions/constants";
import {IActionContext}         from "../../action/IActionContext";


/**
 * Interface dictating that the object potentially supports core D&D stats.
 */
export interface IDStats
{
    /**
     * Return a map from each {@link DStat} to their {@link StatValue}.
     */
    get stats(): ReadonlyMap<DStat, StatValue>;

    /**
     * Acronym for {@link stats}.get(stat).mod
     * This is common enough to merit a shortcut.
     */
    mod(stat:DStat): number;

    /**
     * Return the proficiency bonus to be associated with the stat modifiers
     * wherever applicable.
     */
    get pb(): Prof;

    /**
     * The stats are all we need to generate content for various actions.
     */
    get actionContentAPI(): IActionContext;
}