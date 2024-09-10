import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupVitacia()
{
    // Prepare the character object.
    const c = new Character(NpcId.Vitacia);

    c.core.name = "Vitacia";
    c.core.imgPath = "character_tokens/C2/Arc1/Vitacia.png";
    c.core.finalize();

    // Setup D&D stats. todo


    // Setup D&D skills. todo

    // [NpcPersonalityTag["Nature Lover"], 2],
    // [NpcPersonalityTag.Distant, 2],
    // [NpcPersonalityTag.Nervous, 1],
    // [NpcPersonalityTag.Recluse, 1],
    // [NpcPersonalityTag.Lazy, 1],
    // [NpcPersonalityTag.Vain, 1],

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("F25");
    c.card.addCardTag("CR 1");
    c.card.finalize();
}
