import {Prof, ProficiencyLevel, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}                         from "../../../../../../npcs/npcIndex";
import {Character}                     from "../../../Character";

export function setupCoroto()
{
    // Prepare the character object.
    const coroto = new Character(NpcId.Coroto);

    coroto.core.name = "Coroto";
    coroto.core.imgPath = "character_tokens/C2/Arc1/Coroto.png";

    // Setup D&D stats.
    coroto.dStats.initializeStats(14, 12, 14, 13, 12, 17);
    coroto.dStats.pb = Prof.get(3);

    // Setup D&D skills.
    coroto.dSKills.setSkillProficiency(Skill.Intimidation);
    coroto.dSKills.setSkillProficiency(Skill.Nature);
    coroto.dSKills.setSkillProficiency(Skill.Performance);
    coroto.dSKills.setSkillProficiency(Skill.Stealth);

    coroto.dSKills.setSkillProficiency(Skill.Deception,  ProficiencyLevel.Expert);
    coroto.dSKills.setSkillProficiency(Skill.Persuasion, ProficiencyLevel.Expert);
    coroto.dSKills.finalizeSkills();

    coroto.opinions.isOpinionated = true;
}
