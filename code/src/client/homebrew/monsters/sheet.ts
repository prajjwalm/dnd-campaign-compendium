import {D1, Dice} from "../common/diceConstants";
import {NatRollable, Rollable}     from "../common/rollable";
import {
    Activation,
    AdventurerClasses,
    AdventurerHitDice,
    Conditions,
    CoreStat,
    CreatureSize,
    CRValue,
    DamageType,
    E,
    Prof,
    ProficiencyLevel,
    SizeToDice,
    Skill,
    SkillForStat,
    Speed,
    StatValue,
}                                from "../definitions/constants";
import {IAttack} from "./attack";


class HpBlock
{
    public constructor(public readonly stats: Map<CoreStat, StatValue>,
                       public readonly size: Dice,
                       public readonly biologicalHp: number,
                       public readonly adventurerLevels: Map<AdventurerClasses, number> = new Map(),
                       public readonly isTough: boolean = false)
    { }

    public get conHpPerDice()
    {
        return this.stats.get(CoreStat.Con).mod + (this.isTough ? 2 : 0);
    }

    private getAdventurerHp(): number {
        let hp = 0;
        for (const [klass, level] of this.adventurerLevels.entries()) {
            hp += (E(AdventurerHitDice.get(klass)) + this.conHpPerDice) * level;
        }
        return hp;
    }

    public get hpDiceCount(): number {
        const totalHp = this.biologicalHp + this.getAdventurerHp();
        const hpPerDice = E(this.size) + this.conHpPerDice;
        return Math.round(totalHp / hpPerDice);
    }
}


interface StatBlockParams {
    title: string;
    subtitle: string;
    crValue: CRValue;
    stats: Map<CoreStat, StatValue>;
    speeds: ReadonlyMap<Speed, number>;
    size: CreatureSize;
    biologicalHp: number;
    ac: number;
    acDesc?: string;
    adventurerLevels?: Map<AdventurerClasses, number>;
    isTough?: boolean;
    attacks: IAttack[];
    saveProficiencies: ReadonlyMap<CoreStat, ProficiencyLevel>;
    saveBonuses?: ReadonlyMap<CoreStat, number>;
    skillProficiencies: ReadonlyMap<Skill, ProficiencyLevel>;
    skillBonuses?: ReadonlyMap<Skill, number>;
    vulnerabilities?: ReadonlySet<DamageType>;
    resistances?: ReadonlySet<DamageType>;
    immunities?: ReadonlySet<DamageType>;
    conditionImmunities?: ReadonlySet<Conditions>;
}


export interface IStatSheet
{
    get title(): string;
    get subtitle(): string;

    get cr(): number | string;
    get pb(): Prof;

    get stats(): ReadonlyMap<CoreStat, StatValue>;

    get ac(): number;
    get acDesc(): string;
    get speeds(): ReadonlyMap<Speed, number>;

    get size(): string;
    get hpDice(): Map<Dice, number>;

    get saves(): ReadonlyMap<CoreStat, number>;
    get skills(): ReadonlyMap<Skill, number>;

    get vulnerabilities(): ReadonlySet<DamageType>;
    get resistances(): ReadonlySet<DamageType>;
    get immunities(): ReadonlySet<DamageType>;
    get conditionImmunities(): ReadonlySet<Conditions>;

    getAttacksWithActivation(activation: Activation): string[];
}


