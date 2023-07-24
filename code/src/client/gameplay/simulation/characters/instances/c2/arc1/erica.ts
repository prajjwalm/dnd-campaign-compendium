import {Prof, ProficiencyLevel, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}                         from "../../../../../../npcs/npcIndex";
import {Character}                     from "../../../Character";

export function setupErica()
{
    // Prepare the character object.
    const erica = new Character(NpcId.Erica);

    erica.core.name = "Erica";
    erica.core.imgPath = "character_tokens/C2/Arc1/Erica.png";

    // Setup D&D stats.
    erica.dStats.initializeStats(8, 8, 14, 12, 14, 20);
    erica.dStats.pb = Prof.get(3);

    // Setup D&D skills.
    erica.dSKills.setSkillProficiency(Skill.Perception);

    erica.dSKills.setSkillProficiency(Skill.Insight,     ProficiencyLevel.Expert);
    erica.dSKills.setSkillProficiency(Skill.Performance, ProficiencyLevel.Expert);
    erica.dSKills.setSkillProficiency(Skill._ALL,        ProficiencyLevel.Half);
    erica.dSKills.finalizeSkills();

    erica.opinions.isOpinionated = true;
}
