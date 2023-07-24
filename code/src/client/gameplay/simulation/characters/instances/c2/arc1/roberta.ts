import {Prof, ProficiencyLevel, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}                         from "../../../../../../npcs/npcIndex";
import {Character}                     from "../../../Character";

export function setupRoberta()
{
    const roberta = new Character(NpcId.Roberta);

    // Setup core.
    roberta.core.name = "Roberta";
    roberta.core.imgPath = "character_tokens/C2/Arc1/Roberta.png";

    // Setup D&D stats.
    roberta.dStats.initializeStats(10, 13, 13, 19, 10, 16);
    roberta.dStats.pb = Prof.get(4);

    // Setup D&D skills.
    roberta.dSKills.setSkillProficiency(Skill.Performance);
    roberta.dSKills.setSkillProficiency(Skill.Investigation);
    roberta.dSKills.setSkillProficiency(Skill.Nature);

    roberta.dSKills.setSkillProficiency(Skill.SlightOfHand, ProficiencyLevel.Expert);
    roberta.dSKills.setSkillProficiency(Skill.Medicine,     ProficiencyLevel.Expert);
    roberta.dSKills.setSkillProficiency(Skill._ALL,         ProficiencyLevel.Half);

    roberta.opinions.isOpinionated = true;
}
