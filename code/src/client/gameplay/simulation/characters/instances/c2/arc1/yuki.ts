import {
    Activation,
    AdventurerClass,
    CreatureSize,
    CRValue,
    DamageType,
    DSkill,
    DStat,
    Hidden,
    Prof,
    ProficiencyLevel,
    Sense,
    Speed
}                                 from "../../../../../data/constants";
import {NpcID}                    from "../../../../../data/npcIndex";
import {D1, D20, D6, D8}          from "../../../../../rolling/Dice";
import {Action}                   from "../../../../action/Action";
import {wrapDamageType, wrapRoll} from "../../../../action/Wrap";
import {Character}                from "../../../Character";

export function setupYuki()
{
    const yuki = new Character(NpcID.Yuki);

    yuki.core.name = "Yuki";
    yuki.core.imgPath = "character_tokens/C2/Arc1/Yuki.png";

    // Setup D&D stats.
    yuki.dStats.initializeStats(11, 12, 14,  8, 12, 20);
    yuki.dStats.pb = Prof.get(4);

    // Setup D&D skills.
    yuki.dSKills.setSkillProficiency(DSkill.Stealth, Hidden);
    yuki.dSKills.setSkillProficiency(DSkill.Deception, Hidden);
    yuki.dSKills.setSkillProficiency(DSkill.Intimidation, Hidden);
    yuki.dSKills.setSkillProficiency(DSkill.Insight, Hidden);
    yuki.dSKills.setSkillProficiency(DSkill.Perception, Hidden);
    yuki.dSKills.finalizeSkills();

    yuki.opinions.isOpinionated = true;

    // [NpcPersonalityTag.Recluse, 2],
    // [NpcPersonalityTag.Judging, 2],
    // [NpcPersonalityTag.Distant, 2],
    // [NpcPersonalityTag["Guilt-ridden"], 1],
    // [NpcPersonalityTag.Kind, 1],
    // [NpcPersonalityTag.Quiet, 1],
    // [NpcPersonalityTag.Pessimist, 1],
    // [NpcPersonalityTag["Night owl"], 1],

    yuki.combat.addClassLevels(AdventurerClass.Paladin, 11);
    yuki.combat.addClassLevels(AdventurerClass.Warlock, 1);
    yuki.combat.bonusHP = 5;
    yuki.combat.computeHP();

    yuki.combat.setSave(DStat.Str, ProficiencyLevel.None, yuki.CHA);
    yuki.combat.setSave(DStat.Dex, ProficiencyLevel.None, yuki.CHA);
    yuki.combat.setSave(DStat.Con, ProficiencyLevel.None, yuki.CHA);
    yuki.combat.setSave(DStat.Int, ProficiencyLevel.None, yuki.CHA);
    yuki.combat.setSave(DStat.Wis, ProficiencyLevel.Prof, yuki.CHA);
    yuki.combat.setSave(DStat.Cha, ProficiencyLevel.Prof, yuki.CHA);

    yuki.combat.setSense(Sense.DevilSight, 120);
    yuki.combat.setSpeed(Speed.Walking, 30);

    yuki.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Rage of the Lost.</em></strong> Yuki as well as any undead he summons 
         within 10 ft of him gain +${yuki.CHA} to all saving throws and damage rolls.
        </p>`
    ));

    yuki.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Damnation Smite.</em></strong> [5 / LR] Yuki can increase the damage to a melee weapon attack by 
        ${wrapRoll([3, D8])} necrotic damage.
        </p>`
    ));

    yuki.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Multiattack.</em></strong> Yuki makes two DeadBlade attacks.
        </p>`
    ));

    yuki.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Deadblade.</em></strong> [Melee Weapon Attack] If the target has some protection against Shardblades, this 
        counts as a Attack with hit ${wrapRoll([[1, D20], [1, D8], [yuki.CHA + yuki.Prof + 3 - 5, D1]])} reach 10 ft., one target. 
        Damage Taken: ${wrapRoll([[2, D6], [2 * yuki.CHA + 3 + 10 + yuki.Prof + 2, D1]])} 
        ${wrapDamageType(DamageType.Slashing)} damage
        plus ${wrapRoll(D8)} ${wrapDamageType(DamageType.Necrotic)} damage. <br/>
        If the target does not have such protection, they must make a DEX save of DC ${yuki.dc(DStat.Cha) + 5 + 3 + 4}. Upon failure, they take 
        ${wrapRoll([[2, D6], [2 * yuki.CHA + 3 + yuki.Prof + 2, D1]])} ${wrapDamageType(DamageType.Slashing)} damage
        plus ${wrapRoll(D8)} ${wrapDamageType(DamageType.Necrotic)} damage and suffer an adverse effect of the Shardblade based on how badly they failed
        (DC 16 for severe effects; DC 9 for death).
        </p>`
    ));

    yuki.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Deathly Laments.</em></strong> <em> Several fallen comrades of Yuki's escaped the clutches of death when the 
        Gates of Ruin were kept open. They still keep an eye out for him. In times of great peril, he can channel his guilt of 
        failing them into a cry to call them to his aid.</em> <br/>
        As a bonus action Yuki can summon a Wraith to his aid. This wraith appears anywhere within 30 ft of him but looses 
        ${wrapRoll([[1, D8], [3, D1]])} HP at the end of its each turn as Ruin drags it back into his domain. 
        </p>`
    ));

    yuki.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Veteran of the blade.</em></strong> As a bonus action, Yuki makes another DeadBlade attack. 
        </p>`
    ));

    yuki.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>One for all.</em></strong> After a creature in melee range of Yuki attempts an attack any of 
        his wraiths, Yuki can attempt to slash with at it with his DeadBlade. If the creature has protection against ShardBlades, 
        they take an extra ${wrapRoll([4, D8])} ${wrapDamageType(DamageType.Force)} damage on a hit. If they don't, they have disadvantage 
        on the DEX save made to dodge it and take an extra ${wrapRoll([4, D8])} ${wrapDamageType(DamageType.Force)} damage and are pushed 
        10 ft back regardless of whether they succeed or not.
        </p>`
    ));

    yuki.sheet.cr = new CRValue(10);
    yuki.sheet.size = CreatureSize.Medium;
    yuki.sheet.subtitle = " Humanoid, Neutral";
    yuki.sheet.acDesc = "(Natural Dex)";
    // yuki.sheet.category = "human";



    yuki.card.setCampaignArc(2, 1);
    yuki.card.addCardTag("CR | 12");
    yuki.card.addCardTag("M27");
}