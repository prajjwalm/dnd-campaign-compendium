import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupElliot()
{
    // Prepare the character object.
    const c = new Character(NpcID.Elliot);

    c.core.name = "The Sand Soldier";
    c.core.imgPath = "character_tokens/C2/Arc2/Elliot.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M37");
    c.card.addCardTag("Race | Human &times; Air Genasi");
    c.card.addCardTag("From | Honor (Ashyn)");
    c.card.addCardTag("CR | 17");

    c.card.summary = () => `
    A mysterious criminal of unknown origins wandering in the planet of Ashyn in
    the plane of Honor. Has acquired a certain notoriety as being the prime 
    suspect for the deaths of countless mercenaries. Was involved in some covert
    dealings with ${Character.get(NpcID.Ruzaki).createLink()} when they were 
    interrupted by a group of adventurers and a shardbearer assault.
    <div class="effect_tag">Incomplete</div>`;

    c.card.finalize();
}
