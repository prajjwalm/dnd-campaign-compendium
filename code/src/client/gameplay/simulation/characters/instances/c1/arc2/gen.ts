import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupGen()
{
    const c = new Character(NpcID.Gen);

    c.core.name = "Gen";
    c.core.imgPath = "character_tokens/C1/Arc2/gen.png";

    c.card.setCampaignArc(1, 2);

    c.card.addCardTag('');
    c.card.addCardTag('From | Materia / Ruin / Devotion');
    c.card.addCardTag(`Race | Human`);
    c.card.addCardTag(`Class | <span class='verbose'>Illusion</span> Wizard`);
    c.card.addCardTag(`Class | Artificer`);
    c.card.addCardTag('CR | 17');

    c.card.summary = () =>`
    Little is known (so far) of ${Character.get(NpcID.Mandy).createLink("Mandragora")}'s brother except that he was
      a regular studious boy in Terra Prima until he was kidnapped by a 
      ${Character.get(NpcID.Mostima).createLink("bored wandering plane-hopper")} and brought into the Castle of 
      Death to be used as a bargaining chip by a group of adventurers, since he was supposedly the only family, and 
      only weakness of his sister.`;

    c.card.primaryImageTitle = "Child";

    c.opinions.isOpinionated = false;
    
}
