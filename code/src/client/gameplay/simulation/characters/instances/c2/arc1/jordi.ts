import {Prof,}     from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupJordi()
{
    const jordi = new Character(NpcID.Jordi);

    jordi.core.name = "Jordi";
    jordi.core.imgPath = "character_tokens/C2/Arc1/Jordi.png";

    // Setup D&D stats.
    jordi.dStats.initializeStats(10, 13, 14, 13, 17, 8);
    jordi.dStats.pb = Prof.get(3);

    //todo
    jordi.opinions.isOpinionated = false;

    jordi.card.setCampaignArc(2, 1);
    jordi.card.addCardTag("M23");
}
