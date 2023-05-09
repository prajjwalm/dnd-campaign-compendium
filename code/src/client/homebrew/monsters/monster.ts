import {D1, D6, D8, Dice}                     from "../common/diceConstants";
import {PrimitiveRollable}                    from "../common/rollable";
import {Activation, CoreStats, DamageType, E} from "./definitions/constants";


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

    public getDc(stat: CoreStats): number {
        return 8 + this.getMod(stat) + this.prof + this.dcBonus;
    }

    public getMod(stat: CoreStats): number {
        return Math.floor((this.stats.get(stat) - 10) / 2);
    }

    public getToHit(stat: CoreStats): number {
        return this.getMod(stat) + this.prof + this.hitBonus;
    }

    public generateContent(): void {
        this._content = this.contentGenerator(this);
        super.generateContent();
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
}
