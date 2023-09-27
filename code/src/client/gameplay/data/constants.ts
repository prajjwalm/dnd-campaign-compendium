import {D10, D100, D12, D20, D4, D6, D8, Dice} from "../rolling/Dice";


export enum DStat {
    Str = 0,
    Dex = 1,
    Con = 2,
    Int = 3,
    Wis = 4,
    Cha = 5,
}

// The order matters here.
export enum ProficiencyLevel {
    None,
    Half,
    Prof,
    Expert,
}

export enum Sense {
    Darkvision,
    BlindSight,
    TremorSense,
    TrueSight,
    DevilSight,
    _NonStandard,
    SteelSight,
}

export const senseStr: Map<Sense,string> = new Map([
    [Sense.Darkvision,  "Darkvision"],
    [Sense.BlindSight,  "Blindsight"],
    [Sense.TremorSense, "Tremor Sense"],
    [Sense.TrueSight,   "Truesight"],
    [Sense.DevilSight,  "Devil's Sight"],
    [Sense.SteelSight,  "Steelsight"],
]);

export enum CreatureSize {
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuan,
    _NonStandard,
    Cosmic,
}

export const SizeToDice = new Map<CreatureSize, Dice>([
    [CreatureSize.Tiny,       D4],
    [CreatureSize.Small,      D6],
    [CreatureSize.Medium,     D8],
    [CreatureSize.Large,      D10],
    [CreatureSize.Huge,       D12],
    [CreatureSize.Gargantuan, D20],
    [CreatureSize.Cosmic,     D100],
])

export enum DSkill {
    Acrobatics,
    AnimalHandling,
    Arcana,
    Athletics,
    Deception,
    History,
    Insight,
    Intimidation,
    Investigation,
    Medicine,
    Nature,
    Perception,
    Performance,
    Persuasion,
    Religion,
    SlightOfHand,
    Stealth,
    Survival,
    _ALL,
    _NonStandard,
    Honor,
}

export const StatForSkill : Map<DSkill, DStat> = new Map([
    [DSkill.Acrobatics, DStat.Dex],
    [DSkill.AnimalHandling, DStat.Wis],
    [DSkill.Arcana, DStat.Int],
    [DSkill.Athletics, DStat.Str],
    [DSkill.Deception, DStat.Cha],
    [DSkill.History, DStat.Int],
    [DSkill.Insight, DStat.Wis],
    [DSkill.Intimidation, DStat.Cha],
    [DSkill.Investigation, DStat.Int],
    [DSkill.Medicine, DStat.Wis],
    [DSkill.Nature, DStat.Int],
    [DSkill.Perception, DStat.Wis],
    [DSkill.Performance, DStat.Cha],
    [DSkill.Persuasion, DStat.Cha],
    [DSkill.Religion, DStat.Int],
    [DSkill.SlightOfHand, DStat.Dex],
    [DSkill.Stealth, DStat.Dex],
    [DSkill.Survival, DStat.Wis],
    [DSkill.Honor, DStat.Cha],
])


export enum Speed {
    Walking,
    Swimming,
    Flying,
    Climbing,
    Burrowing,
    _NonStandard,
}

export enum AdventurerClass {
    Artificer,
    Barbarian,
    Bard,
    Cleric,
    Druid,
    Fighter,
    Monk,
    Paladin,
    Ranger,
    Rogue,
    Sorcerer,
    Warlock,
    Wizard,
}

export enum DamageType {
    Acid,
    Bludgeoning,
    Cold,
    Fire,
    Force,
    Lightning,
    Necrotic,
    Piercing,
    Poison,
    Psychic,
    Radiant,
    Slashing,
    Thunder,
    Physical,
    _NonStandard,
    Biochemical,
    Corrosion,
    Neural,
    Hellfire,
}

export enum Condition {
    Blinded,
    Charmed,
    Deafened,
    Frightened,
    Grappled,
    Incapacitated,
    Invisible,
    Paralyzed,
    Petrified,
    Poisoned,
    Prone,
    Restrained,
    Stunned,
    Unconscious,
    Exhaustion,
    _NonStandard,
    Fragile,
    Silenced
}

export const ClassHitDice: Map<AdventurerClass, Dice> = new Map([
    [AdventurerClass.Artificer, D8],
    [AdventurerClass.Barbarian, D12],
    [AdventurerClass.Bard, D8],
    [AdventurerClass.Cleric, D8],
    [AdventurerClass.Druid, D8],
    [AdventurerClass.Fighter, D10],
    [AdventurerClass.Monk, D8],
    [AdventurerClass.Paladin, D10],
    [AdventurerClass.Ranger, D10],
    [AdventurerClass.Rogue, D8],
    [AdventurerClass.Sorcerer, D6],
    [AdventurerClass.Warlock, D8],
    [AdventurerClass.Wizard, D6],
]);


