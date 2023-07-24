import {Prof, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}       from "../../../../../../npcs/npcIndex";
import {Character} from "../../../Character";

export function setupYuki()
{
    const yuki = new Character(NpcId.Yuki);

    yuki.core.name = "Yuki";
    yuki.core.imgPath = "character_tokens/C2/Arc1/Yuki.png";

    // Setup D&D stats.
    yuki.dStats.initializeStats(11, 12, 14,  8, 12, 20);
    yuki.dStats.pb = Prof.get(4);

    // Setup D&D skills.
    yuki.dSKills.setSkillProficiency(Skill.Stealth);
    yuki.dSKills.setSkillProficiency(Skill.Deception);
    yuki.dSKills.setSkillProficiency(Skill.Intimidation);
    yuki.dSKills.setSkillProficiency(Skill.Insight);
    yuki.dSKills.setSkillProficiency(Skill.Perception);
    yuki.dSKills.finalizeSkills();

    yuki.opinions.isOpinionated = true;
}