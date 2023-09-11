export enum NpcMoraleEffects
{
    LatentExhaustion,
    ProficiencyBonusModifier,
    InitiativeModifierNAT,
    XPGainRatio,
    SkillModifier,
    CombatRollMod
}

export enum Morale
{
    Abysmal,
    Depressed,
    Dismal,
    Low,
    Average,
    Comfortable,
    Optimistic,
    Sanguine,
    Ecstatic,
}

export const MoraleEffects: ReadonlyMap<Morale, ReadonlyMap<NpcMoraleEffects, number>> = new Map([
    [Morale.Abysmal, new Map([
        [NpcMoraleEffects.XPGainRatio, 0.30],
        [NpcMoraleEffects.LatentExhaustion, 2],
        [NpcMoraleEffects.ProficiencyBonusModifier, -2],
        [NpcMoraleEffects.InitiativeModifierNAT, -20],
        [NpcMoraleEffects.SkillModifier, -3],
        [NpcMoraleEffects.CombatRollMod, -2],
    ])],
    [Morale.Depressed, new Map([
        [NpcMoraleEffects.XPGainRatio, 0.60],
        [NpcMoraleEffects.LatentExhaustion, 1],
        [NpcMoraleEffects.ProficiencyBonusModifier, -1],
        [NpcMoraleEffects.InitiativeModifierNAT, -10],
        [NpcMoraleEffects.SkillModifier, -2],
    ])],
    [Morale.Dismal, new Map([
        [NpcMoraleEffects.XPGainRatio, 0.80],
        [NpcMoraleEffects.ProficiencyBonusModifier, -1],
        [NpcMoraleEffects.SkillModifier, -1],
    ])],
    [Morale.Low, new Map([
        [NpcMoraleEffects.XPGainRatio, 0.90],
        [NpcMoraleEffects.SkillModifier, -1],
    ])],
    [Morale.Average, new Map([
        [NpcMoraleEffects.XPGainRatio, 1.00],
    ])],
    [Morale.Comfortable, new Map([
        [NpcMoraleEffects.XPGainRatio, 1.05],
    ])],
    [Morale.Optimistic, new Map([
        [NpcMoraleEffects.XPGainRatio, 1.10],
        [NpcMoraleEffects.SkillModifier, 1],
    ])],
    [Morale.Sanguine, new Map([
        [NpcMoraleEffects.XPGainRatio, 1.15],
        [NpcMoraleEffects.SkillModifier, 1],
        [NpcMoraleEffects.ProficiencyBonusModifier, 1],
        [NpcMoraleEffects.LatentExhaustion, -1],
        [NpcMoraleEffects.InitiativeModifierNAT, 2],
    ])],
    [Morale.Ecstatic, new Map([
        [NpcMoraleEffects.XPGainRatio, 1.20],
        [NpcMoraleEffects.SkillModifier, 2],
        [NpcMoraleEffects.ProficiencyBonusModifier, 1],
        [NpcMoraleEffects.LatentExhaustion, -2],
        [NpcMoraleEffects.CombatRollMod, 2],
        [NpcMoraleEffects.InitiativeModifierNAT, 5],
    ])],
]);

export const MoraleFlavorText: Map<Morale, string> = new Map([
    [Morale.Abysmal,     "<i>Thinking hurts. Existence hurts.</i> You just... can't... bring yourself to move."],
    [Morale.Depressed,   "The world is black. Just let whatever be, be. You don't care anymore."],
    [Morale.Dismal,      "So <i>tired</i>. All of it feels just... so... pointless."],
    [Morale.Low,         "You're just not feeling like it today..."],
    [Morale.Average,     "Just another usual day."],
    [Morale.Comfortable, "There is peace and tranquility, life is good."],
    [Morale.Optimistic,  "The darkness has melted away. The future looks hopeful and it is easier to focus."],
    [Morale.Sanguine,    "Your positivity lends a surge of energy. Everything seems possible now."],
    [Morale.Ecstatic,    "Unstoppable. Unbreakable. You're completely <i>in the zone</i>."],
]);
