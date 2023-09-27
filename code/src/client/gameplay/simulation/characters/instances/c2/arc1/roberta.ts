import {
    CSkill,
    DSkill,
    Era,
    Hidden,
    Prof,
    ProficiencyLevel,
    Vague
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";
import {Morale}    from "../../../Morale";

export function setupRoberta()
{
    const roberta = new Character(NpcID.Roberta);

    // Setup core.
    roberta.core.name = "Roberta";
    roberta.core.imgPath = "character_tokens/C2/Arc1/Roberta.png";

    // Setup D&D stats.
    roberta.dStats.initializeStats(10, 13, 13, 19, 10, 16);
    roberta.dStats.pb = Prof.get(4);

    // Setup D&D skills.
    roberta.dSKills.setSkillProficiency(DSkill.Performance, Hidden);
    roberta.dSKills.setSkillProficiency(DSkill.Investigation, Hidden, ProficiencyLevel.Half);
    roberta.dSKills.setSkillProficiency(DSkill.Nature, Hidden, ProficiencyLevel.Half);
    roberta.dSKills.setSkillProficiency(DSkill.SlightOfHand, Hidden, ProficiencyLevel.Expert);
    roberta.dSKills.setSkillProficiency(DSkill.Medicine, Hidden);

    roberta.opinions.isOpinionated = true;

    roberta.operator.morale = Morale.Comfortable;
    roberta.dSKills.finalizeSkills();

    roberta.operator.fatigue = 0;
    roberta.operator.ratings = {
        damage  : "D",
        control : "C",
        survival: "C+",
        pro     : "S+",
    };
    roberta.operator.era = Era.Future;
    roberta.operator.professions = ["Makeup artist / Doctor(?)", "Herbalist (Just chilling tbh)"];

    roberta.operator.addNotableStuff("Major Damage Type", "Acid / Poison / Lightning");
    roberta.operator.addNotableStuff("Strong against", "Insectoids, Plants, Cyberpunks");
    roberta.operator.addNotableStuff("Terrible against", "Undead, Aberrations");
    roberta.operator.addNotableStuff("Weak against", "Monsters of almost any sort");
    roberta.operator.addNotableStuff("Combat Experience", "D Grade (None)");
    roberta.operator.addNotableStuff("Challenge Rating", "5");

    roberta.operator.setChemistryWith(NpcID.Vitacia, 18,
                                      "(Cousin) Though the two belonged to completely different worlds 'back home', " +
                                      "and rarely interacted, they always had a decent level of mutual respect. Became " +
                                      "much closer after moving into the village of Po'Shan.");
    roberta.operator.setChemistryWith(NpcID.Dawn, 16,
                                      "Trusts Dawn quite a bit and so often treats her as a personal therapist. Greatly " +
                                      "respects her for always lending a ear, despite superficial attempts to wriggle out.");
    roberta.operator.setChemistryWith(NpcID.Tomasa, 14,
                                      "Pretty much considers her a 'best friend'.");
    roberta.operator.setChemistryWith(NpcID.Jaye, 10,
                                      "As a neighbour, she is one of his few regular customers. Loves his sandwiches.");
    roberta.operator.setChemistryWith(NpcID.Kastor, 10,
                                      "Had a minor crush on him at first, but soon realized he was quite emotionally insecure. " +
                                      "Despite that she feels he's a good person caught up in a bad mess and doesn't mind " +
                                      "spending time with him.");

    roberta.cSkills.setSkillValues([
       [CSkill.Accounting,              5,  Vague],
       [CSkill.Anthropology,            0,  Vague],
       [CSkill.Appraise,                0,  Vague],
       [CSkill.Archaeology,             0,  Vague],
       [CSkill.Artillery,               0,  Vague],
       [CSkill.Charm,                  70,  Vague],
       [CSkill.ComputerUse,            35,  Vague],
       [CSkill.Demolitions,             0,  Vague],
       [CSkill.Disguise,               90,  Vague],
       [CSkill.Diving,                  0,  Vague],
       [CSkill.DriveAuto,              20,  Vague],
       [CSkill.ElectricalRepair,       10,  Vague],
       [CSkill.Electronics,            70,  Vague],
       [CSkill.FirstAid,               80,  Vague],
       [CSkill.Hypnosis,                0,  Vague],
       [CSkill.Law,                     5,  Vague],
       [CSkill.LibraryUse,             20,  Vague],
       [CSkill.Locksmith,               0,  Vague],
       [CSkill.MechanicalRepair,       10,  Vague],
       [CSkill.ModernMedicine, 50, Vague],
       [CSkill.NaturalWorld,           30,  Vague],
       [CSkill.Navigate,               10,  Vague],
       [CSkill.Occult,                  5,  Vague],
       [CSkill.OperateHeavyMachinery,   0,  Vague],
       [CSkill.Psychoanalysis,          0,  Vague],
       [CSkill.ReadLips,                0,  Vague],
       [CSkill.Ride,                   15,  Vague],
       [CSkill.Throw,                  20,  Vague],
       [CSkill.Acting,                 35,  Vague],
       [CSkill.Calligraphy,             0,  Vague],
       [CSkill.Carpentry,              10,  Vague],
       [CSkill.Cooking,                20,  Vague],
       [CSkill.Dancing,                 5,  Vague],
       [CSkill.FineArt,                50,  Vague],
       [CSkill.Forgery,                 0,  Vague],
       [CSkill.Writing,                 5,  Vague],
       [CSkill.Singing,                 5,  Vague],
       [CSkill.Painting,                5,  Vague],
       [CSkill.Photography,            50,  Vague],
       [CSkill.Sculpting,              20,  Vague],
       [CSkill.Chainsaw,               10,  Vague],
       [CSkill.HeavyWeapons,           10,  Vague],
       [CSkill.Flamethrower,           10,  Vague],
       [CSkill.MachineGun,             10,  Vague],
       [CSkill.SubmachineGun,          10,  Vague],
       [CSkill.Aircraft,                0,  Vague],
       [CSkill.Boat,                    5,  Vague],
       [CSkill.Astronomy,               0,  Vague],
       [CSkill.Biology,                95,  Vague],
       [CSkill.Botany,                 50,  Vague],
       [CSkill.Chemistry,              70,  Vague],
       [CSkill.Cryptography,            0,  Vague],
       [CSkill.Engineering,             0,  Vague],
       [CSkill.Forensics,               0,  Vague],
       [CSkill.Geology,                 0,  Vague],
       [CSkill.Mathematics,            10,  Vague],
       [CSkill.Meteorology,             0,  Vague],
       [CSkill.Pharmacy,               70,  Vague],
       [CSkill.Physics,                 0,  Vague],
       [CSkill.Zoology,                 0,  Vague],
   ]);

    roberta.card.setCampaignArc(2, 1);
    roberta.card.addCardTag("F25");
}
