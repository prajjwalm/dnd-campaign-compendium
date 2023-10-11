import {Rarity} from "../data/Rarity";


export enum UpgradeVertexType
{
    Sync,
    LandMovement,
    SeaMovement,
    StepMovement,
    DeathSaves,
    AC,
    HP,
    Accuracy,
    Damage,
    ProfBonus,
    Initiative,
    SavesAll,
    SavesStrDexCon,
    SavesIntWisCha,
    SkillsAll,
    SkillsNinjutsu,
    SkillsWildHeart,
    SkillsIndoctrination,
    SkillsBrilliance,
    SkillsProdigy,
    StatsStr,
    StatsDex,
    StatsCon,
    StatsInt,
    StatsWis,
    StatsCha,
    StatsIntDex,
    StatsWisCon,
    StatsChaStr,
    StatsStrDexCon,
    StatsIntWisCha,
    NULL,
}


export const UpgradeNames: Map<UpgradeVertexType, string> =
    new Map([
        [UpgradeVertexType.Sync,                 "Synchronization"],
        [UpgradeVertexType.LandMovement,         "Acceleration"],
        [UpgradeVertexType.SeaMovement,          "Marine Adaptation"],
        [UpgradeVertexType.StepMovement,         "Unfettered Mobility"],
        [UpgradeVertexType.DeathSaves,           "Death Ward"],
        [UpgradeVertexType.AC,                   "Armor"],
        [UpgradeVertexType.HP,                   "Vitality"],
        [UpgradeVertexType.Accuracy,             "Accuracy"],
        [UpgradeVertexType.Damage,               "Ruin"],
        [UpgradeVertexType.ProfBonus,            "Synaptic Evolution"],
        [UpgradeVertexType.Initiative,           "Reflexes"],
        [UpgradeVertexType.SavesAll,             "Assertion of Life"],
        [UpgradeVertexType.SavesStrDexCon,       "Assertion of Body"],
        [UpgradeVertexType.SavesIntWisCha,       "Assertion of Mind"],
        [UpgradeVertexType.SkillsAll,            "Of All Trades"],
        [UpgradeVertexType.SkillsNinjutsu,       "Ninjutsu"],
        [UpgradeVertexType.SkillsWildHeart,      "Wild Heart"],
        [UpgradeVertexType.SkillsIndoctrination, "Indoctrination"],
        [UpgradeVertexType.SkillsBrilliance,     "Brilliance"],
        [UpgradeVertexType.SkillsProdigy,        "Prodigy"],
        [UpgradeVertexType.StatsStr,             "Strength"],
        [UpgradeVertexType.StatsDex,             "Dexterity"],
        [UpgradeVertexType.StatsCon,             "Constitution"],
        [UpgradeVertexType.StatsInt,             "Intelligence"],
        [UpgradeVertexType.StatsWis,             "Wisdom"],
        [UpgradeVertexType.StatsCha,             "Charisma"],
        [UpgradeVertexType.StatsIntDex,          "Shrewdness"],
        [UpgradeVertexType.StatsWisCon,          "Stability"],
        [UpgradeVertexType.StatsChaStr,          "Authority"],
        [UpgradeVertexType.StatsStrDexCon,       "Physique Upgrade"],
        [UpgradeVertexType.StatsIntWisCha,       "Cognition Upgrade"],
    ]);


