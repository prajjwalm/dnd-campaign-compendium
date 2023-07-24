import {Prof}      from "../../../../../../homebrew/definitions/constants";
import {NpcId}     from "../../../../../../npcs/npcIndex";
import {Character} from "../../../Character";

export function setupKastor()
{
    const kastor = new Character(NpcId.Kastor);

    kastor.core.name = "Kastor";
    kastor.core.imgPath = "character_tokens/C2/Arc1/Kastor.png";

    // Setup D&D stats.
    kastor.dStats.initializeStats(16, 14, 14,  8, 11, 14);
    kastor.dStats.pb = Prof.get(3);

    kastor.opinions.isOpinionated = true;
}