import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupCellinia()
{
    // Prepare the character object.
    const c = new Character(NpcID.Cellinia);

    c.core.name = "Cellinia";
    c.core.imgPath = "character_tokens/C2/Arc2/Cellinia.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(16, 27, 14, 19, 18, 25);
    c.dStats.pb = 9;
    c.dStats.finalize();

    // todo
    c.dSkills.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("F29");
    c.card.addCardTag("From | Devotion(?)");
    c.card.addCardTag("Race | Shifter[Lupine]");
    c.card.finalize();
}
