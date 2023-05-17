import {D1, D12, D4, D6, D8, Dice} from "../common/diceConstants";
import {
    PrimitiveRollable
}                                  from "../common/rollable";
import {
    Activation,
    AdventurerClasses,
    AdventurerHitDice,
    CoreStats,
    DamageType,
    E,
    getModifier
}                             from "./definitions/constants";


// interface IStatBlock {
//     get cr(): number;
//     get pbMod(): number;
//     get ac(): number;
//     get acDesc(): string;
//     get size(): Dice;
//
//     get hpDiceCount(): number;
//     get hpExpected(): number;
//
//     getSpecialTraits(): string;
//     getActions(): string;
//     getReactions(): string;
//     getBonusActions(): string;
//     getLegendaryActions(): string | null;
//     getMythicActions(): string | null;
//
//     get stats(): Map<CoreStats, number>;
//     get saveProficiencies(): Map<CoreStats, number>;
//     get skillProficiencies(): Map<CoreStats, number>;
// }


class Action
{
    protected _content: string;

    public constructor(public readonly stats: Map<CoreStats, number>,
                       public readonly title: string,
                       public readonly activation: Activation,
                       content: string,
                       public readonly subTitle: string = "")
    {
        this._content = content;
    }

    public generateContent()
    {
        this.addTitleToContent(this._content);
    }

    protected addTitleToContent(content) {
        if (content.substring(0, 3) != '<p>') {
            throw new Error("Content should start with <p> tag.");
        }
        this._content =
            `<p><strong><em>${this.title}</em>. ${this.subTitle}</strong>` +
            content.substring(3);
    }

    public get content() {
        return this._content;
    }
}


interface AttackParams {
    prof: number;
    stats: Map<CoreStats, number>;
    title: string;
    subtitle?: string;
    activation: Activation;
    expectedDamage: number;
    mainStat: CoreStats;
    hitBonus?: number;
    dcBonus?: number;
    contentGenerator: (args: Attack) => string;
    assignedDamages?: (args: Attack) => Map<string, Map<Dice, number>>;
    unassignedDamageRatios?: Map<string, Map<Dice, number>>;
    damageTypes?: Map<string, DamageType>;
}


