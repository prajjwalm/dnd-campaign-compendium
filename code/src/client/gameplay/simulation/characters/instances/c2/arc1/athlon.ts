import {Prof}      from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupAthlon()
{
    const athlon = new Character(NpcID.Athlon);

    athlon.core.name = "Athlon";
    athlon.core.imgPath = "character_tokens/C2/Arc1/Athlon.png";

    // Setup D&D stats.
    athlon.dStats.initializeStats(10, 20, 18, 8, 16, 10);
    athlon.dStats.pb = Prof.get(4);

    athlon.opinions.isOpinionated = true;
}
