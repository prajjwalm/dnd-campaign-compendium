import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupEbenezar()
{
    const c = new Character(NpcId.Ebenezar);

    c.core.name = "Ebenezar";
    c.core.imgPath = "character_tokens/C1/Arc1/ebenezar.png";
    c.core.finalize();

    c.card.addCardTag("Deceased");
    c.card.setCampaignArc(1, 1);
    c.card.addCardTag("M750");
    c.card.addCardTag("CR | 22");
    c.card.addCardTag("From | Materia / Preservation / Ruin");
    c.card.addCardTag("Race | Human");
    c.card.addCardTag("<span class='verbose'>Divination</span> Wizard");
    c.card.addCardTag("Lich");

    c.card.summary = () =>`
     A human kid born in the the classical era. Accidentally entered a perpendicularity inside a 
     subterranean lake into the Gardens. Lived there for a few centuries and trained fanatically as a mage under his
     then-girlfriend ${Character.get(NpcId.Lesley).createLink()}'s tutelage and soon surpassed her. Became a Lich
     and would often roam in shady alleys of Materia, appearing helpless - then feeding on the souls of any who 
     assaulted him. Stabilized the perpendicularity between the lake he once drowned in - making it his 'lair' - and 
     the Mistflame in the Gardens near Bunker#371. Went to the castle to 'fight death', but failed and died, his 
     last days and whereabouts remain unknown.
    `;
    c.card.finalize();

    c.opinions.isOpinionated = false;
    c.opinions.finalize();
}