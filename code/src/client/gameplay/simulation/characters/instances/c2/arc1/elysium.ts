import {
    Prof,
    ProficiencyLevel,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupElysium()
{
    const elysium = new Character(NpcID.Elysium);

    elysium.core.name = "Elysium";
    elysium.core.imgPath = "character_tokens/C2/Arc1/Elysium.png";

    // Setup D&D stats.
    elysium.dStats.initializeStats( 8, 18, 14, 15, 18, 10);
    elysium.dStats.pb = Prof.get(5);

    // Setup D&D skills.
    elysium.dSKills.setSkillProficiency(DSkill.Insight, Hidden);
    elysium.dSKills.setSkillProficiency(DSkill.Investigation, Hidden);
    elysium.dSKills.setSkillProficiency(DSkill.Medicine, Hidden);
    elysium.dSKills.setSkillProficiency(DSkill.Stealth, Hidden, ProficiencyLevel.Expert);
    elysium.dSKills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Expert, 5);
    elysium.dSKills.finalizeSkills();

    elysium.opinions.isOpinionated = true;
}
