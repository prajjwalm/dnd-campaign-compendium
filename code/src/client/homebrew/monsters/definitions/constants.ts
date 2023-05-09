import {D10, D12, D6, D8, Dice} from "../../common/diceConstants";


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