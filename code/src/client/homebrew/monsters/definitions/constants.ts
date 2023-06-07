import {D10, D100, D12, D20, D4, D6, D8, Dice} from "../../common/diceConstants";


export enum CoreStats {
    Str,
    Dex,
    Con,
    Int,
    Wis,
    Cha
}

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
}

export const SkillForStat : Map<Skill, CoreStats> = new Map([
    [Skill.Acrobatics,     CoreStats.Dex],
    [Skill.AnimalHandling, CoreStats.Wis],
    [Skill.Arcana,         CoreStats.Int],
    [Skill.Athletics,      CoreStats.Str],
    [Skill.Deception,      CoreStats.Cha],
    [Skill.History,        CoreStats.Int],
    [Skill.Insight,        CoreStats.Wis],
    [Skill.Intimidation,   CoreStats.Cha],
    [Skill.Investigation,  CoreStats.Int],
    [Skill.Medicine,       CoreStats.Wis],
    [Skill.Nature,         CoreStats.Int],
    [Skill.Perception,     CoreStats.Wis],
    [Skill.Performance,    CoreStats.Cha],
    [Skill.Persuasion,     CoreStats.Cha],
    [Skill.Religion,       CoreStats.Int],
    [Skill.SlightOfHand,   CoreStats.Dex],
    [Skill.Stealth,        CoreStats.Dex],
    [Skill.Survival,       CoreStats.Wis],
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
    Thunder
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


export function getModifier(number) {
    return Math.floor((number - 10) / 2);
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