export class StatSheet
    implements IStatSheet
{
    public readonly title: string;

    public readonly subtitle: string;

    public readonly speeds: ReadonlyMap<Speed, number>;

    private readonly _stats: Map<CoreStat, StatValue>;

    private readonly hpBlock: HpBlock;

    private readonly crValue: CRValue;

    private readonly _ac: number;

    private readonly _acDesc: string;

    private readonly _size: CreatureSize;

    private readonly attacks: IAttack[];

    private readonly _saveProficiencies: ReadonlyMap<CoreStat, ProficiencyLevel>;

    private readonly _skillProficiencies: ReadonlyMap<Skill, ProficiencyLevel>;

    private readonly _saveBonuses: ReadonlyMap<CoreStat, ProficiencyLevel>;

    private readonly _skillBonuses: ReadonlyMap<Skill, ProficiencyLevel>;

    private readonly _vulnerabilities: ReadonlySet<DamageType>;

    private readonly _resistances: ReadonlySet<DamageType>;

    private readonly _immunities: ReadonlySet<DamageType>;

    private readonly _conditionImmunities: ReadonlySet<Conditions>;

    public constructor({
        title,
        subtitle,
        crValue,
        stats,
        size,
        biologicalHp,
        ac,
        speeds,
        attacks,
        saveProficiencies = new Map(),
        skillProficiencies = new Map(),
        saveBonuses = new Map(),
        skillBonuses = new Map(),
        acDesc = null,
        adventurerLevels = new Map(),
        vulnerabilities = new Set(),
        resistances = new Set(),
        immunities = new Set(),
        conditionImmunities = new Set(),
        isTough = false
    }: StatBlockParams)
    {
        this.title = title;
        this.subtitle = subtitle;
        this.crValue = crValue;
        this.speeds = speeds;
        this._stats = stats;
        this._ac = ac;
        this._saveProficiencies = saveProficiencies;
        this._saveBonuses = saveBonuses;
        this._skillProficiencies = skillProficiencies;
        this._skillBonuses = skillBonuses;
        this._acDesc = acDesc;
        this._size = size;

        this._vulnerabilities = vulnerabilities;
        this._resistances = resistances;
        this._immunities = immunities;
        this._conditionImmunities = conditionImmunities;

        this.attacks = attacks;

        for (const attack of this.attacks) {
            attack.bindSheet(this);
        }

        this.hpBlock = new HpBlock(stats,
            SizeToDice.get(size),
            biologicalHp,
            adventurerLevels,
            isTough);
    }

    public getAttacksWithActivation(activation: Activation): string[]
    {
        const r = [];
        for (const attack of this.attacks) {
            if (attack.activation != activation) {
                continue;
            }
            r.push(attack.createContent());
        }
        return r;
    }

    public get pb(): Prof {
        return this.crValue.prof;
    }

    public get cr(): number {
        return this.crValue.cr;
    }

    public get stats(): ReadonlyMap<CoreStat, StatValue> {
        return this._stats;
    }

    public get ac(): number {
        return this._ac;
    }

    public get acDesc(): string {
        return this._acDesc;
    }

    public get size(): string {
        return CreatureSize[this._size];
    }

    public get hpDice(): Map<Dice, number> {
        return new Map([
            [SizeToDice.get(this._size), this.hpBlock.hpDiceCount],
            [D1, this.hpBlock.hpDiceCount * this.hpBlock.conHpPerDice],
        ]);
        // return new Rollable(new Map([
        //     [SizeToDice.get(this._size), this.hpDiceCount],
        //     [D1, this.hpDiceCount * this.hpBlock.conHpPerDice],
        // ])).getRollString(true);
    }

    public get saves(): ReadonlyMap<CoreStat, number> {
        const m = new Map();
        for (const [stat, saveBonus] of this._saveBonuses.entries()) {
            m.set(stat, (m.has(stat) ? m.get(stat) : this._stats.get(stat).mod)
                        + saveBonus);
        }
        for (const [stat, saveProf] of this._saveProficiencies.entries()) {
            m.set(stat, (m.has(stat) ? m.get(stat) : this._stats.get(stat).mod)
                        + this.pb.mod(saveProf));
        }
        return m;
    }

    public get skills(): ReadonlyMap<Skill, ProficiencyLevel> {
        const m = new Map();
        for (const [skill, saveBonus] of this._skillBonuses.entries()) {
            const stat = SkillForStat.get(skill);
            m.set(skill, (m.has(skill) ? m.get(skill) : this._stats.get(stat).mod)
                         + saveBonus);
        }
        for (const [skill, saveProf] of this._skillProficiencies.entries()) {
            const stat = SkillForStat.get(skill);
            m.set(skill, (m.has(skill) ? m.get(skill) : this._stats.get(stat).mod)
                         + this.pb.mod(saveProf));
        }
        return m;
    }

    public get conditionImmunities(): ReadonlySet<Conditions> {
        return this._conditionImmunities;
    }

    public get immunities(): ReadonlySet<DamageType> {
        return this._immunities;
    }

    public get resistances(): ReadonlySet<DamageType> {
        return this._resistances;
    }

    public get vulnerabilities(): ReadonlySet<DamageType> {
        return this._vulnerabilities;
    }
}


