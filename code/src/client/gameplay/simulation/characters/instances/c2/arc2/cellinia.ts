
import {
    Prof,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupCellinia()
{
    // Prepare the character object.
    const c = new Character(NpcID.Cellinia);

    c.core.name = "Cellinia";
    c.core.imgPath = "character_tokens/C2/Arc2/Cellinia.png";

    c.opinions.isOpinionated = true;

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("F29");
    c.card.addCardTag("From | Honor");
    c.card.addCardTag("Race | Shifter[Lupine]");
}
