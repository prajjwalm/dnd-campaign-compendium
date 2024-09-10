import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupMostima()
{
    const c = new Character(NpcId.Mostima);

    c.core.name = "Mostima";
    c.core.imgPath = "character_tokens/C1/Arc2/mostima.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('F152');
    c.card.addCardTag('Plane-hopper');
    c.card.addCardTag(`From | Devotion | Materia | Ruin | ALL`);
    c.card.addCardTag(`Race | Aasimar &times; Tiefling`);
    c.card.addCardTag(`Class | <span class='verbose'>Clockwork Soul</span> Sor-lock`);
    c.card.addCardTag(`Class | <span class='verbose'>Chronurgy</span> Wizard`);
    c.card.addCardTag(`Class | Fighter`);
    c.card.addCardTag(`Nightblood | Shattered Time`);
    c.card.addCardTag(`'Fallen Saintess'`);
    c.card.addCardTag(`Keeper of the Lock and Key`);
    c.card.addCardTag(`CR | 25`);

    c.card.primaryImageTitle = "Messenger";
    c.card.addAlternateImage("Saintess", "character_tokens/C1/Arc2/mostima_saint.png");

    c.card.summary = () =>`
    A fallen angel who can move through planes without relying on perpendicularities. Has a tendency of talking to
    someone one minute and disappearing the next. Suffers from an advanced case of Nightblood but doesn't seem to 
    suffer from psychosis or neurosis. Carries two staves that appear powerful and seem to be the manifestation of
    an ancient, or rather timeless, soul.<br/>
    When Odium almost escaped His prison in a manner no one expected, or was prepared for, several extremely powerful
    beings - mortal, immortal and Shardic - immediately reacted to try to stop Him, no matter the cost. Of them all,
    it was her, thanks to her unique freedom of movement, that broke His escape attempt. However, the cost she paid
    was heavy. And now, with less than 700 days to live, she awaits someone to defeat, and kill, her in a duel to
    acquire her staves and powers.`;

    c.card.finalize();
}
