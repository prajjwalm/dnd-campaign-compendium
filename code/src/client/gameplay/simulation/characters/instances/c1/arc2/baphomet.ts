import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupBaphomet()
{
    const c = new Character(NpcID.Baphomet);

    c.core.name = "Baphomet";
    c.core.imgPath = "character_tokens/C1/Arc2/baphomet.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('M20K+');
    c.card.addCardTag('From | Ruin');
    c.card.addCardTag('Race | Demon');
    c.card.addCardTag('Demon Lord');
    c.card.addCardTag('Domain | 20:00 to 21:00');
    c.card.addCardTag('CR | 23');

    c.card.summary = () =>`
    The Demon Lord in command of the 'lowest level' of the Castle who often was summoned to other realms to fight
      on the front lines, and so had inherited the traits of lesser demons - namely ferocity in battle without regard
      to self-preservation, an irrational hatred of devils, and a slight dearth of brain cells. Regardless, the mere
      mention of his name brought terror in the hearts of many - particularly in the lower levels of the castle...`;

    c.card.finalize();
}
