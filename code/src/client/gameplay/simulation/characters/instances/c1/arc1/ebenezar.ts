import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupEbenezar()
{
    const ben = new Character(NpcID.Ebenezar);

    ben.core.name = "Ebenezar";
    ben.core.imgPath = "character_tokens/C1/Arc1/ebenezar.png";

    ben.card.addCardTag("Deceased");
    ben.card.setCampaignArc(1, 1);
    ben.card.addCardTag("M750");
    ben.card.addCardTag("CR | 22");
    ben.card.addCardTag("From | Materia / Preservation / Ruin");
    ben.card.addCardTag("Race | Human");
    ben.card.addCardTag("<span class='verbose'>Divination</span> Wizard");
    ben.card.addCardTag("Lich");

    ben.card.summary = () =>`
     A human kid born in the the classical era. Accidentally entered a perpendicularity inside a 
     subterranean lake into the Gardens. Lived there for a few centuries and trained fanatically as a mage under his
     then-girlfriend ${Character.get(NpcID.Lesley).createLink()}'s tutelage and soon surpassed her. Became a Lich
     and would often roam in shady alleys of Materia, appearing helpless - then feeding on the souls of any who 
     assaulted him. Stabilized the perpendicularity between the lake he once drowned in - making it his 'lair' - and 
     the Mistflame in the Gardens near Bunker#371. Went to the castle to 'fight death', but failed and died, his 
     last days and whereabouts remain unknown.
    `;

    ben.opinions.isOpinionated = false;


}