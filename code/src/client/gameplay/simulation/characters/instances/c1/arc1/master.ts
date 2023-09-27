import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupMaster()
{
    const mas = new Character(NpcID.TheMaster);

    mas.core.name = "The Master";
    mas.core.imgPath = "character_tokens/C1/Arc1/g_order.png";

    mas.card.addCardTag("Deceased");
    mas.card.setCampaignArc(1, 1);
    mas.card.addCardTag("M50K+");
    mas.card.addCardTag("CR | 27");
    mas.card.addCardTag("From | Materia / Preservation");
    mas.card.addCardTag("Allegiance | Preservation / ???");
    mas.card.addCardTag("Race | Shadar-Kai");
    mas.card.addCardTag("Paladin / Bard");
    mas.card.addCardTag("Faction: Inquisitors");
    mas.card.addCardTag("Ex-Guardian of Order");

    mas.card.summary = () =>`Known across all the realms simply as 'The Master' - the Guardian of Order was an expert at diplomacy, the 
      forceful arm-twisting kind, who always got his way. Unlike most others who took it easy in the garden, he spent
      his whole life scheming and ruthlessly executing ever-more-complex Machiavellian schemes. So complex that even
      his own loyalties were at times doubted, particularly when some links were found between him and
      ${Character.get(NpcID.TraitorOthello).createLink("The Traitor")}. He was also a very strong warrior, rumoured to be a 
      radiant as well as have hemalurgic powers equivalent of Mistborn of old derived from an inordinate 
      number of spikes. A number equivalent to some of his seniormost counterparts within the castle itself, so many that 
      even Aluminium couldn't negate them in time. Committed suicide when Ruin attempted to assert his will via the
      hemalurgic spikes instead of letting his knowledge fall into the enemies hands. A pity too, for he was 
      literally the personification of one of the ideals of the new Preservation, "There's always another secret."`;

    mas.opinions.isOpinionated = false;

}
