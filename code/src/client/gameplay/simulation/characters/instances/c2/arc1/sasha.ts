import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupSasha()
{
    const c = new Character(NpcID.Sasha);

    c.core.name = "Sasha";
    c.core.imgPath = "character_tokens/C2/Arc1/Sasha.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("M13");
    c.card.addCardTag("CR 3");
    c.card.summary = () => `???`;
    c.card.finalize();
}
