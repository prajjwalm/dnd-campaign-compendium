import {
    CSkill,
    VisibilityLevel
} from "../../../data/constants";


/**
 * The default factory method for setting up an {@link ICSkills} object.
 */
export interface ICSkillsFactory
{
    /**
     * Add / Override value in the given skill.
     */
    setSkillValue(skill: CSkill,
                  value: number,
                  visibility: VisibilityLevel);

    /**
     * Add / Override value in the given skills.
     */
    setSkillValues(data: [CSkill, number, VisibilityLevel][]);

    /**
     * Once called, we can no longer edit the skills in any way. This is to
     * ensure we are not updating the skills via unexpected references.
     */
    finalizeSkills();
}