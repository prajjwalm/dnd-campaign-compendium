import {Prof, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}       from "../../../../../../npcs/npcIndex";
import {Character}   from "../../../Character";

export function setupVerna()
{
    const verna = new Character(NpcId.Verna);

    verna.core.name = "Verna";
    verna.core.imgPath = "character_tokens/C2/Arc1/Verna.png";

    // Setup D&D stats.
    verna.dStats.initializeStats(18, 10, 16,  8, 10, 14);
    verna.dStats.pb = Prof.get(4);

    //todo
    verna.dSKills.setSkillProficiency(Skill.Athletics);

    verna.opinions.isOpinionated = true;
}
