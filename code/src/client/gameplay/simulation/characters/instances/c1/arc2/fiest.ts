import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupFiest()
{
    const c = new Character(NpcID.Fiest);

    c.core.name = "Fiest";
    c.core.imgPath = "character_tokens/C1/Arc2/fiest.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag(`Deceased`);
    c.card.addCardTag('M80');
    c.card.addCardTag('From | Ruin');
    c.card.addCardTag('Race | Human');
    c.card.addCardTag(`Class | Artificer`);
    c.card.addCardTag('CR | 9');

    c.card.summary = () =>`
    While he rarely stepped on to the field himself, ${Character.get(NpcID.Shimaken).createLink("Shimaken")} and the 
      others owed a lot to his technical genius. Since he rarely even left the confines of his lab, his life was
      rather sheltered and happy. ${Character.get(NpcID.Lemuen).createLink("Lemuen")}'s boyfriend before she died.`;

    c.card.finalize();
}
