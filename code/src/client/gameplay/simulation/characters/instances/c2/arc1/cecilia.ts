import {Prof, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}       from "../../../../../../npcs/npcIndex";
import {Character}   from "../../../Character";

export function setupCecilia()
{
    const cecilia = new Character(NpcId.Cecelia);

    cecilia.core.name = "Cecilia";
    cecilia.core.imgPath = "character_tokens/C2/Arc1/Cecilia.png";

    // Setup D&D stats.
    cecilia.dStats.initializeStats(6, 16, 8, 10, 14, 18);
    cecilia.dStats.pb = Prof.get(3);

    //todo
    cecilia.dSKills.setSkillProficiency(Skill.Insight);

    cecilia.opinions.isOpinionated = true;
}
