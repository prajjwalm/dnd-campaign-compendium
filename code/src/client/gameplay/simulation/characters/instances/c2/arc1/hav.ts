import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupHav()
{
    const c = new Character(NpcID.Hav);

    c.core.name = "Hav";
    c.core.imgPath = "character_tokens/C2/Arc1/Hav.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("Deceased");
    c.card.addCardTag("M47");
    c.card.addCardTag("CR 2");
    c.card.summary = () => `???`;
    c.card.finalize();
}
