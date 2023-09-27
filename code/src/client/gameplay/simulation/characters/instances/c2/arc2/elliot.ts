
import {
    Prof,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupElliot()
{
    // Prepare the character object.
    const c = new Character(NpcID.Elliot);

    c.core.name = "The Sand Soldier";
    c.core.imgPath = "character_tokens/C2/Arc2/Elliot.png";

    c.opinions.isOpinionated = false;

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M37");
    c.card.addCardTag("Race | Human &times; Air Genasi");
    c.card.addCardTag("From | Honor (Ashyn)");
    c.card.addCardTag("CR | 17");
}
