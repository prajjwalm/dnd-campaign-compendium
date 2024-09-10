import {Activation, AdventurerClass, CreatureSize, CSkill, DamageType, DSkill, DStat, Era, ProficiencyLevel, Sense, Speed, } from "../../../../../data/constants";
import {NpcId}                                                                                                               from "../../../../../data/npcIndex";
import {D1, D12, D6}                                                                                                         from "../../../../../rolling/Dice";
import {Action}                                                                                                                            from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                                                          from "../../../../action/Wrap";
import {Character}                                                                                                                         from "../../../Character";
import {Morale}                                                                                                                            from "../../../Morale";

export function setupJordi()
{
    const c = new Character(NpcId.Jordi);

    c.core.name = "Jordi";
    c.core.imgPath = "character_tokens/C2/Arc1/Jordi.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(10, 14, 14, 13, 19, 13);
    c.dStats.pb = 3;
    c.dStats.finalize();


    c.dSkills.setSkillProficiency(DSkill.Acrobatics, );
    c.dSkills.setSkillProficiency(DSkill.Perception, );
    c.dSkills.setSkillProficiency(DSkill.Insight, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Medicine, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Religion,   );
    c.dSkills.setSkillProficiency(DSkill.Persuasion, );
    c.dSkills.finalize();

    c.cSkills.setSkillValues([
        [CSkill.Accounting,                     5],
        [CSkill.Anthropology,                   0],
        [CSkill.Appraise,                       0],
        [CSkill.Archaeology,                    0],
        [CSkill.Artillery,                      0],
        [CSkill.Charm,                         15],
        [CSkill.ComputerUse,                    5],
        [CSkill.Demolitions,                    0],
        [CSkill.Disguise,                       5],
        [CSkill.Diving,                       100],
        [CSkill.DriveAuto,                     20],
        [CSkill.ElectricalRepair,              10],
        [CSkill.Electronics,                    0],
        [CSkill.FirstAid,                      70],
        [CSkill.Hypnosis,                       0],
        [CSkill.Law,                            5],
        [CSkill.LibraryUse,                    20],
        [CSkill.Locksmith,                      0],
        [CSkill.MechanicalRepair,              10],
        [CSkill.ModernMedicine,                 0],
        [CSkill.NaturalWorld,                  30],
        [CSkill.Navigate,                      60],
        [CSkill.Occult,                         5],
        [CSkill.OperateHeavyMachinery,          0],
        [CSkill.Psychoanalysis,                 0],
        [CSkill.ReadLips,                       0],
        [CSkill.Ride,                          15],
        [CSkill.Throw,                         20],
        [CSkill.Acting,                         5],
        [CSkill.Calligraphy,                    0],
        [CSkill.Carpentry,                     10],
        [CSkill.Cooking,                       50],
        [CSkill.Dancing,                        5],
        [CSkill.FineArt,                        5],
        [CSkill.Forgery,                        0],
        [CSkill.Writing,                        5],
        [CSkill.Singing,                        5],
        [CSkill.Painting,                       5],
        [CSkill.Photography,                    0],
        [CSkill.Sculpting,                      0],
        [CSkill.Chainsaw,                      10],
        [CSkill.HeavyWeapons,                  10],
        [CSkill.Flamethrower,                  10],
        [CSkill.MachineGun,                    10],
        [CSkill.SubmachineGun,                 10],
        [CSkill.Aircraft,                       0],
        [CSkill.Boat,                          65],
        [CSkill.Astronomy,                      0],
        [CSkill.Biology,                        0],
        [CSkill.Botany,                         0],
        [CSkill.Chemistry,                      0],
        [CSkill.Cryptography,                   0],
        [CSkill.Engineering,                    0],
        [CSkill.Forensics,                      0],
        [CSkill.Geology,                        0],
        [CSkill.Mathematics,                   10],
        [CSkill.Meteorology,                    0],
        [CSkill.Pharmacy,                       0],
        [CSkill.Physics,                        0],
        [CSkill.Zoology,                        0],
    ]);

    c.operator.fatigue = 0;
    c.operator.ratings = {
        damage  : "C",
        control : "C+",
        survival: "A",
        pro     : "B",
    };
    c.operator.addNotableStuff("Major Damage Type", "Radiant");
    c.operator.addNotableStuff("Strong against", "Seaborn, Status-Inflicting Enemies");
    c.operator.addNotableStuff("Weak against", "Martials");
    c.operator.addNotableStuff("Combat Experience", "C Grade (1 years)");
    c.operator.setChemistryWith(NpcId.Hav, 21, "His GodFather/adoptive uncle, and the only link to his past. Had a great deal of respect for Hav.");
    c.operator.setChemistryWith(NpcId.Irene, 17, "Really took to her after she arrived. Perceived a  depth of character to her and resonated " +
                                                 "strongly with that. Crushes on her.");
    c.operator.setChemistryWith(NpcId.Elysium, 16, "For some reason, Elysium had always been kind to him, and Jordi reciprocates that. Now he " +
                                                   "begins to remember that he might've met him before...");
    c.operator.setChemistryWith(NpcId.Petra, 14, "She's been a really kind grandma to him since she arrived. Perhaps too late, he finally " +
                                                 "remembers his adoptive younger sister from before he was lost in the tides of the profound silence.");
    c.operator.setChemistryWith(NpcId.Yuki, 10, "Always took his side against Kastor's bullying and to Jordi he seems to radiate the aura of a " +
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
