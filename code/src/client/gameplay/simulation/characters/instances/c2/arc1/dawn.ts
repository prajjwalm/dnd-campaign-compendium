import {CSkill, DSkill, ProficiencyLevel} from "../../../../../data/constants";
import {NpcId}                            from "../../../../../data/npcIndex";
import {Character}                        from "../../../Character";

export function setupDawn()
{
    // Prepare the character object.
    const c = new Character(NpcId.Dawn);

    c.core.name = "Dawn";
    c.core.imgPath = "character_tokens/C2/Arc1/Dawn.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(8,  8, 16, 11, 17, 18);
    c.dStats.pb = 4;
    c.dStats.finalize();

    // Setup D&D skills.
    c.dSkills.setSkillProficiency(DSkill.AnimalHandling, );
    c.dSkills.setSkillProficiency(DSkill.Deception, );
    c.dSkills.setSkillProficiency(DSkill.History, );
    c.dSkills.setSkillProficiency(DSkill.Insight, );
    c.dSkills.setSkillProficiency(DSkill.Medicine, );
    c.dSkills.setSkillProficiency(DSkill.Survival, ProficiencyLevel.Prof, 5);
    c.dSkills.setSkillProficiency(DSkill.Persuasion, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Performance, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.SlightOfHand, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill._ALL, ProficiencyLevel.Half);
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
        [CSkill.Accounting,             35,  ],
        [CSkill.Anthropology,            0,  ],
        [CSkill.Appraise,                0,  ],
        [CSkill.Archaeology,             0,  ],
        [CSkill.Artillery,               0,  ],
        [CSkill.Charm,                  15,  ],
        [CSkill.ComputerUse,             5,  ],
        [CSkill.Demolitions,             0,  ],
        [CSkill.Disguise,                5,  ],
        [CSkill.Diving,                  0,  ],
        [CSkill.DriveAuto,              20,  ],
        [CSkill.ElectricalRepair,       10,  ],
        [CSkill.Electronics,             0,  ],
        [CSkill.FirstAid,               60,  ],
        [CSkill.Hypnosis,                0,  ],
        [CSkill.Law,                     5,  ],
        [CSkill.LibraryUse,             20,  ],
        [CSkill.Locksmith,               0,  ],
        [CSkill.MechanicalRepair,       10,  ],
        [CSkill.ModernMedicine, 0, ],
        [CSkill.NaturalWorld,           35,  ],
        [CSkill.Navigate,               10,  ],
        [CSkill.Occult,                  5,  ],
        [CSkill.OperateHeavyMachinery,   0,  ],
        [CSkill.Psychoanalysis,          0,  ],
        [CSkill.ReadLips,                0,  ],
        [CSkill.Ride,                   15,  ],
        [CSkill.Throw,                  20,  ],
        [CSkill.Acting,                  5,  ],
        [CSkill.Calligraphy,            90,  ],
        [CSkill.Carpentry,              10,  ],
        [CSkill.Cooking,                90,  ],
        [CSkill.Dancing,                 5,  ],
        [CSkill.FineArt,                 5,  ],
        [CSkill.Forgery,                 0,  ],
        [CSkill.Writing,                 5,  ],
        [CSkill.Singing,                 5,  ],
        [CSkill.Painting,               75,  ],
        [CSkill.Photography,             0,  ],
        [CSkill.Sculpting,               0,  ],
        [CSkill.Chainsaw,               10,  ],
        [CSkill.HeavyWeapons,           10,  ],
        [CSkill.Flamethrower,           10,  ],
        [CSkill.MachineGun,             10,  ],
        [CSkill.SubmachineGun,          10,  ],
        [CSkill.Aircraft,                0,  ],
        [CSkill.Boat,                    5,  ],
        [CSkill.Astronomy,               0,  ],
        [CSkill.Biology,                 0,  ],
        [CSkill.Botany,                  0,  ],
    ]);
    c.cSkills.finalize();
}
