import {D1, D4, D6, D8}                          from "../../../../../../homebrew/common/diceConstants";
import {
    Activation, AdventurerClass, Condition, CreatureSize, CRValue, DamageType,
    DStat, Prof, ProficiencyLevel, Sense, Skill, Speed
}                                                from "../../../../../../homebrew/definitions/constants";
import {
    NpcId
}                                                from "../../../../../../npcs/npcIndex";
import {
    Action
}                                                from "../../../../action/Action";
import {wrapCondition, wrapDamageType, wrapRoll} from "../../../../action/Wrap";
import {Character}                               from "../../../Character";

export function setupJaye()
{
    // Prepare the character object.
    const jaye = new Character(NpcId.Jaye);

    jaye.core.name = "Jaye";
    jaye.core.imgPath = "character_tokens/C2/Arc1/Jaye.png";

    // Setup D&D stats.
    jaye.dStats.initializeStats(16, 18, 16, 8, 12, 8);
    jaye.dStats.pb = Prof.get(4);

    // Setup D&D skills.
    jaye.dSKills.setSkillProficiency(Skill.Acrobatics);
    jaye.dSKills.setSkillProficiency(Skill.Athletics);
    jaye.dSKills.setSkillProficiency(Skill.Nature);
    jaye.dSKills.setSkillProficiency(Skill.Intimidation);
    jaye.dSKills.setSkillProficiency(Skill.Stealth, ProficiencyLevel.Expert);
    jaye.dSKills.setSkillProficiency(Skill.SlightOfHand,
                                     ProficiencyLevel.Expert);
    jaye.dSKills.setSkillProficiency(Skill.Survival, ProficiencyLevel.Expert);
    jaye.dSKills.finalizeSkills();

    // Setup Opinions.
    jaye.opinions.isOpinionated = true;

    // Setup card tags.
    jaye.card.addCardTag("M26");
    jaye.card.addCardTag(`Race | Ursine <span class='verbose'>(Polar)</span>`);
    jaye.card.addCardTag("CR | 5");
    jaye.card.addCardTag("Campaign 2 <span class='verbose'>Arc 1</span>");
    jaye.card.summary = "???";

    jaye.combat.addClassLevels(AdventurerClass.Rogue, 5);
    jaye.combat.bonusHP = 5; // Medium sized creature.

    jaye.combat.computeHP();

    // todo: link these two to class
    jaye.combat.setSave(DStat.Int);
    jaye.combat.setSave(DStat.Dex);
    jaye.combat.setSpeed(Speed.Walking, 30);
    jaye.combat.setSense(Sense.Darkvision, 60);
    jaye.combat.setRes(DamageType.Cold, 50);

    jaye.combat.addAction(new Action(
        Activation.Special, `
        <p><strong><em>Psionic Knife.</em></strong> Though he never learnt how, Jaye seems to have formed a 
        cognitive bond with his favorite cooking knife. Weapon attacks with it deal additional psychic damage
        and the knife can cut through non-sentient matter rather easily if Jaye wills so. Also, he can throw the
        knife point first and mentally command it to return to his hand (also point first if possible). The return
        of the knife obeys the conservation of momentum and seems to carry great inertia (much more than its 
        momentum). It would take a DC 27 Str check or 400 kgs wt. equivalent of force to keep the knife and Jaye
        separate </p>`));

    jaye.combat.addAction(new Action(
        Activation.Special, `
        <p><strong><em>Expert Hands.</em></strong> Jaye is extremely skilled in handling his favorite cooking knife.
        He performs attacks with it with expertise and can use it to parry minor blows. Also, if his offhand is 
        free, he can transfer the knife between his main hand and his offhand and make an extra attack as a bonus 
        action. If his primary attack that turn was a feint, the secondary attack is at advantage and has a 
        ${wrapRoll(D8)} superiority dice added to the to-hit roll.</p>`));

    jaye.combat.addAction(new Action(
        Activation.Special, `
        <p><strong><em>Predatory Hyperfocus.</em></strong> Everytime he deals damage, Jaye must make a DC 
        ${jaye.dc(DStat.Con)} Wis save. On failure, Jaye's beastial instincts of an apex predator kick in, and he 
        enters a vampiric hyperfocused state. While in that state, each of Jaye's attacks heals himself or a 
        creature of his choice within 5ft by half the damage dealt. Also, anyone hit by his attacks must make a DC
        ${jaye.dc(DStat.Con)} Cha save or be ${wrapCondition(Condition.Silenced)} until the end of their next turn.
        The downside of this is that in this state, at the start of his turn one creature within 5ft ft of himself
        takes ${wrapRoll([10, D1])} ${wrapDamageType(DamageType.Psychic)} damage. If no creature is within that 
        range, Jaye himself takes that damage.</p>`));

    jaye.combat.addAction(new Action(
        Activation.Special, `
        <p><strong><em>Sneak Attack.</em></strong> Once per turn, Jaye can boost a finesse/ranged weapon attack by 
        ${wrapRoll([3, D6])} as per regular sneak attack rules.</p>`));

    jaye.combat.addAction(new Action(
        Activation.Action, `
        <p><strong><em>Cooking Knife.</em></strong> Melee Weapon Attack: ${wrapRoll(jaye.DEX + jaye.Expertise)}, 
        reach 5 ft. (or a 60ft Ranged throw), one target. Hit: ${wrapRoll([[1, D6], [jaye.DEX, D1]])} 
        ${wrapDamageType(DamageType.Slashing)} (slash) or ${wrapDamageType( DamageType.Piercing)} damage (stab) 
        plus ${wrapRoll(D6)} ${wrapDamageType(DamageType.Psychic)} damage. Jaye can choose to feint instead of
        attempting to hit with this attack.</p>`));

    jaye.combat.addAction(new Action(
        Activation.BonusAction, `
            <p><strong><em>Cooking Knife.</em> (Offhand)</strong> Melee Weapon Attack: ${wrapRoll(jaye.DEX + jaye.Expertise)}, 
            reach 5 ft. (or a 60ft Ranged throw), one target. Hit: ${wrapRoll([[1, D4], [jaye.DEX, D1]])} 
            ${wrapDamageType(DamageType.Slashing)} (slash) or ${wrapDamageType(DamageType.Piercing)} damage (stab) 
            plus ${wrapRoll(D4)} ${wrapDamageType(DamageType.Psychic)} damage.</p>`));

    jaye.combat.addAction(new Action(
        Activation.BonusAction, `
            <p><strong><em>Cunning Action.</em></strong> Can use a bonus action to take the Dash, Disengage, or Hide
            action.</p>`));

    jaye.combat.addAction(new Action(
        Activation.Reaction, `
            <p><strong><em>Parry.</em></strong> If he carries a knife, Jaye can add a +2 to his AC against an attack 
            that would hit him and cause it to miss. The AC increase is a +3 instead if the knife is his favorite 
            cooking knife</p>`));

    jaye.combat.addAction(new Action(
        Activation.Reaction, `
            <p><strong><em>Command Return.</em></strong> At will, Jaye can command his favorite cooking knife to return 
            to his hands if it is within 240 ft of him. It deals the damage equivalent of a main-hand stab to all 
            creatures in its path and can pull objects along with it. If possible, sneak attack may only be applied 
            to first creature to be hit.</p>`));

    jaye.sheet.cr = new CRValue(5);
    jaye.sheet.size = CreatureSize.Medium;
    jaye.sheet.subtitle = " Humanoid (Ursine | Polar), Neutral Good";
    jaye.sheet.acDesc = "(Natural Dex)";
    jaye.sheet.category = "human";
}
