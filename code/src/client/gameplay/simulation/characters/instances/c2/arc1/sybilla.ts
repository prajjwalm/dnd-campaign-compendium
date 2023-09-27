import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupSybilla()
{
    const c = new Character(NpcID.Sybilla);

    c.core.name = "Sybilla";
    c.core.imgPath = "character_tokens/C2/Arc1/Sybilla.png";

    c.card.setCampaignArc(2, 1);

    c.card.addCardTag("F34");

    c.card.summary = () => `???`;

    c.opinions.isOpinionated = false;

}
