import {CSkill}             from "../../../data/constants";
import {IBaseAspectFactory} from "./IBaseAspectFactory";


/**
 * The default factory method for setting up an {@link ICSkills} object.
 */
export interface ICSkillsFactory
    extends IBaseAspectFactory
{
    /**
     * Add / Override value in the given skill.
     */
    setSkillValue(skill: CSkill, value: number);

    /**
     * Add / Override value in the given skills.
     */
    setSkillValues(data: [CSkill, number][]);
}