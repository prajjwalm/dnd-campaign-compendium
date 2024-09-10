import {DSkill, ProficiencyLevel} from "../../../../../data/constants";
import {NpcId}                    from "../../../../../data/npcIndex";
import {Character}                from "../../../Character";

export function setupCoroto()
{
    // Prepare the character object.
    const c = new Character(NpcId.Coroto);

    c.core.name = "Coroto";
    c.core.imgPath = "character_tokens/C2/Arc1/Coroto.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(14, 12, 14, 13, 12, 17);
    c.dStats.pb = 3;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.Intimidation, );
    c.dSkills.setSkillProficiency(DSkill.Nature, );
    c.dSkills.setSkillProficiency(DSkill.Performance, );
    c.dSkills.setSkillProficiency(DSkill.Stealth, );
    c.dSkills.setSkillProficiency(DSkill.Deception,  ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Persuasion, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    c.card.setCampaignArc(2, 1);

    c.card.addCardTag("Deceased");
    c.card.addCardTag("M54");
    c.card.addCardTag("CR 2");
    c.card.finalize();
    // [NpcPersonalityTag.Paranoid, 3],
    // [NpcPersonalityTag.Industrious, 3],
    // [NpcPersonalityTag.Stern, 2],
    // [NpcPersonalityTag.Confrontational, 2],
    // [NpcPersonalityTag.Insecure, 1],
    // [NpcPersonalityTag.Abusive, 1],
    // [NpcPersonalityTag.Vain, 1],
}
