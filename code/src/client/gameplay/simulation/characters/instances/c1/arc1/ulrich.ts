import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupUlrich()
{
    const c = new Character(NpcId.Ulrich);

    c.core.name = "Ulrich Mistcloak";
    c.core.imgPath = "character_tokens/C1/Arc1/ulrich.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 1);
    c.card.addCardTag("M1020");
    c.card.addCardTag("CR | 7");
    c.card.addCardTag("From | Materia / Preservation");
    c.card.addCardTag("Race | Human");
    c.card.addCardTag("<span class='verbose'>Forge</span> Cleric");
    c.card.addCardTag("Faction: Scholars");

    c.card.summary = () =>`A human that lived in the last years of the Archaic era and had shown remarkable skill in making heavy armors 
      for those of his clerical order. Upon his death in war, Preservation gave him a second chance at sentient life
      in the Gardens, as a reward for saving the lives of so many thanks to his meticulous work at their armors. 
      Since then he's been honing his skills and is now regarded as one of the finest smiths in the multiverse.`;

    c.card.finalize();
}