// interface ISheetContract
// {
// }
//
//
// class SheetContract
//     implements ISheetContract
// {
//     constructor() {}
// }
//
//
// class BuffedStatSheet
//     implements IStatSheet
// {
//     private readonly contracts: Set<ISheetContract> = new Set();
//
//     private _ac: number;
//
//     private _prof: Prof;
//
//     private _conditionImmunities: Set<Conditions>;
//
//     private _damageVulnerabilities: Set<DamageType>;
//
//     private _damageResistances: Set<DamageType>;
//
//     private _damageImmunities: Set<DamageType>;
//
//     private _stats: Map<CoreStat, StatValue>;
//
//     private _saves: Map<CoreStat, number>;
//
//     private _speeds: Map<Speed, number>;
//
//     private _skills: Map<Skill, number>;
//
//     constructor(private readonly baseStatSheet: IStatSheet)
//     {
//         this.toZero();
//     }
//
//     public addContract(contract: ISheetContract): void {
//         this.contracts.add(contract);
//     }
//
//     public dropContract(contract: ISheetContract): void {
//         this.contracts.delete(contract);
//     }
//
//     public toZero(): void {
//         this._ac = this.baseStatSheet.ac;
//         this._prof = this.baseStatSheet.pb;
//
//         this._conditionImmunities = new Set();
//         for (const x of this.baseStatSheet.conditionImmunities) {
//             this._conditionImmunities.add(x);
//         }
//         this._damageImmunities = new Set();
//         for (const x of this.baseStatSheet.immunities) {
//             this._damageImmunities.add(x);
//         }
//         this._damageResistances = new Set();
//         for (const x of this.baseStatSheet.resistances) {
//             this._damageResistances.add(x);
//         }
//         this._damageVulnerabilities = new Set();
//         for (const x of this.baseStatSheet.vulnerabilities) {
//             this._damageVulnerabilities.add(x);
//         }
//
//         this._stats = new Map();
//         for (const [k, v] of this.baseStatSheet.stats.entries()) {
//             this._stats.set(k, v);
//         }
//         this._skills = new Map();
//         for (const [k, v] of this.baseStatSheet.skills.entries()) {
//             this._skills.set(k, v);
//         }
//         this._saves = new Map();
//         for (const [k, v] of this.baseStatSheet.saves.entries()) {
//             this._saves.set(k, v);
//         }
//         this._speeds = new Map();
//         for (const [k, v] of this.baseStatSheet.speeds.entries()) {
//             this._speeds.set(k, v);
//         }
//     }
//
//     public refreshContractEffects(): void {
//         this.toZero();
//     }
//
//     public getAttacksWithActivation(activation: Activation): string[] {
//         return [];
//     }
//
//     public get title(): string {
//         return this.baseStatSheet.title;
//     }
//
//     public get subtitle(): string {
//         return this.baseStatSheet.subtitle;
//     }
//
//     public get cr(): number | string {
//         return this.contracts.size == 0 ? this.baseStatSheet.cr : "???";
//     }
//
//     public get pb(): Prof {
//         return this._prof;
//     }
//
//     public get stats(): ReadonlyMap<CoreStat, StatValue> {
//         return this._stats;
//     }
//
//     public get ac(): number {
//         return this._ac;
//     }
//
//     public get acDesc(): string {
//         return this.baseStatSheet.acDesc;
//     }
//
//     public get speeds(): ReadonlyMap<Speed, number> {
//         return this._speeds;
//     }
//
//     public get size(): string {
//         return this.baseStatSheet.size;
//     }
//
//     public get hpDice(): Map<Dice, number> {
//         return undefined;
//     }
//
//     public get saves(): ReadonlyMap<CoreStat, number> {
//         return this._saves;
//     }
//
//     public get skills(): ReadonlyMap<Skill, number> {
//         return this._skills;
//     }
//
//     public get vulnerabilities(): ReadonlySet<DamageType> {
//         return this._damageVulnerabilities;
//     }
//
//     public get resistances(): ReadonlySet<DamageType> {
//         return this._damageResistances;
//     }
//
//     public get immunities(): ReadonlySet<DamageType> {
//         return this._damageImmunities;
//     }
//
//     public get conditionImmunities(): ReadonlySet<Conditions> {
//         return this._conditionImmunities;
//     }
// }


