import {D1, D12, D20, D4, D6, D8, Dice} from "../common/diceConstants";
import {NatRollable, Rollable}          from "../common/rollable";
import {
    Activation,
    AdventurerClasses,
    AdventurerHitDice,
    Conditions,
    CoreStats,
    CreatureSize,
    DamageType,
    E,
    ProficiencyLevel,
    SizeToDice,
    Skill,
    SkillForStat,
    Speed,
}                                       from "./definitions/constants";


class StatValue {
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

class CRValue {
    private readonly val: number;

    constructor(val,
                private readonly profAdjustment: number = 0)
    {
        this.val = Math.round(Math.min(30, Math.max(0, val)));
    }

    public get cr(): number {
        return this.val;
    }

    public get prof(): number {
        return Math.ceil(Math.max(1, this.val) / 4) + 1 + this.profAdjustment;
    }

    public compareToStats(): number {
        // todo: Compare to the offensive/defensive stats as per the DMG and
        //  offset the difference between expected and true stats.
        throw new Error("Not implemented.");
    }
}


interface IStatSheet
{
    get title(): string;
    get subtitle(): string;

    get cr(): number;
    get pbMod(): number;

    get stats(): ReadonlyMap<CoreStats, StatValue>;

    get ac(): number;
    get acDesc(): string;
    get speeds(): ReadonlyMap<Speed, number>;

    get size(): string;
    get hpDiceCount(): number;
    get hpDiceStr(): string;
    get hpExpected(): number;

    get saves(): ReadonlyMap<CoreStats, number>;
    get skills(): ReadonlyMap<Skill, number>;

    get vulnerabilities(): ReadonlySet<DamageType>;
    get resistances(): ReadonlySet<DamageType>;
    get immunities(): ReadonlySet<DamageType>;
    get conditionImmunities(): ReadonlySet<Conditions>;

