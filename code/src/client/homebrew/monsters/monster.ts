import {D1, D12, D20, D4, D6, D8, Dice} from "../common/diceConstants";
import {PrimitiveRollable}              from "../common/rollable";
import {
    Activation,
    AdventurerClasses,
    AdventurerHitDice,
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
        const rollStr = PrimitiveRollable.generateRollString(this.resolvedDamages.get(key));
        return `[rollable]${rollStr};{
            "diceNotation":   "${rollStr}", 
            "rollType":       "damage", 
            "rollAction":     "${key}", 
            "rollDamageType": "${DamageType[this.damageTypes.get(key)]}"
        }[/rollable] ${DamageType[this.damageTypes.get(key)]} damage`;
    }

    public getToHitRollableStr(name: string, toHitMod: number): string {
        const toHitStr = (toHitMod >= 0 ? "+" : "") + toHitMod;
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
        const rollStr =
            PrimitiveRollable.generateRollString(this.resolvedDamages.get(key));
        return `<span class="rollable">${rollStr}</span> ${DamageType[this.damageTypes.get(key)]} damage`;
    }

    public getToHitRollableStr(name: string, toHitMod: number): string
    {
        const toHitStr = PrimitiveRollable.generateToHitString(toHitMod);
        return `<span class="rollable to_hit">${toHitStr}</span>`;
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
        return PrimitiveRollable.generateRollString(new Map([
            [SizeToDice.get(this._size), this.hpDiceCount],
            [D1, this.hpDiceCount * this.hpBlock.conHpPerDice],
        ]));
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
}

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
        statList.push(`<td>${statVal.stat} <span class="rollable">${
            PrimitiveRollable.generateToHitString(statVal.mod)
        }</span></td>`);
    }

    const saveList = [];
    for (const [stat, save] of statSheet.saves.entries()) {
        saveList.push(`${CoreStats[stat]} <span class="rollable">${
            PrimitiveRollable.generateToHitString(save)
        }</span>`);
    }

    const skillList = [];
    for (const [skill, mod] of statSheet.skills.entries()) {
        skillList.push(`${Skill[skill]} <span class="rollable">${
            PrimitiveRollable.generateToHitString(mod)
        }</span>`);
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
                    <tr><td>Hit Points</td><td>${Math.round(statSheet.hpExpected)} (${statSheet.hpDiceStr})</td></tr>
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
                    <tr><td>Saving Throws</td><td>${saveList.join(", ")}</td></tr>
                    <tr><td>Proficiency Bonus</td><td>${skillList.join(", ")}</td></tr>
                    <tr><td>Languages</td><td>-</td></tr>
                    <tr><td>Challenge Rating</td><td>${statSheet.cr}</td></tr>
                    <tr><td>Proficiency Bonus</td><td>${PrimitiveRollable.generateToHitString(statSheet.pbMod)}</td></tr>
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
    });
}


function createInklingAberrant()
{
    const inklingStats = new Map([
        [CoreStats.Str, new StatValue(13)],
        [CoreStats.Dex, new StatValue(11)],
        [CoreStats.Con, new StatValue(16)],
        [CoreStats.Int, new StatValue(19)],
        [CoreStats.Wis, new StatValue(11)],
        [CoreStats.Cha, new StatValue(15)],
    ]);
    const inklingProf = 3;

    const inklingHp = new HpBlock(inklingStats, D8, 100);

    const inkSpitText = new DDBAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>The inkling spits viscous ink at one creature within 60 feet of itself. The target must succeed 
                    on a DC ${args.getDc()} Constitution saving throw. On failure, they take ${args.getDamageRollableStr("Blot")}
                    and are [condition]blinded[/condition] until the end of their next turn. On success, they take half
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
        prof          : inklingProf,
        stats         : inklingStats,
        title         : "Ink Spit"
    });

    inkSpitText.generateContent();

    const chargedText = new DDBAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>The inkling spits viscous ink at one creature within 90 feet of itself. The target must succeed 
                    on a DC ${args.getDc() + args.prof} Constitution saving throw. On failure, they take ${args.getDamageRollableStr("Blot")}
                    and are [condition]blinded[/condition] until the end of their next turn. On success, they take half
                    the poison damage and are not blinded. Regardless of the roll, they take ${args.getDamageRollableStr("BlotNeural")}. 
                    This damage is neural damage and can cause the target to be [condition]Stunned[/condition].</p>`;
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
        prof          : inklingProf,
        stats         : inklingStats,
        title         : "Charged Spit"
    });

    chargedText.generateContent();

    console.log(inklingHp.hpDiceCount);
    console.log(inklingHp.hpExpected);
    console.log(inkSpitText.content);
    console.log(chargedText.content);
}

function createInklingWannabeBoss()
{
    const inklingStats = new Map([
        [CoreStats.Str, new StatValue(24)],
        [CoreStats.Dex, new StatValue(13)],
        [CoreStats.Con, new StatValue(24)],
        [CoreStats.Int, new StatValue(7)],
        [CoreStats.Wis, new StatValue(8)],
        [CoreStats.Cha, new StatValue(13)],
    ]);
    const inklingProf = 4;

    const inklingHp = new HpBlock(inklingStats, D12, 160);

    const slamText = new DDBAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr("Slam", args.getMod())}, reach 15 ft., one target. 
                    Hit: ${args.getDamageRollableStr("Slam")} plus ${args.getDamageRollableStr("SlamVibe")}. The primary
                    target must succeed a DC ${args.getDc()} Str save or fall [condition]prone[/condition]. Those within 5ft of the 
                    primary target must make a DC ${args.getDc()} Con save or take the thunder damage too. On a fail 
                    of 10 or more, they are [condition]deafened[/condition] until a long rest.<br/>
                    <em>The behemoth inkling slams a mighty fist into the ground, crushing the poor victim who wasn't able to 
                    run away in time and sending thunderous shockwaves shaking those around.</em></p>`;
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
        prof          : inklingProf,
        stats         : inklingStats,
        title         : "Slam",
    });

    slamText.generateContent();

    console.log(inklingHp.hpDiceCount);
    console.log(inklingHp.hpExpected);
    console.log(slamText.content);
}