// TODO: LANGUAGES, SENSES
export function renderStatSheet(monster_id: string,
                                statSheet: IStatSheet)
{
    const speedList = [];
    for (const [speed, value] of statSheet.speeds.entries()) {
        speedList.push(`${Speed[speed]} ${value} ft.`);
    }

    const statList = [];
    for (const stat of [CoreStat.Str,
                        CoreStat.Dex,
                        CoreStat.Con,
                        CoreStat.Int,
                        CoreStat.Wis,
                        CoreStat.Cha])
    {
        const statVal = statSheet.stats.get(stat);
        statList.push(`<td>${statVal.stat} ${NatRollable.generate(statVal.mod).getRollString(true)}</td>`);
    }

    const saveList = [];
    for (const [stat, save] of statSheet.saves.entries()) {
        saveList.push(`${CoreStat[stat]} ${NatRollable.generate(save).getRollString(true)}`);
    }

    const skillList = [];
    for (const [skill, mod] of statSheet.skills.entries()) {
        skillList.push(`${Skill[skill]} ${NatRollable.generate(mod).getRollString(true)}`);
    }

    const contentList = [];
    for (const activation of [Activation.Special,
                              Activation.Action,
                              Activation.BonusAction,
                              Activation.Reaction,
                              Activation.LegendaryAction,
                              Activation.MythicAction])
    {
        const attacks = statSheet.getAttacksWithActivation(activation);
        if (attacks.length == 0) {
            continue;
        }
        if (activation != Activation.Special) {
            contentList.push(`<h4 class="sheet_section_header">${Activation[activation]}s</h4>`);
        }
        for (const attack of attacks) {
            contentList.push(`<div class="sheet_content">${attack}</div>`);
        }
    }

    const vulnerabilities = [];
    for (const v of statSheet.vulnerabilities.values()) {
        vulnerabilities.push(DamageType[v]);
    }
    const vulStr = vulnerabilities.length == 0 ?
                   "" :
                   `<tr><td>Damage Vulnerabilities</td><td>${vulnerabilities.join(", ")}</td></tr>`;

    const res = [];
    for (const v of statSheet.resistances.values()) {
        res.push(DamageType[v]);
    }
    const resStr = res.length == 0 ?
                   "" :
                   `<tr><td>Damage Resistances</td><td>${res.join(", ")}</td></tr>`;

    const imm = [];
    for (const v of statSheet.immunities.values()) {
        imm.push(DamageType[v]);
    }
    const immStr = imm.length == 0 ?
                   "" :
                   `<tr><td>Damage Immunities</td><td>${imm.join(", ")}</td></tr>`;

    const cimm = [];
    for (const v of statSheet.conditionImmunities.values()) {
        cimm.push(Conditions[v]);
    }
    const cimmStr = cimm.length == 0 ?
                   "" :
                   `<tr><td>Condition Immunities</td><td>${cimm.join(", ")}</td></tr>`;

    return `
    <div class="stat_sheet" id="stat_sheet_${monster_id}">
        <div class="sheet_header">
            <div class="header_zone">
                <h3 class="sheet_title">${statSheet.title}</h3>
                <div class="sheet_subtitle">${statSheet.size} ${statSheet.subtitle}</div>
            </div>
            <div class="header_zone">
                <table class="ignore_common_style">
                    <tr><td>Armor Class</td><td>${statSheet.ac} ${statSheet.acDesc}</td></tr>
                    <tr><td>Hit Points</td><td>${Math.round(E(statSheet.hpDice))} 
                        ${new Rollable(statSheet.hpDice).getRollString(true)}</td></tr>
                    <tr><td>Speed</td><td>${speedList.join(", ")}</td></tr>
                </table>
            </div>
            <div class="header_zone">
                <table class="stats_table ignore_common_style">
                    <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
                    <tr>${statList.join("")}</tr>
                </table>
            </div>
            <div class="header_zone">
                <table class="ignore_common_style">
                    <tr><td>Saving Throws</td><td>${saveList.join(" ")}</td></tr>
                    <tr><td>Proficiency Bonus</td><td>${skillList.join(" ")}</td></tr>
                    <tr><td>Challenge Rating</td><td>${statSheet.cr}</td></tr>
                    <tr><td>Proficiency Bonus</td><td>${statSheet.pb.mod()}</td></tr>
                    ${vulStr}${resStr}${immStr}${cimmStr}
                </table>
            </div>
        </div>
        ${contentList.join("")}
    </div>`;
}


