export class Dice {
    public constructor(public readonly sides) {}
}

export const D1 = new Dice(1);
export const D4 = new Dice(4);
export const D6 = new Dice(6);
export const D8 = new Dice(8);
export const D10 = new Dice(10);
export const D12 = new Dice(12);
export const D20 = new Dice(20);
export const D100 = new Dice(100);

export enum RollVariant {
    Normal,
    Advantage,
    Disadvantage,
    SuperAdvantage,
    SuperDisadvantage,
    Critical,
}
