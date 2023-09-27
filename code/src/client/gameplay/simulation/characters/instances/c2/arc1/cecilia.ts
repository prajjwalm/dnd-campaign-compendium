import {
    DSkill,
    Hidden,
    Prof
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupCecilia()
{
    const cecilia = new Character(NpcID.Cecelia);

    cecilia.core.name = "Cecilia";
    cecilia.core.imgPath = "character_tokens/C2/Arc1/Cecilia.png";

    // Setup D&D stats.
    cecilia.dStats.initializeStats(6, 16, 8, 10, 14, 18);
    cecilia.dStats.pb = Prof.get(3);

    cecilia.dSKills.setSkillProficiency(DSkill.Insight, Hidden);
    //todo
    cecilia.dSKills.finalizeSkills();

    cecilia.card.setCampaignArc(2, 1);

    cecilia.card.addCardTag("F11");

    // [NpcPersonalityTag.Conciliatory, 3],
    // [NpcPersonalityTag.Naive, 3],
    // [NpcPersonalityTag.Ascetic, 1],
    // [NpcPersonalityTag.Kind, 1],
    // [NpcPersonalityTag.Depressive, 1],
    // [NpcPersonalityTag["Abhors Violence"], 1],
    cecilia.opinions.isOpinionated = true;
}
