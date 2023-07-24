import {DamageType, Skill} from "../../homebrew/definitions/constants";


/**
 * Provides the information needed to display a {@link IQuestable} on the site.
 */
export interface IQuestableDisplay
{
    get dps(): number;
    // get arcane(): number;
    // get resilience(): number;
    // get skillVersatility(): number;
    // get mentalResilience(): number;
    // get reliability(): number;
    //
    // get leadDamageTypes(): DamageType[];
    // get significantSkills(): Skill[];
}
