import {
    DSkill,
    Hidden,
    Prof,
    ProficiencyLevel
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupCoroto()
{
    // Prepare the character object.
    const coroto = new Character(NpcID.Coroto);

    coroto.core.name = "Coroto";
    coroto.core.imgPath = "character_tokens/C2/Arc1/Coroto.png";

    // Setup D&D stats.
    coroto.dStats.initializeStats(14, 12, 14, 13, 12, 17);
    coroto.dStats.pb = Prof.get(3);

    // Setup D&D skills.
    coroto.dSKills.setSkillProficiency(DSkill.Intimidation, Hidden);
    coroto.dSKills.setSkillProficiency(DSkill.Nature, Hidden);
    coroto.dSKills.setSkillProficiency(DSkill.Performance, Hidden);
    coroto.dSKills.setSkillProficiency(DSkill.Stealth, Hidden);
    coroto.dSKills.setSkillProficiency(DSkill.Deception, Hidden, ProficiencyLevel.Expert);
    coroto.dSKills.setSkillProficiency(DSkill.Persuasion, Hidden, ProficiencyLevel.Expert);
    coroto.dSKills.finalizeSkills();

    coroto.card.setCampaignArc(2, 1);

    coroto.card.addCardTag("Deceased");
    coroto.card.addCardTag("M54");
    coroto.card.addCardTag("CR 2");
    // [NpcPersonalityTag.Paranoid, 3],
    // [NpcPersonalityTag.Industrious, 3],
    // [NpcPersonalityTag.Stern, 2],
    // [NpcPersonalityTag.Confrontational, 2],
    // [NpcPersonalityTag.Insecure, 1],
    // [NpcPersonalityTag.Abusive, 1],
    // [NpcPersonalityTag.Vain, 1],

    coroto.opinions.isOpinionated = false;
}
