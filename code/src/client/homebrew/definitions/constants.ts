import {D10, D100, D12, D20, D4, D6, D8, Dice} from "../common/diceConstants";


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

export enum Skill {
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
    Sanity,
}

export const StatForSkill : Map<Skill, DStat> = new Map([
    [Skill.Acrobatics, DStat.Dex],
    [Skill.AnimalHandling, DStat.Wis],
    [Skill.Arcana, DStat.Int],
    [Skill.Athletics, DStat.Str],
    [Skill.Deception, DStat.Cha],
    [Skill.History, DStat.Int],
    [Skill.Insight, DStat.Wis],
    [Skill.Intimidation, DStat.Cha],
    [Skill.Investigation, DStat.Int],
    [Skill.Medicine, DStat.Wis],
    [Skill.Nature, DStat.Int],
    [Skill.Perception, DStat.Wis],
    [Skill.Performance, DStat.Cha],
    [Skill.Persuasion, DStat.Cha],
    [Skill.Religion, DStat.Int],
    [Skill.SlightOfHand, DStat.Dex],
    [Skill.Stealth, DStat.Dex],
    [Skill.Survival, DStat.Wis],
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
        return Math.floor(this.val / 2) - 5;
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

    public mod(level: ProficiencyLevel = ProficiencyLevel.Prof)
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
