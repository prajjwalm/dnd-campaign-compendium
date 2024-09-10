import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupLogos()
{
    const c = new Character(NpcId.LogosPlaywright);

    c.core.name = "The Playwright";
    c.core.imgPath = "character_tokens/C1/Arc2/logos_normal.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('M50K+');
    c.card.addCardTag('From | Ruin');
    c.card.addCardTag('Race | Banshee (Demon)');
    c.card.addCardTag('Greater Demon Lord');
    c.card.addCardTag('Domain | 01:40 to 01:56');
    c.card.addCardTag(`Aberrant-Fused <span class="verbose">(Tragodia)</span>`);
    c.card.addCardTag(`CR 30`);

    c.card.primaryImageTitle = "The Writer";
    c.card.addAlternateImage("The Demon Lord", "character_tokens/C1/Arc2/logos_banshee.png");

    c.card.summary = () =>`
    The enigmatic 'scriptwriter' of the Troupe. From the 'Troupe Leader' he
    gained an uncanny ability to write reality to his whim, anything he writes <i>will exactly occur</i> as he wrote it. 
    However this works better for futures far off and with a lot of possibilities. Is functionally immortal
    since he wrote his own ending in the far future. <br/>
    Before he became the Playwright, he was also a greater demon lord. Banshees being male is extremely rare, and 
    all are very dangerous, and one among them becoming Lord was unheard of before him. Even back then he could 
    cast reality-bending magic simply by speaking aloud or writing his commands in the air.`;

    c.card.finalize();
}
