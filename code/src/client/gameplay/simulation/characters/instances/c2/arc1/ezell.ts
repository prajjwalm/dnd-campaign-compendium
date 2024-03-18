import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupEzell()
{
    const c = new Character(NpcID.Ezell);

    c.core.name = "Ezell";
    c.core.imgPath = "character_tokens/C2/Arc1/Ezell.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(8, 20, 14, 10, 13, 16);
    c.dStats.pb = 4;
    c.dStats.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    // [NpcPersonalityTag.Recluse, 2],
    // [NpcPersonalityTag.Judging, 2],
    // [NpcPersonalityTag.Distant, 2],
    // [NpcPersonalityTag["Guilt-ridden"], 1],
    // [NpcPersonalityTag.Kind, 1],
    // [NpcPersonalityTag.Quiet, 1],
    // [NpcPersonalityTag.Pessimist, 1],
    // [NpcPersonalityTag["Night owl"], 1],

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("M144 (32)");
    c.card.addCardTag("CR 12");
    c.card.addCardTag("Race | Aasimar");
    c.card.addCardTag("'Saint'");
    c.card.finalize();
}
