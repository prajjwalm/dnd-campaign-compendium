import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupMostima()
{
    const c = new Character(NpcID.Mostima);

    c.core.name = "Mostima";
    c.core.imgPath = "character_tokens/C1/Arc2/mostima.png";

    c.card.setCampaignArc(1, 2);

    c.card.addCardTag('F152');
    c.card.addCardTag('Plane-hopper');
    c.card.addCardTag(`From | Ruin`);
    c.card.addCardTag(`Race | Aasimar &times; Tiefling`);
    c.card.addCardTag(`Class | <span class='verbose'>Clockwork Soul</span> Sor-lock`);
    c.card.addCardTag(`Class | <span class='verbose'>Chronurgy</span> Wizard`);
    c.card.addCardTag(`Class | Fighter`);
    c.card.addCardTag(`Nightblood | Shattered Time`);
    c.card.addCardTag(`'Fallen Saintess'`);
    c.card.addCardTag(`CR | 25`);

    c.card.primaryImageTitle = "Messenger";
    c.card.addAlternateImage("Saintess", "character_tokens/C1/Arc2/mostima_saint.png");

    c.card.summary = () =>`
    A fallen angel who can move through planes without relying on perpendicularities. Has a tendency of talking to
    someone one minute and disappearing the next. Suffers from an advanced case of Nightblood but doesn't seem to 
    suffer from psychosis or neurosis. Carries two staves that appear powerful and seem to be the manifestation of
    an ancient, or rather timeless, soul.`;

    c.opinions.isOpinionated = false;
    
}
