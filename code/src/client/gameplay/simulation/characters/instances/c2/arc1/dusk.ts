import {DSkill, ProficiencyLevel} from "../../../../../data/constants";
import {NpcId}                    from "../../../../../data/npcIndex";
import {Character}                from "../../../Character";

export function setupDusk()
{
    // Prepare the character object.
    const c = new Character(NpcId.Dusk);

    c.core.name = "Dusk";
    c.core.imgPath = "character_tokens/C2/Arc1/Dusk.png";
    c.core.isActive = false;
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(28, 18, 26, 21, 24, 30);
    c.dStats.pb = 8;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.Persuasion, ProficiencyLevel.None, -5);
    c.dSkills.setSkillProficiency(DSkill.Deception, ProficiencyLevel.Half);
    c.dSkills.setSkillProficiency(DSkill.Perception, ProficiencyLevel.Half);
    c.dSkills.setSkillProficiency(DSkill.Stealth, ProficiencyLevel.Half);
    c.dSkills.setSkillProficiency(DSkill.History, ProficiencyLevel.Prof);
    c.dSkills.setSkillProficiency(DSkill.Insight, ProficiencyLevel.Prof);
    c.dSkills.setSkillProficiency(DSkill.Medicine, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Performance, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.SlightOfHand, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    // Card information.
    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("Obliterated");
    c.card.addCardTag("F");
    c.card.addCardTag("From | Devotion");
    c.card.addCardTag(`Race | Titan <span class='verbose'>&times; Jade Dragon</span>`);
    c.card.addCardTag(`<span>Primordial | Outsider <span class='verbose'>(11<sup>th</sup> Fragment of Sui)</span></span>`);
    c.card.addCardTag("CR | 26");
    c.card.summary = () =>"???";
    c.card.finalize();
}