    getAttacksWithActivation(activation: Activation): string[];
}

interface CoreAttackParams {
    title: string;
    subtitle?: string;
    activation: Activation;
    expectedDamage: number;
    mainStat: CoreStats;
    hitBonus?: number;
    dcBonus?: number;
    contentGenerator: (args: AttackContentAPI) => string;
    assignedDamages?: (args: AttackContentAPI) => Map<string, Map<Dice, number>>;
    unassignedDamageRatios?: ReadonlyMap<string, Map<Dice, number>>;
    damageTypes?: ReadonlyMap<string, DamageType>;
}

interface AttackParams extends CoreAttackParams {
    prof?: number;
    stats?: Map<CoreStats, StatValue>;
}

interface AttackContentAPI {
    get prof(): number;
    get mainStat(): CoreStats;
    getDc(stat?: CoreStats): number;
    getMod(stat?: CoreStats): number;
    getToHit(stat?: CoreStats): number;
    getDamageRollableStr(key: string): string;
    getToHitRollableStr(name: string, toHitMod: number): string;
}


abstract class Attack
    implements AttackContentAPI
{
    public readonly activation: Activation;
    public get prof(): number {
        return this.sheet.pbMod;
    }
    public readonly mainStat: CoreStats;

    protected readonly damageTypes: ReadonlyMap<string, DamageType>;
    protected resolvedDamages: Map<string, Map<Dice, number>>;

    public sheet: IStatSheet;

    private get stats(): ReadonlyMap<CoreStats, StatValue> {
        return this.sheet.stats;
    }
    private readonly title: string;
    private readonly expectedDamage: number;
    private readonly subTitle: string = "";
    private readonly hitBonus: number;
    private readonly dcBonus: number;
    private readonly contentGenerator: (args: AttackContentAPI) => string;
    private readonly assignedDamages: (args: AttackContentAPI) => Map<string, Map<Dice, number>>;

    private readonly unassignedDamageRatios: ReadonlyMap<string, Map<Dice, number>>;
    private _content: string | null;

    public constructor(params: AttackParams)
    {
        const subtitle = params.subtitle ?? "";
        this.title = params.title;
        this.activation = params.activation;
        this._content = null;
        this.subTitle = subtitle;
        this.hitBonus = params.hitBonus ?? 0;
        this.dcBonus = params.dcBonus ?? 0;
        this.expectedDamage = params.expectedDamage;
        this.contentGenerator = params.contentGenerator;
        this.mainStat = params.mainStat;
        this.assignedDamages = params.assignedDamages ?? (() => new Map());
        this.unassignedDamageRatios = params.unassignedDamageRatios ?? new Map();
        this.damageTypes = params.damageTypes ?? new Map();

        this.resolvedDamages = null;
    }

    public abstract getDamageRollableStr(key: string): string;

    public abstract getToHitRollableStr(name: string, toHitMod: number): string;

    protected computeUnassignedAttackDice()
    {
        let totalAssignedDamage = 0;
        const assignedDamages = this.assignedDamages(this);
        for (const damageDice of assignedDamages.values()) {
            totalAssignedDamage += E(damageDice);
        }
        const damageLeftToAssign = this.expectedDamage - totalAssignedDamage;
        if (damageLeftToAssign <= 0) {
            throw new Error("Assigned damage exceeds expected.");
        }
        let totalRatio = 0;
        for (const [, perDiceRatios] of this.unassignedDamageRatios.entries()) {
            for (const [, ratio] of perDiceRatios.entries()) {
                totalRatio += ratio;
            }
        }
        for (const [key, perDiceRatios] of this.unassignedDamageRatios.entries()) {
            for (const [die, ratio] of perDiceRatios.entries()) {
                let damageMap: Map<Dice, number>;
                if (assignedDamages.has(key)) {
                    damageMap = assignedDamages.get(key);
                } else {
                    damageMap = new Map();
                    assignedDamages.set(key, damageMap);
                }
                const nDice = Math.round((damageLeftToAssign * ratio / totalRatio) / E(die));
                damageMap.set(die, (damageMap.get(die) ?? 0) + nDice);
            }
        }

        this.resolvedDamages = assignedDamages;
    }

    public getDc(stat?: CoreStats): number
    {
        if (stat == undefined) {
            stat = this.mainStat;
        }
        return 8 + this.getMod(stat) + this.prof + this.dcBonus;
    }

    public getMod(stat?: CoreStats): number
    {
        if (stat == undefined) {
            stat = this.mainStat;
        }
        return this.stats.get(stat).mod;
    }

    public getToHit(stat?: CoreStats): number
    {
        if (stat == undefined) {
            stat = this.mainStat;
        }
        return this.getMod(stat) + this.prof + this.hitBonus;
    }

    public generateContent(): void
    {
        const content = this.contentGenerator(this);

        if (content.substring(0, 3) != '<p>') {
            throw new Error("Content should start with <p> tag.");
        }
        this._content =
            `<p><strong><em>${this.title}</em>. ${this.subTitle}</strong>` +
            content.substring(3);
    }

    public get content()
    {
        if (this._content == null) {
            this.generateContent();
        }
        return this._content;
    }
}


class DDBAttack
    extends Attack
{
    public getDamageRollableStr(key: string): string {
        if (this.resolvedDamages == null) {
            this.computeUnassignedAttackDice();
        }
        const rollStr = new Rollable(this.resolvedDamages.get(key)).getRollString(false);
        return `[rollable]${rollStr};{
            "diceNotation":   "${rollStr}", 
            "rollType":       "damage", 
            "rollAction":     "${key}", 
            "rollDamageType": "${DamageType[this.damageTypes.get(key)]}"
        }[/rollable] ${DamageType[this.damageTypes.get(key)]} damage`;
    }

    public getToHitRollableStr(name: string, toHitMod: number): string {
        const toHitStr = NatRollable.generate(toHitMod).getRollString(false);
        return `[rollable]${toHitStr};{
            "diceNotation": "1d20${toHitStr}", 
            "rollType":     "to hit", 
            "rollAction":   "${name}"
        }[/rollable] to hit`;
    }
}

class InternalAttack
    extends Attack
{
    public getDamageRollableStr(key: string): string
    {
        if (this.resolvedDamages == null) {
            this.computeUnassignedAttackDice();
        }
        return `${new Rollable(this.resolvedDamages.get(key)).getRollString(true)} 
                ${DamageType[this.damageTypes.get(key)]} damage`;
    }

    public getToHitRollableStr(name: string, toHitMod: number): string
    {
        return NatRollable.generate(toHitMod).getRollString(true);
    }
}

class HpBlock
{
    public constructor(public readonly stats: Map<CoreStats, StatValue>,
                       public readonly size: Dice,
                       public readonly biologicalHp: number,
                       public readonly adventurerLevels: Map<AdventurerClasses, number> = new Map(),
                       public readonly isTough: boolean = false)
    { }

