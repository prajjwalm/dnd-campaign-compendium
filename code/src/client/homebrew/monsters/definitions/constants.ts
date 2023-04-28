import {Dice} from "../../common/diceConstants";


export enum CoreStats {
    Str,
    Dex,
    Con,
    Int,
    Wis,
    Cha
}

export enum ProficiencyLevels {
    None,
    Half,
    Prof,
    Expert
}

export enum Senses {
    DarkVision,
    BlindSight,
    TremorSense,
    TrueSight,
}

export enum CreatureSizes {
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuan,
}

export enum Skills {
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

export enum Speeds {
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

export const AdventurerHitDice: Map<AdventurerClasses, Dice> = new Map([
    [AdventurerClasses.Artificer, 8],
    [AdventurerClasses.Barbarian, 12],
    [AdventurerClasses.Bard, 8],
    [AdventurerClasses.Cleric, 8],
    [AdventurerClasses.Druid, 8],
    [AdventurerClasses.Fighter, 10],
    [AdventurerClasses.Monk, 8],
    [AdventurerClasses.Paladin, 10],
    [AdventurerClasses.Ranger, 10],
    [AdventurerClasses.Rogue, 8],
    [AdventurerClasses.Sorcerer, 6],
    [AdventurerClasses.Warlock, 8],
    [AdventurerClasses.Wizard, 6],
]);
