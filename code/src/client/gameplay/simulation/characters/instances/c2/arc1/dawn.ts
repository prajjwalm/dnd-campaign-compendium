import {Prof, ProficiencyLevel, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}                         from "../../../../../../npcs/npcIndex";
import {Character}                     from "../../../Character";

export function setupDawn()
{
    // Prepare the character object.
    const dawn = new Character(NpcId.Dawn);

    dawn.core.name = "Dawn";
    dawn.core.imgPath = "character_tokens/C2/Arc1/Dawn.png";

    // Setup D&D stats.
    dawn.dStats.initializeStats(8,  8, 16, 11, 17, 18);
    dawn.dStats.pb = Prof.get(4);

    // Setup D&D skills.
    dawn.dSKills.setSkillProficiency(Skill.AnimalHandling);
    dawn.dSKills.setSkillProficiency(Skill.Deception);
    dawn.dSKills.setSkillProficiency(Skill.History);
    dawn.dSKills.setSkillProficiency(Skill.Insight);
    dawn.dSKills.setSkillProficiency(Skill.Medicine);

    // Advantage in finding/cooking food.
    dawn.dSKills.setSkillProficiency(Skill.Survival,      ProficiencyLevel.Prof, 5);

    dawn.dSKills.setSkillProficiency(Skill.Persuasion,    ProficiencyLevel.Expert);
    dawn.dSKills.setSkillProficiency(Skill.Performance,   ProficiencyLevel.Expert);
    dawn.dSKills.setSkillProficiency(Skill.SlightOfHand,  ProficiencyLevel.Expert);
    dawn.dSKills.setSkillProficiency(Skill._ALL,          ProficiencyLevel.Half);
    dawn.dSKills.finalizeSkills();

    dawn.opinions.isOpinionated = true;

    // Card information.
    dawn.card.addCardTag("F32 (405)");
    dawn.card.addCardTag("From | Materia<span class='verbose'>(Naiyumi)</span> / Devotion");
    dawn.card.addCardTag("Race | Human");
    dawn.card.addCardTag("Campaign 2 <span class='verbose'>Arc 1</span>");

    dawn.card.summary = `
    The gentle and reserved pawn shop owner and the de facto caretaker of the small mountainous village of Po'shan. 
    Appears to hide quite a bit of pain underneath a sad smile. Was born in the hinterlands of Naiyumi around 
    1200 AR. Kept witnessing the residents of her village constantly get slaughtered again and again, and lose 
    quite a bit of the memories of their times spent together again and again.<br/>
    <div class="effect_tag">Incomplete</div>`;
}