export function test()
{
    // const attack = new DDBAttack({
    //     prof                  : 6,
    //     activation            : Activation.Action,
    //     expectedDamage        : 100,
    //     mainStat              : CoreStats.Str,
    //     stats                 : new Map([
    //         [CoreStats.Str, new StatValue(22)],
    //         [CoreStats.Dex, new StatValue(10)],
    //         [CoreStats.Con, new StatValue(10)],
    //         [CoreStats.Int, new StatValue(10)],
    //         [CoreStats.Wis, new StatValue(10)],
    //         [CoreStats.Cha, new StatValue(16)],
    //     ]),
    //     title                 : "Greatsword",
    //     contentGenerator      : (args: AttackContentAPI) => {
    //         return `<p><em>Melee Weapon Attack</em>: ${args.getToHitRollableStr("Greatsword",
    //             args.getToHit(args.mainStat) + args.getMod(CoreStats.Cha))},
    //                 Reach 10ft., one target. <em>Hit</em>: ${args.getDamageRollableStr("GreatswordBase")}. Plus an additional
    //                 ${args.getDamageRollableStr("GreatswordTrauma")}. An additional ${args.getDamageRollableStr("Shroud")}
    //                 is taken if the necrotic shroud is active. Also, the target must succeed a DC ${args.getDc(CoreStats.Str)}
    //                 save or fall prone.</p>`;
    //     },
    //     assignedDamages       : args => new Map([
    //         ["GreatswordBase", new Map([[D6, 2], [D1, args.getMod(CoreStats.Str) + args.getMod(CoreStats.Cha)]])],
    //         ["GreatswordTrauma", new Map([[D8, 2]])]
    //     ]),
    //     unassignedDamageRatios: new Map([
    //         ["GreatswordTrauma", new Map([[D8, 2]])],
    //         ["Shroud", new Map([[D8, 3]])]
    //     ]),
    //     damageTypes           : new Map([
    //         ["GreatswordBase", DamageType.Piercing],
    //         ["GreatswordTrauma", DamageType.Psychic],
    //         ["Shroud", DamageType.Necrotic],
    //     ])
    // });
    // attack.generateContent();
    // console.assert(attack.content ==
    //                `<p><strong><em>Greatsword</em>. </strong><em>Melee Weapon Attack</em>: [rollable]+15;{
    //         "diceNotation": "1d20+15",
    //         "rollType":     "to hit",
    //         "rollAction":   "Greatsword"
    //     }[/rollable] to hit,
    //                 Reach 10ft., one target. <em>Hit</em>: [rollable]2d6+9;{
    //         "diceNotation":   "2d6+9",
    //         "rollType":       "damage",
    //         "rollAction":     "GreatswordBase",
    //         "rollDamageType": "Piercing"
    //     }[/rollable] Piercing damage. Plus an additional
    //                 [rollable]9d8;{
    //         "diceNotation":   "9d8",
    //         "rollType":       "damage",
    //         "rollAction":     "GreatswordTrauma",
    //         "rollDamageType": "Psychic"
    //     }[/rollable] Psychic damage. An additional [rollable]10d8;{
    //         "diceNotation":   "10d8",
    //         "rollType":       "damage",
    //         "rollAction":     "Shroud",
    //         "rollDamageType": "Necrotic"
    //     }[/rollable] Necrotic damage
    //                 is taken if the necrotic shroud is active. Also, the target must succeed a DC 20
    //                 save or fall prone.</p>`);
    //
    // createInklingDDB();
    // createInklingDog();
    // createInklingAberrant();
    // createInklingWannabeBoss();
    // createInklingDynamite();
    // createInklingTank();
}