    public get conHpPerDice()
    {
        return this.stats.get(CoreStats.Con).mod + (this.isTough ? 2 : 0);
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

    public get hpExpected(): number {
        return (E(this.size) + this.conHpPerDice) * this.hpDiceCount;
    }
}


interface StatBlockParams {
    title: string;
    subtitle: string;
    crValue: CRValue;
    stats: Map<CoreStats, StatValue>;
    speeds: ReadonlyMap<Speed, number>;
    size: CreatureSize;
    biologicalHp: number;
    ac: number;
    acDesc?: string;
    adventurerLevels?: Map<AdventurerClasses, number>;
    isTough?: boolean;
    attacks: Attack[];
    saveProficiencies: ReadonlyMap<CoreStats, ProficiencyLevel>;
    saveBonuses?: ReadonlyMap<CoreStats, number>;
    skillProficiencies: ReadonlyMap<Skill, ProficiencyLevel>;
    skillBonuses?: ReadonlyMap<Skill, number>;
    vulnerabilities?: ReadonlySet<DamageType>;
    resistances?: ReadonlySet<DamageType>;
    immunities?: ReadonlySet<DamageType>;
    conditionImmunities?: ReadonlySet<Conditions>;
}

class StatSheet
    implements IStatSheet
{
    public readonly title: string;

    public readonly subtitle: string;

    public readonly speeds: ReadonlyMap<Speed, number>;

    private readonly _stats: Map<CoreStats, StatValue>;

    private readonly hpBlock: HpBlock;

    private readonly crValue: CRValue;

    private readonly _ac: number;

    private readonly _acDesc: string;

    private readonly _size: CreatureSize;

    private readonly attacks: Attack[];

    private readonly _saveProficiencies: ReadonlyMap<CoreStats, ProficiencyLevel>;

    private readonly _skillProficiencies: ReadonlyMap<Skill, ProficiencyLevel>;

    private readonly _saveBonuses: ReadonlyMap<CoreStats, ProficiencyLevel>;

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
            attack.sheet = this;
        }

        this.hpBlock = new HpBlock(stats,
                                   SizeToDice.get(size),
                                   biologicalHp,
                                   adventurerLevels,
                                   isTough);
    }

    public get hpDiceCount(): number {
        return this.hpBlock.hpDiceCount;
    }

    public get hpExpected(): number {
        return this.hpBlock.hpExpected;
    }

    public get hpDiceStr(): string {
        return new Rollable(new Map([
            [SizeToDice.get(this._size), this.hpDiceCount],
            [D1, this.hpDiceCount * this.hpBlock.conHpPerDice],
        ])).getRollString(true);
    }

    public get stats(): ReadonlyMap<CoreStats, StatValue> {
        return this._stats;
    }

    public get cr(): number {
        return this.crValue.cr;
    }

