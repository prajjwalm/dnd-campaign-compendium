import {DSkill, Hidden} from "../../../../../data/constants";
import {NpcID}          from "../../../../../data/npcIndex";
import {Character}      from "../../../Character";

export function setupIona()
{
    // Prepare the character object.
    const c = new Character(NpcID.Iona);

    c.core.name = "Iona";
    c.core.imgPath = "character_tokens/C2/Arc1/Iona.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(8, 10, 16, 17, 11, 12);
    c.dStats.pb = 2;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.Arcana, Hidden);
    c.dSkills.setSkillProficiency(DSkill.History, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Investigation, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Nature, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Perception, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Religion, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Stealth, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Survival, Hidden);
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
