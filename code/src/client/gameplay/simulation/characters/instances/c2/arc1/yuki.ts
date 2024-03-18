import {Activation, AdventurerClass, CreatureSize, DamageType, DSkill, DStat, Hidden, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                        from "../../../../../data/npcIndex";
import {D1, D20, D6, D8}                                                                                              from "../../../../../rolling/Dice";
import {Action}                                                                                                       from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                                     from "../../../../action/Wrap";
import {Character}                                                                                                    from "../../../Character";

export function setupYuki()
{
    const c = new Character(NpcID.Yuki);

    c.core.name = "Yuki";
    c.core.imgPath = "character_tokens/C2/Arc1/Yuki.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(11, 12, 14,  8, 12, 20);
    c.dStats.pb = 5;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.Stealth, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Deception, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Intimidation, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Insight, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Perception, Hidden);
    c.dSkills.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    // [NpcPersonalityTag.Recluse, 2],
    // [NpcPersonalityTag.Judging, 2],
    // [NpcPersonalityTag.Distant, 2],
    // [NpcPersonalityTag["Guilt-ridden"], 1],
    // [NpcPersonalityTag.Kind, 1],
    // [NpcPersonalityTag.Quiet, 1],
    // [NpcPersonalityTag.Pessimist, 1],
    // [NpcPersonalityTag["Night owl"], 1],

    c.combat.addClassLevels(AdventurerClass.Paladin, 11);
    c.combat.addClassLevels(AdventurerClass.Warlock, 1);
    c.combat.bonusHP = 5;
    c.combat.computeHP();

    c.combat.setSave(DStat.Str, ProficiencyLevel.None, c.CHA);
    c.combat.setSave(DStat.Dex, ProficiencyLevel.None, c.CHA);
    c.combat.setSave(DStat.Con, ProficiencyLevel.None, c.CHA);
    c.combat.setSave(DStat.Int, ProficiencyLevel.None, c.CHA);
    c.combat.setSave(DStat.Wis, ProficiencyLevel.Prof, c.CHA);
    c.combat.setSave(DStat.Cha, ProficiencyLevel.Prof, c.CHA);

    c.combat.setSense(Sense.DevilSight, 120);
    c.combat.setSpeed(Speed.Walking, 30);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Rage of the Lost.</em></strong> Yuki as well as any undead he summons 
         within 10 ft of him gain +${c.CHA} to all saving throws and damage rolls.
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Damnation Smite.</em></strong> [5 / LR] Yuki can increase the damage to a melee weapon attack by 
        ${wrapRoll([3, D8])} necrotic damage.
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Spellcasting.</em></strong> Yuki has access to Oathbreaker spells of upto the second level.
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Multiattack.</em></strong> Yuki makes two DeadBlade attacks.
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Deadblade.</em></strong> [Melee Weapon Attack] If the target has some protection against Shardblades, this 
        counts as a Attack with hit ${wrapRoll([[1, D20], [1, D8], [c.CHA + c.Prof + 3 - 5, D1]])} reach 10 ft., one target. 
        Damage Taken: ${wrapRoll([[2, D6], [2 * c.CHA + 3 + 10 + c.Prof + 2, D1]])} 
        ${wrapDamageType(DamageType.Slashing)} damage
        plus ${wrapRoll(D8)} ${wrapDamageType(DamageType.Necrotic)} damage. <br/>
        If the target does not have such protection, they must make a DEX save of DC ${c.dc(DStat.Cha) + 5 + 3 + 4}. Upon failure, they take 
        ${wrapRoll([[2, D6], [2 * c.CHA + 3 + c.Prof + 2, D1]])} ${wrapDamageType(DamageType.Slashing)} damage
        plus ${wrapRoll(D8)} ${wrapDamageType(DamageType.Necrotic)} damage and suffer an adverse effect of the Shardblade based on how badly they failed
        (DC 16 for severe effects).
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Deathly Laments.</em></strong> <em> Several fallen comrades of Yuki's escaped the clutches of death when the 
        Gates of Ruin were kept open. They still keep an eye out for him. In times of great peril, his soul cries out to call them
        to his aid.</em> <br/>
        As a bonus action Yuki can summon a Wraith to his aid. This wraith appears anywhere within 30 ft of him but looses 
        ${wrapRoll([[1, D8], [3, D1]])} HP at the end of each of its turns as Ruin drags it back into His domain. 
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Veteran of the blade.</em></strong> As a bonus action, Yuki makes another DeadBlade attack. 
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>One for all.</em></strong> After a creature in melee range of Yuki attempts an attack any of 
        his wraiths, Yuki can attempt to slash with at it with his DeadBlade. If the creature has protection against ShardBlades, 
        they take an extra ${wrapRoll([4, D8])} ${wrapDamageType(DamageType.Force)} damage on a hit. If they don't, they have disadvantage 
        on the DEX save made to dodge it and take an extra ${wrapRoll([4, D8])} ${wrapDamageType(DamageType.Force)} damage and are pushed 
        10 ft back regardless of whether they succeed or not.
        </p>`
    ));

    c.combat.cr = 12
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Humanoid, Neutral";
    c.sheet.altName = "Yuki (Oathbreaker)";
    c.sheet.acDesc = "(Natural Dex)";
    c.sheet.category = "human";
    c.sheet.finalize();


    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("CR | 12");
    c.card.addCardTag("M27");
    c.card.finalize();
}