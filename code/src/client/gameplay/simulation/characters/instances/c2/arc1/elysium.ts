import {Prof, ProficiencyLevel, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}                         from "../../../../../../npcs/npcIndex";
import {Character}                     from "../../../Character";

export function setupElysium()
{
    const elysium = new Character(NpcId.Elysium);

    elysium.core.name = "Elysium";
    elysium.core.imgPath = "character_tokens/C2/Arc1/Elysium.png";

    // Setup D&D stats.
    elysium.dStats.initializeStats( 8, 18, 14, 15, 18, 10);
    elysium.dStats.pb = Prof.get(5);

    // Setup D&D skills.
    elysium.dSKills.setSkillProficiency(Skill.Insight);
    elysium.dSKills.setSkillProficiency(Skill.Investigation);
    elysium.dSKills.setSkillProficiency(Skill.Medicine);

    elysium.dSKills.setSkillProficiency(Skill.Stealth,    ProficiencyLevel.Expert);
    elysium.dSKills.setSkillProficiency(Skill.Perception, ProficiencyLevel.Expert, 5);
    elysium.dSKills.finalizeSkills();

    elysium.opinions.isOpinionated = true;
}
