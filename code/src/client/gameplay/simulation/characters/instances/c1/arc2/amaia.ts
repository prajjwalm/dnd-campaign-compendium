import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupAmaia()
{
    const c = new Character(NpcID.Amaia);

    c.core.name = "Amaia";
    c.core.imgPath = "character_tokens/C1/Arc2/amaia.png";

    c.card.setCampaignArc(1, 2);

    c.card.addCardTag('Deceased (Merged)');
    c.card.addCardTag('F43');
    c.card.addCardTag('From | Materia / Water');
    c.card.addCardTag(`Race | Human`);
    c.card.addCardTag(`Aberrant-fused`);
    c.card.addCardTag(`Core of the Many`);
    c.card.addCardTag('CR | ?');

    c.card.summary = () =>`
    `;

    c.opinions.isOpinionated = false;
    
}
