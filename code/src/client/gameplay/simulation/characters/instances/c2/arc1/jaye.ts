import {Activation, AdventurerClass, Condition, CreatureSize, CSkill, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                                                                   from "../../../../../data/npcIndex";
import {D1, D4, D6, D8}                                                                                                          from "../../../../../rolling/Dice";
import {Action}                                                                                                                  from "../../../../action/Action";
import {wrapCondition, wrapDamageType, wrapRoll}                                                                                 from "../../../../action/Wrap";
import {Character}                                                                                                               from "../../../Character";

export function setupJaye()
{
    // Prepare the character object.
    const c = new Character(NpcId.Jaye);

    c.core.name = "Jaye";
    c.core.imgPath = "character_tokens/C2/Arc1/Jaye.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(16, 18, 16, 8, 12, 8);
    c.dStats.pb = 4;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.Acrobatics,   );
    c.dSkills.setSkillProficiency(DSkill.Athletics,    );
    c.dSkills.setSkillProficiency(DSkill.Nature,       );
    c.dSkills.setSkillProficiency(DSkill.Intimidation, );
    c.dSkills.setSkillProficiency(DSkill.Stealth, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.SlightOfHand, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Survival,     ProficiencyLevel.Expert);
    c.dSkills.finalize();

    // Setup Opinions.
    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    // Setup card tags.
    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("M26");
    c.card.addCardTag(`Race | Ursine <span class='verbose'>(Polar)</span>`);
    c.card.addCardTag("CR | 5");
    c.card.summary = () =>"???";
    c.card.finalize();

    c.cSkills.setSkillValues([
        [CSkill.Accounting,              5,  ],
        [CSkill.Anthropology,            0,  ],
        [CSkill.Appraise,                0,  ],
        [CSkill.Archaeology,             0,  ],
        [CSkill.Artillery,               0,  ],
        [CSkill.Charm,                  15,  ],
        [CSkill.ComputerUse,             5,  ],
        [CSkill.Demolitions,             0,  ],
        [CSkill.Disguise,                5,  ],
        [CSkill.Diving,                  0,  ],
        [CSkill.DriveAuto,              20,  ],
        [CSkill.ElectricalRepair,       10,  ],
        [CSkill.Electronics,             0,  ],
        [CSkill.FirstAid,               30,  ],
        [CSkill.Hypnosis,                0,  ],
        [CSkill.Law,                     5,  ],
        [CSkill.LibraryUse,             20,  ],
        [CSkill.Locksmith,               0,  ],
        [CSkill.MechanicalRepair,       10,  ],
        [CSkill.ModernMedicine, 0, ],
        [CSkill.NaturalWorld,           85,  ],
        [CSkill.Navigate,               10,  ],
        [CSkill.Occult,                  5,  ],
        [CSkill.OperateHeavyMachinery,   0,  ],
        [CSkill.Psychoanalysis,          0,  ],
        [CSkill.ReadLips,                0,  ],
        [CSkill.Ride,                   15,  ],
        [CSkill.Throw,                  80,  ],
        [CSkill.Acting,                  5,  ],
        [CSkill.Calligraphy,             0,  ],
        [CSkill.Carpentry,              10,  ],
        [CSkill.Cooking,                95,  ],
        [CSkill.Dancing,                 5,  ],
        [CSkill.FineArt,                 5,  ],
        [CSkill.Forgery,                 0,  ],
        [CSkill.Writing,                 5,  ],
        [CSkill.Singing,                 5,  ],
        [CSkill.Painting,                5,  ],
        [CSkill.Photography,             0,  ],
        [CSkill.Sculpting,               0,  ],
        [CSkill.Chainsaw,               10,  ],
        [CSkill.HeavyWeapons,           10,  ],
        [CSkill.Flamethrower,           10,  ],
        [CSkill.MachineGun,             10,  ],
        [CSkill.SubmachineGun,          10,  ],
        [CSkill.Aircraft,                0,  ],
        [CSkill.Boat,                    5,  ],
        [CSkill.Astronomy,               0,  ],
        [CSkill.Biology,                30,  ],
        [CSkill.Botany,                 20,  ],
    ]);
    c.cSkills.finalize();

    c.combat.addClassLevels(AdventurerClass.Rogue, 5);
    c.combat.bonusHP = 5; // Medium sized creature.

    c.combat.computeHP();

    // todo: link these two to class
    c.combat.setSave(DStat.Int);
    c.combat.setSave(DStat.Dex);
    c.combat.setSpeed(Speed.Walking, 30);
    c.combat.setSense(Sense.Darkvision, 60);
    c.combat.setRes(DamageType.Cold, 50);

    c.combat.addAction(new Action(
        Activation.Special, `
        <p><strong><em>Psionic Knife.</em></strong> Though he never learnt how, Jaye seems to have formed a 
        cognitive bond with his favorite cooking knife. Weapon attacks with it deal additional psychic damage
        and the knife can cut through non-sentient matter rather easily if Jaye wills so. Also, he can throw the
        knife point first and mentally command it to return to his hand (also point first if possible). The return
        of the knife obeys the conservation of momentum and seems to carry great inertia (much more than its 
        momentum). It would take a DC 27 Str check or 400 kgs wt. equivalent of force to keep the knife and Jaye
        separate </p>`));

    c.combat.addAction(new Action(
        Activation.Special, `
        <p><strong><em>Expert Hands.</em></strong> Jaye is extremely skilled in handling his favorite cooking knife.
        He performs attacks with it with expertise and can use it to parry minor blows. Also, if his offhand is 
        free, he can transfer the knife between his main hand and his offhand and make an extra attack as a bonus 
        action. If his primary attack that turn was a feint, the secondary attack is at advantage and has a 
        ${wrapRoll(D8)} superiority dice added to the to-hit roll.</p>`));

    c.combat.addAction(new Action(
        Activation.Special, `
        <p><strong><em>Predatory Hyperfocus.</em></strong> Everytime he deals damage, Jaye must make a DC 
        ${c.dc(DStat.Con)} Wis save. On failure, Jaye's beastial instincts of an apex predator kick in, and he 
        enters a vampiric hyperfocused state. While in that state, each of Jaye's attacks heals himself or a 
        creature of his choice within 5ft by half the damage dealt. Also, anyone hit by his attacks must make a DC
        ${c.dc(DStat.Con)} Cha save or be ${wrapCondition(Condition.Silenced)} until the end of their next turn.
        The downside of this is that in this state, at the start of his turn one creature within 5ft ft of himself
        takes ${wrapRoll([10, D1])} ${wrapDamageType(DamageType.Psychic)} damage. If no creature is within that 
        range, Jaye himself takes that damage.</p>`));

    c.combat.addAction(new Action(
        Activation.Special, `
        <p><strong><em>Sneak Attack.</em></strong> Once per turn, Jaye can boost a finesse/ranged weapon attack by 
        ${wrapRoll([3, D6])} as per regular sneak attack rules.</p>`));

    c.combat.addAction(new Action(
        Activation.Action, `
        <p><strong><em>Cooking Knife.</em></strong> Melee Weapon Attack: ${wrapRoll(c.DEX + c.Expertise)}, 
        reach 5 ft. (or a 60ft Ranged throw), one target. Hit: ${wrapRoll([[1, D6], [c.DEX, D1]])} 
        ${wrapDamageType(DamageType.Slashing)} (slash) or ${wrapDamageType( DamageType.Piercing)} damage (stab) 
        plus ${wrapRoll(D6)} ${wrapDamageType(DamageType.Psychic)} damage. Jaye can choose to feint instead of
        attempting to hit with this attack.</p>`));

    c.combat.addAction(new Action(
        Activation.BonusAction, `
            <p><strong><em>Cooking Knife.</em> (Offhand)</strong> Melee Weapon Attack: ${wrapRoll(c.DEX + c.Expertise)}, 
            reach 5 ft. (or a 60ft Ranged throw), one target. Hit: ${wrapRoll([[1, D4], [c.DEX, D1]])} 
            ${wrapDamageType(DamageType.Slashing)} (slash) or ${wrapDamageType(DamageType.Piercing)} damage (stab) 
            plus ${wrapRoll(D4)} ${wrapDamageType(DamageType.Psychic)} damage.</p>`));

    c.combat.addAction(new Action(
        Activation.BonusAction, `
            <p><strong><em>Cunning Action.</em></strong> Can use a bonus action to take the Dash, Disengage, or Hide
            action.</p>`));

    c.combat.addAction(new Action(
        Activation.Reaction, `
            <p><strong><em>Parry.</em></strong> If he carries a knife, Jaye can add a +2 to his AC against an attack 
            that would hit him and cause it to miss. The AC increase is a +3 instead if the knife is his favorite 
            cooking knife</p>`));

    c.combat.addAction(new Action(
        Activation.Reaction, `
            <p><strong><em>Command Return.</em></strong> At will, Jaye can command his favorite cooking knife to return 
            to his hands if it is within 240 ft of him. It deals the damage equivalent of a main-hand stab to all 
            creatures in its path and can pull objects along with it. If possible, sneak attack may only be applied 
            to first creature to be hit.</p>`));

    c.combat.cr = 5
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Humanoid (Ursine | Polar), Neutral Good";
    c.sheet.acDesc = "(Natural Dex)";
    c.sheet.category = "human";
    c.sheet.finalize();
}
