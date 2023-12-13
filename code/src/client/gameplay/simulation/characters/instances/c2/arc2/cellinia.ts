
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

    // Setup D&D stats.
    c.dStats.initializeStats(16, 27, 14, 19, 18, 25);
    c.dStats.pb = Prof.get(9);

    // todo
    c.dSKills.finalizeSkills();

    c.opinions.isOpinionated = true;

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("F29");
    c.card.addCardTag("From | Devotion(?)");
    c.card.addCardTag("Race | Shifter[Lupine]");
}
