import {
    Prof,
    DSkill,
    VisibilityLevel, Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupVerna()
{
    const verna = new Character(NpcID.Verna);

    verna.core.name = "Verna";
    verna.core.imgPath = "character_tokens/C2/Arc1/Verna.png";

    // Setup D&D stats.
    verna.dStats.initializeStats(18, 10, 16,  8, 10, 14);
    verna.dStats.pb = Prof.get(4);

    //todo
    verna.dSKills.setSkillProficiency(DSkill.Athletics, Hidden);
    verna.dSKills.finalizeSkills();

    verna.opinions.isOpinionated = true;
}
