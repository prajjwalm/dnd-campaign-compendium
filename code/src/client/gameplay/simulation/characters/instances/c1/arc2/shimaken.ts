import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupShimaken()
{
    const c = new Character(NpcID.Shimaken);

    c.core.name = "Ken Shima";
    c.core.imgPath = "character_tokens/C1/Arc2/shimaken.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag(`Deceased`);
    c.card.addCardTag('M72');
    c.card.addCardTag('From | Ruin');
    c.card.addCardTag('Allegiance | Preservation');
    c.card.addCardTag('Race | Human');
    c.card.addCardTag(`Class | <span class='verbose'>Battlemaster</span> Fighter`);
    c.card.addCardTag(`Class | <span class='verbose'>Bondsmith</span> Paladin`);
    c.card.addCardTag(`Lerasium Savant`);
    c.card.addCardTag('CR | ?');

    c.card.primaryImageTitle = "Rebel";
    c.card.addAlternateImage("Bondsmith", "character_tokens/C1/Arc2/shimaken_uber.png");

    c.card.summary = () =>`
    An orphan in the Castle of the Night who was adopted and raised by ${Character.get(NpcID.Lemuen).createLink()} along 
    with ${Character.get(NpcID.Shimarin).createLink("his sister")}. Wasn't the
    best at fighting but maintained an unshakable, and contagious, aura of hope and optimism despite having seen 
    his fair share of atrocities and horrors. Organized a 'resistance' aimed at making leaving the castle possible.`;

    c.card.finalize();
}