export const UpgradeDescGenerators: Map<UpgradeVertexType, (number) => string> =
    new Map([
        [UpgradeVertexType.Sync,
         (n: number) => `Attunement slots +${n}, can be used for mass attunement.`],
        [UpgradeVertexType.LandMovement,
         (n: number) => `Walking Speed increases by ${n}ft.`],
        [UpgradeVertexType.SeaMovement,
         (n: number) => `Swimming Speed increases by ${n}ft. Can breathe underwater.`],
        [UpgradeVertexType.StepMovement,
         (n: number) => `As an action, can teleport ${n} times the walking speed 
                            upto proficiency bonus times per long rest.`],
        [UpgradeVertexType.DeathSaves,
         (n: number) => `Gain ${n} to death saves.`],
        [UpgradeVertexType.AC,
         (n: number) => `Gain ${n} AC`],
        [UpgradeVertexType.HP,
         (n: number) => `HP increases by ${n}.`],
        [UpgradeVertexType.Accuracy,
         (n: number) => `To-hit rolls and save DCs increase by ${n}.`],
        [UpgradeVertexType.Damage,
         (n: number) => `Damage of weapon attacks and cantrips increases by ${n}.`],
        [UpgradeVertexType.ProfBonus,
         (n: number) => `Proficiency bonus increases by ${n}`],
        [UpgradeVertexType.Initiative,
         (n: number) => `Gain ${n} to initiative rolls.`],
        [UpgradeVertexType.SavesAll,
         (n: number) => `+${n} to all saves.`],
        [UpgradeVertexType.SavesStrDexCon,
         (n: number) => `+${n} to STR/DEX/CON saves.`],
        [UpgradeVertexType.SavesIntWisCha,
         (n: number) => `+${n} to INT/WIS/CHA saves.`],
        [UpgradeVertexType.SkillsAll,
         (n: number) => `+${n} to all skill rolls.`],
        [UpgradeVertexType.SkillsNinjutsu,
         (n: number) => `+${n} to Stealth, Investigation, Acrobatics and Athletics rolls.`],
        [UpgradeVertexType.SkillsWildHeart,
         (n: number) => `+${n} to all Perception, Medicine, Nature and Survival rolls.`],
        [UpgradeVertexType.SkillsIndoctrination,
         (n: number) => `+${n} to all Insight, Deception, Intimidation and Religion rolls.`],
        [UpgradeVertexType.SkillsBrilliance,
         (n: number) => `+${n} to all Arcana, Slight-of-Hand, History and Performance rolls.`],
        [UpgradeVertexType.SkillsProdigy,
         (n: number) =>  `+${n} to all Stealth, Perception, Insight, Arcana and Persuasion rolls.`],
        [UpgradeVertexType.StatsStr,
         (n: number) => `Strength +${n}`],
        [UpgradeVertexType.StatsDex,
         (n: number) => `Dexterity +${n}`],
        [UpgradeVertexType.StatsCon,
         (n: number) => `Constitution +${n}`],
        [UpgradeVertexType.StatsInt,
         (n: number) => `Intelligence +${n}`],
        [UpgradeVertexType.StatsWis,
         (n: number) => `Wisdom +${n}`],
        [UpgradeVertexType.StatsCha,
         (n: number) => `Charisma +${n}`],
        [UpgradeVertexType.StatsIntDex,
         (n: number) => `Intelligence and Dexterity +${n}`],
        [UpgradeVertexType.StatsWisCon,
         (n: number) => `Wisdom and Constitution +${n}`],
        [UpgradeVertexType.StatsChaStr,
         (n: number) => `Charisma and Strength +${n}`],
        [UpgradeVertexType.StatsStrDexCon,
         (n: number) => `Strength, Dexterity and Constitution +${n}`],
        [UpgradeVertexType.StatsIntWisCha,
         (n: number) => `Intelligence, Wisdom and Charisma +${n}`],
    ]);


