import {CSkill, VisibilityLevel} from "../../../data/constants";
import {Rating}                  from "../../../data/Rarity";
import {Character}               from "../Character";
import {BaseAspect}              from "./BaseAspect";
import {ICSkills}                from "./ICSkills";
import {ICSkillsFactory}         from "./ICSkillsFactory";


/**
 * Default implementation of a D&D skills aspect. Relies on the Stats and
 * Proficiency aspects to work.
 */
export class CSkillsAspect
    extends BaseAspect
    implements ICSkills,
               ICSkillsFactory
{
    private static readonly BASE_VALUES = new Map([
        [CSkill.Accounting,              5],
        [CSkill.Anthropology,            0],
        [CSkill.Appraise,                0],
        [CSkill.Archaeology,             0],
        [CSkill.Artillery,               0],
        [CSkill.Charm,                  15],
        [CSkill.ComputerUse,             5],
        [CSkill.Demolitions,             0],
        [CSkill.Disguise,                5],
        [CSkill.Diving,                  0],
        [CSkill.DriveAuto,              20],
        [CSkill.ElectricalRepair,       10],
        [CSkill.Electronics,             0],
        [CSkill.FirstAid,               30],
        [CSkill.Hypnosis,                0],
        [CSkill.Law,                     5],
        [CSkill.LibraryUse,             20],
        [CSkill.Locksmith,               0],
        [CSkill.MechanicalRepair,       10],
        [CSkill.ModernMedicine,          0],
        [CSkill.NaturalWorld,           10],
        [CSkill.Navigate,               10],
        [CSkill.Occult,                  5],
        [CSkill.OperateHeavyMachinery,   0],
        [CSkill.Psychoanalysis,          0],
        [CSkill.ReadLips,                0],
        [CSkill.Ride,                   15],
        [CSkill.Throw,                  20],
        [CSkill.Acting,                  5],
        [CSkill.Calligraphy,             0],
        [CSkill.Carpentry,              10],
        [CSkill.Cooking,                20],
        [CSkill.Dancing,                 5],
        [CSkill.FineArt,                 5],
        [CSkill.Forgery,                 0],
        [CSkill.Writing,                 5],
        [CSkill.Singing,                 5],
        [CSkill.Painting,                5],
        [CSkill.Photography,             0],
        [CSkill.Sculpting,               0],
        [CSkill.Chainsaw,               10],
        [CSkill.HeavyWeapons,           10],
        [CSkill.Flamethrower,           10],
        [CSkill.MachineGun,             10],
        [CSkill.SubmachineGun,          10],
        [CSkill.Aircraft,                0],
        [CSkill.Boat,                    5],
        [CSkill.Astronomy,               0],
        [CSkill.Biology,                 0],
        [CSkill.Botany,                  0],
        [CSkill.Chemistry,               0],
        [CSkill.Cryptography,            0],
        [CSkill.Engineering,             0],
        [CSkill.Forensics,               0],
        [CSkill.Geology,                 0],
        [CSkill.Mathematics,            10],
        [CSkill.Meteorology,             0],
        [CSkill.Pharmacy,                0],
        [CSkill.Physics,                 0],
        [CSkill.Zoology,                 0],
    ])

    private static getRatingForSkillModifier(v: number): Rating
    {
        if (v < 5) {
            return Rating.F;
        }
        if (v < 20) {
            return Rating.E;
        }
        if (v < 50) {
            return Rating.D;
        }
        if (v < 75) {
            return Rating.C;
        }
        if (v < 90) {
            return Rating.B;
        }
        if (v < 100) {
            return Rating.A;
        }
        if (v < 150) {
            return Rating.S;
        }
        if (v < 200) {
            return Rating.SS;
        }
        return Rating.SSS;
    }

    /**
     * The skills this character is notable in.
     */
    private readonly skills: Map<CSkill, [number, VisibilityLevel]>;

    /**
     * CTOR.
     */
    constructor(c: Character)
    {
        super(c);
        this.skills = new Map();
    }

    public duplicate(other: Character): this
    {
        const aspect = new CSkillsAspect(other);
        for (const [skill, [val, vis]] of this.skills.entries()) {
            aspect.skills.set(skill, [val, vis]);
        }
        return aspect as this;
    }

    public getSkillVal(skill: CSkill): [number, VisibilityLevel]
    {
        return this.skills.get(skill);
    }

    public setSkillValue(skill: CSkill,
                         value: number,
                         visibility: VisibilityLevel)
    {
        if (value == CSkillsAspect.BASE_VALUES.get(skill)) {
            return;
        }
        this.skills.set(skill, [value, visibility]);
    }

    public setSkillValues(data: [CSkill, number, VisibilityLevel][])
    {
        for (const datum of data) {
            if (datum[1] == CSkillsAspect.BASE_VALUES.get(datum[0])) {
                continue;
            }
            this.skills.set(datum[0], [datum[1], datum[2]]);
        }
    }

    public get cSkillRatings(): ReadonlyMap<CSkill, Rating>
    {
        const ratings: Map<CSkill, Rating> = new Map();
        for (const [skill, [value, _]] of this.skills.entries()) {
            ratings.set(skill, CSkillsAspect.getRatingForSkillModifier(value));
        }
        return ratings;
    }
}