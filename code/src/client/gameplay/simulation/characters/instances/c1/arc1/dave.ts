import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupDave()
{
    const c = new Character(NpcId.DaveRuhl);

    c.core.name = "Dave Ruhl";
    c.core.imgPath = "character_tokens/C1/Arc1/dave.png";
    c.core.finalize();

    c.card.addCardTag("Physically Deceased");
    c.card.setCampaignArc(1, 1);
    c.card.addCardTag("M2500");
    c.card.addCardTag("CR | 13");
    c.card.addCardTag("From | Innovation / Preservation");
    c.card.addCardTag("Race | Warforged");
    c.card.addCardTag("<span class='verbose'>Samurai</span> Fighter");
    c.card.addCardTag("Faction: Defenders");

    c.card.summary = () =>`A warforged automaton that was purchased by ${Character.get(NpcId.Caelynn).createLink("Caelynn")}'s 
      batch-mates at a heavy price upon her graduation, to serve and protect her. His modules were heavily operated 
      upon by Lesley who practiced her coding skills on him. Failed to defend Caelynn at one point long ago, and 
      gave his life holding out against a deep-sea aberration to atone for it.`;

    c.card.finalize();

    c.opinions.isOpinionated = false;
    c.opinions.finalize();
}