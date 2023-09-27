import {
    Prof,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupTomasa()
{
    // Prepare the character object.
    const tomasa = new Character(NpcID.Tomasa);

    tomasa.core.name = "Tomasa";
    tomasa.core.imgPath = "character_tokens/C2/Arc1/Tomasa.png";

    // Setup D&D stats. todo


    // Setup D&D skills. todo

    tomasa.opinions.isOpinionated = false;
    // [NpcPersonalityTag.Sanguine, 2],
    // [NpcPersonalityTag.Accepting, 2],
    // [NpcPersonalityTag.Gourmand, 1],
    // [NpcPersonalityTag.Industrious, 1],
    // [NpcPersonalityTag.Abrasive, 1],

    tomasa.card.setCampaignArc(2, 1);
    tomasa.card.addCardTag("F27");

}
