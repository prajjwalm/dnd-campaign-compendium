import {
    DSkill,
    ProficiencyLevel,
    VisibilityLevel
} from "../../../data/constants";


/**
 * Objects supporting this interface can be queried to get their modifiers for
 * D&D skills.
 */
export interface IDSkills
{
    /**
     * Return the modifier for the given skill.
     *
     * @param skill        The skill whose modifier we want.
     * @param profOverride An override to the usual proficiency bonus this
     *                     character has for this skill, if applicable.
     *
     * @param tentative    If true, we use the skills as known so far (used when
     *                     we want to add a modifier to the currently set skills),
     *                     if false (default), we ensure the skills have been
     *                     finalized - this must be when we actually want to use
     *                     them elsewhere.
     * @returns The modifier for this context.
     */
    getSkillMod(skill: DSkill,
                profOverride?: ProficiencyLevel,
                tentative?: boolean): [number, VisibilityLevel];

    /**
     * @returns All the skills that were improved beyond usual, via proficiency,
     *          or constant value.
     */
    get upgradedSKills(): ReadonlyMap<DSkill, [number, VisibilityLevel]>;


}