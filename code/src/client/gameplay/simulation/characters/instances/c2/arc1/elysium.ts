import {Activation, AdventurerClass, CreatureSize, CSkill, DamageType, DSkill, DStat, Era, Hidden, ProficiencyLevel, Speed, Vague} from "../../../../../data/constants";
import {NpcID}                                                                                                                     from "../../../../../data/npcIndex";
import {D1, D4, D6}                                                                                                                from "../../../../../rolling/Dice";
import {Action}                                                                                                                    from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                                                  from "../../../../action/Wrap";
import {Character}                                                                                                                 from "../../../Character";
import {Morale}                                                                                                                    from "../../../Morale";

export function setupElysium()
{
    const c = new Character(NpcID.Elysium);

    c.core.name = "Elysium";
    c.core.imgPath = "character_tokens/C2/Arc1/Elysium.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 1);

    c.card.addCardTag("M106 (33)");
    c.card.addCardTag("CR 9");
    c.card.addCardTag("Elite Messenger");
    c.card.addCardTag("Honorary Saint");
    c.card.addCardTag("Class | Artificer &times; Rogue");
    c.card.addCardTag("Race | Human");
    c.card.primaryImageTitle = "Casual Topographer";
    c.card.addAlternateImage("Spec Ops", "character_tokens/C2/Arc1/ElysiumElite.png");
    c.card.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats( 8, 18, 10, 19, 18, 10);
    c.dStats.pb = 5;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.Insight, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Investigation, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Medicine, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Stealth, Hidden);
    c.dSkills.setSkillProficiency(DSkill.SlightOfHand, Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Expert, 5);
    c.dSkills.finalize();

    c.cSkills.setSkillValues([
        [CSkill.Accounting,              5,  Vague],
        [CSkill.Anthropology,            0,  Vague],
        [CSkill.Appraise,                0,  Vague],
        [CSkill.Archaeology,             0,  Vague],
        [CSkill.Artillery,               0,  Vague],
        [CSkill.Charm,                  15,  Vague],
        [CSkill.ComputerUse,            65,  Vague],
        [CSkill.Demolitions,             0,  Vague],
        [CSkill.Disguise,                5,  Vague],
        [CSkill.Diving,                  0,  Vague],
        [CSkill.DriveAuto,              80,  Vague],
        [CSkill.ElectricalRepair,       60,  Vague],
        [CSkill.Electronics,            50,  Vague],
        [CSkill.FirstAid,               30,  Vague],
        [CSkill.Hypnosis,                0,  Vague],
        [CSkill.Law,                    60,  Vague],
        [CSkill.LibraryUse,             20,  Vague],
        [CSkill.Locksmith,               0,  Vague],
        [CSkill.MechanicalRepair,       10,  Vague],
        [CSkill.ModernMedicine,          0,  Vague],
        [CSkill.NaturalWorld,           10,  Vague],
        [CSkill.Navigate,               80,  Vague],
        [CSkill.Occult,                  5,  Vague],
        [CSkill.OperateHeavyMachinery,   0,  Vague],
        [CSkill.Psychoanalysis,          0,  Vague],
        [CSkill.ReadLips,                0,  Vague],
        [CSkill.Ride,                   15,  Vague],
        [CSkill.Throw,                  20,  Vague],
        [CSkill.Acting,                  5,  Vague],
        [CSkill.Calligraphy,             0,  Vague],
        [CSkill.Carpentry,              10,  Vague],
        [CSkill.Cooking,                20,  Vague],
        [CSkill.Dancing,                 5,  Vague],
        [CSkill.FineArt,                 5,  Vague],
        [CSkill.Forgery,                 0,  Vague],
        [CSkill.Writing,                 5,  Vague],
        [CSkill.Singing,                 5,  Vague],
        [CSkill.Painting,                5,  Vague],
        [CSkill.Photography,             0,  Vague],
        [CSkill.Sculpting,               0,  Vague],
        [CSkill.Chainsaw,               10,  Vague],
        [CSkill.HeavyWeapons,           10,  Vague],
        [CSkill.Flamethrower,           10,  Vague],
        [CSkill.MachineGun,             10,  Vague],
        [CSkill.SubmachineGun,          10,  Vague],
        [CSkill.Aircraft,               95,  Vague],
        [CSkill.Boat,                   50,  Vague],
        [CSkill.Astronomy,               0,  Vague],
        [CSkill.Biology,                 0,  Vague],
        [CSkill.Botany,                  0,  Vague],
        [CSkill.Chemistry,               0,  Vague],
        [CSkill.Cryptography,            0,  Vague],
        [CSkill.Engineering,             0,  Vague],
        [CSkill.Forensics,               0,  Vague],
        [CSkill.Geology,                30,  Vague],
        [CSkill.Mathematics,            50,  Vague],
        [CSkill.Meteorology,            30,  Vague],
        [CSkill.Pharmacy,                0,  Vague],
        [CSkill.Physics,                30,  Vague],
        [CSkill.Zoology,                 0,  Vague],
    ]);
    c.cSkills.finalize();

    c.operator.morale = Morale.Average;
    c.operator.fatigue = 10;
    c.operator.ratings = {
        damage  : "C-",
        control : "SS",
        survival: "D",
        pro     : "S",
    };
    c.operator.era = Era.Information;
    c.operator.professions = ["Messenger / Logistics", "Messenger"];

    c.operator.addNotableStuff("Major Damage Type", "Slashing / Piercing");
    c.operator.addNotableStuff("Strong against", "Nothing really (by himself)");
    c.operator.addNotableStuff("Combat Experience", "B Grade (5 years / in logistics)");
    c.operator.addNotableStuff("Challenge Rating", "9");

    c.operator.setChemistryWith(NpcID.Ezell, 31,
                                      "(Boyfriend) During the course of his latest assignment in assisting the Saints, " +
                                      "the two have been through a lot of perilous missions together - including some " +
                                      "outside of professional scope (like finding a cure for Cecilia).");
    c.operator.setChemistryWith(NpcID.Jordi, 17,
                                      "Though Jordi doesn't remember, Elysium knows him from a time long ago...");
    c.operator.setChemistryWith(NpcID.Dawn, 14,
                                      "Was aware that she was in touch with the entity 'guarding' the village. He could see " +
                                      "her burying sadness and strongly felt she was a good person, despite her secrets. " +
                                      "His respect for her increased significantly after recent events.");
    c.operator.setChemistryWith(NpcID.Hina, 13,
                                      "Feels a strong sense of sympathy and a slight paternal instinct for her. Understands " +
                                      "her situation and periodically smuggles stuff she needs. Also spoils her rotten.");
    c.operator.setChemistryWith(NpcID.Cecelia, 11,
                                      "Has known her from almost the day she was born. Is quite empathetic to her situation " +
                                      "and feels she is too good a person to die so young. Also Ezell's concern for her has " +
                                      "made him quite invested in her fate.");
    c.operator.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.combat.setSpeed(Speed.Walking, 30);

    c.combat.setSave(DStat.Int);
    c.combat.setSave(DStat.Wis);
    c.combat.setSave(DStat.Cha);

    c.combat.addClassLevels(AdventurerClass.Rogue, 4);
    c.combat.addClassLevels(AdventurerClass.Artificer, 5);
    c.combat.computeHP();

    c.combat.setRes(DamageType.Piercing, 50);

    c.combat.addAction(new Action(
        Activation.Special, `
        <p><strong><em>FlagBearer Artificer.</em></strong> Being only a novice fighter, 
        Elysium could probably be defeated by a common highway bandit. Yet he
        is a master of tactics and logistics, and enables highly specialized 
        squads to take on apparently insurmountable odds. He ensures operations 
        proceed smoothly by acquiring intel, ensuring logistic chains and  
        stable comms before the fighting starts and buffing his allies and 
        debuffing his foes on the battlefield.<br/>
        To assist in the latter, he's built a device which employs information-era 
        hardware to enable manipulations of investiture. This grants him access 
        to various <b>[FlagBearer]</b> abilities. They work as follows -</p>
        <ul>
            <li>Upto one of those may only be active at a time.</li>        
            <li>If any ability is active, Elysium may not move or take any 
                actions or reactions.</li>        
            <li>Each ability may be kept active for any duration between 6 to 60s.
                But once disabled, there is a cooldown proportional to the time 
                they were active during which he may not use 
                any FlagBearer abilities.</li>
            <li>The abilities - once switched on - do not require him to concentrate,
                or even remain alive, but would stop if the flag were moved. 
                While he has designed the flag to maintain inertia, falling 
                unconscious from physical damage all but guarantees the flag would 
                deactivate.</li>
            <li>He may overdrive any of the abilities, but after that his flag 
                becomes unusable for 24 hours, and he gains 1 level of exhaustion.</li>
        </ul>`));

    c.combat.addAction(new Action(
        Activation.Special, `
        <p><strong><em>Sneak Attack.</em></strong> Once per turn, Elysium can boost a finesse/ranged weapon attack by 
        ${wrapRoll([2, D6])} as per sneak attack rules.</p>`));

    c.combat.addAction(new Action(
        Activation.BonusAction, `
            <p><strong><em>Cunning Action.</em></strong> Can use a bonus action to take the Dash, Disengage, or Hide
            action.</p>`));

    c.combat.addAction(new Action(
        Activation.Action, `
        <p><strong><em>Dagger.</em></strong> Melee Weapon Attack: ${wrapRoll(c.DEX + c.SemiProf)}
        reach 5 ft. (or a 60ft Ranged throw), one target. Hit: ${wrapRoll([[1, D4], [c.DEX, D1]])} 
        ${wrapDamageType(DamageType.Slashing)} damage.</p>`));

    c.combat.addAction(new Action(
        Activation.Action, `
        <p><strong><em>[FlagBearer] Monitor.</em> (Cooldown 1:2)</strong> Elysium grants
        Haste to upto 8 allies within 60 ft and locks on to upto 4 enemies in 
        that range. Locked enemies suffer from Slow and lose invisibility. Attacks 
        with ranged weapons gain a +${c.Prof} to hit.<br/>
        <em>Overdrive.</em> All allies within 1 mile gain Haste and upto 6 enemies 
        within 120 ft may be locked on.
        </p>`));

    c.combat.addAction(new Action(
        Activation.Action, `
        <p><strong><em>[FlagBearer] Support.</em> (Cooldown 1:3)</strong> At the end of 
        each of his turns, all allies within 30 ft of Elysium, except himself, 
        regain some investiture - for example, this might be either 20 HP or any
        one of their ability slots or a spell slot of upto 2<sup>nd</sup> level.<br/>
        <em>Overdrive.</em> The flag restores 30 HP or a 3<sup>rd</sup> level 
        slot or equivalent to all allies within 120 ft of Elysium.
        </p>`));

    c.combat.addAction(new Action(
        Activation.Action, `
        <p><strong><em>[FlagBearer] Maneuver.</em> (Cooldown 1:4)</strong> At the
        end of each of their turns, all allies within 150 ft of Elysium, except 
        himself, can teleport 30 ft as a free action. Telepathic communication
        is set up between all allies, including himself, in the same range.<br/>
        <em>Overdrive.</em> The range expands to 300 ft, teleportation distance 
        to 60 ft and all allies, other than himself, gain invisibility as well.
        </p>`));
    c.combat.cr = 9
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Humanoid, Neutral Good";
    c.sheet.acDesc = " (Bulletproof Vest)";
    c.sheet.category = "human";
    c.sheet.finalize();
}
