import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupIngrid()
{
    const c = new Character(NpcId.Ingrid);

    c.core.name = "Ingrid";
    c.core.imgPath = "character_tokens/C2/Arc1/Ingrid.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 1);

    c.card.addCardTag("F24");
    c.card.addCardTag("CR 1");

    c.card.summary = () => `???`;
    c.card.finalize();
}
