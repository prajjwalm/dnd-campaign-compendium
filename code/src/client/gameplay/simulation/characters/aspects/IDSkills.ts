import {ProficiencyLevel, Skill} from "../../../../homebrew/definitions/constants";

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
     * @returns The modifier for this context.
     */
    getSkillMod(skill: Skill, profOverride?: ProficiencyLevel): number;

    /**
     * @returns All the skills that were improved beyond usual, via proficiency,
     *          or constant value.
     */
    get upgradedSKills(): ReadonlyMap<Skill, number>;
}