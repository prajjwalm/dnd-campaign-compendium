import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupOthello()
{
    const c = new Character(NpcID.TraitorOthello);

    c.core.name = "The traitor";
    c.core.imgPath = "character_tokens/C1/Arc2/othello.png";

    c.card.setCampaignArc(1, 2);

    c.card.addCardTag('Deceased');
    c.card.addCardTag('M5020');
    c.card.addCardTag('From | Materia / Preservation / Ruin');
    c.card.addCardTag(    `Allegiance | Preservation (?)`);
    c.card.addCardTag(    `Race | Human`);
    c.card.addCardTag(    `Class | Fighter`);
    c.card.addCardTag(    `Class | Barbarian`);
    c.card.addCardTag(    `Class | Paladin`);
    c.card.addCardTag(    'Apprentice Guardian of Defense');
    c.card.addCardTag(    '<i>Bearer of Agonies</i>');
    c.card.addCardTag(    'CR | 20');

    c.card.summary = () =>`
    Once the apprentice guardian of defense, he betrayed the people in Preservation to kill everyone in the bunker
      with the help of the troupe and escaped into the castle. The only person, other than himself, who would've 
      known all the details was ${Character.get(NpcID.TheMaster).createLink("The Guardian of Order")} before he passed away.
      <br/>
      By the time he was found again by a group of adventurers, he was imprisoned by the troupe next to a rather 
      large explosive, and had completely lost his mind - as he kept babbling some gibberish. As they were escaping
      with him, however, the mists touched him causing him to fully become himself again. Unfortunately, this was but
      for a moment since soon after he was assassinated by ${Character.get(NpcID.Lucian).createLink("Solitaire")}.`;

    c.opinions.isOpinionated = false;
    
}
