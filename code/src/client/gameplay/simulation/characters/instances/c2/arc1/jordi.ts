import {Activation, AdventurerClass, CreatureSize, CSkill, DamageType, DSkill, DStat, Era, Hidden, ProficiencyLevel, Sense, Speed, Vague,} from "../../../../../data/constants";
import {NpcID}                                                                                                                             from "../../../../../data/npcIndex";
import {D1, D12, D6}                                                                                                                       from "../../../../../rolling/Dice";
import {Action}                                                                                                                            from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                                                          from "../../../../action/Wrap";
import {Character}                                                                                                                         from "../../../Character";
import {Morale}                                                                                                                            from "../../../Morale";

export function setupJordi()
{
    const c = new Character(NpcID.Jordi);

    c.core.name = "Jordi";
    c.core.imgPath = "character_tokens/C2/Arc1/Jordi.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(10, 14, 14, 13, 19, 13);
    c.dStats.pb = 3;
    c.dStats.finalize();


    c.dSkills.setSkillProficiency(DSkill.Acrobatics, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Perception, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Insight,    Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Medicine,   Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Religion,   Hidden);
    c.dSkills.setSkillProficiency(DSkill.Persuasion, Hidden);
    c.dSkills.finalize();

    c.cSkills.setSkillValues([
        [CSkill.Accounting,                     5,    Vague],
        [CSkill.Anthropology,                   0,    Vague],
        [CSkill.Appraise,                       0,    Vague],
        [CSkill.Archaeology,                    0,    Vague],
        [CSkill.Artillery,                      0,    Vague],
        [CSkill.Charm,                         15,    Vague],
        [CSkill.ComputerUse,                    5,    Vague],
        [CSkill.Demolitions,                    0,    Vague],
        [CSkill.Disguise,                       5,    Vague],
        [CSkill.Diving,                       100,    Vague],
        [CSkill.DriveAuto,                     20,    Vague],
        [CSkill.ElectricalRepair,              10,    Vague],
        [CSkill.Electronics,                    0,    Vague],
        [CSkill.FirstAid,                      70,    Vague],
        [CSkill.Hypnosis,                       0,    Vague],
        [CSkill.Law,                            5,    Vague],
        [CSkill.LibraryUse,                    20,    Vague],
        [CSkill.Locksmith,                      0,    Vague],
        [CSkill.MechanicalRepair,              10,    Vague],
        [CSkill.ModernMedicine,                 0,    Vague],
        [CSkill.NaturalWorld,                  30,    Vague],
        [CSkill.Navigate,                      60,    Vague],
        [CSkill.Occult,                         5,    Vague],
        [CSkill.OperateHeavyMachinery,          0,    Vague],
        [CSkill.Psychoanalysis,                 0,    Vague],
        [CSkill.ReadLips,                       0,    Vague],
        [CSkill.Ride,                          15,    Vague],
        [CSkill.Throw,                         20,    Vague],
        [CSkill.Acting,                         5,    Vague],
        [CSkill.Calligraphy,                    0,    Vague],
        [CSkill.Carpentry,                     10,    Vague],
        [CSkill.Cooking,                       50,    Vague],
        [CSkill.Dancing,                        5,    Vague],
        [CSkill.FineArt,                        5,    Vague],
        [CSkill.Forgery,                        0,    Vague],
        [CSkill.Writing,                        5,    Vague],
        [CSkill.Singing,                        5,    Vague],
        [CSkill.Painting,                       5,    Vague],
        [CSkill.Photography,                    0,    Vague],
        [CSkill.Sculpting,                      0,    Vague],
        [CSkill.Chainsaw,                      10,    Vague],
        [CSkill.HeavyWeapons,                  10,    Vague],
        [CSkill.Flamethrower,                  10,    Vague],
        [CSkill.MachineGun,                    10,    Vague],
        [CSkill.SubmachineGun,                 10,    Vague],
        [CSkill.Aircraft,                       0,    Vague],
        [CSkill.Boat,                          65,    Vague],
        [CSkill.Astronomy,                      0,    Vague],
        [CSkill.Biology,                        0,    Vague],
        [CSkill.Botany,                         0,    Vague],
        [CSkill.Chemistry,                      0,    Vague],
        [CSkill.Cryptography,                   0,    Vague],
        [CSkill.Engineering,                    0,    Vague],
        [CSkill.Forensics,                      0,    Vague],
        [CSkill.Geology,                        0,    Vague],
        [CSkill.Mathematics,                   10,    Vague],
        [CSkill.Meteorology,                    0,    Vague],
        [CSkill.Pharmacy,                       0,    Vague],
        [CSkill.Physics,                        0,    Vague],
        [CSkill.Zoology,                        0,    Vague],
    ]);

    c.operator.fatigue = 0;
    c.operator.ratings = {
        damage  : "C",
        control : "C+",
        survival: "B",
        pro     : "B",
    };
    c.operator.addNotableStuff("Major Damage Type", "Radiant");
    c.operator.addNotableStuff("Strong against", "Seaborn, Status-Inflicting Enemies");
    c.operator.addNotableStuff("Weak against", "Martials");
    c.operator.addNotableStuff("Combat Experience", "C Grade (1 years)");
    c.operator.setChemistryWith(NpcID.Hav, 21, "His GodFather/adoptive uncle, and the only link to his past. Had a great deal of respect for Hav.");
    c.operator.setChemistryWith(NpcID.Irene, 17, "Really took to her after she arrived. Perceived a hidden depth of character to her and resonated " +
                                                     "strongly with that. Crushes on her.");
    c.operator.setChemistryWith(NpcID.Elysium, 16, "For some reason, Elysium had always been kind to him, and Jordi reciprocates that. Now he barely " +
                                                       "begins to remember that he might've met him before...");
    c.operator.setChemistryWith(NpcID.Petra, 14, "She's been a really kind grandma to him since she arrived. Something nags at the back of his mind " +
                                                     "when with her, but he just can't pinpoint it...");
    c.operator.setChemistryWith(NpcID.Hina, 11, "Thinks of her as a younger sister, though he's not fully sure why.");
    c.operator.setChemistryWith(NpcID.Yuki, 10, "Always took his side against Kastor's bullying and to Jordi he seems to radiate the aura of a " +
                                                    "noble warrior.");
    c.operator.professions = ["Church Keeper", "Fisherman"];
    c.operator.era = Era.Renaissance;
    c.operator.morale = Morale.Average;
    c.operator.addNotableStuff("Challenge Rating", "5");
    c.operator.finalize();

    //todo
    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("M23");
    c.card.addCardTag("CR 5");
    c.card.addCardTag("From | Terra (Atlava)");
    c.card.addCardTag("Race | Ocean Elf");
    c.card.finalize();

    c.combat.cr = 5

    c.combat.setSpeed(Speed.Walking,  30);
    c.combat.setSpeed(Speed.Swimming, 55);

    c.combat.setSave(DStat.Wis);
    c.combat.setSave(DStat.Cha);

    c.combat.addClassLevels(AdventurerClass.Cleric, 3);
    c.combat.addClassLevels(AdventurerClass.Rogue, 2);
    c.combat.bonusHP = 9;
    c.combat.computeHP();

    c.combat.setSense(Sense.Darkvision, 60);

    c.combat.setRes(DamageType.Cold, 50);
    c.combat.setRes(DamageType.Poison, 50);


    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Scion of the Deep Oceans.</em></strong> Having descended 
        from a race of elves inhabiting the depths of the oceans in the plane of
        water, Jordi can breathe underwater. Moreover, he will never take 
        damage due to water pressure and while underwater he is immune to 
        exhaustion and has a much faster movement speed. Lastly, he has a 
        natural affinity to the brand which recognizes it as one of their own, 
        his heals are considered 'Crits' when he's standing on the nethersea 
        brand or swimming in water corrupted by the primordial soup.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Ocean's Caress.</em></strong> Anyone healed by Jordi
        would typically gain one level of <em>Facet: Cerulean Glow</em> unless 
        their facet was already 4 or more, or if they had already received this
        increase after their previous long rest.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Warm Drizzle.</em> (${c.WIS} / LR) </strong> For the
        next minute, Jordi can, as an action, heal an ally within 90 ft for 
        ${wrapRoll([[2, D6], [c.WIS + 3, D1]])} HP. Anyone healed by Jordi 
        gains a one time shield against standard negative status effects. The next time 
        they would suffer from a status effect, it is nullified, and they instead
        heal for ${wrapRoll([[1, D12], [c.WIS + 3, D1]])} HP.
        Once depleted, they cannot get another shield, even if healed, until the
        start of their next turn.<br/>
        <em>The shield effect is suppressed if 'Graceful Downpour' or 'The Lantern Undying'
        are activated.</em></p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Graceful Downpour.</em> (${c.Prof} / SR) </strong> 
         Jordi heals three creatures within 120 ft for ${wrapRoll([[3, D6], [c.WIS + 8, D1]])} HP
         and removes any one standard negative status effect they have.<br/>
         <em>The cleansing effect is suppressed if 'The Lantern Undying' is activated.</em> </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>The Lantern Undying.</em> (1 / LR) </strong> 
         Jordi's lantern blazes with aquamarine radiance. Until his next turn, Jordi gains
         ${c.WIS + c.Prof} legendary actions. He can consume 2 legendary actions
         to heal a creature within 150 ft for ${wrapRoll([[6, D6], [c.WIS + c.Prof + 18, D1]])} HP
         while dealing ${wrapDamageType(DamageType.Radiant)} damage equal to 20%
         of the amount of healing recieved to all creatures within 10 ft of himself
         and the healing target. Immediately after healing a target this way, he 
         may consume another 5 legendary actions to heal the target by that amount 
         again and remove ALL negative status effects they have, including non-standard effects.
         This is one of the few effects that also removes any negative effects due to advanced damage 
         types, including wither or fragile.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Cunning action.</em></strong> 
         Jordi can take the dash, disengage, or hide action.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Quick Fix.</em></strong> Anytime a creature takes 
        damage and would suffer from a standard status effect from the same attack, Jordi can instantly heal 
        the creature for ${wrapRoll([[2, D6], [c.WIS + 3, D1]])} HP, granting
        them immunity to suffering any new status effects until the end of that turn, including the one which triggered this.</p>`
    ));

    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Humanoid (Sea Elf), Neutral Good";
    c.sheet.acDesc = "(Natural Armor)";
    c.sheet.category = "human";
    c.sheet.finalize();
}
