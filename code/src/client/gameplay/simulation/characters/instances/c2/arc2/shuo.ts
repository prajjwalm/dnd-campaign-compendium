
import {
    Prof,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupShuo()
{
    // Prepare the character object.
    const c = new Character(NpcID.Shuo);

    c.core.name = "Shuo";
    c.core.imgPath = "character_tokens/C2/Arc2/Shuo.png";

    c.opinions.isOpinionated = false;

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M");
    c.card.addCardTag("From | Honor");
    c.card.addCardTag("Race | Titan <span class='verbose'>&times; Black/Gold Dragon</span>");
    c.card.addCardTag(`<span>Primordial | Outsider <span class='verbose'>(1<sup>st</sup> Fragment of Sui)</span></span>`);
    c.card.addCardTag(`The First Martial Artist`);
    c.card.addCardTag("CR | 24 / 28");
}
