import {
    Prof,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupVerna()
{
    const verna = new Character(NpcID.Verna);

    verna.core.name = "Verna";
    verna.core.imgPath = "character_tokens/C2/Arc1/Verna.png";

    // Setup D&D stats.
    verna.dStats.initializeStats(18, 12, 18,  8, 10, 14);
    verna.dStats.pb = Prof.get(4);

    //todo
    verna.dSKills.setSkillProficiency(DSkill.Athletics, Hidden);
    verna.dSKills.finalizeSkills();

    verna.opinions.isOpinionated = true;

    // [NpcPersonalityTag.Confident, 2],
    // [NpcPersonalityTag.Abrasive, 2],
    // [NpcPersonalityTag.Stern, 2],
    // [NpcPersonalityTag.Optimist, 1],
    // [NpcPersonalityTag.Judging, 1],

    verna.card.setCampaignArc(2, 1);
    verna.card.addCardTag("F24");
    verna.card.addCardTag("Race | Leonin");
    verna.card.addCardTag("Class | <span class='verbose'>Battlemaster </span>Fighter");
    verna.card.addCardTag("CR | 10");
}
