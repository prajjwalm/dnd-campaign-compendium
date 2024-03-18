import {CSkill, VisibilityLevel} from "../../../data/constants";
import {Rating}                  from "../../../data/Rarity";


/**
 * Objects supporting this interface can be queried to get their modifiers for
 * D&D skills.
 */
export interface ICSkills
{
    /**
     * Return the value for the given skill.
     */
    getSkillVal(skill: CSkill): [number, VisibilityLevel];

    /**
     * @returns All the skills that were improved beyond usual.
     */
    get cSkillRatings(): ReadonlyMap<CSkill, Rating>;
}