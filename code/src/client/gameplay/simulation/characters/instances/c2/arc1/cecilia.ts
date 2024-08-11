import {DSkill}    from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupCecilia()
{
    const c = new Character(NpcID.Cecelia);

    c.core.name = "Cecilia";
    c.core.imgPath = "character_tokens/C2/Arc1/Cecilia.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(6, 16, 8, 10, 14, 18);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Insight);
    c.dSkills.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("F11");
    c.card.addCardTag("CR 3");
    c.card.finalize();

    // [NpcPersonalityTag.Conciliatory, 3],
    // [NpcPersonalityTag.Naive, 3],
    // [NpcPersonalityTag.Ascetic, 1],
    // [NpcPersonalityTag.Kind, 1],
    // [NpcPersonalityTag.Depressive, 1],
    // [NpcPersonalityTag["Abhors Violence"], 1],
    c.opinions.isOpinionated = true;
    c.opinions.finalize();
}
