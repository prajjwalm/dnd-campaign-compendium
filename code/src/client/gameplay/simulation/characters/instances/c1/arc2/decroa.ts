import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupDecroa()
{
    const c = new Character(NpcId.DecroaSal);

    c.core.name = "Decroa Sal";
    c.core.imgPath = "character_tokens/C1/Arc2/decroa.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('F2620');
    c.card.addCardTag('From | Shadowfell');
    c.card.addCardTag('Race | Higher Vampire');
    c.card.addCardTag('Crystal Command');
    c.card.addCardTag('CR | 23');

    c.card.summary = () =>`
    A higher vampire who had been captured by the Troupe Long ago and used both as a trap against unwanted 
      intruders and for their 'plays' and research. Prolonged torture and withdrawal symptoms had made her a little 
      unhinged, and <i>very</i> thristy. Was finally freed by a group of adventurers and thereafter protected by 
      ${Character.get(NpcId.Sanguinarch).createLink("The SanguineArch")} until she could escape the 
      castle. Revealed herself to be a childhood friend of ${Character.get(NpcId.Lesley).createLink("Lesley")}'s.`;

    c.card.finalize();

}
