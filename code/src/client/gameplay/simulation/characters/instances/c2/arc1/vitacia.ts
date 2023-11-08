import {
    Prof,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupVitacia()
{
    // Prepare the character object.
    const vitacia = new Character(NpcID.Vitacia);

    vitacia.core.name = "Vitacia";
    vitacia.core.imgPath = "character_tokens/C2/Arc1/Vitacia.png";

    // Setup D&D stats. todo


    // Setup D&D skills. todo

    vitacia.opinions.isOpinionated = false;

    // [NpcPersonalityTag["Nature Lover"], 2],
    // [NpcPersonalityTag.Distant, 2],
    // [NpcPersonalityTag.Nervous, 1],
    // [NpcPersonalityTag.Recluse, 1],
    // [NpcPersonalityTag.Lazy, 1],
    // [NpcPersonalityTag.Vain, 1],

    vitacia.card.setCampaignArc(2, 1);
    vitacia.card.addCardTag("F25");
    vitacia.card.addCardTag("CR 1");

}
