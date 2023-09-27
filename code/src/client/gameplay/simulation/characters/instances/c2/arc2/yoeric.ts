
import {
    Prof,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupYoeric()
{
    // Prepare the character object.
    const c = new Character(NpcID.Yoeric);

    c.core.name = "Yoeric";
    c.core.imgPath = "character_tokens/C2/Arc2/Yoeric.png";

    c.opinions.isOpinionated = false;

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M62");
    c.card.addCardTag("Race | Human");
    c.card.addCardTag("From | Honor (Ashyn)");
    c.card.addCardTag("Class | <span class='verbose'>Champion</span> Fighter");
    c.card.addCardTag("CR | 14");
}
