import {DSkill, ProficiencyLevel, VisibilityLevel} from "../../../data/constants";
import {IBaseAspectFactory}                        from "./IBaseAspectFactory";


/**
 * The default factory method for setting up an {@link IDSkills} object.
 */
export interface IDSkillsFactory
    extends IBaseAspectFactory
{
    /**
     * Add / Override proficiency level in the given skill.
     */
    setSkillProficiency(skill: DSkill,
                        visibility: VisibilityLevel,
                        proficiency?: ProficiencyLevel,
                        mod?: number);

    /**
     * Once called, we can no longer edit the skills in any way. This is to
     * ensure we are not updating the skills via unexpected references.
     */
    finalizeSkills();
}