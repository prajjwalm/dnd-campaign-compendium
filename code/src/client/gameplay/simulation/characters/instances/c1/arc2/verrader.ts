import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupVerrader()
{
    const c = new Character(NpcID.Verrader);

    c.core.name = "Verrader";
    c.core.imgPath = "character_tokens/C1/Arc2/verrader.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);

    c.card.addCardTag('M31');
    c.card.addCardTag(`Deceased`);
    c.card.addCardTag('From | Ruin');
    c.card.addCardTag('Race | Human');
    c.card.addCardTag(`Class | <span class='verbose'>Eloquence</span> Bard`);
    c.card.addCardTag(`Class | <span class='verbose'>Elemental Bloodline</span> Sorcerer`);
    c.card.addCardTag(`Nightblood | Magma`);
    c.card.addCardTag(`Zinc Savant`);
    c.card.addCardTag(`Copper Savant`);
    c.card.addCardTag('CR | 10');

    c.card.summary = () =>`
    An influential fixer in Night Castle. Made it big thanks to his incredible charisma and deception skills. 
      Gained Nightblood in an accident - a result of his first betrayal - during his
      early years spent on the field in a forge which submerged his whole team, except 
      ${Character.get(NpcID.Shimarin).createLink("Shimarin")}, in magma. Died at the hands of the Steel Inquisitors, 
      his soul burnt to power Rin's hemalurgy.`;

    c.card.finalize();
}
