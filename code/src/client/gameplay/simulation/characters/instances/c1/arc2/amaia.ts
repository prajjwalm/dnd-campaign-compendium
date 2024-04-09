import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupAmaia()
{
    const c = new Character(NpcID.Amaia);

    c.core.name = "Amaia";
    c.core.imgPath = "character_tokens/C1/Arc2/amaia.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('Deceased (Merged)');
    c.card.addCardTag('F43');
    c.card.addCardTag('From | Materia / Water');
    c.card.addCardTag(`Race | Human / Seaborn`);
    c.card.addCardTag(`Aberrant-fused`);
    c.card.addCardTag(`Core of We Many`);
    c.card.addCardTag('CR | ?');

    c.card.summary = () => `
    First sighted in the plane of Ruin enjoying a feast hosted by the Demon 
    Lord Grazzt, not much is known of this woman except that she resides in a 
    conjunction of the planes of Water and Devotion and is a highly feared figure
    in the Church of the Deep. It remains to be seen what role she plays in the
    rise of the Seaborn, yet for some reason she seems awfully anxious to get a 
    hold of a ${Character.get(NpcID.Jordi).createLink("certain unassuming sea-elf")}.
    <div class="effect_tag">Incomplete</div>`;

    c.core.finalize();
}
