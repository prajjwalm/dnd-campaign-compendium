export type Dice = 1 | 4 | 6 | 8 | 10 | 12 | 20 | 100;

export enum RollVariant {
    Normal,
    Advantage,
    Disadvantage,
    SuperAdvantage,
    SuperDisadvantage,
    Critical,
}