export const UpgradeIcons: Map<UpgradeVertexType, string> = new Map([
    [UpgradeVertexType.Sync,                 `<i class="fa-sharp fa-light fa-wreath-laurel"></i>`],
    [UpgradeVertexType.LandMovement,         `<i class="fa-solid fa-rabbit-running"></i>`],
    [UpgradeVertexType.SeaMovement,          `<i class="fa-solid fa-dolphin"></i>`],
    [UpgradeVertexType.StepMovement,         `<i class="fa-duotone fa-transporter-1"></i>`],
    [UpgradeVertexType.DeathSaves,           `<i class="fa-solid fa-skull-cow" style="transform: translate(0, 2px);"></i>`],
    [UpgradeVertexType.AC,                   `<i class="fa-sharp fa-solid fa-shield-quartered"></i>`],
    [UpgradeVertexType.HP,                   `<i class="fa-solid fa-heart-pulse"></i>`],
    [UpgradeVertexType.Accuracy,             `<i class="fa-solid fa-crosshairs"></i>`],
    [UpgradeVertexType.Damage,               `<i class="fa-sharp fa-solid fa-swords"></i>`],
    [UpgradeVertexType.ProfBonus,            `<i class="fa-regular fa-dna"></i>`],
    [UpgradeVertexType.Initiative,           `<i class="fa-sharp fa-solid fa-stopwatch"></i>`],
    [UpgradeVertexType.SavesAll,             `<i class="fa-regular fa-star-of-life"></i>`],
    [UpgradeVertexType.SavesStrDexCon,       `<i class="fa-sharp fa-solid fa-football-helmet"></i>`],
    [UpgradeVertexType.SavesIntWisCha,       `<i class="fa-solid fa-spa"></i>`],
    [UpgradeVertexType.SkillsAll,            `<i class="fa-regular fa-mandolin"></i>`],
    [UpgradeVertexType.SkillsNinjutsu,       `<i class="fa-duotone fa-user-ninja"></i>`],
    [UpgradeVertexType.SkillsWildHeart,      `<i class="fa-duotone fa-user-cowboy"></i>`],
    [UpgradeVertexType.SkillsIndoctrination, `<i class="fa-duotone fa-user-secret"></i>`],
    [UpgradeVertexType.SkillsBrilliance,     `<i class="fa-duotone fa-user-graduate"></i>`],
    [UpgradeVertexType.SkillsProdigy,        `<i class="fa-duotone fa-user-police-tie"></i>`],
    [UpgradeVertexType.StatsStr,             `<i class="fa-duotone fa-dumbbell"></i>`],
    [UpgradeVertexType.StatsDex,             `<i class="fa-solid fa-dagger" style="rotate: 45deg;"></i>`],
    [UpgradeVertexType.StatsCon,             `<i class="fa-solid fa-heart-half-stroke"></i>`],
    [UpgradeVertexType.StatsInt,             `<i class="fa-solid fa-brain-circuit"></i>`],
    [UpgradeVertexType.StatsWis,             `<i class="fa-solid fa-yin-yang"></i>`],
    [UpgradeVertexType.StatsCha,             `<i class="fa-sharp fa-solid fa-masks-theater"></i>`],
]);
UpgradeIcons.set(
    UpgradeVertexType.StatsIntDex,
    `<div class="duo_icon">
        ${UpgradeIcons.get(UpgradeVertexType.StatsInt)}
        ${UpgradeIcons.get(UpgradeVertexType.StatsDex)}
    </div>`
);
UpgradeIcons.set(
    UpgradeVertexType.StatsWisCon,
    `<div class="duo_icon">
        ${UpgradeIcons.get(UpgradeVertexType.StatsWis)}
        ${UpgradeIcons.get(UpgradeVertexType.StatsCon)}
    </div>`
);
UpgradeIcons.set(
    UpgradeVertexType.StatsChaStr,
    `<div class="duo_icon">
        ${UpgradeIcons.get(UpgradeVertexType.StatsCha)}
        ${UpgradeIcons.get(UpgradeVertexType.StatsStr)}
    </div>`
);
UpgradeIcons.set(
    UpgradeVertexType.StatsStrDexCon,
    `<div class="tri_icon">
        ${UpgradeIcons.get(UpgradeVertexType.StatsStr)}
        ${UpgradeIcons.get(UpgradeVertexType.StatsCon)}
        ${UpgradeIcons.get(UpgradeVertexType.StatsDex)}
    </div>`
);
UpgradeIcons.set(
    UpgradeVertexType.StatsIntWisCha,
    `<div class="tri_icon">
        ${UpgradeIcons.get(UpgradeVertexType.StatsInt)}
        ${UpgradeIcons.get(UpgradeVertexType.StatsWis)}
        ${UpgradeIcons.get(UpgradeVertexType.StatsCha)}
    </div>`
);


