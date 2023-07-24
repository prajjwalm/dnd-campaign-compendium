import {ProficiencyLevel, Skill} from "../../../../homebrew/definitions/constants";


/**
 * The default factory method for setting up an {@link IDSkills} object.
 */
export interface IDSkillsFactory
{
    /**
     * Add / Override proficiency level in the given skill.
     */
    setSkillProficiency(skill: Skill,
                        proficiency?: ProficiencyLevel,
                        mod?: number);

    /**
     * Sets the skill proficiency only if it doesn't make it worse in either
     * the level or the modifier.
     */
    upgradeSkillProficiency(skill: Skill,
                            proficiency?: ProficiencyLevel,
                            mod?: number);

    /**
     * Once called, we can no longer edit the skills in any way. This is to
     * ensure we are not updating the skills via unexpected references.
     */
    finalizeSkills();
}