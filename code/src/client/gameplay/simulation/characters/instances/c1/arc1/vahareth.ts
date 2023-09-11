import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupVahareth()
{
    const vah = new Character(NpcID.Vahareth);

    vah.core.name = "Vahareth Tsav Anat";
    vah.core.imgPath = "character_tokens/C1/Arc1/g_life.png";

    vah.card.addCardTag("<i>Retired</i>");
    vah.card.setCampaignArc(1, 1);
    vah.card.addCardTag("M50K+");
    vah.card.addCardTag("CR | 28");
    vah.card.addCardTag("From | Materia / Preservation");
    vah.card.addCardTag("Allegiance | Preservation");
    vah.card.addCardTag("Race | Kalashtar");
    vah.card.addCardTag("Druid");
    vah.card.addCardTag("Faction: Inspector");
    vah.card.addCardTag("Ex-Guardian of Life");

    vah.card.summary = `${Character.get(NpcID.Caelynn).createLink("Caelynn")}'s predecessor as the Guardian of Life as well as a 
      father figure to her. Scouted her out in Materia, then got her to the gardens and personally trained her. 
      Known and feared throughout all the outer planes for his unbreakable will and eyes that could delve into the 
      deepest nature of a person's soul with just a glance. 'Retired' after Leras' death.`;

    vah.opinions.isOpinionated = false;
}
