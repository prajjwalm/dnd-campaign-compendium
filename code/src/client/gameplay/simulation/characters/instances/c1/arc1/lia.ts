import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupLia()
{
    const lia = new Character(NpcID.Lia);

    lia.core.name = "Lia Mistcloak";
    lia.core.imgPath = "character_tokens/C1/Arc1/lia.png";

    lia.card.setCampaignArc(1, 1);
    lia.card.addCardTag("F1280");
    lia.card.addCardTag("CR | 10");
    lia.card.addCardTag("From | Faewild / Preservation");
    lia.card.addCardTag("Allegiance | Preservation");
    lia.card.addCardTag("Race | <span class='verbose'>High</span> Elf");
    lia.card.addCardTag("<span class='verbose'>Samurai</span> Fighter");
    lia.card.addCardTag("Faction: Watchers");

    lia.card.summary = () =>`An elven archer who roamed freely the Feywild until by cruel circumstance she fell prey to the second 
      nightmare. Survived the encounter thanks to ${Character.get(NpcID.Caelynn).createLink("Caelynn")}'s 
      intervention, who remained on the lookout for primordial incursions. Caelynn then offered her asylum with 
      herself promising to keep her safe from the primordial as far as possible, an offer she readily took. 
      Rescued ${Character.get(NpcID.Ulrich).createLink("Ulrich")} when he showed up a few centuries later and subsequently 
      married him on his insistence. While not the ideal marriage, the two manage fine nowadays.`;

    lia.opinions.isOpinionated = false;
    
}
