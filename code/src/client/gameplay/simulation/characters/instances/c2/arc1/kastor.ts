import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupKastor()
{
    const c = new Character(NpcId.Kastor);

    c.core.name = "Kastor";
    c.core.imgPath = "character_tokens/C2/Arc1/Kastor.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(16, 14, 14,  8, 11, 14);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("M26");
    c.card.addCardTag("CR 6");
    c.card.finalize();
    // [NpcPersonalityTag.Arrogant, 3],
    // [NpcPersonalityTag.Judging, 2],
    // [NpcPersonalityTag.Insecure, 2],
    // [NpcPersonalityTag.Abrasive, 2],
    // [NpcPersonalityTag.Vain, 1],
    // [NpcPersonalityTag.Confrontational, 1],
}
