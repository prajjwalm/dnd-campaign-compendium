import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupDave()
{
    const dave = new Character(NpcID.DaveRuhl);

    dave.core.name = "Dave Ruhl";
    dave.core.imgPath = "character_tokens/C1/Arc1/dave.png";

    dave.card.addCardTag("Physically Deceased");
    dave.card.setCampaignArc(1, 1);
    dave.card.addCardTag("M2500");
    dave.card.addCardTag("CR | 13");
    dave.card.addCardTag("From | Innovation / Preservation");
    dave.card.addCardTag("Race | Warforged");
    dave.card.addCardTag("<span class='verbose'>Samurai</span> Fighter");
    dave.card.addCardTag("Faction: Defenders");

    dave.card.summary = () =>`A warforged automaton that was purchased by ${Character.get(NpcID.Caelynn).createLink("Caelynn")}'s 
      batch-mates at a heavy price upon her graduation, to serve and protect her. His modules were heavily operated 
      upon by Lesley who practiced her coding skills on him. Failed to defend Caelynn at one point long ago, and 
      gave his life holding out against a deep-sea aberration to atone for it.`;

    dave.opinions.isOpinionated = false;

    
}