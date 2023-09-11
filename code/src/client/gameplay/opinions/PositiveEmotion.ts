export enum PositiveEmotion {
    Affection,
    Gratitude,
    Trust,
    Respect
}

export const NegativeEmotion = new Map([
    [PositiveEmotion.Affection, "Hatred"],
    [PositiveEmotion.Gratitude, "Envy"],
    [PositiveEmotion.Trust, "Paranoia"],
    [PositiveEmotion.Respect, "Contempt"],
]);
