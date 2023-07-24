import {Prof, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}       from "../../../../../../npcs/npcIndex";
import {Character}   from "../../../Character";

export function setupIona()
{
    // Prepare the character object.
    const iona = new Character(NpcId.Iona);

    iona.core.name = "Iona";
    iona.core.imgPath = "character_tokens/C2/Arc1/Iona.png";

    // Setup D&D stats.
    iona.dStats.initializeStats(8, 10, 16, 17, 11, 12);
    iona.dStats.pb = Prof.get(2);

    // Setup D&D skills.
    iona.dSKills.setSkillProficiency(Skill.Arcana);
    iona.dSKills.setSkillProficiency(Skill.History);
    iona.dSKills.setSkillProficiency(Skill.Investigation);
    iona.dSKills.setSkillProficiency(Skill.Nature);
    iona.dSKills.setSkillProficiency(Skill.Perception);
    iona.dSKills.setSkillProficiency(Skill.Religion);
    iona.dSKills.setSkillProficiency(Skill.Stealth);
    iona.dSKills.setSkillProficiency(Skill.Survival);
    iona.dSKills.finalizeSkills();

    iona.opinions.isOpinionated = true;
}
