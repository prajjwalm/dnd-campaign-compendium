import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupMaster()
{
    const c = new Character(NpcId.TheMaster);

    c.core.name = "The Master";
    c.core.imgPath = "character_tokens/C1/Arc1/g_order.png";
    c.core.finalize();

    c.card.addCardTag("Deceased");
    c.card.setCampaignArc(1, 1);
    c.card.addCardTag("M50K+");
    c.card.addCardTag("CR | 27");
    c.card.addCardTag("From | Materia / Preservation");
    c.card.addCardTag("Allegiance | Preservation / ???");
    c.card.addCardTag("Race | Shadar-Kai");
    c.card.addCardTag("Paladin / Bard");
    c.card.addCardTag("Faction: Inquisitors");
    c.card.addCardTag("Ex-Guardian of Order");

    c.card.summary = () =>`Known across all the realms simply as 'The Master' - the Guardian of Order was an expert at diplomacy, the 
      forceful arm-twisting kind, who always got his way. Unlike most others who took it easy in the garden, he spent
      his whole life scheming and ruthlessly executing ever-more-complex Machiavellian schemes. So complex that even
      his own loyalties were at times doubted, particularly when some links were found between him and
      ${Character.get(NpcId.TraitorOthello).createLink("The Traitor")}. He was also a very strong warrior, rumoured to be a 
      radiant as well as have hemalurgic powers equivalent of Mistborn of old derived from an inordinate 
      number of spikes. A number equivalent to some of his seniormost counterparts within the castle itself, so many that 
      even Aluminium couldn't negate them in time. Committed suicide when Ruin attempted to assert his will via the
      hemalurgic spikes instead of letting his knowledge fall into the enemies hands. A pity too, for he was 
      literally the personification of one of the ideals of the new Preservation, "There's always another secret."`;

    c.card.finalize();
}
