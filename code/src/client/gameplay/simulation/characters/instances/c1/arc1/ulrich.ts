import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupUlrich()
{
    const ulr = new Character(NpcID.Ulrich);

    ulr.core.name = "Ulrich Mistcloak";
    ulr.core.imgPath = "character_tokens/C1/Arc1/ulrich.png";

    ulr.card.setCampaignArc(1, 1);
    ulr.card.addCardTag("M1020");
    ulr.card.addCardTag("CR | 7");
    ulr.card.addCardTag("From | Materia / Preservation");
    ulr.card.addCardTag("Race | Human");
    ulr.card.addCardTag("<span class='verbose'>Forge</span> Cleric");
    ulr.card.addCardTag("Faction: Scholars");

    ulr.card.summary = `A human that lived in the last years of the Archaic era and had shown remarkable skill in making heavy armors 
      for those of his clerical order. Upon his death in war, Preservation gave him a second chance at sentient life
      in the Gardens, as a reward for saving the lives of so many thanks to his meticulous work at their armors. 
      Since then he's been honing his skills and is now regarded as one of the finest smiths in the multiverse.`;

    ulr.opinions.isOpinionated = false;
}
