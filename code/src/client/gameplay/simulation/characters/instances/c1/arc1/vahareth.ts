import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupVahareth()
{
    const c = new Character(NpcId.Vahareth);

    c.core.name = "Vahareth Tsav Anat";
    c.core.imgPath = "character_tokens/C1/Arc1/g_life.png";
    c.core.finalize();

    c.card.addCardTag("<i>Retired</i>");
    c.card.setCampaignArc(1, 1);
    c.card.addCardTag("M50K+");
    c.card.addCardTag("CR | 28");
    c.card.addCardTag("From | Materia / Preservation");
    c.card.addCardTag("Allegiance | Preservation");
    c.card.addCardTag("Race | Kalashtar");
    c.card.addCardTag("Druid");
    c.card.addCardTag("Faction: Inspector");
    c.card.addCardTag("Ex-Guardian of Life");

    c.card.summary = () =>`${Character.get(NpcId.Caelynn).createLink("Caelynn")}'s predecessor as the Guardian of Life as well as a 
      father figure to her. Scouted her out in Materia, then got her to the gardens and personally trained her. 
      Known and feared throughout all the outer planes for his unbreakable will and eyes that could delve into the 
      deepest nature of a person's soul with just a glance. 'Retired' after Leras' death.`;

    c.card.finalize();
}