export const UpgradeRarityLevels: Map<UpgradeVertexType, Map<Rarity, number>> = new Map([
    [UpgradeVertexType.Sync,                 new Map([[Rarity.Artefact, 1]])],
    [UpgradeVertexType.LandMovement,         new Map([[Rarity.Black, -20],
                                                      [Rarity.Common, 10],
                                                      [Rarity.Uncommon, 20]])],
    [UpgradeVertexType.SeaMovement,          new Map([[Rarity.Rare, 20]])],
    [UpgradeVertexType.StepMovement,         new Map([[Rarity.Epic, 3]])],
    [UpgradeVertexType.DeathSaves,           new Map([[Rarity.Black, -2],
                                                      [Rarity.Rare, 2],
                                                      [Rarity.Legendary, 5]])],
    [UpgradeVertexType.AC,                   new Map([[Rarity.Black, -1],
                                                      [Rarity.Uncommon, 1],
                                                      [Rarity.Rare, 2],
                                                      [Rarity.Legendary, 3]])],
    [UpgradeVertexType.HP,                   new Map([[Rarity.Black, -30],
                                                      [Rarity.Common, 10],
                                                      [Rarity.Uncommon, 20],
                                                      [Rarity.Rare, 30],
                                                      [Rarity.Epic, 50],
                                                      [Rarity.Legendary, 70]])],
    [UpgradeVertexType.Accuracy,             new Map([[Rarity.Black, -1],
                                                      [Rarity.Uncommon, 1],
                                                      [Rarity.Rare, 2],
                                                      [Rarity.Epic, 3]])],
    [UpgradeVertexType.Damage,               new Map([[Rarity.Uncommon, 1],
                                                      [Rarity.Rare, 2],
                                                      [Rarity.Epic, 3]])],
    [UpgradeVertexType.ProfBonus,            new Map([[Rarity.Legendary, 1]])],
    [UpgradeVertexType.Initiative,           new Map([[Rarity.Uncommon, 1],
                                                      [Rarity.Rare, 2],
                                                      [Rarity.Epic, 3]])],
    [UpgradeVertexType.SavesAll,             new Map([[Rarity.Rare, 2]])],
    [UpgradeVertexType.SavesStrDexCon,       new Map([[Rarity.Uncommon, 2]])],
    [UpgradeVertexType.SavesIntWisCha,       new Map([[Rarity.Uncommon, 2]])],
    [UpgradeVertexType.SkillsAll,            new Map([[Rarity.Epic, 2]])],
    [UpgradeVertexType.SkillsNinjutsu,       new Map([[Rarity.Uncommon, 2]])],
    [UpgradeVertexType.SkillsWildHeart,      new Map([[Rarity.Uncommon, 2]])],
    [UpgradeVertexType.SkillsIndoctrination, new Map([[Rarity.Uncommon, 2]])],
    [UpgradeVertexType.SkillsBrilliance,     new Map([[Rarity.Uncommon, 2]])],
    [UpgradeVertexType.SkillsProdigy,        new Map([[Rarity.Rare, 3]])],
    [UpgradeVertexType.StatsStr,             new Map([[Rarity.Common, 1]])],
    [UpgradeVertexType.StatsDex,             new Map([[Rarity.Common, 1]])],
    [UpgradeVertexType.StatsCon,             new Map([[Rarity.Common, 1]])],
    [UpgradeVertexType.StatsInt,             new Map([[Rarity.Common, 1]])],
    [UpgradeVertexType.StatsWis,             new Map([[Rarity.Common, 1]])],
    [UpgradeVertexType.StatsCha,             new Map([[Rarity.Common, 1]])],
    [UpgradeVertexType.StatsIntDex,          new Map([[Rarity.Epic, 2]])],
    [UpgradeVertexType.StatsWisCon,          new Map([[Rarity.Epic, 2]])],
    [UpgradeVertexType.StatsChaStr,          new Map([[Rarity.Epic, 2]])],
    [UpgradeVertexType.StatsStrDexCon,       new Map([[Rarity.Legendary, 3]])],
    [UpgradeVertexType.StatsIntWisCha,       new Map([[Rarity.Legendary, 3]])],
    [UpgradeVertexType.NULL, new Map([])],  // TS goes crazy if I delete this.
]);


export enum AtomicUpgradeVertexType
{
    Sync,
    ProfBonus,
    AC,
    HP,
    StatsStr,
    StatsDex,
    StatsCon,
    StatsInt,
    StatsWis,
    StatsCha,
    Accuracy,
    Damage,
    LandMovement,
    SeaMovement,
    StepMovement,
    Initiative,
    DeathSaves,
    SavesStrDexCon,
    SavesIntWisCha,
    SkillStealth,
    SkillPerception,
    SkillInsight,
    SkillArcana,
    SkillPersuasion,
    SkillMedicineNatureSurvival,
    SkillDeceptionIntimidationReligion,
    SkillsInvestigationAcrobaticsAthletics,
    SkillSlightHistoryPerformance,
    SkillOther,
}


