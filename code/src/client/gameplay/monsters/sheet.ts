import {Activation, AdventurerClass, ClassHitDice, Condition, CreatureSize, DamageType, DSkill, DStat, E, pbMod, ProficiencyLevel, SizeToDice, Speed, StatForSkill, statMod,} from "../data/constants";
import {D1, Dice}               from "../rolling/Dice";
import {ISheetAction}           from "../simulation/action/ISheetAction";
import {wrapRoll}               from "../simulation/action/Wrap";
import {IDStats}                from "../simulation/characters/aspects/IDStats";
import {IAttack, IBuffedAttack} from "./attack";


/**
 * @deprecated
 */
class HpBlock
{
    public constructor(public readonly stats: Map<DStat, number>,
                       public readonly size: Dice,
                       public readonly biologicalHp: number,
                       public readonly adventurerLevels: Map<AdventurerClass, number> = new Map(),
                       public readonly isTough: boolean = false)
    { }

    public get conHpPerDice()
    {
        return this.stats.get(DStat.Con) + (this.isTough ? 2 : 0);
    }

    private getAdventurerHp(): number
    {
        let hp = 0;
        for (const [klass, level] of this.adventurerLevels.entries()) {
            hp += (E(ClassHitDice.get(klass)) + this.conHpPerDice) * level;
        }
        return hp;
    }

    public get hpDiceCount(): number
    {
        const totalHp = this.biologicalHp + this.getAdventurerHp();
        const hpPerDice = E(this.size) + this.conHpPerDice;
        return Math.round(totalHp / hpPerDice);
    }
}


/**
 * @deprecated
 */
interface StatBlockParams {
    monster_id: string;
    title: string;
    subtitle: string;
    crValue: number;
    stats: Map<DStat, number>;
    speeds: Map<Speed, number>;
    size: CreatureSize;
    biologicalHp: number;
    ac: number;
    acDesc?: string;
    adventurerLevels?: Map<AdventurerClass, number>;
    isTough?: boolean;
    attacks: Map<string, IAttack>;
    saveProficiencies: Map<DStat, [ProficiencyLevel, number]>;
    skillProficiencies: ReadonlyMap<DSkill, [ProficiencyLevel, number]>;
    vulnerabilities?: ReadonlySet<DamageType>;
    resistances?: Set<DamageType>;
    immunities?: ReadonlySet<DamageType>;
    conditionImmunities?: ReadonlySet<Condition>;
}


export interface IStatSheet
{
    render(): string;
}


/**
 * @deprecated
 */
export interface IBuffedStatSheet
    extends IStatSheet
{
    get monster_id(): string;
    get hpDice(): Map<Dice, number>;
    get attacks(): Map<string, IBuffedAttack>;
    get ac(): number;
    set ac(val: number);
    get res(): Set<DamageType>;
    get saves(): Map<DStat, [ProficiencyLevel, number]>;
    get speeds(): Map<Speed, number>;
}


export const ID_TO_SHEET_GENERATOR: Map<string, () => IStatSheet> = new Map();

export const contractIndex: Map<string, ISheetContract> = new Map<string, ISheetContract>();


export function isContractSelected(contractId)
{
    return $(`#contracts .contract[data-contract-uid=${contractId}]`)
        .hasClass("selected");
}


/**
 * @deprecated The sheet aspect should be used henceforth.
 */
