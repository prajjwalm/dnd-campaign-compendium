import {Prof, ProficiencyLevel, Skill} from "../../../../../../homebrew/definitions/constants";
import {NpcId}                         from "../../../../../../npcs/npcIndex";
import {Character}                     from "../../../Character";

export function setupHina()
{
    // Prepare the character object.
    const hina = new Character(NpcId.Hina);

    // Setup core info.
    hina.core.name = "Hina";
    hina.core.imgPath = "character_tokens/C2/Arc1/Hina.png";

    // Setup D&D stats.
    hina.dStats.initializeStats(13, 21, 24, 17, 8, 20);
    hina.dStats.pb = Prof.get(6);

    // Setup D&D skills.
    hina.dSKills.setSkillProficiency(Skill.Deception);
    hina.dSKills.setSkillProficiency(Skill.Intimidation);
    hina.dSKills.setSkillProficiency(Skill.Investigation);
    hina.dSKills.setSkillProficiency(Skill.Medicine);
    hina.dSKills.setSkillProficiency(Skill.Nature);

    hina.dSKills.setSkillProficiency(Skill.Acrobatics, ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(Skill.History,    ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(Skill.Perception, ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(Skill.Stealth,    ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(Skill.Survival,   ProficiencyLevel.Expert);
    hina.dSKills.finalizeSkills();

    // Can have opinions.
    hina.opinions.isOpinionated = true;

    // Card information.
    hina.card.addCardTag("F14");
    hina.card.addCardTag("Campaign 2 <span class='verbose'>Arc 1</span>");
    hina.card.summary = "???";
}