export const UpgradeToAtomic: Map<UpgradeVertexType, Set<AtomicUpgradeVertexType>> =
    new Map([
        [UpgradeVertexType.Sync,                 new Set([AtomicUpgradeVertexType.Sync])],
        [UpgradeVertexType.LandMovement,         new Set([AtomicUpgradeVertexType.LandMovement])],
        [UpgradeVertexType.SeaMovement,          new Set([AtomicUpgradeVertexType.SeaMovement])],
        [UpgradeVertexType.StepMovement,         new Set([AtomicUpgradeVertexType.StepMovement])],
        [UpgradeVertexType.DeathSaves,           new Set([AtomicUpgradeVertexType.DeathSaves])],
        [UpgradeVertexType.AC,                   new Set([AtomicUpgradeVertexType.AC])],
        [UpgradeVertexType.HP,                   new Set([AtomicUpgradeVertexType.HP])],
        [UpgradeVertexType.Accuracy,             new Set([AtomicUpgradeVertexType.Accuracy])],
        [UpgradeVertexType.Damage,               new Set([AtomicUpgradeVertexType.Damage])],
        [UpgradeVertexType.ProfBonus,            new Set([AtomicUpgradeVertexType.ProfBonus])],
        [UpgradeVertexType.Initiative,           new Set([AtomicUpgradeVertexType.Initiative])],
        [UpgradeVertexType.SavesAll,             new Set([AtomicUpgradeVertexType.SavesStrDexCon,
                                                          AtomicUpgradeVertexType.SavesIntWisCha])],
        [UpgradeVertexType.SavesStrDexCon,       new Set([AtomicUpgradeVertexType.SavesStrDexCon])],
        [UpgradeVertexType.SavesIntWisCha,       new Set([AtomicUpgradeVertexType.SavesIntWisCha])],
        [UpgradeVertexType.SkillsAll,            new Set([AtomicUpgradeVertexType.SkillStealth,
                                                          AtomicUpgradeVertexType.SkillPerception,
                                                          AtomicUpgradeVertexType.SkillInsight,
                                                          AtomicUpgradeVertexType.SkillArcana,
                                                          AtomicUpgradeVertexType.SkillPersuasion,
                                                          AtomicUpgradeVertexType.SkillsInvestigationAcrobaticsAthletics,
                                                          AtomicUpgradeVertexType.SkillMedicineNatureSurvival,
                                                          AtomicUpgradeVertexType.SkillDeceptionIntimidationReligion,
                                                          AtomicUpgradeVertexType.SkillSlightHistoryPerformance,
                                                          AtomicUpgradeVertexType.SkillOther,])],
        [UpgradeVertexType.SkillsNinjutsu,       new Set([AtomicUpgradeVertexType.SkillStealth,
                                                          AtomicUpgradeVertexType.SkillsInvestigationAcrobaticsAthletics,])],
        [UpgradeVertexType.SkillsWildHeart,      new Set([AtomicUpgradeVertexType.SkillPerception,
                                                          AtomicUpgradeVertexType.SkillMedicineNatureSurvival,])],
        [UpgradeVertexType.SkillsIndoctrination, new Set([AtomicUpgradeVertexType.SkillInsight,
                                                          AtomicUpgradeVertexType.SkillDeceptionIntimidationReligion,])],
        [UpgradeVertexType.SkillsBrilliance,     new Set([AtomicUpgradeVertexType.SkillArcana,
                                                          AtomicUpgradeVertexType.SkillSlightHistoryPerformance,])],
        [UpgradeVertexType.SkillsProdigy,        new Set([AtomicUpgradeVertexType.SkillStealth,
                                                          AtomicUpgradeVertexType.SkillPerception,
                                                          AtomicUpgradeVertexType.SkillInsight,
                                                          AtomicUpgradeVertexType.SkillArcana,
                                                          AtomicUpgradeVertexType.SkillPersuasion,])],
        [UpgradeVertexType.StatsStr,             new Set([AtomicUpgradeVertexType.StatsStr])],
        [UpgradeVertexType.StatsDex,             new Set([AtomicUpgradeVertexType.StatsDex])],
        [UpgradeVertexType.StatsCon,             new Set([AtomicUpgradeVertexType.StatsCon])],
        [UpgradeVertexType.StatsInt,             new Set([AtomicUpgradeVertexType.StatsInt])],
        [UpgradeVertexType.StatsWis,             new Set([AtomicUpgradeVertexType.StatsWis])],
        [UpgradeVertexType.StatsCha,             new Set([AtomicUpgradeVertexType.StatsCha])],
        [UpgradeVertexType.StatsIntDex,          new Set([AtomicUpgradeVertexType.StatsInt,
                                                          AtomicUpgradeVertexType.StatsDex])],
        [UpgradeVertexType.StatsWisCon,          new Set([AtomicUpgradeVertexType.StatsWis,
                                                          AtomicUpgradeVertexType.StatsCon])],
        [UpgradeVertexType.StatsChaStr,          new Set([AtomicUpgradeVertexType.StatsCha,
                                                          AtomicUpgradeVertexType.StatsStr])],
        [UpgradeVertexType.StatsStrDexCon,       new Set([AtomicUpgradeVertexType.StatsStr,
                                                          AtomicUpgradeVertexType.StatsDex,
                                                          AtomicUpgradeVertexType.StatsCon])],
        [UpgradeVertexType.StatsIntWisCha,       new Set([AtomicUpgradeVertexType.StatsInt,
                                                          AtomicUpgradeVertexType.StatsWis,
                                                          AtomicUpgradeVertexType.StatsCha])],
        [UpgradeVertexType.NULL,                 new Set()],
    ]);


