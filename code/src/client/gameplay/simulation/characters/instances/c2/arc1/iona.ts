import {DSkill, }  from "../../../../../data/constants";
import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupIona()
{
    // Prepare the character object.
    const c = new Character(NpcId.Iona);

    c.core.name = "Iona";
    c.core.imgPath = "character_tokens/C2/Arc1/Iona.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(8, 10, 16, 17, 11, 12);
    c.dStats.pb = 2;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.Arcana, );
    c.dSkills.setSkillProficiency(DSkill.History, );
    c.dSkills.setSkillProficiency(DSkill.Investigation, );
    c.dSkills.setSkillProficiency(DSkill.Nature, );
    c.dSkills.setSkillProficiency(DSkill.Perception, );
    c.dSkills.setSkillProficiency(DSkill.Religion, );
    c.dSkills.setSkillProficiency(DSkill.Stealth, );
    c.dSkills.setSkillProficiency(DSkill.Survival, );
    c.dSkills.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("F13");
    c.card.addCardTag("CR 2");
    c.card.finalize();

    // [NpcPersonalityTag.Sanguine, 2],
    // [NpcPersonalityTag.Optimist, 2],
    // [NpcPersonalityTag.Trusting, 1],
    // [NpcPersonalityTag.Social, 1],
    // [NpcPersonalityTag.Psychopath, 1],
    // [NpcPersonalityTag.Modest, 1],
}
