import {
    Activation,
    AdventurerClass,
    Condition,
    CreatureSize,
    CRValue,
    CSkill,
    DamageType,
    DSkill,
    DStat,
    Era,
    Hidden,
    Prof,
    ProficiencyLevel,
    Sense,
    Speed, Vague
} from "../../../../../data/constants";
import {NpcID}                    from "../../../../../data/npcIndex";
import {D1, D12, D6}              from "../../../../../rolling/Dice";
import {Action}                   from "../../../../action/Action";
import {wrapDamageType, wrapRoll} from "../../../../action/Wrap";
import {Character}                from "../../../Character";
import {Morale}                   from "../../../Morale";

export function setupHina()
{
    // Prepare the character object.
    const hina = new Character(NpcID.Hina);

    // Setup core info.
    hina.core.name = "Hina";
    hina.core.imgPath = "character_tokens/C2/Arc1/Hina.png";

    // Setup D&D stats.
    hina.dStats.initializeStats(13, 20, 24, 18, 14, 20);
    hina.dStats.pb = Prof.get(6);

    // Setup D&D skills.
    hina.dSKills.setSkillProficiency(DSkill.Investigation, Hidden, ProficiencyLevel.Prof,   5);
    hina.dSKills.setSkillProficiency(DSkill.Medicine,      Hidden);
    hina.dSKills.setSkillProficiency(DSkill.Athletics,     Hidden, ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(DSkill.History,       Hidden, ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(DSkill.Perception,    Hidden, ProficiencyLevel.Expert, 5);
    hina.dSKills.setSkillProficiency(DSkill.SlightOfHand,  Hidden);
    hina.dSKills.setSkillProficiency(DSkill.Stealth,       Hidden, ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(DSkill.Survival,      Hidden, ProficiencyLevel.Expert);

    hina.operator.morale = Morale.Dismal;
    hina.dSKills.finalizeSkills();

    hina.operator.fatigue = 20;
    hina.operator.ratings = {
        damage  : "S",
        control : "S+",
        survival: "S",
        pro     : "SS",
    };
    hina.operator.addNotableStuff("Major Damage Type", "Magical Bludgeoning");
    hina.operator.addNotableStuff("Strong against", "Aberrations, Machines, Huge creatures");
    hina.operator.addNotableStuff("Weak against", "Humanoids");
    hina.operator.addNotableStuff("Combat Experience", "S Grade (7 years)");
    hina.operator.setChemistryWith(NpcID.Dawn, 21, "Although they don't interact that much, in her mind, Hina virtually sees Dawn as a mother.");
    hina.operator.setChemistryWith(NpcID.Elysium, 17, "The only one in the village who truly knows her - identity, past, nature, everything...");
    hina.operator.setChemistryWith(NpcID.Iona, 12, "For some reason, Hina treats her as though she were her little sister.");

    hina.operator.era = Era.Future;
    hina.operator.professions = ["Bionic Tank", "Student / Laborer"];

    // Can have opinions.
    hina.opinions.isOpinionated = true;

    // Card information.
    hina.card.setCampaignArc(2, 1);
    hina.card.addCardTag("F21 (14)");
    hina.card.addCardTag("From | Innovation / Ruin / Materia / Devotion");
    hina.card.addCardTag("Race | Human <span class='verbose'>(Cyberpunk)</span>");
    hina.card.addCardTag("OS | Berserk MK5");
    hina.card.addCardTag("Mutation | Greater Green");
    hina.card.addCardTag("<span class='verbose'>Project Diablo |</span> #41");
    hina.card.addCardTag("Edgedancer <span class='verbose'>(Cultivation)</span>");
    hina.card.addCardTag("Bondsmith <span class='verbose'>(Preservation)</span>");
    hina.card.addCardTag("Champion of Ruin");
    hina.card.addCardTag("Chamber of Guilt");
    hina.card.addCardTag("Class | Barbarian &times; Rogue");
    hina.card.addCardTag("CR | 23");
    hina.card.summary = () =>"???";

    hina.card.primaryImageTitle = "Urchin";

    // CoC Skills information
    hina.cSkills.setSkillValues([
        [CSkill.Accounting,             80,   Vague],
        [CSkill.Anthropology,            0,   Vague],
        [CSkill.Appraise,                0,   Vague],
        [CSkill.Archaeology,             0,   Vague],
        [CSkill.Artillery,               0,   Vague],
        [CSkill.Charm,                   5,   Vague],
        [CSkill.ComputerUse,           100,   Vague],
        [CSkill.Demolitions,            90,   Vague],
        [CSkill.Disguise,                5,   Vague],
        [CSkill.Diving,                  0,   Vague],
        [CSkill.DriveAuto,              70,   Vague],
        [CSkill.ElectricalRepair,       40,   Vague],
        [CSkill.Electronics,            50,   Vague],
        [CSkill.FirstAid,               30,   Vague],
        [CSkill.Hypnosis,                0,   Vague],
        [CSkill.Law,                     5,   Vague],
        [CSkill.LibraryUse,             20,   Vague],
        [CSkill.Locksmith,               0,   Vague],
        [CSkill.MechanicalRepair,       35,   Vague],
        [CSkill.ModernMedicine, 0, Vague],
        [CSkill.NaturalWorld,           10,   Vague],
        [CSkill.Navigate,               10,   Vague],
        [CSkill.Occult,                  5,   Vague],
        [CSkill.OperateHeavyMachinery,  60,   Vague],
        [CSkill.Psychoanalysis,          0,   Vague],
        [CSkill.ReadLips,                0,   Vague],
        [CSkill.Ride,                   15,   Vague],
        [CSkill.Throw,                  20,   Vague],
        [CSkill.Acting,                  5,   Vague],
        [CSkill.Calligraphy,             0,   Vague],
        [CSkill.Carpentry,              10,   Vague],
        [CSkill.Cooking,                20,   Vague],
        [CSkill.Dancing,                 5,   Vague],
        [CSkill.FineArt,                20,   Vague],
        [CSkill.Forgery,                 0,   Vague],
        [CSkill.Writing,                 5,   Vague],
        [CSkill.Singing,                 5,   Vague],
        [CSkill.Painting,               75,   Vague],
        [CSkill.Photography,             0,   Vague],
        [CSkill.Sculpting,               0,   Vague],
        [CSkill.Chainsaw,               10,   Vague],
        [CSkill.HeavyWeapons,           10,   Vague],
        [CSkill.Flamethrower,           10,   Vague],
        [CSkill.MachineGun,             10,   Vague],
        [CSkill.SubmachineGun,          10,   Vague],
        [CSkill.Aircraft,               20,   Vague],
        [CSkill.Boat,                   30,   Vague],
        [CSkill.Astronomy,               0,   Vague],
        [CSkill.Biology,                30,   Vague],
        [CSkill.Botany,                 20,   Vague],
        [CSkill.Chemistry,              50,   Vague],
        [CSkill.Cryptography,           90,   Vague],
        [CSkill.Engineering,            60,   Vague],
        [CSkill.Forensics,              30,   Vague],
        [CSkill.Geology,                 0,   Vague],
        [CSkill.Mathematics,            80,   Vague],
        [CSkill.Meteorology,             0,   Vague],
        [CSkill.Pharmacy,               30,   Vague],
        [CSkill.Physics,                60,   Vague],
        [CSkill.Zoology,                 0,   Vague],
    ]);

    hina.combat.setSpeed(Speed.Walking, 40);

    hina.combat.setSave(DStat.Str, ProficiencyLevel.Prof);
    hina.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);
    hina.combat.setSave(DStat.Con, ProficiencyLevel.Expert);

    hina.combat.addClassLevels(AdventurerClass.Barbarian, 9);
    hina.combat.addClassLevels(AdventurerClass.Rogue, 9);
    hina.combat.addClassLevels(AdventurerClass.Warlock, 2);

    hina.combat.addAcBonus(2);

    hina.combat.bonusHP = 48;   // Cyborg / Tough.
    hina.combat.computeHP();

    hina.combat.setSense(Sense.DevilSight, 120);

    hina.combat.setRes(DamageType.Psychic, 50);
    hina.combat.addConditionImmunity(Condition.Charmed);
    hina.combat.addConditionImmunity(Condition.Frightened);

    hina.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Bionic Brain.</em></strong> Hina is always aware of her 
        directions and always remembers anything she's seen or heard, even when
        unconscious or sleeping. She gains a +5 to perception and investigation 
        scores, and can understand a person's words by lip-reading, assuming the
        language is one she knows.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Chamber of Guilt.</em></strong> Being possessed by Penance,
        Hina can telepathically gauge and selectively influence a creature's
        mental state, as long as the creature is within 1 mile and aware of her 
        (consequently such a creature could never be hidden from her).
        Because of the same possession, she cannot dream and gains advantage on Wis saving 
        throws.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Bondsmith &times; Edgedancer Hybrid.</em></strong> Hina 
        is bonded to a Cultivation Spren elevated to a God Spren by the splinter
        of Preservation. Notably, as such she can draw investiture from life light 
        (respiration) and is a full-born in the presense of Preservation's mists.  
        </p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Morale: Dismal.</em></strong> Due to her low morale, 
        Hina's proficiency bonus decreases by 1 and she gains a -1 to all her 
        skill modifiers (included in the sheet). 
        </p>`
    ))

    hina.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Multiattack.</em></strong> As an action Hina makes one black 
        knife attack and two telekinetic slams.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Black Knife.</em></strong> Melee Weapon Attack: ${wrapRoll(hina.DEX + hina.Prof + 3)}, 
        reach 5 ft., one target. Hit: ${wrapRoll([[6, D6], [hina.DEX + 6, D1]])} 
        ${wrapDamageType(DamageType.Piercing)} damage. A target hit by this attack 
        can't regenerate HP till the end of their next turn and instantly breaks 
        concentration on a spell, causing the target of the spell to take necrotic
        (void) damage equal to 10 times the spell slot level. In Hina's hands, 
        this weapon also behaves as a vorpal blade. On a critical hit, it instantly kills targets 
        without legendary resistances and deals ${wrapRoll([[18, D6], [hina.DEX + 6, D1]])}
        to targets with legendary resistances.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Telekinetic slam.</em></strong> Ranged Attack: Hina targets
        a point on the ground within 600 ft of her and slams a heavy object 
        telekinetically on that spot. Targets within 5 ft of the point must make
        a DC ${hina.dc(DStat.Con)} DEX save or take ${wrapRoll([[10, D12], [hina.CON + 3, D1]])} 
        ${wrapDamageType(DamageType.Bludgeoning)} (magical) damage. On a successful save they take half damage.
        This attack deals triple damage to structures.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Overwhelming Regrets.</em></strong> Hina infuses a creature's 
        soul with an intense focused onslaught of guilt. The target makes a DC 
        ${hina.getSkillMod(DSkill.Persuasion, ProficiencyLevel.Expert)[0] + 13} CHA save.
        On failure a non-hostile creature is charmed by her while a hostile creature
        has disadvantage on attack rolls. Also, they can't take opportunity attacks against 
        targets other than her. Any other effects charming or freightening the 
        target end immediately and concentration is broken. If the failure is by 
        a margin of 15 or more, they are also paralyzed by guilt. These effects last 
        until a minute, or until Hina lifts the effect. This effect can only 
        target creatures aware of her.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Edgedancer (Progression).</em></strong> (${hina.Prof} / LR) 
        Hina heals a creature she touches by ${hina.CON * 10}. This effect ends 
        blindess, deafness and any diseases afflicting the target and restores 
        missing body parts.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Berserk MK5.</em></strong> (4 / LR) By activating her neural OS, 
        Hina drastically increases her defensive capabilities. For the duration 
        of 1 minute, she has resistance to all damage, advantage on STR checks
        and saving throws and her ${wrapDamageType(DamageType.Physical)} damage 
        per attack is increased by 3.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Edgedancer (Abrasion).</em></strong> Hina can use her bonus
        action to take the dodge, disengage or hide action. Until the start of her
        next turn she is not affected by difficult terrain, has advantage on DEX 
        saving throws, is immune to being grappled and her movement speed increases by 15ft.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Telekinetic lashing.</em></strong> Hina attempts to 
        telekinetically move creatures around. She can either target upto 6 
        creatures, moving each 10ft in any direction (on collision they take 
        ${wrapRoll(D6)} ${wrapDamageType(DamageType.Bludgeoning)} damage) 
        should they fail a DC ${hina.dc(DStat.Con) + hina.Prof} STR save, or target one
        creature and move it upto 100ft (${wrapRoll([10, D6])} 
        ${wrapDamageType(DamageType.Bludgeoning)} damage on collision) should it
        fail a DC ${hina.dc(DStat.Con) + hina.Prof + 10} STR save.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Flare Aluminium.</em></strong> Hina hemallurgically burns 
        Aluminium to nullify all investiture in her system. She looses access 
        to all her non-cyberware abilities (including resistance to 
        ${wrapDamageType(DamageType.Psychic)} damage and condition immunities) 
        and her max HP drops to 22. She can no longer be targeted by spells and
        doesn't suffer any effects from any magic items.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Sidestep.</em></strong> Hina can halve the damage she 
        takes on a hit from a source that she can see.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Parry.</em></strong> Hina gains a +${hina.Prof} to her AC
        against a hit from a target she can see.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Riposte.</em></strong> Hina immediately makes one attack 
        with her knife against a target within 5 ft of her who attempts to hit 
        her with an attack and misses.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Mage slayer.</em></strong> Hina immediately makes one 
        attack with her knife against a target who casts a spell within 5 ft of 
        her.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p>Hina has three legendary actions.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><p><strong><em>Telekinetic lashing.</em></strong> (Cost: 2) Hina uses her telekinetic lashing as a legendary action.</p>`
    ));

    hina.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><strong><em>Telekinetic slam.</em></strong> (Cost: 1) Hina uses her telekinetic slam as a legendary action.</p>`
    ));

    hina.sheet.cr = new CRValue(23);
    hina.operator.addNotableStuff("Challenge Rating", "23");
    hina.sheet.size = CreatureSize.Medium;
    hina.sheet.subtitle = " Humanoid (Cyberpunk), Chaotic Good";
    hina.sheet.acDesc = "(Subdermal Armor MK4)";
    hina.sheet.category = "human";
}
