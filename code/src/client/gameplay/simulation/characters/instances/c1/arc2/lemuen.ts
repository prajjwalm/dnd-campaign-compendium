import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupLemuen()
{
    const c = new Character(NpcID.Lemuen);

    c.core.name = "Lemuen";
    c.core.imgPath = "character_tokens/C1/Arc2/lemuen.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('Deceased');
    c.card.addCardTag('F124');
    c.card.addCardTag('From | Ruin');
    c.card.addCardTag(`Race | Aasimar`);
    c.card.addCardTag(`Class | <span class='verbose'>Gunslinger</span> Fighter`);
    c.card.addCardTag(`Class | <span class='verbose'>Assassin</span> Rogue`);
    c.card.addCardTag(`'Saintess'`);
    c.card.addCardTag(`Nightblood | Neural Link`);
    c.card.addCardTag('CR | 14');

    c.card.summary = () =>`
    ${Character.get(NpcID.Mostima).createLink("Mostima")}'s half-sister and ${Character.get(NpcID.Shimarin).createLink("Rin")}'s
      teacher - she was reputed to be a sniper without compare. While her life had a great deal of ups and downs,
      very few individuals would know her full life story - probably only Mostima. And yet, one adventurer did begin
      to bond with a part of her left behind after she died, inheriting her skills and small pieces of her memories.`;

    c.card.finalize();
}
