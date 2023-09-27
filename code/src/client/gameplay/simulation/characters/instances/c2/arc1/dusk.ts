import {
    Prof,
    ProficiencyLevel,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupDusk()
{
    // Prepare the character object.
    const dusk = new Character(NpcID.Dusk);

    dusk.core.name = "Dusk";
    dusk.core.imgPath = "character_tokens/C2/Arc1/Dusk.png";

    // Setup D&D stats.
    dusk.dStats.initializeStats(28, 18, 26, 21, 24, 30);
    dusk.dStats.pb = Prof.get(8);

    // Setup D&D skills.
    dusk.dSKills.setSkillProficiency(DSkill.Persuasion, Hidden, ProficiencyLevel.None, -5);
    dusk.dSKills.setSkillProficiency(DSkill.Deception, Hidden, ProficiencyLevel.Half);
    dusk.dSKills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Half);
    dusk.dSKills.setSkillProficiency(DSkill.Stealth, Hidden, ProficiencyLevel.Half);
    dusk.dSKills.setSkillProficiency(DSkill.History, Hidden, ProficiencyLevel.Prof);
    dusk.dSKills.setSkillProficiency(DSkill.Insight, Hidden, ProficiencyLevel.Prof);
    dusk.dSKills.setSkillProficiency(DSkill.Medicine, Hidden, ProficiencyLevel.Expert);
    dusk.dSKills.setSkillProficiency(DSkill.Performance, Hidden, ProficiencyLevel.Expert);
    dusk.dSKills.setSkillProficiency(DSkill.SlightOfHand, Hidden, ProficiencyLevel.Expert);
    dusk.dSKills.finalizeSkills();

    dusk.opinions.isOpinionated = true;

    // Card information.
    dusk.card.setCampaignArc(2, 1);
    dusk.card.addCardTag("F");
    dusk.card.addCardTag("From | Devotion");
    dusk.card.addCardTag(`Race | Titan <span class='verbose'>&times; Jade Dragon</span>`);
    dusk.card.addCardTag(`<span>Primordial | Outsider <span class='verbose'>(11<sup>th</sup> Fragment of Sui)</span></span>`);
    dusk.card.addCardTag("CR | 26");
    dusk.card.summary = () =>"???";
}
