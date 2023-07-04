import {D10, D100, D12, D20, D4, D6, D8, Dice} from "../common/diceConstants";


export enum CoreStat {
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

export enum Senses {
    DarkVision,
    BlindSight,
    TremorSense,
    TrueSight,
}

export enum CreatureSize {
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuan,
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
}

export const SkillForStat : Map<Skill, CoreStat> = new Map([
    [Skill.Acrobatics, CoreStat.Dex],
    [Skill.AnimalHandling, CoreStat.Wis],
    [Skill.Arcana, CoreStat.Int],
    [Skill.Athletics, CoreStat.Str],
    [Skill.Deception, CoreStat.Cha],
    [Skill.History, CoreStat.Int],
    [Skill.Insight, CoreStat.Wis],
    [Skill.Intimidation, CoreStat.Cha],
    [Skill.Investigation, CoreStat.Int],
    [Skill.Medicine, CoreStat.Wis],
    [Skill.Nature, CoreStat.Int],
    [Skill.Perception, CoreStat.Wis],
    [Skill.Performance, CoreStat.Cha],
    [Skill.Persuasion, CoreStat.Cha],
    [Skill.Religion, CoreStat.Int],
    [Skill.SlightOfHand, CoreStat.Dex],
    [Skill.Stealth, CoreStat.Dex],
    [Skill.Survival, CoreStat.Wis],
])


export enum Speed {
    Walking,
    Swimming,
    Flying,
    Climbing,
    Burrowing,
}

export enum AdventurerClasses {
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
    _NonStandard,
    Biochemical,
    Corrosion,
    Neural,
}

export enum Conditions {
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
}

export const AdventurerHitDice: Map<AdventurerClasses, Dice> = new Map([
    [AdventurerClasses.Artificer, D8],
    [AdventurerClasses.Barbarian, D12],
    [AdventurerClasses.Bard, D8],
    [AdventurerClasses.Cleric, D8],
    [AdventurerClasses.Druid, D8],
    [AdventurerClasses.Fighter, D10],
    [AdventurerClasses.Monk, D8],
    [AdventurerClasses.Paladin, D10],
    [AdventurerClasses.Ranger, D10],
    [AdventurerClasses.Rogue, D8],
    [AdventurerClasses.Sorcerer, D6],
    [AdventurerClasses.Warlock, D8],
    [AdventurerClasses.Wizard, D6],
]);


export enum Activation {
    Action,
    BonusAction,
    Reaction,
    Special,
    LegendaryAction,
    MythicAction,
}


export function E(dice: Dice | Map<Dice, number>) {
    if (dice instanceof Dice) {
        return (dice.sides + 1) / 2;
    } else if (dice instanceof Map) {
        let e = 0;
        for (const [die, count] of dice.entries()) {
            e += count * E(die);
        }
        return e;
    }
}

// [FutureScope] Introduce a readonly cached statValue.
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
                private readonly profAdjustment: number = 0)
    {
        this.val = Math.round(Math.min(30, Math.max(0, val)));
    }

    public get cr(): number {
        return this.val;
    }

    public get prof(): Prof {
        return Prof.get(Math.ceil(Math.max(1, this.val) / 4) + 1 + this.profAdjustment);
    }

    public compareToStats(): number {
        // todo: Compare to the offensive/defensive stats as per the DMG and
        //  offset the difference between expected and true stats.
        throw new Error("Not implemented.");
    }
}
