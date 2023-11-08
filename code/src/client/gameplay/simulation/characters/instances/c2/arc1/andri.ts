import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupAndri()
{
    const c = new Character(NpcID.Andri);

    c.core.name = "Andri";
    c.core.imgPath = "character_tokens/C2/Arc1/Andri.png";

    c.card.setCampaignArc(2, 1);

    c.card.addCardTag("M37");
    c.card.addCardTag("CR 1")

    c.card.summary = () => `???`;

    c.opinions.isOpinionated = false;

}
