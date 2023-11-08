import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupPetra()
{
    const c = new Character(NpcID.Petra);

    c.core.name = "Petra";
    c.core.imgPath = "character_tokens/C2/Arc1/Petra.png";

    c.card.setCampaignArc(2, 1);

    c.card.addCardTag("F84");
    c.card.addCardTag("CR 1");

    c.card.summary = () => `???`;

    c.opinions.isOpinionated = false;

}
