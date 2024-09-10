import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupSArch()
{
    const c = new Character(NpcId.Sanguinarch);

    c.core.name = "The SanguineArch";
    c.core.imgPath = "character_tokens/C1/Arc2/sarch_m.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('-');
    c.card.addCardTag('From | Shadowfell');
    c.card.addCardTag(`Race | Titan <span class='verbose'>&times; Vampire</span>`);
    c.card.addCardTag('Primordial | Shardic');
    c.card.addCardTag('The Original');
    c.card.addCardTag('Life Command');
    c.card.addCardTag('CR | 29');

    c.card.primaryImageTitle = "Male";
    c.card.addAlternateImage("Female", "character_tokens/C1/Arc2/sarch_f.png");

    c.card.summary = () =>`
    Little is known (so far) about the first, and primordial, vampire and the de facto Lord of the entire dimension
      of the Shadowfell except that they are extremely dangerous to all but other higher vampires, most of whom regard 
      them with utmost respect. Fear, yes, but respect...`;

    c.card.finalize();
}
