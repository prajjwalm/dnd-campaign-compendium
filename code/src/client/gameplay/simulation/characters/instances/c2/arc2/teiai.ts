import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupTeiai()
{
    // Prepare the character object.
    const c = new Character(NpcID.Teiai);

    c.core.name = "Teiai";
    c.core.imgPath = "character_tokens/C2/Arc2/Teiai.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("F30");
    c.card.addCardTag("Race | Human");
    c.card.addCardTag("From | Honor (Ashyn)");
    c.card.addCardTag("Class | Artificer");
    c.card.addCardTag("CR | 6");
    c.card.finalize();
}
