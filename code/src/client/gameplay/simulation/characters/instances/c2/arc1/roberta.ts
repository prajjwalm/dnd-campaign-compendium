import {CSkill, DSkill, Era, ProficiencyLevel} from "../../../../../data/constants";
import {NpcID}                                 from "../../../../../data/npcIndex";
import {Character}                             from "../../../Character";
import {Morale}                                from "../../../Morale";

export function setupRoberta()
{
    const c = new Character(NpcID.Roberta);

    // Setup core.
    c.core.name = "Roberta";
    c.core.imgPath = "character_tokens/C2/Arc1/Roberta.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(10, 13, 13, 19, 10, 16);
    c.dStats.pb = 4;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.Performance, );
    c.dSkills.setSkillProficiency(DSkill.Investigation, ProficiencyLevel.Half);
    c.dSkills.setSkillProficiency(DSkill.Nature, ProficiencyLevel.Half);
    c.dSkills.setSkillProficiency(DSkill.SlightOfHand, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Medicine, );
    c.dSkills.finalize();

    c.cSkills.setSkillValues([
        [CSkill.Accounting,              5],
        [CSkill.Anthropology,            0],
        [CSkill.Appraise,                0],
        [CSkill.Archaeology,             0],
        [CSkill.Artillery,               0],
        [CSkill.Charm,                  70],
        [CSkill.ComputerUse,            35],
        [CSkill.Demolitions,             0],
        [CSkill.Disguise,               90],
        [CSkill.Diving,                  0],
        [CSkill.DriveAuto,              20],
        [CSkill.ElectricalRepair,       10],
        [CSkill.Electronics,            70],
        [CSkill.FirstAid,               80],
        [CSkill.Hypnosis,                0],
        [CSkill.Law,                     5],
        [CSkill.LibraryUse,             20],
        [CSkill.Locksmith,               0],
        [CSkill.MechanicalRepair,       10],
        [CSkill.ModernMedicine, 50],
        [CSkill.NaturalWorld,           30],
        [CSkill.Navigate,               10],
        [CSkill.Occult,                  5],
        [CSkill.OperateHeavyMachinery,   0],
        [CSkill.Psychoanalysis,          0],
        [CSkill.ReadLips,                0],
        [CSkill.Ride,                   15],
        [CSkill.Throw,                  20],
        [CSkill.Acting,                 35],
        [CSkill.Calligraphy,             0],
        [CSkill.Carpentry,              10],
        [CSkill.Cooking,                20],
        [CSkill.Dancing,                 5],
        [CSkill.FineArt,                50],
        [CSkill.Forgery,                 0],
        [CSkill.Writing,                 5],
        [CSkill.Singing,                 5],
        [CSkill.Painting,                5],
        [CSkill.Photography,            50],
        [CSkill.Sculpting,              20],
        [CSkill.Chainsaw,               10],
        [CSkill.HeavyWeapons,           10],
        [CSkill.Flamethrower,           10],
        [CSkill.MachineGun,             10],
        [CSkill.SubmachineGun,          10],
        [CSkill.Aircraft,                0],
        [CSkill.Boat,                    5],
        [CSkill.Astronomy,               0],
        [CSkill.Biology,                95],
        [CSkill.Botany,                 50],
        [CSkill.Chemistry,              70],
        [CSkill.Cryptography,            0],
        [CSkill.Engineering,             0],
        [CSkill.Forensics,               0],
        [CSkill.Geology,                 0],
        [CSkill.Mathematics,            10],
        [CSkill.Meteorology,             0],
        [CSkill.Pharmacy,               70],
        [CSkill.Physics,                 0],
        [CSkill.Zoology,                 0],
    ]);
    c.cSkills.finalize();

    c.operator.fatigue = 0;
    c.operator.ratings = {
        damage  : "D",
        control : "C",
        survival: "C+",
        pro     : "S+",
    };
    c.operator.era = Era.Future;
    c.operator.professions = ["Makeup artist / Doctor(?)", "Herbalist (Just chilling tbh)"];

    c.operator.addNotableStuff("Major Damage Type", "Acid / Poison / Lightning");
    c.operator.addNotableStuff("Strong against", "Insectoids, Plants, Cyberpunks");
    c.operator.addNotableStuff("Weak against", "Monsters of almost any sort");
    c.operator.addNotableStuff("Terrible against", "Undead, Aberrations");
    c.operator.addNotableStuff("Combat Experience", "D Grade (None)");
    c.operator.addNotableStuff("Challenge Rating", "5");

    c.operator.setChemistryWith(NpcID.Vitacia, 18,
                                      "(Cousin) Though the two belonged to completely different worlds 'back home', " +
                                      "and rarely interacted, they always had a decent level of mutual respect. Became " +
                                      "much closer after moving into the village of Po'Shan.");
    c.operator.setChemistryWith(NpcID.Dawn, 16,
                                      "Trusts Dawn quite a bit and so often treats her as a personal therapist. Greatly " +
                                      "respects her for always lending a ear, despite any superficial attempts to wriggle out.");
    c.operator.setChemistryWith(NpcID.Tomasa, 14,
                                      "Pretty much considers her a 'best friend'.");
    c.operator.setChemistryWith(NpcID.Jaye, 10,
                                      "As a neighbour, she is one of his few regular customers. Loves his sandwiches.");
    c.operator.setChemistryWith(NpcID.Kastor, 10,
                                      "Had a minor crush on him at first, but soon realized he was quite emotionally insecure. " +
                                      "Despite that she feels he's a good person caught up in a bad mess and doesn't mind " +
                                      "spending time with him.");

    c.operator.morale = Morale.Comfortable;
    c.operator.finalize();


    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("F25");
    c.card.addCardTag("CR 5");
    c.card.finalize();
}
