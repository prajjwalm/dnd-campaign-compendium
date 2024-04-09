import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupRuzaki()
{
    // Prepare the character object.
    const c = new Character(NpcID.Ruzaki);

    c.core.name = "Ruzaki";
    c.core.imgPath = "character_tokens/C2/Arc2/Ruzaki.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M58");
    c.card.addCardTag("Race | Human");
    c.card.addCardTag("From | Innovation / Honor (Ashyn)");
    c.card.addCardTag("HoD Genetic Engineering, RyneTech Labs");
    c.card.addCardTag("CR | 0");
    c.card.summary = () => `
    A scientist working on some revolutionary theories in an abandoned corner of
    the multiverse - namely a small bunker in the dead and burnt planet of Ashyn.
    Was once in charge of the ground level implementation of Project Diablo, a 
    revolutionary project from the plane of Innovation aimed at creating new 
    Gods for humanity, before he was fired and exiled following a certain tragedy.
    Something which may or may not be related to 
    ${Character.get(NpcID.Hina).createLink("a certain child he referred to as #41")}
    loosing her entire Lebenslust at the mere sight of him.`;

    c.card.finalize();
}
