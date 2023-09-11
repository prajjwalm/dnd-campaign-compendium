import {
    Prof,
    DSkill,
    VisibilityLevel, Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupYuki()
{
    const yuki = new Character(NpcID.Yuki);

    yuki.core.name = "Yuki";
    yuki.core.imgPath = "character_tokens/C2/Arc1/Yuki.png";

    // Setup D&D stats.
    yuki.dStats.initializeStats(11, 12, 14,  8, 12, 20);
    yuki.dStats.pb = Prof.get(4);

    // Setup D&D skills.
    yuki.dSKills.setSkillProficiency(DSkill.Stealth, Hidden);
    yuki.dSKills.setSkillProficiency(DSkill.Deception, Hidden);
    yuki.dSKills.setSkillProficiency(DSkill.Intimidation, Hidden);
    yuki.dSKills.setSkillProficiency(DSkill.Insight, Hidden);
    yuki.dSKills.setSkillProficiency(DSkill.Perception, Hidden);
    yuki.dSKills.finalizeSkills();

    yuki.opinions.isOpinionated = true;
}