    public get pbMod(): number {
        return this.crValue.prof;
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

    public getAttacksWithActivation(activation: Activation): string[]
    {
        const r = [];
        for (const attack of this.attacks) {
            if (attack.activation != activation) {
                continue;
            }
            r.push(attack.content);
        }
        return r;
    }

    public get saves(): ReadonlyMap<CoreStats, number> {
        const m = new Map();
        for (const [stat, saveBonus] of this._saveBonuses.entries()) {
            m.set(stat, (m.has(stat) ? m.get(stat) : this._stats.get(stat).mod) + saveBonus);
        }
        for (const [stat, saveProf] of this._saveProficiencies.entries()) {
            let bonus = 0;
            if (saveProf == ProficiencyLevel.Half) {
                bonus = Math.floor(this.pbMod / 2);
            }
            else if (saveProf == ProficiencyLevel.Prof) {
                bonus = this.pbMod;
            }
            else if (saveProf == ProficiencyLevel.Expert) {
                bonus = this.pbMod * 2;
            }
            m.set(stat, (m.has(stat) ? m.get(stat) : this._stats.get(stat).mod) + bonus);
        }
        return m;
    }

    public get skills(): ReadonlyMap<Skill, ProficiencyLevel> {
        const m = new Map();
        for (const [skill, saveBonus] of this._skillBonuses.entries()) {
            const stat = SkillForStat.get(skill);
            m.set(skill, (m.has(skill) ? m.get(skill) : this._stats.get(stat).mod) + saveBonus);
        }
        for (const [skill, saveProf] of this._skillProficiencies.entries()) {
            let bonus = 0;
            if (saveProf == ProficiencyLevel.Half) {
                bonus = Math.floor(this.pbMod / 2);
            }
            else if (saveProf == ProficiencyLevel.Prof) {
                bonus = this.pbMod;
            }
            else if (saveProf == ProficiencyLevel.Expert) {
                bonus = this.pbMod * 2;
            }
            const stat = SkillForStat.get(skill);
            m.set(skill, (m.has(skill) ? m.get(skill) : this._stats.get(stat).mod) + bonus);
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


// TODO: LANGUAGES, SENSES
export function renderStatSheet(monster_id: string,
                                statSheet: IStatSheet)
{
    const speedList = [];
    for (const [speed, value] of statSheet.speeds.entries()) {
        speedList.push(`${Speed[speed]} ${value} ft.`);
    }

    const statList = [];
    for (const stat of [CoreStats.Str,
                        CoreStats.Dex,
                        CoreStats.Con,
                        CoreStats.Int,
                        CoreStats.Wis,
                        CoreStats.Cha])
    {
        const statVal = statSheet.stats.get(stat);
        statList.push(`<td>${statVal.stat} ${NatRollable.generate(statVal.mod).getRollString(true)}</td>`);
    }

    const saveList = [];
    for (const [stat, save] of statSheet.saves.entries()) {
        saveList.push(`${CoreStats[stat]} ${NatRollable.generate(save).getRollString(true)}`);
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
                    <tr><td>Hit Points</td><td>${Math.round(statSheet.hpExpected)} ${statSheet.hpDiceStr}</td></tr>
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
                    <tr><td>Proficiency Bonus</td><td>${statSheet.pbMod}</td></tr>
                    ${vulStr}${resStr}${immStr}${cimmStr}
                </table>
            </div>
        </div>
        ${contentList.join("")}
    </div>`;
}

function createInkling() {

    const inkSprayText = new InternalAttack({
        title         : "Ink Spray",
        activation    : Activation.Special,
        mainStat      : CoreStats.Con,
        contentGenerator(args: AttackContentAPI): string {
            return `<p>Upon death, the inkling sprays viscous ink at all creatures within 15 feet of itself. The targets
            must succeed on a DC ${args.getDc()} Constitution saving throw or be blinded until the end of their next turn.</p>`;
        },
        expectedDamage: 0
    });
    const biteText = new InternalAttack({
        title         : "Bite",
        activation    : Activation.Action,
        mainStat      : CoreStats.Str,
        contentGenerator(args: AttackContentAPI): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr("Bite", args.getToHit())}, reach 5 ft., one target. 
            Hit: ${args.getDamageRollableStr("Bite")} plus ${args.getDamageRollableStr("Blot")} and ${args.getDamageRollableStr("BlotNeural")}.</p>`;
        },
        expectedDamage: 32,
        assignedDamages: args => new Map([
            ["Bite", new Map([[D4, 1], [D1, args.getMod()]])]
        ]),
        unassignedDamageRatios: new Map([
            ["Blot", new Map([[D8, 1]])],
            ["BlotNeural", new Map([[D8, 1]])]
        ]),
        damageTypes: new Map([
            ["Bite", DamageType.Piercing],
            ["Blot", DamageType.Poison],
            ["BlotNeural", DamageType.Psychic],
        ])
    });

    return new StatSheet({
        title             : "Inkling (Insecurity)",
        size              : CreatureSize.Medium,
        subtitle          : " Inkling(Ooze), Typically Chaotic Neutral",
        stats             : new Map([
            [CoreStats.Str, new StatValue(13)],
            [CoreStats.Dex, new StatValue(13)],
            [CoreStats.Con, new StatValue(14)],
            [CoreStats.Int, new StatValue(16)],
            [CoreStats.Wis, new StatValue(15)],
            [CoreStats.Cha, new StatValue(13)],
        ]),
        ac                : 13,
        acDesc            : "(Natural Armor)",
        biologicalHp      : 40,
        attacks           : [inkSprayText, biteText],
        crValue           : new CRValue(2),
        saveProficiencies : new Map([
            [CoreStats.Con, ProficiencyLevel.Prof],
        ]),
        skillProficiencies: new Map([
            [Skill.Stealth, ProficiencyLevel.Expert],
        ]),
        speeds            : new Map([
            [Speed.Walking, 30]
        ]),
        vulnerabilities: new Set([
            DamageType.Cold,
            DamageType.Lightning,
            DamageType.Bludgeoning,
        ]),
        resistances: new Set([
            DamageType.Acid,
            DamageType.Fire,
            DamageType.Piercing,
            DamageType.Thunder,
        ]),
        immunities: new Set([
            DamageType.Poison,
            DamageType.Psychic,
        ]),
        conditionImmunities: new Set([
            Conditions.Blinded,
            Conditions.Deafened,
            Conditions.Exhaustion,
        ]),
    });
}

function createInklingDog()
{
    const biteText = new InternalAttack({
        title         : "Bite",
        activation    : Activation.Action,
        mainStat      : CoreStats.Dex,
        contentGenerator(args: AttackContentAPI): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr("Bite", args.getToHit())}, reach 5 ft., one target. 
            Hit: ${args.getDamageRollableStr("Bite")} plus ${args.getDamageRollableStr("BiteVenom")}</p>`;
        },
        expectedDamage: 10,
        assignedDamages: args => new Map([
            ["Bite", new Map([[D6, 1], [D1, args.getMod()]])]
        ]),
        unassignedDamageRatios: new Map([
            ["BiteVenom", new Map([[D4, 1]])]
        ]),
        damageTypes: new Map([
            ["Bite", DamageType.Piercing],
            ["BiteVenom", DamageType.Poison],
        ])
    });

    return new StatSheet({
        title             : "Inkling (Impatience)",
        size              : CreatureSize.Small,
        subtitle          : " Inkling(Fiend), Typically Chaotic Neutral",
        stats             : new Map([
            [CoreStats.Str, new StatValue(11)],
            [CoreStats.Dex, new StatValue(17)],
            [CoreStats.Con, new StatValue(11)],
            [CoreStats.Int, new StatValue(6)],
            [CoreStats.Wis, new StatValue(13)],
            [CoreStats.Cha, new StatValue(7)],
        ]),
        ac                : 13,
        acDesc            : "(Natural Armor)",
        biologicalHp      : 32,
        attacks           : [biteText],
        crValue           : new CRValue(1),
        saveProficiencies : new Map([
            [CoreStats.Dex, ProficiencyLevel.Prof],
        ]),
        skillProficiencies: new Map([
            [Skill.Athletics, ProficiencyLevel.Prof],
            [Skill.Acrobatics, ProficiencyLevel.Prof],
        ]),
        speeds            : new Map([
            [Speed.Walking, 50]
        ]),
        vulnerabilities: new Set([
            DamageType.Fire,
            DamageType.Lightning,
        ]),
        resistances: new Set([
            DamageType.Cold,
            DamageType.Poison,
            DamageType.Psychic,
        ]),
    });
}


function createInklingAberrant()
{
    const inkSpitText = new InternalAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>The inkling spits viscous ink at one creature within 60 feet of itself. The target must succeed 
                    on a DC ${args.getDc()} Constitution saving throw. On failure, they take ${args.getDamageRollableStr("Blot")}
                    and are Blinded until the end of their next turn. On success, they take half
                    the poison damage and are not blinded. Regardless of the roll, they take ${args.getDamageRollableStr("BlotNeural")}.</p>`;
        },
        assignedDamages: args => new Map([
            ["Blot", new Map([[D1, args.getMod(CoreStats.Con)]])],
            ["BlotNeural", new Map([[D1, args.getMod(CoreStats.Int)]])]
        ]),
        unassignedDamageRatios: new Map([
            ["Blot", new Map([[D8, 3]])],
            ["BlotNeural", new Map([[D8, 1]])]
        ]),
        damageTypes: new Map([
            ["Blot", DamageType.Poison],
            ["BlotNeural", DamageType.Psychic],
        ]),
        activation    : Activation.Action,
        expectedDamage: 50,
        mainStat      : CoreStats.Con,
        title         : "Ink Spit"
    });

