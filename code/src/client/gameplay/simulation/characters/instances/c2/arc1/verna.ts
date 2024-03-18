import {DSkill, Hidden} from "../../../../../data/constants";
import {NpcID}          from "../../../../../data/npcIndex";
import {Character}      from "../../../Character";

export function setupVerna()
{
    const c = new Character(NpcID.Verna);

    c.core.name = "Verna";
    c.core.imgPath = "character_tokens/C2/Arc1/Verna.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(18, 12, 18,  8, 10, 14);
    c.dStats.pb = 4;
    c.dStats.finalize();

    //todo
    c.dSkills.setSkillProficiency(DSkill.Athletics, Hidden);
    c.dSkills.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    // [NpcPersonalityTag.Confident, 2],
    // [NpcPersonalityTag.Abrasive, 2],
    // [NpcPersonalityTag.Stern, 2],
    // [NpcPersonalityTag.Optimist, 1],
    // [NpcPersonalityTag.Judging, 1],

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("F24");
    c.card.addCardTag("Race | Leonin");
    c.card.addCardTag("Class | <span class='verbose'>Battlemaster </span>Fighter");
    c.card.addCardTag("CR | 10");
    c.card.finalize();
}
