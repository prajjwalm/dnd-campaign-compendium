import {DSkill, ProficiencyLevel} from "../../../../../data/constants";
import {NpcID}                    from "../../../../../data/npcIndex";
import {Character}                from "../../../Character";

export function setupErica()
{
    // Prepare the character object.
    const c = new Character(NpcID.Erica);

    c.core.name = "Erica";
    c.core.imgPath = "character_tokens/C2/Arc1/Erica.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(8, 8, 14, 12, 14, 20);
    c.dStats.pb = 3;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.Perception,);
    c.dSkills.setSkillProficiency(DSkill.Insight, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Performance, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill._ALL, ProficiencyLevel.Half);
    c.dSkills.finalize();

    c.card.setCampaignArc(2, 1);

    c.card.addCardTag("F50");
    c.card.addCardTag("CR 2");
    c.card.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();
}