export class StatSheet
    implements IDStats,
               IStatSheet
{
    public readonly monster_id: string;

    private readonly title: string;

    private readonly subtitle: string;

    public readonly speeds: Map<Speed, number>;

    public readonly stats: Map<DStat, number>;

    private readonly _hpDice: Map<Dice, number>;

    private readonly crValue: number;

    protected _ac: number;

    private readonly acDesc: string;

    private readonly size: CreatureSize;

    private readonly _attacks: Map<string, ISheetAction>;

    protected readonly saveProficiencies: Map<DStat, [ProficiencyLevel, number]>;

    private readonly skillProficiencies: ReadonlyMap<DSkill, [ProficiencyLevel, number]>;

    private readonly vulnerabilities: ReadonlySet<DamageType>;

    protected readonly resistances: Set<DamageType>;

    private readonly immunities: ReadonlySet<DamageType>;

    private readonly conditionImmunities: ReadonlySet<Condition>;

    public constructor({
                           monster_id,
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
                           acDesc = null,
                           adventurerLevels = new Map(),
                           vulnerabilities = new Set(),
                           resistances = new Set(),
                           immunities = new Set(),
                           conditionImmunities = new Set(),
                           isTough = false
                       }: StatBlockParams)
    {
        this.monster_id = monster_id;
        this.title = title;
        this.subtitle = subtitle;
        this.crValue = crValue;
        this.speeds = speeds;
        this.stats = stats;
        this._ac = ac;
        this.saveProficiencies = saveProficiencies;
        this.skillProficiencies = skillProficiencies;
        this.acDesc = acDesc;
        this.size = size;
        this.vulnerabilities = vulnerabilities;
        this.resistances = resistances;
        this.immunities = immunities;
        this.conditionImmunities = conditionImmunities;

        this._attacks = attacks;

        const hpBlock = new HpBlock(stats,
                                    SizeToDice.get(size),
                                    biologicalHp,
                                    adventurerLevels,
                                    isTough);

        this._hpDice = new Map([
                                   [
                                       SizeToDice.get(this.size),
                                       hpBlock.hpDiceCount
                                   ],
                                   [
                                       D1,
                                       hpBlock.hpDiceCount * hpBlock.conHpPerDice
                                   ],
                               ]);
    }

    // TODO: LANGUAGES, SENSES
    public render(): string {
        const speedList = [];
        for (const [speed, value] of this.speeds.entries()) {
            speedList.push(`${Speed[speed]} ${value} ft.`);
        }

        const statList = [];
        for (const stat of [DStat.Str,
                            DStat.Dex,
                            DStat.Con,
                            DStat.Int,
                            DStat.Wis,
                            DStat.Cha])
        {
            const statVal = this.stats.get(stat);
            statList.push(`<td>${statVal} ${wrapRoll(statMod(statVal))}</td>`);
        }

        const saveList = [];
        for (const [stat, save] of this.computeSaves().entries()) {
            saveList.push(`${DStat[stat]} ${wrapRoll(save)}`);
        }

        const skillList = [];
        for (const [skill, mod] of this.computeSkills().entries()) {
            skillList.push(`${DSkill[skill]} ${wrapRoll(mod)}`);
        }

        const contentList = [];
        for (const activation of [Activation.Special,
                                  Activation.Action,
                                  Activation.BonusAction,
                                  Activation.Reaction,
                                  Activation.LegendaryAction,
                                  Activation.MythicAction])
        {
            const attacks = this.getAttacksWithActivation(activation);
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
        for (const v of this.vulnerabilities.values()) {
            vulnerabilities.push(DamageType[v]);
        }
        const vulStr = vulnerabilities.length == 0 ?
                       "" :
                       `<tr><td>Damage Vulnerabilities</td><td>${vulnerabilities.join(", ")}</td></tr>`;

        const res = [];
        for (const v of this.resistances.values()) {
            res.push(DamageType[v]);
        }
        const resStr = res.length == 0 ?
                       "" :
                       `<tr><td>Damage Resistances</td><td>${res.join(", ")}</td></tr>`;

        const imm = [];
        for (const v of this.immunities.values()) {
            imm.push(DamageType[v]);
        }
        const immStr = imm.length == 0 ?
                       "" :
                       `<tr><td>Damage Immunities</td><td>${imm.join(", ")}</td></tr>`;

        const cimm = [];
        for (const v of this.conditionImmunities.values()) {
            cimm.push(Condition[v]);
        }
        const cimmStr = cimm.length == 0 ?
                        "" :
                        `<tr><td>Condition Immunities</td><td>${cimm.join(", ")}</td></tr>`;

        return `
        <div class="stat_sheet" id="stat_sheet_${this.monster_id}">
            <div class="sheet_header">
                <div class="header_zone">
                    <h3 class="sheet_title">${this.title}</h3>
                    <div class="sheet_subtitle">${CreatureSize[this.size]} ${this.subtitle}</div>
                </div>
                <div class="header_zone">
                    <table>
                        <tr><td>Armor Class</td><td>${this._ac} ${this.acDesc}</td></tr>
                        <tr><td>Hit Points</td><td>${Math.round(E(this.hpDice))} 
                            ${wrapRoll(this.hpDice)}</td></tr>
                        <tr><td>Speed</td><td>${speedList.join(", ")}</td></tr>
                    </table>
                </div>
                <div class="header_zone">
                    <table class="stats_table">
                        <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
                        <tr>${statList.join("")}</tr>
                    </table>
                </div>
                <div class="header_zone">
                    <table>
                        <tr><td>Saving Throws</td><td>${saveList.join(" ")}</td></tr>
                        <tr><td>Skills</td><td>${skillList.join(" ")}</td></tr>
                        <tr><td>Challenge Rating</td><td>${this.crValue}</td></tr>
                        <tr><td>Proficiency Bonus</td><td>${this.pb}</td></tr>
                        ${vulStr}${resStr}${immStr}${cimmStr}
                    </table>
                </div>
            </div>
            ${contentList.join("")}
        </div>`;
    }

    public get pb(): number {
        return Math.ceil(Math.max(1, this.crValue) / 4) + 1;
    }

    protected get attacks(): Map<string, ISheetAction>
    {
        return this._attacks;
    }

    private getAttacksWithActivation(activation: Activation): string[]
    {
        const r = [];
        for (const attack of this._attacks.values()) {
            if (attack.activation != activation) {
                continue;
            }
            attack.bindStats(this);
            r.push(attack.createContent());
        }
        return r;
    }

    private computeSaves(): ReadonlyMap<DStat, number> {
        const m = new Map();
        for (const [stat, [saveProf, saveBonus]] of this.saveProficiencies.entries()) {
            m.set(stat,
                  (m.has(stat) ? m.get(stat) : statMod(this.stats.get(stat))) + pbMod(this.pb, saveProf)  + saveBonus);
        }
        return m;
    }

    private computeSkills(): ReadonlyMap<DSkill, ProficiencyLevel> {
        const m = new Map();
        for (const [skill, [saveProf, saveBonus]] of this.skillProficiencies.entries()) {
            const stat = StatForSkill.get(skill);
            m.set(skill,
                  (m.has(skill) ? m.get(skill) : statMod(this.stats.get(stat))) + pbMod(this.pb, saveProf) + saveBonus);
        }
        return m;
    }

    protected get hpDice(): Map<Dice, number> {
        return this._hpDice;
    }

    public mod(stat: DStat): number
    {
        return 0;
    }
}


/**
 * @deprecated
 */
export interface ISheetContract
{
    get risk(): number;
    get id(): string;
    get displayName(): string;
    get imgPath(): string;
    get desc(): string;

    shouldApply(sheet: IBuffedStatSheet): boolean;
    modify(sheet: IBuffedStatSheet): void;

    render(): string;
}


/**
 * @deprecated
 */
export class SheetContract
    implements ISheetContract
{
    constructor(
        public readonly risk: number,
        public readonly id: string,
        public readonly displayName: string,
        public readonly imgPath: string,
        public readonly desc: string,
        public readonly shouldApply: (attack: IBuffedStatSheet) => boolean,
        public readonly modify: (attack: IBuffedStatSheet) => void,
    )
    {}

    public render(): string {
        return `<div class="contract selectable radio risk${this.risk}" data-contract-uid="${this.id}">
                    <img class="contract_icon" src="assets/images/risk/${this.imgPath}" alt="[null]">
                    <div class="contract_box"><div class="contract_title">${this.displayName}</div></div>
                </div>`;
    }
}


/**
 * @deprecated
 */
export class BuffedStatSheet
    extends    StatSheet
    implements IBuffedStatSheet
{
    constructor(props: StatBlockParams) {
        super(props);
    }

    public get hpDice(): Map<Dice, number> {
        return super.hpDice;
    }

    public get attacks(): Map<string, IBuffedAttack> {
        return super.attacks as Map<string, IBuffedAttack>;
    }

    public render(): string {
        for (const [contractId, contract] of contractIndex.entries()) {
            if (!isContractSelected(contractId)) {
                continue;
            }
            if (contract.shouldApply(this)) {
                contract.modify(this);
            }
        }
        return super.render();
    }

    public get ac(): number {
        return this._ac;
    }

    public set ac(val: number) {
        this._ac = val;
    }

    public get res() {
        return this.resistances;
    }

    public get saves(): Map<DStat, [ProficiencyLevel, number]> {
        return this.saveProficiencies;
    }
}


export function test()
{
    // const attack = new DDBAttack({
    //     prof                  : 6,
    //     activation            : Activation.Action,
    //     expectedDamage        : 100,
    //     mainStat              : DStats.Str,
    //     stats                 : new Map([
    //         [DStats.Str, new StatValue(22)],
    //         [DStats.Dex, new StatValue(10)],
    //         [DStats.Con, new StatValue(10)],
    //         [DStats.Int, new StatValue(10)],
    //         [DStats.Wis, new StatValue(10)],
    //         [DStats.Cha, new StatValue(16)],
    //     ]),
    //     title                 : "Greatsword",
    //     contentGenerator      : (args: AttackContentAPI) => {
    //         return `<p><em>Melee Weapon Attack</em>: ${args.getToHitRollableStr("Greatsword",
    //             args.getToHit(args.mainStat) + args.getMod(DStats.Cha))},
    //                 Reach 10ft., one target. <em>Hit</em>: ${args.getDamageRollableStr("GreatswordBase")}. Plus an additional
    //                 ${args.getDamageRollableStr("GreatswordTrauma")}. An additional ${args.getDamageRollableStr("Shroud")}
    //                 is taken if the necrotic shroud is active. Also, the target must succeed a DC ${args.getDc(DStats.Str)}
    //                 save or fall prone.</p>`;
    //     },
    //     assignedDamages       : args => new Map([
    //         ["GreatswordBase", new Map([[D6, 2], [D1, args.getMod(DStats.Str) + args.getMod(DStats.Cha)]])],
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
