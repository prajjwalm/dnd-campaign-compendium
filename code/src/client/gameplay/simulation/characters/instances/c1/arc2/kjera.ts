import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupKjerra()
{
    const c = new Character(NpcID.Kjerra);

    c.core.name = "Kjerra";
    c.core.imgPath = "character_tokens/C1/Arc2/g_mag_stone.png";

    c.card.setCampaignArc(1, 2);

    c.card.addCardTag('F');
    c.card.addCardTag('From | Stone / Preservation');
    c.card.addCardTag(`Race | Titan <span class='verbose'>&times; Serpentine</span>`);
    c.card.addCardTag(`Class | Spellcaster <span class='verbose'>(All)</span>`);
    c.card.addCardTag('Primordial | Shardic');
    c.card.addCardTag('Guardian of Magic');
    c.card.addCardTag('Atium Savant');
    c.card.addCardTag('CR | 30');

    c.card.primaryImageTitle = "Lithic";
    c.card.addAlternateImage("Humanoid", "character_tokens/C1/Arc2/g_mag_human.png");

    c.card.summary = () =>`
    Very little is known (so far) about the Guardian of Magic. Except that she keeps her consciousness distributed
      across various forms and bodies, not all humanoid, across several reams. And so she is pretty much immortal even
      before her primordial origins are taken into account. Since each body has its own reservoir of mana, she 
      herself has near unlimited mana and can cast all non-proprietary spells, and most proprietary ones, known in 
      all the dimensions. She personally maintains the entire internal financial infrastructure of the Gardens.`;

    c.opinions.isOpinionated = false;
    
}