class Attack
    extends Action
    implements AttackParams
{
    public readonly prof: number;

    public readonly expectedDamage: number;

    public readonly mainStat: CoreStats;

    public readonly hitBonus: number;

    public readonly dcBonus: number;

    public readonly contentGenerator: (args: AttackParams) => string;

    public readonly assignedDamages: (args: AttackParams) => Map<string, Map<Dice, number>>;

    public readonly unassignedDamageRatios: Map<string, Map<Dice, number>>;

    public readonly damageTypes: Map<string, DamageType>;

    private resolvedDamages: Map<string, Map<Dice, number>>;

    public constructor(params: AttackParams)
    {
        const subtitle = params.subtitle ?? "";
        super(params.stats, params.title, params.activation, "", subtitle);

        this.prof = params.prof;
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

    public computeUnassignedAttackDice()
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

    public getDc(stat?: CoreStats): number {
        if (stat == undefined) {
            stat = this.mainStat;
        }
        return 8 + this.getMod(stat) + this.prof + this.dcBonus;
    }

    public getMod(stat?: CoreStats): number {
        if (stat == undefined) {
            stat = this.mainStat;
        }
        return Math.floor((this.stats.get(stat) - 10) / 2);
    }

    public getToHit(stat?: CoreStats): number {
        if (stat == undefined) {
            stat = this.mainStat;
        }
        return this.getMod(stat) + this.prof + this.hitBonus;
    }

    public generateContent(): void {
        this._content = this.contentGenerator(this);
        super.generateContent();
    }
}


class HpBlock {
    public constructor(public readonly size: Dice,
                       public readonly biologicalHp: number,
                       public readonly conMod: number,
                       public readonly adventurerLevels: Map<AdventurerClasses, number> = new Map(),
                       public readonly isTough: boolean = false)
    { }

    public get conHpPerDice()
    {
        return this.conMod + (this.isTough ? 2 : 0);
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

// abstract class StatBlock
//     implements IStatBlock
// {
//     public abstract get ac(): number;
//
//     private _conHpPerDice: number | null = null;
//
//     private getAdventurerHp(): number {
//         let hp = 0;
//         for (const [klass, level] of this.AdventurerLevels.entries()) {
//             hp += (E(AdventurerHitDice.get(klass)) + this.conHpPerDice) * level;
//         }
//         return hp;
//     }
//
//     public abstract get cr(): number;
//
//     public abstract get pbMod(): number;
//
//     public abstract get acDesc(): string;
//
//     public abstract get size(): Dice;
//
//     public get hpDiceCount(): number {
//         const totalHp = this.biologicalHp + this.getAdventurerHp();
//         const hpPerDice = E(this.size) + this.conHpPerDice;
//         return Math.round(totalHp / hpPerDice);
//     }
//
//     public get hpExpected(): number {
//         return (E(this.size) + this.conHpPerDice) * this.hpDiceCount;
//     }
//
//     public abstract getSpecialTraits(): string;
//
//     public abstract getActions(): string;
//
//     public abstract getReactions(): string;
//
//     public abstract getBonusActions(): string;
//
//     // ## HP Computations
//     // Given size, biologicalHp, adventurerLevels and isTough, we can compute
//     // everything needed for HP.
//
//     public abstract getLegendaryActions(): string | null;
//
//     public abstract getMythicActions(): string | null;
//
//     public abstract get stats(): Map<CoreStats, number>;
//
//     public abstract get saveProficiencies(): Map<CoreStats, number>;
//
//     public abstract get skillProficiencies(): Map<CoreStats, number>;
//
//     public get AdventurerLevels(): Map<AdventurerClasses, number> {
//         return new Map();
//     }
//
//     public get isTough(): boolean {
//         return false;
//     }
//
//     public abstract get biologicalHp(): number;
//
//     public get conHpPerDice() {
//         if (this._conHpPerDice == null) {
//             this._conHpPerDice = getModifier(this.stats.get(CoreStats.Con)) +
//                                  (this.isTough ? 2 : 0);
//         }
//         return this._conHpPerDice;
//     }
// }


// export class Monster
//     extends    StatBlock
//     implements IStatBlock
// {
//
// }

function createInkling()
{
    const inklingStats = new Map([
        [CoreStats.Str, 13],
        [CoreStats.Dex, 13],
        [CoreStats.Con, 14],
        [CoreStats.Int, 16],
        [CoreStats.Wis, 15],
        [CoreStats.Cha, 13],
    ]);
    const inklingProf = 2;

    const inklingHp = new HpBlock(D6, 40, getModifier(inklingStats.get(CoreStats.Con)));

    const inkSprayText = new Attack({
        contentGenerator(args: Attack): string {
            return `<p>Upon death, the inkling sprays viscous ink at all creatures within 15 feet of itself. The targets 
            must succeed on a DC ${args.getDc()} Constitution saving throw or be [condition]blinded[/condition]
            until the end of their next turn.</p>`;
        },
        activation    : Activation.Special,
        expectedDamage: 0,
        mainStat      : CoreStats.Con,
        prof          : inklingProf,
        stats         : inklingStats,
        title         : "Ink Spray"
    });

    inkSprayText.generateContent();

    const biteText = new Attack({
        contentGenerator(args: Attack): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr("Bite", args.getMod())}, reach 5 ft., one target. 
            Hit: ${args.getDamageRollableStr("Bite")} plus ${args.getDamageRollableStr("Blot")} and ${args.getDamageRollableStr("BlotNeural")}.</p>`;
        },
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
        ]),
        activation    : Activation.Action,
        expectedDamage: 32,
        mainStat      : CoreStats.Str,
        prof          : inklingProf,
        stats         : inklingStats,
        title         : "Bite"
    });

    biteText.generateContent();

    console.log(inklingHp.hpDiceCount);
    console.log(inklingHp.hpExpected);
    console.log(inkSprayText.content);
    console.log(biteText.content);
}

function createInklingDog()
{
    const inklingStats = new Map([
        [CoreStats.Str, 11],
        [CoreStats.Dex, 17],
        [CoreStats.Con, 11],
        [CoreStats.Int, 6],
        [CoreStats.Wis, 13],
        [CoreStats.Cha, 7],
    ]);
    const inklingProf = 2;

    const inklingHp = new HpBlock(D6, 32, getModifier(inklingStats.get(CoreStats.Con)));

    const biteText = new Attack({
        contentGenerator(args: Attack): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr("Bite", args.getToHit())}, reach 5 ft., one target. 
            Hit: ${args.getDamageRollableStr("Bite")} plus ${args.getDamageRollableStr("BiteVenom")}</p>`;
        },
        assignedDamages: args => new Map([
            ["Bite", new Map([[D6, 1], [D1, args.getMod()]])]
        ]),
        unassignedDamageRatios: new Map([
            ["BiteVenom", new Map([[D4, 1]])]
        ]),
        damageTypes: new Map([
            ["Bite", DamageType.Piercing],
            ["BiteVenom", DamageType.Poison],
        ]),
        activation    : Activation.Action,
        expectedDamage: 10,
        mainStat      : CoreStats.Dex,
        prof          : inklingProf,
        stats         : inklingStats,
        title         : "Bite"
    });

    biteText.generateContent();

    console.log(inklingHp.hpDiceCount);
    console.log(inklingHp.hpExpected);
    console.log(biteText.content);
}


function createInklingAberrant()
{
    const inklingStats = new Map([
        [CoreStats.Str, 13],
        [CoreStats.Dex, 11],
        [CoreStats.Con, 16],
        [CoreStats.Int, 19],
        [CoreStats.Wis, 11],
        [CoreStats.Cha, 15],
    ]);
    const inklingProf = 3;

    const inklingHp = new HpBlock(D8, 100, getModifier(inklingStats.get(CoreStats.Con)));

    const inkSpitText = new Attack({
        contentGenerator(args: Attack): string {
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

    const chargedText = new Attack({
        contentGenerator(args: Attack): string {
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
        [CoreStats.Str, 24],
        [CoreStats.Dex, 13],
        [CoreStats.Con, 24],
        [CoreStats.Int, 7],
        [CoreStats.Wis, 8],
        [CoreStats.Cha, 13],
    ]);
    const inklingProf = 4;

    const inklingHp = new HpBlock(D12, 160, getModifier(inklingStats.get(CoreStats.Con)));

    const slamText = new Attack({
        contentGenerator(args: Attack): string {
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


export function test()
{
    const attack = new Attack({
        prof                  : 6,
        activation            : Activation.Action,
        expectedDamage        : 100,
        mainStat              : CoreStats.Str,
        stats                 : new Map([
            [CoreStats.Str, 22],
            [CoreStats.Dex, 10],
            [CoreStats.Con, 10],
            [CoreStats.Int, 10],
            [CoreStats.Wis, 10],
            [CoreStats.Cha, 16],
        ]),
        title                 : "Greatsword",
        contentGenerator      : (args: Attack) => {
            return `<p><em>Melee Weapon Attack</em>: ${args.getToHitRollableStr("Greatsword",
                args.getToHit(args.mainStat) + args.getMod(CoreStats.Cha))}, 
                    Reach 10ft., one target. <em>Hit</em>: ${args.getDamageRollableStr("GreatswordBase")}. Plus an additional 
                    ${args.getDamageRollableStr("GreatswordTrauma")}. An additional ${args.getDamageRollableStr("Shroud")}
                    is taken if the necrotic shroud is active. Also, the target must succeed a DC ${args.getDc(CoreStats.Str)}
                    save or fall prone.</p>`;
        },
        assignedDamages       : args => new Map([
            ["GreatswordBase", new Map([[D6, 2], [D1, args.getMod(CoreStats.Str) + args.getMod(CoreStats.Cha)]])],
            ["GreatswordTrauma", new Map([[D8, 2]])]
        ]),
        unassignedDamageRatios: new Map([
            ["GreatswordTrauma", new Map([[D8, 2]])],
            ["Shroud", new Map([[D8, 3]])]
        ]),
        damageTypes           : new Map([
            ["GreatswordBase", DamageType.Piercing],
            ["GreatswordTrauma", DamageType.Psychic],
            ["Shroud", DamageType.Necrotic],
        ])
    });
    attack.generateContent();
    console.assert(attack.content ==
                   `<p><strong><em>Greatsword</em>. </strong><em>Melee Weapon Attack</em>: [rollable]+15;{
            "diceNotation": "1d20+15", 
            "rollType":     "to hit", 
            "rollAction":   "Greatsword"
        }[/rollable] to hit, 
                    Reach 10ft., one target. <em>Hit</em>: [rollable]2d6+9;{
            "diceNotation":   "2d6+9", 
            "rollType":       "damage", 
            "rollAction":     "GreatswordBase", 
            "rollDamageType": "Piercing"
        }[/rollable] Piercing damage. Plus an additional 
                    [rollable]9d8;{
            "diceNotation":   "9d8", 
            "rollType":       "damage", 
            "rollAction":     "GreatswordTrauma", 
            "rollDamageType": "Psychic"
        }[/rollable] Psychic damage. An additional [rollable]10d8;{
            "diceNotation":   "10d8", 
            "rollType":       "damage", 
            "rollAction":     "Shroud", 
            "rollDamageType": "Necrotic"
        }[/rollable] Necrotic damage
                    is taken if the necrotic shroud is active. Also, the target must succeed a DC 20
                    save or fall prone.</p>`);

    createInkling();
    createInklingDog();
    createInklingAberrant();
    createInklingWannabeBoss();
}
