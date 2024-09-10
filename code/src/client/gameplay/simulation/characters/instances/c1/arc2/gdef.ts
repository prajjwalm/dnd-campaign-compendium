import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupGDef()
{
    const c = new Character(NpcId.GDef);

    c.core.name = "The Guardian of Defense";
    c.core.imgPath = "character_tokens/C1/Arc2/g_def.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('-40K+');
    c.card.addCardTag('From | Innovation / Preservation');
    c.card.addCardTag(`Allegiance | Preservation`);
    c.card.addCardTag(`Race | Warforged &times; Aasimar`);
    c.card.addCardTag(`Class | Fighter`);
    c.card.addCardTag('Guardian of Defense');
    c.card.addCardTag('Atium Savant');
    c.card.addCardTag(`'Saint'`);
    c.card.addCardTag('CR | 27');

    c.card.summary = () =>`
    ???`;

    c.card.finalize();
}
