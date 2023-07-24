import {Card}                          from "../../../../../../data/cards/card";
import {Prof, ProficiencyLevel, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}                         from "../../../../../../npcs/npcIndex";
import {Character}                     from "../../../Character";

export function setupDusk()
{
    // Prepare the character object.
    const dusk = new Character(NpcId.Dusk);

    dusk.core.name = "Dusk";
    dusk.core.imgPath = "character_tokens/C2/Arc1/Dusk.png";

    // Setup D&D stats.
    dusk.dStats.initializeStats(28, 18, 26, 21, 24, 30);
    dusk.dStats.pb = Prof.get(8);

    // Setup D&D skills.
    dusk.dSKills.setSkillProficiency(Skill.Persuasion,    ProficiencyLevel.None, -5);
    dusk.dSKills.setSkillProficiency(Skill.Deception,     ProficiencyLevel.Half);
    dusk.dSKills.setSkillProficiency(Skill.Perception,    ProficiencyLevel.Half);
    dusk.dSKills.setSkillProficiency(Skill.Stealth,       ProficiencyLevel.Half);
    dusk.dSKills.setSkillProficiency(Skill.History,       ProficiencyLevel.Prof);
    dusk.dSKills.setSkillProficiency(Skill.Insight,       ProficiencyLevel.Prof);
    dusk.dSKills.setSkillProficiency(Skill.Medicine,      ProficiencyLevel.Expert);
    dusk.dSKills.setSkillProficiency(Skill.Performance,   ProficiencyLevel.Expert);
    dusk.dSKills.setSkillProficiency(Skill.SlightOfHand,  ProficiencyLevel.Expert);
    dusk.dSKills.finalizeSkills();

    dusk.opinions.isOpinionated = true;

    // Card information.
    dusk.card.addCardTag("F");
    dusk.card.addCardTag("From | Devotion");
    dusk.card.addCardTag(`Race | Titan <span class='verbose'>&times; Jade Dragon</span>`);
    dusk.card.addCardTag(`<span>Primordial | Outsider <span class='verbose'>(11<sup>th</sup> Fragment of Sui)</span></span>`);
    dusk.card.addCardTag("CR | 26");
    dusk.card.addCardTag("Campaign 2 <span class='verbose'>Arc 1</span>");
    dusk.card.summary = "???";
}
