import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupLia()
{
    const c = new Character(NpcId.Lia);

    c.core.name = "Lia Mistcloak";
    c.core.imgPath = "character_tokens/C1/Arc1/lia.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 1);
    c.card.addCardTag("F1280");
    c.card.addCardTag("CR | 10");
    c.card.addCardTag("From | Faewild / Preservation");
    c.card.addCardTag("Allegiance | Preservation");
    c.card.addCardTag("Race | <span class='verbose'>High</span> Elf");
    c.card.addCardTag("<span class='verbose'>Samurai</span> Fighter");
    c.card.addCardTag("Faction: Watchers");

    c.card.summary = () =>`An elven archer who roamed freely the Feywild until by cruel circumstance she fell prey to the second 
      nightmare. Survived the encounter thanks to ${Character.get(NpcId.Caelynn).createLink("Caelynn")}'s 
      intervention, who remained on the lookout for primordial incursions. Caelynn then offered her asylum with 
      herself promising to keep her safe from the primordial as far as possible, an offer she readily took. 
      Rescued ${Character.get(NpcId.Ulrich).createLink("Ulrich")} when he showed up a few centuries later and subsequently 
      married him on his insistence. While not the ideal marriage, the two manage fine nowadays.`;

    c.card.finalize();

    c.opinions.isOpinionated = false;
    c.opinions.finalize();
}
