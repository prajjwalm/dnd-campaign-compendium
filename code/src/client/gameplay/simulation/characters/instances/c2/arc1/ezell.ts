import {Prof}      from "../../../../../../homebrew/definitions/constants";
import {NpcId}     from "../../../../../../npcs/npcIndex";
import {Character} from "../../../Character";

export function setupEzell()
{
    const ezell = new Character(NpcId.Ezell);

    ezell.core.name = "Ezell";
    ezell.core.imgPath = "character_tokens/C2/Arc1/Ezell.png";

    // Setup D&D stats.
    ezell.dStats.initializeStats(8, 20, 14, 10, 13, 16);
    ezell.dStats.pb = Prof.get(4);

    ezell.opinions.isOpinionated = true;
}
