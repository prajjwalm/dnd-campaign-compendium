import {Activation, AdventurerClass, Condition, CreatureSize, CSkill, DamageType, DSkill, DStat, Era, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                                                                        from "../../../../../data/npcIndex";
import {D1, D10, D8}                                                                                                                  from "../../../../../rolling/Dice";
import {Action}                                                                                                                       from "../../../../action/Action";
import {wrapCreatureSize, wrapDamageType, wrapRoll}                                                                                   from "../../../../action/Wrap";
import {Character}                                                                                                                    from "../../../Character";
import {Morale}                                                                                                                       from "../../../Morale";

export function setupIrene()
{
    const c = new Character(NpcId.Irene);

    c.core.name = "Irene";
    c.core.imgPath = "character_tokens/C1/Arc1/irene.png";
    c.core.finalize();

    c.dStats.initializeStats(8, 20, 10, 8, 14, 20);
    c.dStats.pb = 7;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Acrobatics,   );
    c.dSkills.setSkillProficiency(DSkill.Insight,      ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Intimidation, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Religion,     );
    c.dSkills.setSkillProficiency(DSkill.Stealth,      ProficiencyLevel.Expert);
    c.dSkills.finalize();

    c.cSkills.setSkillValues([
        [CSkill.Accounting,                    5],
        [CSkill.Anthropology,                  0],
        [CSkill.Appraise,                     70],
        [CSkill.Archaeology,                  40],
        [CSkill.Artillery,                     0],
        [CSkill.Charm,                        15],
        [CSkill.ComputerUse,                   5],
        [CSkill.Demolitions,                   0],
        [CSkill.Disguise,                      5],
        [CSkill.Diving,                      150],
        [CSkill.DriveAuto,                    20],
        [CSkill.ElectricalRepair,             10],
        [CSkill.Electronics,                   0],
        [CSkill.FirstAid,                     90],
        [CSkill.Hypnosis,                      0],
        [CSkill.Law,                           5],
        [CSkill.LibraryUse,                   20],
        [CSkill.Locksmith,                     0],
        [CSkill.MechanicalRepair,             10],
        [CSkill.ModernMedicine,                0],
        [CSkill.NaturalWorld,                 60],
        [CSkill.Navigate,                     90],
        [CSkill.Occult,                       50],
        [CSkill.OperateHeavyMachinery,         0],
        [CSkill.Psychoanalysis,                0],
        [CSkill.ReadLips,                      0],
        [CSkill.Ride,                         15],
        [CSkill.Throw,                        20],
        [CSkill.Acting,                        5],
        [CSkill.Calligraphy,                   0],
        [CSkill.Carpentry,                    10],
        [CSkill.Cooking,                      20],
        [CSkill.Dancing,                       5],
        [CSkill.FineArt,                       5],
        [CSkill.Forgery,                       0],
        [CSkill.Writing,                       5],
        [CSkill.Singing,                       5],
        [CSkill.Painting,                      5],
        [CSkill.Photography,                   0],
        [CSkill.Sculpting,                     0],
        [CSkill.Chainsaw,                     10],
        [CSkill.HeavyWeapons,                 10],
        [CSkill.Flamethrower,                 10],
        [CSkill.MachineGun,                   10],
        [CSkill.SubmachineGun,                10],
        [CSkill.Aircraft,                      0],
        [CSkill.Boat,                         65],
        [CSkill.Astronomy,                     0],
        [CSkill.Biology,                      35],
        [CSkill.Botany,                       50],
        [CSkill.Chemistry,                     0],
        [CSkill.Cryptography,                  0],
        [CSkill.Engineering,                   0],
        [CSkill.Forensics,                     0],
        [CSkill.Geology,                       0],
        [CSkill.Mathematics,                  10],
        [CSkill.Meteorology,                   0],
        [CSkill.Pharmacy,                      0],
        [CSkill.Physics,                       0],
        [CSkill.Zoology,                      50],
    ]);
    c.cSkills.finalize();

    c.operator.fatigue = 0;
    c.operator.ratings = {
        damage  : "S",
        control : "A+",
        survival: "B",
        pro     : "S",
    };
    c.operator.addNotableStuff("Major Damage Type", "Magical Piercing, Lightning, Force");
    c.operator.addNotableStuff("Insanely Strong against", "Seaborn");
    c.operator.addNotableStuff("Strong against", "Melee Opponents, Undead");
    c.operator.addNotableStuff("Weak against", "Flying enemies");
    c.operator.addNotableStuff("Combat Experience", "SSS Grade (>1000 years)");
    c.operator.setChemistryWith(NpcId.Jordi, 11, "Thinks he's a nice person, appreciates being able to spend time with him in comfortable silence.");
    c.operator.addNotableStuff("Challenge Rating", "16");
    c.operator.professions = ["Inquisitor", "Unemployed (Amnesiac)"];
    c.operator.era = Era.Timeless;
    c.operator.morale = Morale.Average;
    c.operator.finalize();

    c.card.setCampaignArc(1, 1);
    c.card.addCardTag("F1390");
    c.card.addCardTag("CR | 16");
    c.card.addCardTag("From | Air / Water / Preservation");
    c.card.addCardTag("Allegiance | Preservation");
    c.card.addCardTag("Race | Air Genasi");
    c.card.addCardTag("<span class='verbose'>Gunslinger</span> Fighter / <span class='verbose'>Tempest</span> Cleric / <span class='verbose'>Storm</span> Sorcerer");
    c.card.addCardTag("Faction: Inquisitor");
    c.card.addCardTag("Inquisitor of ???");
    c.card.summary = () =>`
      <div class="effect_tag">Incomplete</div><br/>
    An air genasi who was a junior member of the inquisition of the gardens. All her bunker-mates were killed in 
    an attack by The Troupe around 300 years ago, but the ${Character.get(NpcId.Kjerra).createLink("Guardian of Magic")}
    took pity on her and replaced them all with physically intractable and sentient illusions. Despite them being 
    near-perfect replicas, Irene eventually figured out their true nature, but being grateful for the concern, she 
    kept the pretense of believing in them. Even so, ${Character.get(NpcId.Lesley).createLink("Lesley")} took a personal 
    interest in her and made sure to invite her every now and then to make sure she got to interact with real people.
    During the Hour of Loss, she displayed unexpected skill (leading others to suspect she had specifically been 
    trained for such situations), resolve, and fanaticism in fighting a deep-ocean aberration but went missing in
    the fight.`;
    c.card.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.combat.cr = 16

    c.combat.setSpeed(Speed.Walking,  40);
    c.combat.setSpeed(Speed.Swimming, 70);
    c.combat.setSpeed(Speed.Flying,   30);

    c.combat.setSave(DStat.Dex);
    c.combat.setSave(DStat.Con, ProficiencyLevel.Expert);
    c.combat.setSave(DStat.Wis);
    c.combat.setSave(DStat.Cha);

    c.combat.addClassLevels(AdventurerClass.Sorcerer, 5);
    c.combat.addClassLevels(AdventurerClass.Cleric, 2);
    c.combat.addClassLevels(AdventurerClass.Fighter, 7);
    c.combat.bonusHP = 32;
    c.combat.computeHP();

    c.combat.setSense(Sense.Darkvision,  120);
    c.combat.setSense(Sense.TremorSense, 120);

    c.combat.setRes(DamageType.Cold, 100);
    c.combat.setRes(DamageType.Poison, 100);
    c.combat.setRes(DamageType.Acid, 100);
    c.combat.setRes(DamageType.Lightning, 100);
    c.combat.setRes(DamageType.Psychic, 50);
    c.combat.setRes(DamageType.Necrotic, 50);

    c.combat.addConditionImmunity(Condition.Frightened);
    c.combat.addConditionImmunity(Condition.Blinded);
    c.combat.addConditionImmunity(Condition.Poisoned);
    c.combat.addConditionImmunity(Condition.Stunned);
    c.combat.addConditionImmunity(Condition.Paralyzed);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Scourge of the Deep Oceans.</em></strong> Her natural 
        biology and extensive training as an inquisitor 
        has made Irene deadly in the oceans. She can hold her breath indefinitely,
        never takes damage from water pressure and can make her body as buoyant 
        as the wind itself. Additionally, she takes only 20% damage from seaborn 
        creatures and her to-hit rolls and saves against them have advantage, as
        they have disadvantage on attack rolls and saving throws against her.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Blade of the winds.</em></strong> Creatures levitated by Irene 
        without a flying speed are considered restrained. She gains an additional
        +5 to attack rolls against such creatures and deals +50% damage on all 
        her attacks against those creatures.
        If the levitating creatures are seaborn, she additionally rolls with super-advantage.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Action Surge.</em> (1/SR)</strong> Irene may choose to 
        take an additional action in one of her turns.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Spellcasting.</em></strong> Irene is a 7th level spellcaster 
        and has the following spells prepared (To hit ${wrapRoll(c.CHA + c.Prof + 3)} Save DC ${(c.dc(DStat.Cha)) + 3})</p>
        <ul style="font-size: 12px;">
            <li><b>Cantrip.</b> Guidance, Shocking Grasp (3d8 ${wrapDamageType(DamageType.Lightning)} damage)</li>
            <li><b>1<sup>st</sup> Level. (4 slots)</b> Healing word, Cure Wounds, Detect Evil and Good, Protection From Evil and Good, Fog cloud, Shield</li>
            <li><b>2<sup>nd</sup> Level. (3 slots)</b> Levitate</li>
            <li><b>3<sup>rd</sup> Level. (3 slots)</b> Lightning Bolt</li>
            <li><b>4<sup>th</sup> Level. (1 slot)</b></li>
        </ul>
        <p>Due to her extensive training, she can cast these spells without Verbal or 
        Somatic components.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Multiattack.</em></strong> As an action irene makes two 
        attacks with her rapier and one with her revolver. If there are seaborn 
        in the battlefield, she instead makes 3 rapier and 2 revolver attacks.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Rapier.</em></strong> Melee Weapon Attack: ${wrapRoll(c.DEX + c.Prof + 2)}
        reach 5 ft., one target. Hit: ${wrapRoll([[1, D8], [c.DEX + 2, D1]])} 
        ${wrapDamageType(DamageType.Piercing)} damage (magical) plus ${wrapRoll(D8)} 
        ${wrapDamageType(DamageType.Lightning)} damage.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Revolver.</em></strong> Ranged Weapon Attack: ${wrapRoll(c.DEX + c.Prof + 2)} 
        reach 40/120 ft., one target. Hit: ${wrapRoll([[3, D8], [c.DEX + 2, D1]])} 
        ${wrapDamageType(DamageType.Piercing)} damage (magical). This shot can pierce through enemeies, 
        and she makes attack rolls with disadvantage for every creature within 40 ft behind the primary target.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Electrostatic Shackles. </em>(7/LR)</strong> Irene 
        unleashes a powerful burst of static electricity thrice - on each 
        occasion all creatures within 5 ft of her take ${wrapRoll([[1, D8], [c.CHA, D1]])}
        ${wrapDamageType(DamageType.Lightning)} damage (halved on a ${c.dc(DStat.Cha) + 3}
        CON save; one save for all three bursts). After the first burst, 
        instead of sourcing the lightning from herself, she can make any other
        creature who has taken damage from this attack the source instead.<br/> If 
        performed underwater, the ${wrapDamageType(DamageType.Lightning)}
        damage is ${wrapRoll([[3, D8], [c.CHA, D1]])} instead.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Judgement of the Storms. </em>(1/LR)</strong>
        Irene unleashes The Primal Winds form the Inner Plane of Air to force all creatures
        of her choice within 30 ft to make a DC ${c.dc(DStat.Cha) + 3} CON 
        save. All creatures who fail take ${wrapRoll([[6, D8], [(c.CHA + 3), D1]])} 
        ${wrapDamageType(DamageType.Force)} damage and levitate 20 ft
        in the air until the start of her next turn. Creatures who succeed the 
        save take half damage and don't levitate. Immediately after unleashing the winds, she shoots 
        8 times with her revolver, each shot dealing <span class="rollable">${(11 + c.DEX)}</span> 
        ${wrapDamageType(DamageType.Piercing)} damage to the target and ${wrapRoll(D8)} 
        ${wrapDamageType(DamageType.Lightning)} damage to all creatures within 
        5 ft of the target (including the target).<br/>
        If performed underwater, The Primal Winds first form a bubble of torrential winds of 
        60 ft radius centered on her. In this case every enemy without a flying speed
        automatically is considered to have failed the CON save.<br/>
        <em>After making this attack Irene is stunned until the end of her next turn.</em></p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Destructive Wrath.</em> (2/SR)</strong> Irene empowers herself 
        with primal electricity. For the duration of this turn, Irene deals 
        maximum lightning damage on all attacks and her attacks ignore resistance
        to electric damage.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Gust.</em></strong> Irene's next melee attack deals an 
        extra ${wrapRoll([2, D8])} ${wrapDamageType(DamageType.Force)} damage and, should they fail a  
        DC ${c.dc(DStat.Cha) + 3} CON save, causes the target to levitate 20 ft until the end of her turn.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Calm breeze.</em></strong> Irene moves her flying 
        speed and heals for ${wrapRoll([[1, D10], [7, D1]])} HP. This movement 
        doesn't provoke oppurtunity attacks. If performed underwater, her flying 
        speed is quadrupled, but she can only move upwards.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Quickened Spells.</em> (5/LR)</strong> Irene can cast 
        any of her spells with a casting time of 1 action as a bonus action 
        instead.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Spellcasting.</em></strong> Shield</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Wrath of the storm.</em></strong> Whenever a creature 
        she can see hits Irene with an attack, she can use her reaction to cause 
        it to make a DC ${c.dc(DStat.Cha) + 3} CON save and take ${wrapRoll([3, D8])} 
        ${wrapDamageType(DamageType.Lightning)} or ${wrapDamageType(DamageType.Thunder)} 
        damage if it fails.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        "<p>Irene gets 3 legendary actions per round.</p>"
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><strong><em>Move.</em> (Costs 1)</strong> Irene moves upto her movement 
        speed.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><strong><em>Levitate.</em> (Costs 1)</strong> Irene casts levitate on 
        one target, consuming a spell slot.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><strong><em>Shattertide.</em> (Costs 3)</strong> Irene causes upto 6 creatures 
        in a 40 ft cone from her that are ${wrapCreatureSize(CreatureSize.Large)} 
        or smaller to be pushed back to 40 ft distance on a failed DEX 
        save of DC ${c.dc(DStat.Cha) + 3} and deals ${wrapRoll([3, D8])} 
        ${wrapDamageType(DamageType.Lightning)}, ${wrapDamageType(DamageType.Force)},
        ${wrapDamageType(DamageType.Thunder)} and ${wrapDamageType(DamageType.Piercing)}
        (magical) damage each to them (halved if the DEX save was a success).</p>`
    ));

    c.combat.addAcBonus(4);
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Humanoid (Air Genasi), Lawful Good";
    c.sheet.acDesc = "(Mastercrafted Studded Leather)";
    c.sheet.category = "human";
    c.sheet.finalize();
}