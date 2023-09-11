import {
    CSkill,
    DSkill,
    Hidden,
    Prof,
    ProficiencyLevel,
    VisibilityLevel
}                  from "../../../../../data/constants";
import {Rarity}    from "../../../../../data/Rarity";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";
import {Morale}    from "../../../Morale";

export function setupHina()
{
    // Prepare the character object.
    const hina = new Character(NpcID.Hina);

    // Setup core info.
    hina.core.name = "Hina";
    hina.core.imgPath = "character_tokens/C2/Arc1/Hina.png";

    // Setup D&D stats.
    hina.dStats.initializeStats(13, 21, 24, 17, 8, 20);
    hina.dStats.pb = Prof.get(7);

    // Setup D&D skills.
    hina.dSKills.setSkillProficiency(DSkill.Deception, Hidden);
    hina.dSKills.setSkillProficiency(DSkill.Intimidation, Hidden);
    hina.dSKills.setSkillProficiency(DSkill.Investigation, Hidden);
    hina.dSKills.setSkillProficiency(DSkill.Medicine, Hidden);
    hina.dSKills.setSkillProficiency(DSkill.Nature, Hidden);
    hina.dSKills.setSkillProficiency(DSkill.Acrobatics, Hidden, ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(DSkill.History, Hidden, ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(DSkill.Stealth, Hidden, ProficiencyLevel.Expert);
    hina.dSKills.setSkillProficiency(DSkill.Survival, Hidden, ProficiencyLevel.Expert);


    hina.operator.morale = Morale.Dismal;
    hina.operator.fatigue = 20;
    hina.operator.ratings = {
        damage:   16,
        control:  20,
        survival: 23,
    };
    hina.operator.addAffliction("Existential crisis.");
    hina.operator.addAffliction("Survivor's guilt.");
    hina.operator.addAffliction("Battle-shock");
    hina.operator.addNotableStuff("Major Damage Type", "Magical Bludgeoning");
    hina.operator.addNotableStuff("Strong against", "Aberrations, Machines, Huge creatures");
    hina.operator.addNotableStuff("Weak against", "Humanoids");
    hina.operator.addNotableStuff("Combat Experience", "S Grade (7 years)");
    hina.operator.setChemistryWith(NpcID.Dawn, 21, "Although they don't interact much, in her mind, Hina virtually sees her as a mother");
    hina.operator.setChemistryWith(NpcID.Elysium, 17, "The only one in the village who truly knows her - identity, past, nature, everything...");
    hina.operator.addInventoryItem("Rusted blade", Rarity.Artefact);


    hina.dSKills.finalizeSkills();

    // Can have opinions.
    hina.opinions.isOpinionated = true;

    // Card information.
    hina.card.setCampaignArc(2, 1);
    hina.card.addCardTag("F14");
    hina.card.summary = "???";

    // CoC Skills information
    hina.cSkills.setSkillValues([
        [CSkill.Accounting,             80,  VisibilityLevel.Hidden],
        [CSkill.Anthropology,            0,  VisibilityLevel.Hidden],
        [CSkill.Appraise,                0,  VisibilityLevel.Hidden],
        [CSkill.Archaeology,             0,  VisibilityLevel.Hidden],
        [CSkill.Artillery,               0,  VisibilityLevel.Hidden],
        [CSkill.Charm,                   5,  VisibilityLevel.Hidden],
        [CSkill.ComputerUse,           100,  VisibilityLevel.Hidden],
        [CSkill.Demolitions,            90,  VisibilityLevel.Hidden],
        [CSkill.Disguise,                5,  VisibilityLevel.Hidden],
        [CSkill.Diving,                  0,  VisibilityLevel.Hidden],
        [CSkill.DriveAuto,              70,  VisibilityLevel.Hidden],
        [CSkill.ElectricalRepair,       50,  VisibilityLevel.Hidden],
        [CSkill.Electronics,            40,  VisibilityLevel.Hidden],
        [CSkill.FirstAid,               30,  VisibilityLevel.Hidden],
        [CSkill.Hypnosis,                0,  VisibilityLevel.Hidden],
        [CSkill.Law,                     5,  VisibilityLevel.Hidden],
        [CSkill.LibraryUse,             20,  VisibilityLevel.Hidden],
        [CSkill.Locksmith,               0,  VisibilityLevel.Hidden],
        [CSkill.MechanicalRepair,       35,  VisibilityLevel.Hidden],
        [CSkill.Medicine,                0,  VisibilityLevel.Hidden],
        [CSkill.NaturalWorld,           10,  VisibilityLevel.Hidden],
        [CSkill.Navigate,               10,  VisibilityLevel.Hidden],
        [CSkill.Occult,                  5,  VisibilityLevel.Hidden],
        [CSkill.OperateHeavyMachinery,  60,  VisibilityLevel.Hidden],
        [CSkill.Psychoanalysis,          0,  VisibilityLevel.Hidden],
        [CSkill.ReadLips,                0,  VisibilityLevel.Hidden],
        [CSkill.Ride,                   15,  VisibilityLevel.Hidden],
        [CSkill.Throw,                  20,  VisibilityLevel.Hidden],
        [CSkill.Acting,                  5,  VisibilityLevel.Hidden],
        [CSkill.Calligraphy,             0,  VisibilityLevel.Hidden],
        [CSkill.Carpentry,              10,  VisibilityLevel.Hidden],
        [CSkill.Cooking,                20,  VisibilityLevel.Hidden],
        [CSkill.Dancing,                 5,  VisibilityLevel.Hidden],
        [CSkill.FineArt,                20,  VisibilityLevel.Hidden],
        [CSkill.Forgery,                 0,  VisibilityLevel.Hidden],
        [CSkill.Writing,                 5,  VisibilityLevel.Hidden],
        [CSkill.Singing,                 5,  VisibilityLevel.Hidden],
        [CSkill.Painting,               75,  VisibilityLevel.Hidden],
        [CSkill.Photography,             0,  VisibilityLevel.Hidden],
        [CSkill.Sculpting,               0,  VisibilityLevel.Hidden],
        [CSkill.Chainsaw,               10,  VisibilityLevel.Hidden],
        [CSkill.HeavyWeapons,           10,  VisibilityLevel.Hidden],
        [CSkill.Flamethrower,           10,  VisibilityLevel.Hidden],
        [CSkill.MachineGun,             10,  VisibilityLevel.Hidden],
        [CSkill.SubmachineGun,          10,  VisibilityLevel.Hidden],
        [CSkill.Aircraft,               20,  VisibilityLevel.Hidden],
        [CSkill.Boat,                   30,  VisibilityLevel.Hidden],
        [CSkill.Astronomy,               0,  VisibilityLevel.Hidden],
        [CSkill.Biology,                30,  VisibilityLevel.Hidden],
        [CSkill.Botany,                 20,  VisibilityLevel.Hidden],
    ]);


}