function createInklingDynamite()
{
    const inklingStats = new Map([
        [CoreStats.Str, new StatValue(1)],
        [CoreStats.Dex, new StatValue(28)],
        [CoreStats.Con, new StatValue(10)],
        [CoreStats.Int, new StatValue(13)],
        [CoreStats.Wis, new StatValue(14)],
        [CoreStats.Cha, new StatValue(11)],
    ]);
    const inklingProf = 3;

    const inklingHp = new HpBlock(inklingStats, D4, 25);

    const boomText = new DDBAttack({
        contentGenerator(args: AttackContentAPI): string {
            return `<p>Upon death explodes to deal ${args.getDamageRollableStr("Boom")} to targets within 10 ft. 
                    On coming into contact with its opposite explodes to deal ${args.getDamageRollableStr("BigBoom")} 
                    instead to targets within 20ft and half damage to targets within 40ft. Doesn't die till both 
                    opposites explode, instead just enters a diffused state. If the opposites come into contact and
                    at least one is diffused, damage dealt is half the rolled damage.</p>`;
        },
        assignedDamages: _ => new Map([
        ]),
        unassignedDamageRatios: new Map([
            ["Boom", new Map([[D20, 1]])],
            ["BigBoom", new Map([[D20, 4]])]
        ]),
        damageTypes: new Map([
            ["Boom", DamageType.Force],
            ["BigBoom", DamageType.Force],
        ]),
        activation    : Activation.Special,
        expectedDamage: 260,
        mainStat      : CoreStats.Dex,
        prof          : inklingProf,
        stats         : inklingStats,
        title         : "Slam",
    });

    boomText.generateContent();

    console.log(inklingHp.hpDiceCount);
    console.log(inklingHp.hpExpected);
    console.log(boomText.content);
}

function createInklingTank()
{
    const inklingStats = new Map([
        [CoreStats.Str, new StatValue(28)],
        [CoreStats.Dex, new StatValue(1)],
        [CoreStats.Con, new StatValue(28)],
        [CoreStats.Int, new StatValue(2)],
        [CoreStats.Wis, new StatValue(13)],
        [CoreStats.Cha, new StatValue(16)],
    ]);
    // const inklingProf = 4;

    const inklingHp = new HpBlock(inklingStats, D12, 120);

    // const boomText = new Attack({
    //     contentGenerator(args: Attack): string {
    //         return `<p>Upon death explodes to deal ${args.getDamageRollableStr("Boom")} to targets within 10 ft.
    //                 On coming into contact with its opposite explodes to deal ${args.getDamageRollableStr("BigBoom")}
    //                 instead to targets within 20ft and half damage to targets within 40ft. Doesn't die till both
    //                 opposites explode, instead just enters a diffused state. If the opposites come into contact and
    //                 at least one is diffused, damage dealt is half the rolled damage.</p>`;
    //     },
    //     assignedDamages: _ => new Map([
    //     ]),
    //     unassignedDamageRatios: new Map([
    //         ["Boom", new Map([[D20, 1]])],
    //         ["BigBoom", new Map([[D20, 4]])]
    //     ]),
    //     damageTypes: new Map([
    //         ["Boom", DamageType.Force],
    //         ["BigBoom", DamageType.Force],
    //     ]),
    //     activation    : Activation.Special,
    //     expectedDamage: 260,
    //     mainStat      : CoreStats.Dex,
    //     prof          : inklingProf,
    //     stats         : inklingStats,
    //     title         : "Slam",
    // });

    // boomText.generateContent();

    console.log(inklingHp.hpDiceCount);
    console.log(inklingHp.hpExpected);
    // console.log(boomText.content);
}

export function setupMonsters()
{
    const idToGenerator: Map<string, () => StatSheet> = new Map([
        ["inkling_insecurity", createInkling],
        ["inkling_impatience", createInklingDog],
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
