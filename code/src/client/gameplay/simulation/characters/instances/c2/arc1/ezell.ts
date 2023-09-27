import {Prof}      from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupEzell()
{
    const ezell = new Character(NpcID.Ezell);

    ezell.core.name = "Ezell";
    ezell.core.imgPath = "character_tokens/C2/Arc1/Ezell.png";

    // Setup D&D stats.
    ezell.dStats.initializeStats(8, 20, 14, 10, 13, 16);
    ezell.dStats.pb = Prof.get(4);

    ezell.opinions.isOpinionated = true;

    // [NpcPersonalityTag.Recluse, 2],
    // [NpcPersonalityTag.Judging, 2],
    // [NpcPersonalityTag.Distant, 2],
    // [NpcPersonalityTag["Guilt-ridden"], 1],
    // [NpcPersonalityTag.Kind, 1],
    // [NpcPersonalityTag.Quiet, 1],
    // [NpcPersonalityTag.Pessimist, 1],
    // [NpcPersonalityTag["Night owl"], 1],

    ezell.card.setCampaignArc(2, 1);
    ezell.card.addCardTag("M32");
}
