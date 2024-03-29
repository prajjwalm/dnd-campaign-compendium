import {CSkill, DSkill, Hidden, ProficiencyLevel} from "../../../../../data/constants";
import {NpcID}                                    from "../../../../../data/npcIndex";
import {Character}                                from "../../../Character";

export function setupDawn()
{
    // Prepare the character object.
    const c = new Character(NpcID.Dawn);

    c.core.name = "Dawn";
    c.core.imgPath = "character_tokens/C2/Arc1/Dawn.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(8,  8, 16, 11, 17, 18);
    c.dStats.pb = 4;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.AnimalHandling, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Deception, Hidden);
    c.dSkills.setSkillProficiency(DSkill.History, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Insight, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Medicine, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Survival, Hidden, ProficiencyLevel.Prof, 5);
    c.dSkills.setSkillProficiency(DSkill.Persuasion, Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Performance, Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.SlightOfHand, Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill._ALL, Hidden, ProficiencyLevel.Half);
    c.dSkills.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    // Card information.
    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("F405 (32)");
    c.card.addCardTag("From | Materia<span class='verbose'>(Naiyumi)</span> / Devotion");
    c.card.addCardTag("Race | Human");
    c.card.addCardTag("CR 8");

    c.card.summary = () =>`
    The gentle and reserved pawn shop owner and the de facto caretaker of the small mountainous village of Po'shan. 
    Appears to hide quite a bit of pain underneath a sad smile. Was born in the hinterlands of Naiyumi around 
    1200 AR. Kept witnessing the residents of her village constantly get slaughtered again and again, and lose 
    quite a bit of the memories of their times spent together again and again.<br/>
    <div class="effect_tag">Incomplete</div>`;

    c.card.finalize();

    //         // [NpcPersonalityTag["Nature Lover"], 3],
    //         // [NpcPersonalityTag.Industrious, 2],
    //         // [NpcPersonalityTag.Ascetic, 2],
    //         // [NpcPersonalityTag["Abhors Violence"], 2],
    //         // [NpcPersonalityTag.Homosexual, 1],
    //         // [NpcPersonalityTag.Accepting, 1],
    //         // [NpcPersonalityTag.Depressive, 1],

    c.cSkills.setSkillValues([
        [CSkill.Accounting,             35,  Hidden],
        [CSkill.Anthropology,            0,  Hidden],
        [CSkill.Appraise,                0,  Hidden],
        [CSkill.Archaeology,             0,  Hidden],
        [CSkill.Artillery,               0,  Hidden],
        [CSkill.Charm,                  15,  Hidden],
        [CSkill.ComputerUse,             5,  Hidden],
        [CSkill.Demolitions,             0,  Hidden],
        [CSkill.Disguise,                5,  Hidden],
        [CSkill.Diving,                  0,  Hidden],
        [CSkill.DriveAuto,              20,  Hidden],
        [CSkill.ElectricalRepair,       10,  Hidden],
        [CSkill.Electronics,             0,  Hidden],
        [CSkill.FirstAid,               60,  Hidden],
        [CSkill.Hypnosis,                0,  Hidden],
        [CSkill.Law,                     5,  Hidden],
        [CSkill.LibraryUse,             20,  Hidden],
        [CSkill.Locksmith,               0,  Hidden],
        [CSkill.MechanicalRepair,       10,  Hidden],
        [CSkill.ModernMedicine, 0, Hidden],
        [CSkill.NaturalWorld,           35,  Hidden],
        [CSkill.Navigate,               10,  Hidden],
        [CSkill.Occult,                  5,  Hidden],
        [CSkill.OperateHeavyMachinery,   0,  Hidden],
        [CSkill.Psychoanalysis,          0,  Hidden],
        [CSkill.ReadLips,                0,  Hidden],
        [CSkill.Ride,                   15,  Hidden],
        [CSkill.Throw,                  20,  Hidden],
        [CSkill.Acting,                  5,  Hidden],
        [CSkill.Calligraphy,            90,  Hidden],
        [CSkill.Carpentry,              10,  Hidden],
        [CSkill.Cooking,                90,  Hidden],
        [CSkill.Dancing,                 5,  Hidden],
        [CSkill.FineArt,                 5,  Hidden],
        [CSkill.Forgery,                 0,  Hidden],
        [CSkill.Writing,                 5,  Hidden],
        [CSkill.Singing,                 5,  Hidden],
        [CSkill.Painting,               75,  Hidden],
        [CSkill.Photography,             0,  Hidden],
        [CSkill.Sculpting,               0,  Hidden],
        [CSkill.Chainsaw,               10,  Hidden],
        [CSkill.HeavyWeapons,           10,  Hidden],
        [CSkill.Flamethrower,           10,  Hidden],
        [CSkill.MachineGun,             10,  Hidden],
        [CSkill.SubmachineGun,          10,  Hidden],
        [CSkill.Aircraft,                0,  Hidden],
        [CSkill.Boat,                    5,  Hidden],
        [CSkill.Astronomy,               0,  Hidden],
        [CSkill.Biology,                 0,  Hidden],
        [CSkill.Botany,                  0,  Hidden],
    ]);
    c.cSkills.finalize();
}
