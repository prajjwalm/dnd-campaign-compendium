import {
    Prof,
    ProficiencyLevel,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupErica()
{
    // Prepare the character object.
    const erica = new Character(NpcID.Erica);

    erica.core.name = "Erica";
    erica.core.imgPath = "character_tokens/C2/Arc1/Erica.png";

    // Setup D&D stats.
    erica.dStats.initializeStats(8, 8, 14, 12, 14, 20);
    erica.dStats.pb = Prof.get(3);

    // Setup D&D skills.
    erica.dSKills.setSkillProficiency(DSkill.Perception, Hidden);
    erica.dSKills.setSkillProficiency(DSkill.Insight, Hidden, ProficiencyLevel.Expert);
    erica.dSKills.setSkillProficiency(DSkill.Performance, Hidden, ProficiencyLevel.Expert);
    erica.dSKills.setSkillProficiency(DSkill._ALL, Hidden, ProficiencyLevel.Half);
    erica.dSKills.finalizeSkills();

    erica.card.setCampaignArc(2, 1);

    erica.card.addCardTag("F50");

    erica.opinions.isOpinionated = true;
}