    const chargedText = new InternalAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>The inkling spits viscous ink at one creature within 90 feet of itself. The target must succeed 
                    on a DC ${args.getDc() + args.prof} Constitution saving throw. On failure, they take ${args.getDamageRollableStr("Blot")}
                    and are Blinded until the end of their next turn. On success, they take half
                    the poison damage and are not blinded. Regardless of the roll, they take ${args.getDamageRollableStr("BlotNeural")}. 
                    This damage is neural damage and can cause the target to be Stunned.</p>`;
        },
        assignedDamages: args => new Map([
            ["Blot", new Map([[D1, args.getMod(CoreStats.Con)]])],
            ["BlotNeural", new Map([[D1, args.getMod(CoreStats.Int)]])]
        ]),
        unassignedDamageRatios: new Map([
            ["Blot", new Map([[D8, 1]])],
            ["BlotNeural", new Map([[D8, 3]])]
        ]),
        damageTypes: new Map([
            ["Blot", DamageType.Poison],
            ["BlotNeural", DamageType.Psychic],
        ]),
        activation    : Activation.Action,
        expectedDamage: 100,
        mainStat      : CoreStats.Int,
        title         : "Charged Spit"
    });


    return new StatSheet({
        title             : "Inkling (Envy)",
        size              : CreatureSize.Medium,
        subtitle          : " Inkling(Aberration), Typically Chaotic Evil",
        stats             : new Map([
            [CoreStats.Str, new StatValue(13)],
            [CoreStats.Dex, new StatValue(11)],
            [CoreStats.Con, new StatValue(16)],
            [CoreStats.Int, new StatValue(19)],
            [CoreStats.Wis, new StatValue(13)],
            [CoreStats.Cha, new StatValue(15)],
        ]),
        ac                : 11,
        acDesc            : "(Natural Armor)",
        biologicalHp      : 100,
        attacks           : [inkSpitText, chargedText],
        crValue           : new CRValue(5),
        saveProficiencies : new Map([
            [CoreStats.Int, ProficiencyLevel.Prof],
            [CoreStats.Wis, ProficiencyLevel.Prof],
        ]),
        skillProficiencies: new Map([
            [Skill.Perception, ProficiencyLevel.Expert],
        ]),
        speeds            : new Map([
            [Speed.Flying, 20]
        ]),
        vulnerabilities: new Set([
            DamageType.Lightning,
            DamageType.Thunder,
        ]),
        immunities: new Set([
            DamageType.Poison,
            DamageType.Psychic,
        ]),
        conditionImmunities: new Set([
            Conditions.Prone,
            Conditions.Blinded,
        ]),
    });
}

function createInklingWannabeBoss()
{

    const slamText = new InternalAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr("Slam", args.getMod())}, reach 15 ft., one target. 
                    Hit: ${args.getDamageRollableStr("Slam")} plus ${args.getDamageRollableStr("SlamVibe")}. The primary
                    target must succeed a DC ${args.getDc()} Str save or fall prone. Those within 5ft of the primary 
                    target take half the bludgeoning damage and must make a DC ${args.getDc()} Con save or take the 
                    thunder damage too. On a fail of 10 or more, they are deafened until a long rest.<br/>
                    <em>The behemoth inkling slams a mighty fist into the ground, crushing the poor victim who wasn't 
                    able to run away in time and sending thunderous shockwaves shaking those around.</em></p>`;
        },
        assignedDamages: args => new Map([
            ["Slam", new Map([[D1, args.getMod()]])],
        ]),
        unassignedDamageRatios: new Map([
            ["Slam", new Map([[D8, 3]])],
            ["SlamVibe", new Map([[D8, 1]])]
        ]),
        damageTypes: new Map([
            ["Slam", DamageType.Bludgeoning],
            ["SlamVibe", DamageType.Thunder],
        ]),
        activation    : Activation.Action,
        expectedDamage: 110,
        mainStat      : CoreStats.Str,
        title         : "Slam",
    });
    const jumpText = new InternalAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>Can jump up to 60 ft as a bonus action - can grapple a target within 5 ft of landing or takeoff
                       as part of the same action.</p>`;
        },
        activation    : Activation.BonusAction,
        expectedDamage: 0,
        mainStat      : CoreStats.Str,
        title         : "Jump",
    });
    const reactText = new InternalAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>Can slam once as an opportunity attack whenever an enemy comes within range.</p>`;
        },
        activation    : Activation.Reaction,
        expectedDamage: 0,
        mainStat      : CoreStats.Str,
        title         : "Jump",
    });

    return new StatSheet({
        title             : "Inkling (Fury)",
        size              : CreatureSize.Huge,
        subtitle          : " Inkling(Beast), Typically Chaotic Neutral",
        stats             : new Map([
            [CoreStats.Str, new StatValue(24)],
            [CoreStats.Dex, new StatValue(13)],
            [CoreStats.Con, new StatValue(24)],
            [CoreStats.Int, new StatValue(7)],
            [CoreStats.Wis, new StatValue(8)],
            [CoreStats.Cha, new StatValue(13)],
        ]),
        ac                : 18,
        acDesc            : "(Natural Armor)",
        biologicalHp      : 160,
        attacks           : [slamText, jumpText, reactText],
        crValue           : new CRValue(9),
        saveProficiencies : new Map([
            [CoreStats.Dex, ProficiencyLevel.Prof],
        ]),
        skillProficiencies: new Map([
            [Skill.Athletics, ProficiencyLevel.Expert],
            [Skill.Acrobatics, ProficiencyLevel.Prof],
        ]),
        speeds            : new Map([
            [Speed.Walking, 50]
        ]),
        vulnerabilities: new Set([
            DamageType.Lightning,
        ]),
        resistances: new Set([
            DamageType.Cold,
            DamageType.Poison,
            DamageType.Psychic,
        ]),
    });
}


