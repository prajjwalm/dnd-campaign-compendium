import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupMuelsyse()
{
    const c = new Character(NpcId.Mumu);

    c.core.name = "Muelsyse";
    c.core.imgPath = "character_tokens/C1/Arc2/muelsyse.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('F343');
    c.card.addCardTag('From | Water / Innovation');
    c.card.addCardTag(`Race | High-Elf`);
    c.card.addCardTag(`Class | Artificer`);
    c.card.addCardTag(`MD ???, RyneTech Labs`);
    c.card.addCardTag('CR | 25');

    c.card.summary = () =>`
    A well known research specialist from Innovation who specialized in nanomachines and fluid automation. Had 
      come to the castle of Ruin for reasons unknown and there happened to meet, and protect from imminent 
      destruction, ${Character.get(NpcId.Fiest).createLink("one of the fans of her research")} and also helped out his group of adventurer 
      friends. However, being in a rush they couldn't really get to know her better then.`;

    c.card.finalize();
}
