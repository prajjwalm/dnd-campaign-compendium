import {Activation, AdventurerClass, Condition, CreatureSize, CSkill, DamageType, DSkill, DStat, Era, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                                                                        from "../../../../../data/npcIndex";
import {D1, D12, D6}                                                                                                                  from "../../../../../rolling/Dice";
import {Action}                                                                                                                                      from "../../../../action/Action";
import {wrapCondition, wrapDamageType, wrapRoll, wrapSense}                                                                                          from "../../../../action/Wrap";
import {Character}                                                                                                                                   from "../../../Character";
import {Morale}                                                                                                                                      from "../../../Morale";

export function setupHina()
{
    // Prepare the character object.
    const c = new Character(NpcId.Hina);

    // Setup core info.
    c.core.name = "Hina";
    c.core.imgPath = "character_tokens/C2/Arc1/Hina.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(13, 20, 24, 18, 14, 17);
    c.dStats.pb = 6;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.Investigation, ProficiencyLevel.Prof,   5);
    c.dSkills.setSkillProficiency(DSkill.Medicine,      );
    c.dSkills.setSkillProficiency(DSkill.Athletics,     ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.History,       ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Perception,    ProficiencyLevel.Expert, 5);
    c.dSkills.setSkillProficiency(DSkill.SlightOfHand,  );
    c.dSkills.setSkillProficiency(DSkill.Stealth,       ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Survival,      ProficiencyLevel.Expert);
    c.dSkills.finalize();

    // CoC Skills information
    c.cSkills.setSkillValues([
        [CSkill.Accounting,             80],
        [CSkill.Anthropology,            0],
        [CSkill.Appraise,                0],
        [CSkill.Archaeology,             0],
        [CSkill.Artillery,               0],
        [CSkill.Charm,                   5],
        [CSkill.ComputerUse,           100],
        [CSkill.Demolitions,            90],
        [CSkill.Disguise,                5],
        [CSkill.Diving,                  0],
        [CSkill.DriveAuto,              70],
        [CSkill.ElectricalRepair,       40],
        [CSkill.Electronics,            50],
        [CSkill.FirstAid,               30],
        [CSkill.Hypnosis,                0],
        [CSkill.Law,                     5],
        [CSkill.LibraryUse,             20],
        [CSkill.Locksmith,               0],
        [CSkill.MechanicalRepair,       35],
        [CSkill.ModernMedicine,          0],
        [CSkill.NaturalWorld,           10],
        [CSkill.Navigate,               10],
        [CSkill.Occult,                  5],
        [CSkill.OperateHeavyMachinery,  60],
        [CSkill.Psychoanalysis,          0],
        [CSkill.ReadLips,                0],
        [CSkill.Ride,                   15],
        [CSkill.Throw,                  20],
        [CSkill.Acting,                  5],
        [CSkill.Calligraphy,             0],
        [CSkill.Carpentry,              10],
        [CSkill.Cooking,                20],
        [CSkill.Dancing,                 5],
        [CSkill.FineArt,                20],
        [CSkill.Forgery,                 0],
        [CSkill.Writing,                 5],
        [CSkill.Singing,                 5],
        [CSkill.Painting,               75],
        [CSkill.Photography,             0],
        [CSkill.Sculpting,               0],
        [CSkill.Chainsaw,               10],
        [CSkill.HeavyWeapons,           10],
        [CSkill.Flamethrower,           10],
        [CSkill.MachineGun,             10],
        [CSkill.SubmachineGun,          10],
        [CSkill.Aircraft,               20],
        [CSkill.Boat,                   30],
        [CSkill.Astronomy,               0],
        [CSkill.Biology,                30],
        [CSkill.Botany,                 20],
        [CSkill.Chemistry,              50],
        [CSkill.Cryptography,           90],
        [CSkill.Engineering,            60],
        [CSkill.Forensics,              30],
        [CSkill.Geology,                 0],
        [CSkill.Mathematics,            80],
        [CSkill.Meteorology,             0],
        [CSkill.Pharmacy,               30],
        [CSkill.Physics,                60],
        [CSkill.Zoology,                 0],
    ]);
    c.cSkills.finalize();

    c.operator.morale = Morale.Low;

    c.operator.fatigue = 10;
    c.operator.ratings = {
        damage  : "S",
        control : "S+",
        survival: "S",
        pro     : "SS",
    };
    c.operator.addNotableStuff("Major Damage Type", "Magical Bludgeoning");
    c.operator.addNotableStuff("Strong against", "Aberrations, Machines, Huge creatures");
    c.operator.addNotableStuff("Weak against", "Humanoids");
    c.operator.addNotableStuff("Combat Experience", "S Grade (7 years)");
    c.operator.setChemistryWith(NpcId.Dawn, 21, "Although they don't interact that much, in her mind, Hina virtually sees Dawn as a mother.");
    c.operator.setChemistryWith(NpcId.Elysium, 17, "The only one in the village who truly knows her - identity, past, nature, everything...");
    c.operator.setChemistryWith(NpcId.Iona, 12, "For some reason, Hina treats her as though she were her little sister.");

    c.operator.era = Era.Future;
    c.operator.professions = ["Bionic Tank", "Student / Laborer"];
    c.operator.addNotableStuff("Challenge Rating", "23");
    c.operator.finalize();

    // Can have opinions.
    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    // Card information.
    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("F21 (14)");
    c.card.addCardTag("From | Innovation / Ruin / Materia / Devotion");
    c.card.addCardTag("Race | Human <span class='verbose'>(Cyberpunk)</span>");
    c.card.addCardTag("OS | Berserk MK5");
    c.card.addCardTag("Mutagen | Greater Green");
    c.card.addCardTag("<span class='verbose'>Project Diablo |</span> #41");
    c.card.addCardTag("Edgedancer <span class='verbose'>(Cultivation)</span>");
    c.card.addCardTag("Bondsmith <span class='verbose'>(Preservation)</span>");
    c.card.addCardTag("Champion of Ruin");
    c.card.addCardTag("Chamber of Guilt");
    c.card.addCardTag("Class | Barbarian &times; Rogue");
    c.card.addCardTag("CR | 23");
    c.card.summary = () => `Fortune's favoured child.`;

    c.card.story = () => `
<p>
    A child whose eyes that have seen far too much, particularly given her age. 
    She was first seen by a group of adventurers in Terra on the day of the 
    second apocalypse, 1593AR. Ejected by seemingly the ground itself on the 
    other bank of a stream of lava, she walked away without much interaction 
    with them.</p>
    <p> 
    Seven years later, she would pick up different a band of adventures lying unconscious
    on the banks of a lake the plane of Devotion
    and bring them to the mountainous village of Po-Shan. A village in which they
    would typically find her gaming and occasionally spouting caustic wit, in a house built
    by herself (or so she claimed). The unusual occurances around her only began after the 
    first time a villager died. The strangest time was when some adventurers 
    stumbled onto her sitting alone in a demiplane of black ink. As if in a 
    trance, she was leaning on ${Character.get(NpcId.Dusk).createLink("a dragon")}
    and they were surrounded by humanoid spectres rising from the ink.
    Her hands were limp, and she was deleriously painting with her toes, she was smoking
    heavily.  
     
    It was only after the curse affecting the 
    village was lifted that the ${Character.get(NpcId.Dusk).createLink("local guardian deity")}
    revealed to the others that the child had bondsmith powers. Alongside this 
    revelation, several adventurers noted ${Character.get(NpcId.Shimaken).createLink("a certain spirit")}
    haunting her.</p>
    <p>
    She would soon after use her powers, somewhat reluctantly, to teleport the plane of Honor along with
    a group of adventurers. In there she seemed to come across a figure of long
    past, ${Character.get(NpcId.Ruzaki).createLink("a scholar")} whose very sight
    crippled her entire psyche, reducing the bored, droll kid to a broken, 
    psychotic mess.
    He addressed her solely, like many after him did, as #41. After
    they faked her death, stablized her emotions and helped her escape, she revealed
    to her companions that she was one of sixty children selected out of over 
    six hundred who'd been chosen for a special training programme that would 
    make them grow into uber-soldiers 'strong enough to kill God'. Those sixty 
    had been divided into three sets of twenty each, specializing in lethality, 
    control and demolitions respectively. As #41, she was the top student of the
    third batch... until something bad had happened and the Project was scrapped.</p>
    <div class="effect_tag">Incomplete</div>`;

    c.card.primaryImageTitle = "Urchin";
    c.card.finalize();

    c.combat.setSpeed(Speed.Walking, 40);

    c.combat.setSave(DStat.Str, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Con, ProficiencyLevel.Expert);

    c.combat.addClassLevels(AdventurerClass.Barbarian, 9);
    c.combat.addClassLevels(AdventurerClass.Rogue, 9);
    c.combat.addClassLevels(AdventurerClass.Warlock, 2);

    c.combat.addAcBonus(2);

    c.combat.bonusHP = 48;   // Cyborg / Tough.
    c.combat.computeHP();

    c.combat.setSense(Sense.DevilSight, 120);

    c.combat.setRes(DamageType.Psychic, 50);
    c.combat.addConditionImmunity(Condition.Charmed);
    c.combat.addConditionImmunity(Condition.Frightened);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Bionic Brain.</em></strong> Hina is always aware of her 
        directions and always remembers anything she's seen or heard, even when
        unconscious or sleeping. She gains a +5 to perception and investigation 
        scores, and can understand a person's words by lip-reading, assuming the
        language is one she knows.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Chamber of Guilt.</em></strong> Being possessed by Penance,
        Hina can telepathically gauge and selectively influence a creature's
        mental state, as long as the creature is within 1 mile and aware of her 
        (consequently such a creature could never be  from her).
        Because of the same possession, she cannot dream and gains advantage on Wis saving 
        throws.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Bondsmith &times; Edgedancer Hybrid.</em></strong> Hina 
        is bonded to a Cultivation Spren elevated to a God Spren by the splinter
        of Preservation. Notably, as such she can draw investiture from life light 
        (respiration) and is a full-born in the presence of Preservation's mists.  
        </p>`
    ));

    // Morale improved after talking to Aurelia before leaving for labs.
    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Morale: Low.</em></strong> Due to her morale,
        Hina's gains a -1 to all her skill modifiers (included in the sheet).
        </p>`
    ))

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Multiattack.</em></strong> As an action Hina makes one black 
        knife attack and two telekinetic slams.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Black Knife.</em></strong> Melee Weapon Attack: ${wrapRoll(c.DEX + c.Prof + 3)}, 
        reach 5 ft., one target. Hit: ${wrapRoll([[6, D6], [c.DEX + 6, D1]])} 
        ${wrapDamageType(DamageType.Piercing)} damage. A target hit by this attack 
        can't regenerate HP till the end of their next turn and instantly breaks 
        concentration on a spell, causing the target of the spell to take necrotic
        (void) damage equal to 10 times the spell slot level. In Hina's hands, 
        this weapon also behaves as a vorpal blade. On a critical hit, it instantly kills targets 
        without legendary resistances and deals ${wrapRoll([[18, D6], [c.DEX + 6, D1]])}
        to targets with legendary resistances.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Telekinetic slam.</em></strong> Ranged Attack: Hina targets
        a point on the ground within 600 ft of her and slams a heavy object 
        telekinetically on that spot. Targets within 5 ft of the point must make
        a DC ${c.dc(DStat.Con) + c.Prof} DEX save or take ${wrapRoll([[10, D12], [c.CON + 3, D1]])} 
        ${wrapDamageType(DamageType.Bludgeoning)} (magical) damage. On a successful save they take half damage.
        This attack deals triple damage to structures.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Overwhelming Regrets.</em></strong> Hina infuses a creature's 
        soul with an intense focused onslaught of guilt. The target makes a DC 
        ${c.dc(DStat.Cha) + 10} CHA save.
        On failure a non-hostile creature is charmed by her while a hostile creature
        has disadvantage on attack rolls. Also, they can't take opportunity attacks against 
        targets other than her. Any other effects charming or freightening the 
        target end immediately and concentration is broken. If the failure is by 
        a margin of 10 or more, they are also paralyzed by guilt. These effects last 
        until a minute, or until Hina lifts the effect. This effect can only 
        target creatures aware of her.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Edgedancer (Progression).</em></strong> (${c.Prof} / LR) 
        Hina heals a creature she touches by ${c.CON * 10}. This effect ends 
        blindess, deafness and any diseases afflicting the target and restores 
        missing body parts.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Berserk MK5.</em></strong> (4 / LR) By activating her neural OS, 
        Hina drastically increases her defensive capabilities. For the duration 
        of 1 minute, she has resistance to all damage, advantage on STR checks
        and saving throws and her ${wrapDamageType(DamageType.Physical)} damage 
        per attack is increased by 3 (included in the sheet).</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Edgedancer (Abrasion).</em></strong> Hina can use her bonus
        action to take the dodge, disengage or hide action. Until the start of her
        next turn she is not affected by difficult terrain, has advantage on DEX 
        saving throws, is immune to being grappled and her movement speed increases by 15ft.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Telekinetic lashing.</em></strong> Hina attempts to 
        telekinetically move creatures around. She can either target upto 6 
        creatures, moving each 10ft in any direction (on collision they take 
        ${wrapRoll(D6)} ${wrapDamageType(DamageType.Bludgeoning)} damage) 
        should they fail a DC ${c.dc(DStat.Con) + c.Prof} STR save, or target one
        creature and move it upto 100ft (${wrapRoll([10, D6])} 
        ${wrapDamageType(DamageType.Bludgeoning)} damage on collision) should it
        fail a DC ${c.dc(DStat.Con) + c.Prof + 10} STR save.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Flare Aluminium.</em></strong> Hina hemallurgically burns 
        Aluminium to nullify all investiture in her system. She looses access 
        to all her non-cyberware abilities (including resistance to 
        ${wrapDamageType(DamageType.Psychic)} damage and condition immunities) 
        and her max HP drops to 22. She can no longer be targeted by spells and
        doesn't suffer any effects from any magic items.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Telekinetic Prison.</em></strong> In response to a 
        creature's movement (or taking any action or reaction that requires 
        movement), Hina can attempt a telekinetic grapple on the creature.
        The target must make a DC ${c.dc(DStat.Con) + c.Prof} DEX save 
        (disadvantage if they don't possess ${wrapSense(Sense.TrueSight)}), 
        on failure they must attempt a DC ${c.dc(DStat.Con)+c.Prof+10} (${c.dc(DStat.Con)+c.Prof}
        if Hina isn't trying to be lethal) STR save or be ${wrapCondition(Condition.Restrained)}. If they 
        fail by 10 or more, they are ${wrapCondition(Condition.Paralyzed)} 
        instead, though they can take actions requiring no physical movement - 
        like subtle spell casting. If the grapple attempt was intended to be 
        lethal, and they were ${wrapCondition(Condition.Paralyzed)}, they take 
        ${wrapRoll([[3, D12], [c.CON + c.Prof, D1]])}
        magical bludgeoning damage at the end of each of their turns - 
        instantly being crushed to pulp should they fall below 0 hp.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Sidestep.</em></strong> Hina can halve the damage she 
        takes on a hit from a source that she can see.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Parry.</em></strong> Hina gains a +${c.Prof} to her AC
        against a hit from a target she can see.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Riposte.</em></strong> Hina immediately makes one attack 
        with her knife against a target within 5 ft of her who attempts to hit 
        her with an attack and misses.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Mage slayer.</em></strong> Hina immediately makes one 
        attack with her knife against a target who casts a spell within 5 ft of 
        her.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p>Hina has three legendary actions.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><strong><em>Telekinetic slam.</em></strong> (Cost: 1) Hina uses her telekinetic slam ability as a legendary action.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><p><strong><em>Telekinetic lashing.</em></strong> (Cost: 2) Hina uses her telekinetic lashing ability as a legendary action.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><p><strong><em>Telekinetic prison.</em></strong> (Cost: 3) Hina uses her telekinetic prison ability as a legendary action.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><strong><em>Overwhelming Regrets.</em></strong> (Cost: 3) Hina uses her overwhelming regrets ability as a legendary action.</p>`
    ));

    c.combat.cr = 23;
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Humanoid (Cyberpunk), Chaotic Good";
    c.sheet.acDesc = "(Subdermal Armor MK4)";
    c.sheet.category = "human";
    c.sheet.finalize();
}
