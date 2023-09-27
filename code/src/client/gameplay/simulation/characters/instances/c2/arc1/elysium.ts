import {
    CSkill,
    DSkill,
    Era,
    Hidden,
    Prof,
    ProficiencyLevel, Vague
} from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";
import {Morale}    from "../../../Morale";

export function setupElysium()
{
    const elysium = new Character(NpcID.Elysium);

    elysium.core.name = "Elysium";
    elysium.core.imgPath = "character_tokens/C2/Arc1/Elysium.png";

    // Setup D&D stats.
    elysium.dStats.initializeStats( 8, 18, 14, 15, 18, 10);
    elysium.dStats.pb = Prof.get(5);

    // Setup D&D skills.
    elysium.dSKills.setSkillProficiency(DSkill.Insight, Hidden);
    elysium.dSKills.setSkillProficiency(DSkill.Investigation, Hidden);
    elysium.dSKills.setSkillProficiency(DSkill.Medicine, Hidden);
    elysium.dSKills.setSkillProficiency(DSkill.Stealth, Hidden, ProficiencyLevel.Expert);
    elysium.dSKills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Expert, 5);

    elysium.opinions.isOpinionated = true;

    elysium.operator.morale = Morale.Average;
    elysium.dSKills.finalizeSkills();

    elysium.operator.fatigue = 10;
    elysium.operator.ratings = {
        damage  : "C-",
        control : "SS",
        survival: "D",
        pro     : "S",
    };
    elysium.operator.era = Era.Information;
    elysium.operator.professions = ["Messenger / Logistics", "Messenger"];

    elysium.operator.addNotableStuff("Major Damage Type", "Slashing / Piercing");
    elysium.operator.addNotableStuff("Strong against", "Nothing really (by himself)");
    elysium.operator.addNotableStuff("Combat Experience", "B Grade (5 years / in logistics)");
    elysium.operator.addNotableStuff("Challenge Rating", "9");

    elysium.operator.setChemistryWith(NpcID.Ezell, 31,
                                      "(Boyfriend) During the course of his latest assignment in assisting the Saints, " +
                                      "the two have been through a lot of perilous missions together - including some " +
                                      "outside of professional scope (like finding a cure for Cecilia).");
    elysium.operator.setChemistryWith(NpcID.Jordi, 17,
                                      "Though Jordi doesn't remember, Elysium knows him from a time long ago...");
    elysium.operator.setChemistryWith(NpcID.Dawn, 14,
                                      "Was aware that she was in touch with the entity 'guarding' the village. He could see " +
                                      "her burying sadness and strongly felt she was a good person, despite her secrets. " +
                                      "His respect for her increased significantly after recent events.");
    elysium.operator.setChemistryWith(NpcID.Hina, 13,
                                      "Feels a strong sense of sympathy and a slight paternal instinct for her. Understands " +
                                      "her situation and periodically smuggles stuff she needs. Also spoils her rotten.");
    elysium.operator.setChemistryWith(NpcID.Cecelia, 11,
                                      "Has known her from almost the day she was born. Is quite empathetic to her situation " +
                                      "and feels she is too good a person to die so young. Also Ezell's concern for her has " +
                                      "made him quite invested in her fate.");

    elysium.cSkills.setSkillValues([
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
        [CSkill.ModernMedicine, 0, Vague],
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


    elysium.card.setCampaignArc(2, 1);

    elysium.card.addCardTag("M33");
}
