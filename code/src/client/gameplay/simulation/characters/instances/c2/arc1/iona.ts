import {
    Prof,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupIona()
{
    // Prepare the character object.
    const iona = new Character(NpcID.Iona);

    iona.core.name = "Iona";
    iona.core.imgPath = "character_tokens/C2/Arc1/Iona.png";

    // Setup D&D stats.
    iona.dStats.initializeStats(8, 10, 16, 17, 11, 12);
    iona.dStats.pb = Prof.get(2);

    // Setup D&D skills.
    iona.dSKills.setSkillProficiency(DSkill.Arcana, Hidden);
    iona.dSKills.setSkillProficiency(DSkill.History, Hidden);
    iona.dSKills.setSkillProficiency(DSkill.Investigation, Hidden);
    iona.dSKills.setSkillProficiency(DSkill.Nature, Hidden);
    iona.dSKills.setSkillProficiency(DSkill.Perception, Hidden);
    iona.dSKills.setSkillProficiency(DSkill.Religion, Hidden);
    iona.dSKills.setSkillProficiency(DSkill.Stealth, Hidden);
    iona.dSKills.setSkillProficiency(DSkill.Survival, Hidden);
    iona.dSKills.finalizeSkills();

    iona.opinions.isOpinionated = true;
}
