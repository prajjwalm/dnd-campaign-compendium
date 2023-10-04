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
    Speed,
    Vague
}                  from "../../../../../data/constants";
import {
    NpcID
}                  from "../../../../../data/npcIndex";
import {
    D1,
    D10,
    D8
}                  from "../../../../../rolling/Dice";
import {
    Action
}                  from "../../../../action/Action";
import {
    wrapCreatureSize,
    wrapDamageType,
    wrapRoll
}                  from "../../../../action/Wrap";
import {Character} from "../../../Character";
import {Morale}    from "../../../Morale";

export function setupIrene()
{
    const irene = new Character(NpcID.Irene);

    irene.core.name = "Irene";
    irene.core.imgPath = "character_tokens/C1/Arc1/irene.png";

    irene.card.setCampaignArc(1, 1);
    irene.card.addCardTag("F1390");
    irene.card.addCardTag("CR | 16");
    irene.card.addCardTag("From | Air / Water / Preservation");
    irene.card.addCardTag("Allegiance | Preservation");
    irene.card.addCardTag("Race | Air Genasi");
    irene.card.addCardTag("<span class='verbose'>Gunslinger</span> Fighter / <span class='verbose'>Tempest</span> Cleric / <span class='verbose'>Storm</span> Sorcerer");
    irene.card.addCardTag("Faction: Inquisitor");
    irene.card.addCardTag("Inquisitor of ???");

    irene.card.summary = () =>`
      <div class="effect_tag">Incomplete</div><br/>
    An air genasi who was a junior member of the inquisition of the gardens. All her bunker-mates were killed in 
    an attack by The Troupe around 300 years ago, but the ${Character.get(NpcID.Kjerra).createLink("Guardian of Magic")}
    took pity on her and replaced them all with physically intractable and sentient illusions. Despite them being 
    near-perfect replicas, Irene eventually figured out their true nature, but being grateful for the concern, she 
    kept the pretense of believing in them. Even so, ${Character.get(NpcID.Lesley).createLink("Lesley")} took a personal 
    interest in her and made sure to invite her every now and then to make sure she got to interact with real people.
    During the Hour of Loss, she displayed unexpected skill (leading others to suspect she had specifically been 
    trained for such situations), resolve, and fanaticism in fighting a deep-ocean aberration but went missing in
    the fight.`;

    irene.opinions.isOpinionated = true;

    irene.dStats.initializeStats(8, 20, 10, 8, 14, 20);
    irene.dStats.pb = Prof.get(7);
    irene.dSKills.setSkillProficiency(DSkill.Acrobatics,   Hidden);
    irene.dSKills.setSkillProficiency(DSkill.Insight,      Hidden, ProficiencyLevel.Expert);
    irene.dSKills.setSkillProficiency(DSkill.Intimidation, Hidden, ProficiencyLevel.Expert);
    irene.dSKills.setSkillProficiency(DSkill.Religion,     Hidden);
    irene.dSKills.setSkillProficiency(DSkill.Stealth,      Hidden, ProficiencyLevel.Expert);

    irene.operator.morale = Morale.Average;
    irene.dSKills.finalizeSkills();

    irene.cSkills.setSkillValues([
        [CSkill.Accounting,                    5,    Vague],
        [CSkill.Anthropology,                  0,    Vague],
        [CSkill.Appraise,                     70,    Vague],
        [CSkill.Archaeology,                  40,    Vague],
        [CSkill.Artillery,                     0,    Vague],
        [CSkill.Charm,                        15,    Vague],
        [CSkill.ComputerUse,                   5,    Vague],
        [CSkill.Demolitions,                   0,    Vague],
        [CSkill.Disguise,                      5,    Vague],
        [CSkill.Diving,                      150,    Vague],
        [CSkill.DriveAuto,                    20,    Vague],
        [CSkill.ElectricalRepair,             10,    Vague],
        [CSkill.Electronics,                   0,    Vague],
        [CSkill.FirstAid,                     90,    Vague],
        [CSkill.Hypnosis,                      0,    Vague],
        [CSkill.Law,                           5,    Vague],
        [CSkill.LibraryUse,                   20,    Vague],
        [CSkill.Locksmith,                     0,    Vague],
        [CSkill.MechanicalRepair,             10,    Vague],
        [CSkill.ModernMedicine,                0,    Vague],
        [CSkill.NaturalWorld,                 60,    Vague],
        [CSkill.Navigate,                     90,    Vague],
        [CSkill.Occult,                       50,    Vague],
        [CSkill.OperateHeavyMachinery,         0,    Vague],
        [CSkill.Psychoanalysis,                0,    Vague],
        [CSkill.ReadLips,                      0,    Vague],
        [CSkill.Ride,                         15,    Vague],
        [CSkill.Throw,                        20,    Vague],
        [CSkill.Acting,                        5,    Vague],
        [CSkill.Calligraphy,                   0,    Vague],
        [CSkill.Carpentry,                    10,    Vague],
        [CSkill.Cooking,                      20,    Vague],
        [CSkill.Dancing,                       5,    Vague],
        [CSkill.FineArt,                       5,    Vague],
        [CSkill.Forgery,                       0,    Vague],
        [CSkill.Writing,                       5,    Vague],
        [CSkill.Singing,                       5,    Vague],
        [CSkill.Painting,                      5,    Vague],
        [CSkill.Photography,                   0,    Vague],
        [CSkill.Sculpting,                     0,    Vague],
        [CSkill.Chainsaw,                     10,    Vague],
        [CSkill.HeavyWeapons,                 10,    Vague],
        [CSkill.Flamethrower,                 10,    Vague],
        [CSkill.MachineGun,                   10,    Vague],
        [CSkill.SubmachineGun,                10,    Vague],
        [CSkill.Aircraft,                      0,    Vague],
        [CSkill.Boat,                         65,    Vague],
        [CSkill.Astronomy,                     0,    Vague],
        [CSkill.Biology,                      35,    Vague],
        [CSkill.Botany,                       50,    Vague],
        [CSkill.Chemistry,                     0,    Vague],
        [CSkill.Cryptography,                  0,    Vague],
        [CSkill.Engineering,                   0,    Vague],
        [CSkill.Forensics,                     0,    Vague],
        [CSkill.Geology,                       0,    Vague],
        [CSkill.Mathematics,                  10,    Vague],
        [CSkill.Meteorology,                   0,    Vague],
        [CSkill.Pharmacy,                      0,    Vague],
        [CSkill.Physics,                       0,    Vague],
        [CSkill.Zoology,                      50,    Vague],
    ]);

    irene.operator.fatigue = 0;
    irene.operator.ratings = {
        damage  : "S",
        control : "A+",
        survival: "B",
        pro     : "S",
    };
    irene.operator.addNotableStuff("Major Damage Type", "Magical Piercing, Lightning, Force");
    irene.operator.addNotableStuff("Insanely Strong against", "Seaborn");
    irene.operator.addNotableStuff("Strong against", "Melee Opponents, Undead");
    irene.operator.addNotableStuff("Weak against", "Flying enemies");
    irene.operator.addNotableStuff("Combat Experience", "SSS Grade (>1000 years)");
    irene.operator.setChemistryWith(NpcID.Jordi, 11, "Thinks he's a nice person, appreciates being able to spend time with him in comfortable silence.");
    irene.operator.professions = ["Inquisitor", "Unemployed (Amnesiac)"];
    irene.operator.era = Era.Timeless;

    irene.sheet.cr = new CRValue(16);
    irene.operator.addNotableStuff("Challenge Rating", "16");

    irene.combat.setSpeed(Speed.Walking,  40);
    irene.combat.setSpeed(Speed.Swimming, 70);
    irene.combat.setSpeed(Speed.Flying,   30);

    irene.combat.setSave(DStat.Dex);
    irene.combat.setSave(DStat.Con, ProficiencyLevel.Expert);
    irene.combat.setSave(DStat.Wis);
    irene.combat.setSave(DStat.Cha);

    irene.combat.addClassLevels(AdventurerClass.Sorcerer, 5);
    irene.combat.addClassLevels(AdventurerClass.Cleric, 2);
    irene.combat.addClassLevels(AdventurerClass.Fighter, 7);
    irene.combat.bonusHP = 32;
    irene.combat.computeHP();

    irene.combat.setSense(Sense.Darkvision,  120);
    irene.combat.setSense(Sense.TremorSense, 120);

    irene.combat.setRes(DamageType.Cold, 100);
    irene.combat.setRes(DamageType.Poison, 100);
    irene.combat.setRes(DamageType.Acid, 100);
    irene.combat.setRes(DamageType.Lightning, 100);
    irene.combat.setRes(DamageType.Psychic, 50);
    irene.combat.setRes(DamageType.Necrotic, 50);

    irene.combat.addConditionImmunity(Condition.Frightened);
    irene.combat.addConditionImmunity(Condition.Blinded);
    irene.combat.addConditionImmunity(Condition.Poisoned);
    irene.combat.addConditionImmunity(Condition.Stunned);
    irene.combat.addConditionImmunity(Condition.Paralyzed);

    irene.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Scourge of the Deep Oceans.</em></strong> Her natural 
        biology and extensive training as an inquisitor 
        has made Irene deadly in the oceans. She can hold her breath indefinitely,
        never takes damage from water pressure and can make her body as buoyant 
        as the wind itself. Additionally, she takes only 20% damage from seaborn 
        creatures and her to-hit rolls and saves against them have advantage, as
        they have disadvantage on attack rolls and saving throws against her.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Blade of the winds.</em></strong> Creatures levitated by Irene 
        without a flying speed are considered restrained. She gains an additional
        +5 to attack rolls against such creatures and deals double damage on all 
        her attacks against those creatures.
        If the levitating creatures are seaborn, she additionally rolls with super-advantage.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Action Surge.</em> (1/SR)</strong> Irene may choose to 
        take an additional action in one of her turns.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Spellcasting.</em></strong> Irene is a 7th level spellcaster 
        and has the following spells prepared (To hit ${wrapRoll(irene.CHA + irene.Prof + 3)} Save DC ${(irene.dc(DStat.Cha)) + 3})</p>
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

    irene.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Multiattack.</em></strong> As an action irene makes two 
        attacks with her rapier and one with her revolver. If there are seaborn 
        in the battlefield, she instead makes 3 rapier and 2 revolver attacks.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Rapier.</em></strong> Melee Weapon Attack: ${wrapRoll(irene.DEX + irene.Prof + 2)}
        reach 5 ft., one target. Hit: ${wrapRoll([[1, D8], [irene.DEX + 2, D1]])} 
        ${wrapDamageType(DamageType.Piercing)} damage (magical) plus ${wrapRoll(D8)} 
        ${wrapDamageType(DamageType.Lightning)} damage.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Revolver.</em></strong> Ranged Weapon Attack: ${wrapRoll(irene.DEX + irene.Prof + 2)} 
        reach 40/120 ft., one target. Hit: ${wrapRoll([[3, D8], [irene.DEX + 2, D1]])} 
        ${wrapDamageType(DamageType.Piercing)} damage (magical). This shot can pierce through enemeies, 
        and she makes attack rolls with disadvantage for every creature within 40 ft behind the primary target.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Electrostatic Shackles. </em>(7/LR)</strong> Irene 
        unleashes a powerful burst of static electricity thrice - on each 
        occasion all creatures within 5 ft of her take ${wrapRoll([[1, D8], [irene.CHA, D1]])}
        ${wrapDamageType(DamageType.Lightning)} damage (halved on a ${irene.dc(DStat.Cha) + 3}
        CON save; one save for all three bursts). After the first burst, 
        instead of sourcing the lightning from herself, she can make any other
        creature who has taken damage from this attack the source instead.<br/> If 
        performed underwater, the ${wrapDamageType(DamageType.Lightning)}
        damage is ${wrapRoll([[3, D8], [irene.CHA, D1]])} instead.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Judgement of the Storms. </em>(1/SR)</strong>
        Irene unleashes The Primal Winds form the Inner Plane of Air to force all creatures
        of her choice within 30 ft to make a DC ${irene.dc(DStat.Cha) + 3} CON 
        save. All creatures who fail take ${wrapRoll([[6, D8], [(irene.CHA + 3), D1]])} 
        ${wrapDamageType(DamageType.Force)} damage and levitate 20 ft
        in the air until the start of her next turn. Creatures who succeed the 
        save take half damage and don't levitate. Immediately after unleashing the winds, she shoots 
        12 times with her revolver, each shot dealing <span class="rollable">${(11 + irene.DEX)}</span> 
        ${wrapDamageType(DamageType.Piercing)} damage to the target and <span class="rollable">${(8)}</span> 
        ${wrapDamageType(DamageType.Lightning)} damage to all creatures within 
        5 ft of the target (including the target).<br/>
        If performed underwater, The Primal Winds first form a bubble of torrential winds of 
        60 ft radius centered on her. In this case every enemy without a flying speed
        automatically is considered to have failed the CON save.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Destructive Wrath.</em> (2/SR)</strong> Irene empowers herself 
        with primal electricity. For the duration of this turn, Irene deals 
        maximum lightning damage on all attacks and her attacks ignore resistance
        to electric damage.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Gust.</em></strong> Irene's next melee attack deals an 
        extra ${wrapRoll([2, D8])} ${wrapDamageType(DamageType.Force)} damage and, should they fail a  
        DC ${irene.dc(DStat.Cha) + 3} CON save, causes the target to levitate 20 ft until the end of her turn.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Calm breeze.</em></strong> Irene moves her flying 
        speed and heals for ${wrapRoll([[1, D10], [7, D1]])} HP. This movement 
        doesn't provoke oppurtunity attacks. If performed underwater, her flying 
        speed is quadrupled, but she can only move upwards.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Quickened Spells.</em> (5/LR)</strong> Irene can cast 
        any of her spells with a casting time of 1 action as a bonus action 
        instead.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Spellcasting.</em></strong> Shield</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Wrath of the storm.</em></strong> Whenever a creature 
        she can see hits Irene with an attack, she can use her reaction to cause 
        it to make a DC ${irene.dc(DStat.Cha) + 3} CON save and take ${wrapRoll([3, D8])} 
        ${wrapDamageType(DamageType.Lightning)} or ${wrapDamageType(DamageType.Thunder)} 
        damage if it fails.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.LegendaryAction,
        "<p>Irene gets 3 legendary actions per round.</p>"
    ));

    irene.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><strong><em>Move.</em> (Costs 1)</strong> Irene moves upto her movement 
        speed.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><strong><em>Levitate.</em> (Costs 1)</strong> Irene casts levitate on 
        one target, consuming a spell slot.</p>`
    ));

    irene.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><strong><em>Shattertide.</em> (Costs 3)</strong> Irene causes upto 6 creatures 
        in a 40 ft cone from her that are ${wrapCreatureSize(CreatureSize.Large)} 
        or smaller to be pushed back to 40 ft distance on a failed DEX 
        save of DC ${irene.dc(DStat.Cha) + 3} and deals ${wrapRoll([3, D8])} 
        ${wrapDamageType(DamageType.Lightning)}, ${wrapDamageType(DamageType.Force)},
        ${wrapDamageType(DamageType.Thunder)} and ${wrapDamageType(DamageType.Piercing)}
        (magical) damage each to them (halved if the DEX save was a success).</p>`
    ));

    irene.combat.addAcBonus(4);
    irene.sheet.size = CreatureSize.Medium;
    irene.sheet.subtitle = " Humanoid (Air Genasi), Lawful Good";
    irene.sheet.acDesc = "(Mastercrafted Studded Leather)";
    irene.sheet.category = "human";
}