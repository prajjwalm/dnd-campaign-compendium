import {
    Prof,
    ProficiencyLevel,
    DSkill,
    VisibilityLevel, Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupRoberta()
{
    const roberta = new Character(NpcID.Roberta);

    // Setup core.
    roberta.core.name = "Roberta";
    roberta.core.imgPath = "character_tokens/C2/Arc1/Roberta.png";

    // Setup D&D stats.
    roberta.dStats.initializeStats(10, 13, 13, 19, 10, 16);
    roberta.dStats.pb = Prof.get(4);

    // Setup D&D skills.
    roberta.dSKills.setSkillProficiency(DSkill.Performance, Hidden);
    roberta.dSKills.setSkillProficiency(DSkill.Investigation, Hidden);
    roberta.dSKills.setSkillProficiency(DSkill.Nature, Hidden);
    roberta.dSKills.setSkillProficiency(DSkill.SlightOfHand, Hidden, ProficiencyLevel.Expert);
    roberta.dSKills.setSkillProficiency(DSkill.Medicine, Hidden, ProficiencyLevel.Expert);
    roberta.dSKills.setSkillProficiency(DSkill._ALL, Hidden, ProficiencyLevel.Half);

    roberta.opinions.isOpinionated = true;
}
