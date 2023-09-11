import {
    Prof,
    ProficiencyLevel,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupDawn()
{
    // Prepare the character object.
    const dawn = new Character(NpcID.Dawn);

    dawn.core.name = "Dawn";
    dawn.core.imgPath = "character_tokens/C2/Arc1/Dawn.png";

    // Setup D&D stats.
    dawn.dStats.initializeStats(8,  8, 16, 11, 17, 18);
    dawn.dStats.pb = Prof.get(4);

    // Setup D&D skills.
    dawn.dSKills.setSkillProficiency(DSkill.AnimalHandling, Hidden);
    dawn.dSKills.setSkillProficiency(DSkill.Deception, Hidden);
    dawn.dSKills.setSkillProficiency(DSkill.History, Hidden);
    dawn.dSKills.setSkillProficiency(DSkill.Insight, Hidden);
    dawn.dSKills.setSkillProficiency(DSkill.Medicine, Hidden);
    dawn.dSKills.setSkillProficiency(DSkill.Survival, Hidden, ProficiencyLevel.Prof, 5);
    dawn.dSKills.setSkillProficiency(DSkill.Persuasion, Hidden, ProficiencyLevel.Expert);
    dawn.dSKills.setSkillProficiency(DSkill.Performance, Hidden, ProficiencyLevel.Expert);
    dawn.dSKills.setSkillProficiency(DSkill.SlightOfHand, Hidden, ProficiencyLevel.Expert);
    dawn.dSKills.setSkillProficiency(DSkill._ALL, Hidden, ProficiencyLevel.Half);
    dawn.dSKills.finalizeSkills();

    dawn.opinions.isOpinionated = true;

    // Card information.
    dawn.card.setCampaignArc(2, 1);
    dawn.card.addCardTag("F32 (405)");
    dawn.card.addCardTag("From | Materia<span class='verbose'>(Naiyumi)</span> / Devotion");
    dawn.card.addCardTag("Race | Human");

    dawn.card.summary = `
    The gentle and reserved pawn shop owner and the de facto caretaker of the small mountainous village of Po'shan. 
    Appears to hide quite a bit of pain underneath a sad smile. Was born in the hinterlands of Naiyumi around 
    1200 AR. Kept witnessing the residents of her village constantly get slaughtered again and again, and lose 
    quite a bit of the memories of their times spent together again and again.<br/>
    <div class="effect_tag">Incomplete</div>`;
}