export const AtomicUpgradeDescGenerators: Map<AtomicUpgradeVertexType, (number) => string> =
    new Map([
        [AtomicUpgradeVertexType.Sync,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Attunement Slot Count</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.LandMovement,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Walking Speed</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n} ft</div>
                 </div>`],
        [AtomicUpgradeVertexType.SeaMovement,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Swimming Speed</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n} ft</div>
                 </div>`],
        [AtomicUpgradeVertexType.StepMovement,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Teleportation</div>
                     <div class="dictionary__row__value">${n > 0 ? `${n} &times; Walking speed` : "None"}</div>
                 </div>`],
        [AtomicUpgradeVertexType.DeathSaves,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Death Saves</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.AC,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Armor Class</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.HP,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Hit Points</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.Accuracy,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">To-hit Modifier</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.Damage,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Per-hit Damage Modifer</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.ProfBonus,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Proficiency Bonus</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.Initiative,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Initiative</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SavesStrDexCon,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">STR / DEX / CON saves</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SavesIntWisCha,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">INT / WIS / CHA saves</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SkillStealth,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Stealth</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SkillPerception,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Perception</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SkillInsight,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Insight</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SkillArcana,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Arcana</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SkillPersuasion,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Persuasion</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SkillMedicineNatureSurvival,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Medicine, Nature, Survival</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SkillDeceptionIntimidationReligion,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Deception, Intimidation, Religion</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SkillsInvestigationAcrobaticsAthletics,
         (n) => `<div class="dictionary__row">
             <div class="dictionary__row__key">Investigation, Acrobatics, Athletics</div>
             <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
         </div>`],
        [AtomicUpgradeVertexType.SkillSlightHistoryPerformance,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Slight-of-Hand, History, Performance</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.SkillOther,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">All Other Skills</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.StatsStr,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Strength Score</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.StatsDex,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Dexterity Score</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.StatsCon,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Constitution Score</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.StatsInt,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Intelligence Score</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.StatsWis,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Wisdom Score</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
        [AtomicUpgradeVertexType.StatsCha,
         (n) => `<div class="dictionary__row">
                     <div class="dictionary__row__key">Charisma Score</div>
                     <div class="dictionary__row__value">${n >= 0 ? "+" : ""}${n}</div>
                 </div>`],
    ]);
