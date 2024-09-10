import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupPetra()
{
    const c = new Character(NpcId.Petra);

    c.core.name = "Petra";
    c.core.imgPath = "character_tokens/C2/Arc1/Petra.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 1);

    c.card.addCardTag("F84");
    c.card.addCardTag("CR 1");

    c.card.summary = () => `???`;
    c.card.finalize();
}
