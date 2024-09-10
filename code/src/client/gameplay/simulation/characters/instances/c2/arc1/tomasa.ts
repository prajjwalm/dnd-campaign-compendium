import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupTomasa()
{
    // Prepare the character object.
    const c = new Character(NpcId.Tomasa);

    c.core.name = "Tomasa";
    c.core.imgPath = "character_tokens/C2/Arc1/Tomasa.png";
    c.core.finalize();

    // Setup D&D stats. todo


    // Setup D&D skills. todo

    // [NpcPersonalityTag.Sanguine, 2],
    // [NpcPersonalityTag.Accepting, 2],
    // [NpcPersonalityTag.Gourmand, 1],
    // [NpcPersonalityTag.Industrious, 1],
    // [NpcPersonalityTag.Abrasive, 1],

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("F27");
    c.card.addCardTag("CR 1");
    c.card.finalize();
}