function createInklingDynamite()
{

    const boomText = new InternalAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>Upon death explodes to deal ${args.getDamageRollableStr("Boom")} to targets within 5 ft. 
                    On coming into contact with its opposite explodes to deal ${args.getDamageRollableStr("BigBoom")} 
                    instead to targets within 20ft and half damage to targets within 40ft.</p>`;
        },
        assignedDamages: _ => new Map([
        ]),
        unassignedDamageRatios: new Map([
            ["Boom", new Map([[D20, 1]])],
            ["BigBoom", new Map([[D20, 12]])]
        ]),
        damageTypes: new Map([
            ["Boom", DamageType.Force],
            ["BigBoom", DamageType.Force],
        ]),
        activation    : Activation.Special,
        expectedDamage: 270,
        mainStat      : CoreStats.Dex,
        title         : "Boom",
    });

    const halfLifeText = new InternalAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p> Doesn't die till both opposites explode, instead just enters a diffused state with halved
                    movement speed. If the opposites come into contact and at least one is diffused, damage dealt
                    is half the rolled damage.</p>`;
        },
        activation    : Activation.Special,
        expectedDamage: 0,
        mainStat      : CoreStats.Dex,
        title         : "Half Lives",
    });


    return new StatSheet({
        title             : "Inkling (Arrogance)",
        size              : CreatureSize.Tiny,
        subtitle          : " Inkling(Aberration), Typically Neutral Evil",
        stats             : new Map([
            [CoreStats.Str, new StatValue(1)],
            [CoreStats.Dex, new StatValue(28)],
            [CoreStats.Con, new StatValue(10)],
            [CoreStats.Int, new StatValue(13)],
            [CoreStats.Wis, new StatValue(14)],
            [CoreStats.Cha, new StatValue(11)],
        ]),
        ac                : 19,
        acDesc            : "(Natural Armor)",
        biologicalHp      : 19,
        attacks           : [boomText, halfLifeText],
        crValue           : new CRValue(5),
        saveProficiencies : new Map([
            [CoreStats.Int, ProficiencyLevel.Prof],
            [CoreStats.Wis, ProficiencyLevel.Prof],
            [CoreStats.Cha, ProficiencyLevel.Expert],
        ]),
        skillProficiencies: new Map([
            [Skill.Perception, ProficiencyLevel.Expert],
        ]),
        speeds            : new Map([
            [Speed.Flying, 20]
        ]),
        vulnerabilities: new Set([
            DamageType.Cold
        ]),
        immunities: new Set([
            DamageType.Fire,
            DamageType.Poison,
            DamageType.Psychic,
            DamageType.Lightning,
            DamageType.Thunder,
        ]),
        conditionImmunities: new Set([
            Conditions.Prone,
            Conditions.Blinded,
            Conditions.Frightened,
            Conditions.Charmed,
            Conditions.Grappled,
            Conditions.Exhaustion,
        ]),
    });
}

