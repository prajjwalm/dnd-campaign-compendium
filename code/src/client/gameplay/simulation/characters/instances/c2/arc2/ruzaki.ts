import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupRuzaki()
{
    // Prepare the character object.
    const c = new Character(NpcID.Ruzaki);

    c.core.name = "Ruzaki";
    c.core.imgPath = "character_tokens/C2/Arc2/Ruzaki.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M58");
    c.card.addCardTag("Race | Human");
    c.card.addCardTag("From | Innovation / Honor (Ashyn)");
    c.card.addCardTag("HoD Genetic Engineering, RyneTech Labs");
    c.card.addCardTag("CR | 0");
    c.card.finalize();
}