export enum Activation {
    Action,
    BonusAction,
    Reaction,
    Special,
    LegendaryAction,
    MythicAction,
    LairAction,
    _NonStandard,
}


export function E(dice: Dice | Map<Dice, number>) {
    if (dice instanceof Map) {
        let e = 0;
        for (const [die, count] of dice.entries()) {
            e += count * E(die);
        }
        return e;
    }
    return (dice.sides + 1) / 2;
}

export class StatValue
{
    private val: number;

    constructor(val) {
        this.val = Math.round(Math.min(30, Math.max(0, val)));
    }

    public adjustStat(by: number) {
        this.val = Math.round(Math.min(30, Math.max(0, this.val + by)));
    }

    public get stat(): number {
        return this.val;
    }

    public get mod(): number {
        return StatValue.mod(this.val);
    }

    public static mod(number) {
        return Math.floor(number/ 2) - 5;
    }
}


export class Prof
{
    private static readonly instances: Map<number, Prof> = new Map();

    public static get(val: number) {
        if (this.instances.has(val)) {
            return this.instances.get(val);
        }
        if (val < 2 || val > 10) {
            throw new Error("reasonable prof bonus levels crossed");
        }
        if (!Number.isInteger(val)) {
            throw new Error("Can only have integral proficiencies");
        }
        const instance = new Prof(val);
        this.instances.set(val, instance);
        return instance;
    }

    private constructor(private readonly val)
    { }

    public mod(level: ProficiencyLevel = ProficiencyLevel.Prof): number
    {
        if (level == ProficiencyLevel.None) {
            return 0;
        } else if (level == ProficiencyLevel.Half) {
            return Math.floor(this.val / 2);
        } else if (level == ProficiencyLevel.Prof) {
            return this.val;
        } else if (level == ProficiencyLevel.Expert) {
            return 2 * this.val;
        }
        throw new Error("Prof level unknown");
    }
}


export class CRValue
{
    private readonly val: number;

    constructor(val,
                private readonly profOverride: Prof = null)
    {
        this.val = Math.round(Math.min(30, Math.max(0, val)));
    }

    public get cr(): number {
        return this.val;
    }

    public get prof(): Prof {
        if (this.profOverride != null) {
            return this.profOverride;
        }
        return Prof.get(Math.ceil(Math.max(1, this.val) / 4) + 1);
    }

    public compareToStats(): number {
        // todo: Compare to the offensive/defensive stats as per the DMG and
        //  offset the difference between expected and true stats.
        throw new Error("Not implemented.");
    }
}

export enum CSkill
{
    Accounting,
    Anthropology,
    Appraise,
    Archaeology,
    Artillery,
    Charm,
    ComputerUse,
    Demolitions,
    Disguise,
    Diving,
    DriveAuto,
    ElectricalRepair,
    Electronics,
    FirstAid,
    Hypnosis,
    Law,
    LibraryUse,
    Locksmith,
    MechanicalRepair,
    ModernMedicine,
    NaturalWorld,
    Navigate,
    Occult,
    OperateHeavyMachinery,
    Psychoanalysis,
    ReadLips,
    Ride,
    Throw,
    Acting,
    Calligraphy,
    Carpentry,
    Cooking,
    Dancing,
    FineArt,
    Forgery,
    Writing,
    Singing,
    Painting,
    Photography,
    Sculpting,
    Chainsaw,
    HeavyWeapons,
    Flamethrower,
    MachineGun,
    SubmachineGun,
    Aircraft,
    Boat,
    Astronomy,
    Biology,
    Botany,
    Chemistry,
    Cryptography,
    Engineering,
    Forensics,
    Geology,
    Mathematics,
    Meteorology,
    Pharmacy,
    Physics,
    Zoology,
}

export enum Era {
    Future,
    Information,
    Atomic,
    Modern,
    Industrial,
    Renaissance,
    Medieval,
    Classical,
    Ancient,
}


/**
 * How much the PCs know about a NPC's certain characteristic, be it a combat
 * move, skill modifier, movement speed anything.
 */
export enum VisibilityLevel
{
    Hidden,     // Default. Nothing is known.
    Hinted,     // The pcs know a move exists, or a skill is special but not it's details.
    Vague,      // The pcs know a rough categorization of the skill.
    Shown,      // The DM mode, where everything is visible and rolls are allowed.
}

// By controlling these I can switch between player and DM mode.

export let Hidden = VisibilityLevel.Hidden;
export let Hinted = VisibilityLevel.Hinted;
export let Vague  = VisibilityLevel.Vague;
export let Shown  = VisibilityLevel.Shown;