function createInklingTank()
{
    const tauntText = new InternalAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>Once a creature enters within 60 ft of them or starts their turn in that area and can see them
                    they must make a DC 24 Cha saving throw. On failure, they can only attack this creature until it 
                    dies. If it goes out of range, they must dash or do whatever they can to approach it as long as they
                    are within 120ft of it. Any AoE spell must be so placed such that this creature takes the maximum 
                    amount of damage possible. They can repeat this save at the start of their turns to break out of 
                    the taunt effect, but the DC increases by 1 with each failure.</p>`;
        },
        activation    : Activation.Special,
        expectedDamage: 0,
        mainStat      : CoreStats.Con,
        title         : "Taunt",
    });


    return new StatSheet({
        title             : "Inkling (Sloth)",
        size              : CreatureSize.Small,
        subtitle          : " Inkling(Construct), Typically Neutral",
        stats             : new Map([
            [CoreStats.Str, new StatValue(28)],
            [CoreStats.Dex, new StatValue(1)],
            [CoreStats.Con, new StatValue(28)],
            [CoreStats.Int, new StatValue(2)],
            [CoreStats.Wis, new StatValue(13)],
            [CoreStats.Cha, new StatValue(16)],
        ]),
        ac                : 22,
        acDesc            : "(Natural Armor)",
        biologicalHp      : 120,
        attacks           : [tauntText],
        crValue           : new CRValue(7, 1),
        saveProficiencies : new Map([
            [CoreStats.Str, ProficiencyLevel.Expert],
            [CoreStats.Con, ProficiencyLevel.Expert],
            [CoreStats.Int, ProficiencyLevel.Expert],
            [CoreStats.Wis, ProficiencyLevel.Expert],
            [CoreStats.Cha, ProficiencyLevel.Expert],
        ]),
        skillProficiencies: new Map([
            [Skill.Athletics, ProficiencyLevel.Expert],
            [Skill.Perception, ProficiencyLevel.Expert],
        ]),
        speeds            : new Map([
            [Speed.Walking, 50]
        ]),
        vulnerabilities: new Set([
            DamageType.Force,
            DamageType.Thunder,
        ]),
        resistances: new Set([
            DamageType.Cold,
            DamageType.Necrotic,
            DamageType.Radiant,
            DamageType.Bludgeoning,
            DamageType.Piercing,
            DamageType.Slashing,
        ]),
        immunities: new Set([
            DamageType.Acid,
            DamageType.Fire,
            DamageType.Lightning,
            DamageType.Poison,
            DamageType.Psychic,
            DamageType.Bludgeoning,
            DamageType.Piercing,
            DamageType.Slashing,
        ]),
        conditionImmunities: new Set([
            Conditions.Exhaustion,
            Conditions.Poisoned,
            Conditions.Prone,
        ]),
    });
}

export function setupMonsters()
{
    const idToGenerator: Map<string, () => StatSheet> = new Map([
        ["inkling_insecurity", createInkling],
        ["inkling_impatience", createInklingDog],
        ["inkling_envy",       createInklingAberrant],
        ["inkling_fury",       createInklingWannabeBoss],
        ["inkling_sloth",      createInklingTank],
        ["inkling_arrogance",  createInklingDynamite],
    ]);

    const generatedIds: Set<string> = new Set();
    $("#beastiary").on("click", ".creature:not(.disabled)", function() {
        const creatureId = $(this).data("creatureId");
        $(".stat_sheet").hide();

        if (!idToGenerator.has(creatureId)) {
            return;
        }

        if (generatedIds.has(creatureId)) {
            $(`#stat_sheet_${creatureId}`).show();
            return;
        }

        const statSheet = idToGenerator.get(creatureId)();
        $("#sheet_zone").append(renderStatSheet(creatureId, statSheet));
        generatedIds.add(creatureId);
    });
}

export function test()
{
    createInkling();
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
