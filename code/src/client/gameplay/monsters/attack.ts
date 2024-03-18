import {Activation, DamageType, DStat, E, pbMod, ProficiencyLevel} from "../data/constants";
import {D1, Dice}                                                  from "../rolling/Dice";
import {ISheetAction}                                              from "../simulation/action/ISheetAction";
import {wrapRoll}                                                  from "../simulation/action/Wrap";
import {IDStats}                                                   from "../simulation/characters/aspects/IDStats";


interface IAttackDamageParams
{
    expectedDamage: number;
    assignedDamages?: (args: IAttack) => Map<string, Map<Dice, number>>;
    unassignedDamageRatios?: ReadonlyMap<string, Map<Dice, number>>;
    damageTypes?: ReadonlyMap<string, DamageType>;
}


interface AttackParams
{
    title: string;
    subtitle?: string;
    activation: Activation;
    mainStat: DStat;
    hitBonus?: number;
    dcBonus?: number;
    contentGenerator: (args: IAttack) => string;
}


export interface IAttack
    extends ISheetAction
{
    getMod(stat?: DStat): number;
    getDc(args?: { stat?: DStat, prof?: ProficiencyLevel }): number;

    getDamageRollableStr(key: string): string;
    getToHitRollableStr(args: { name: string, stat?: DStat, prof?: ProficiencyLevel }): string;

    bindDamages(damageParams: IAttackDamageParams): this;
}


/**
 * Interface needed by AttackContracts to buff an attack.
 */
export interface IBuffedAttack
    extends IAttack
{
    /**
     * Used by contracts to know if they should apply to this attack.
     */
    get identificationInfo(): Map<string, string | number>;

    /**
     * Returns a reference to the currently resolved damages. Expected to be
     * modified in place, which is fine because the object behind the reference
     * was created by the Attack object itself.
     */
    get currentlyResolvedDamages(): Map<string, Map<Dice, number>>;

    /**
     * Returns the current damage types. This reference comes from a map input
     * as arguments to the object's methods, so it cannot be modified in place.
     * The rationale behind exposing this is that some contracts may adjust /
     * elevate the damage types instead.
     */
    getDamageTypes(): ReadonlyMap<string, DamageType>;

    /**
     * Used to overwrite the damage types.
     */
    setDamageTypes(val: ReadonlyMap<string, DamageType>);

    /**
     * If I'm overwriting the attack's text itself, I'd better know exactly
     * which monster I'm overwriting, and so don't need to know the older
     * variant of the text.
     */
    setContentGenerator(val: (args: IAttack) => string);

    /**
     * Activate the given contract for this attack. The shouldApply check would
     * still run after this.
     */
    activateContract(contract: IAttackContract);

    /**
     * Returns if this attack is actually an attack.
     */
    get isDamaging():boolean;

    getContracts(): ReadonlySet<IAttackContract>;
}


abstract class Attack
    implements IAttack
{
    public readonly activation: Activation;

    public readonly mainStat: DStat;

    protected readonly title: string;

    protected readonly subTitle: string = "";

    protected resolvedDamages: Map<string, Map<Dice, number>>;

    protected damageTypes: ReadonlyMap<string, DamageType>;

    protected contentGenerator: (args: IAttack) => string;

    protected sheet: IDStats;

    private readonly hitBonus: number;

    private readonly dcBonus: number;

    private expectedDamage: number;

    private unassignedDamageRatios: ReadonlyMap<string, Map<Dice, number>>;

    private assignedDamages: (args: IAttack) => Map<string, Map<Dice, number>>;

    public constructor(params: AttackParams)
    {
        const subtitle = params.subtitle ?? "";
        this.title = params.title;
        this.activation = params.activation;
        this.subTitle = subtitle;
        this.hitBonus = params.hitBonus ?? 0;
        this.dcBonus = params.dcBonus ?? 0;
        this.mainStat = params.mainStat;
        this.contentGenerator = params.contentGenerator;

        this.resolvedDamages = null;
        this.expectedDamage = null;
        this.assignedDamages = null;
    }

    protected abstract doGetToHitRollableStr(toHitMod: number): string;

    protected abstract doGetDamageRollableStr(key: string): string;

    public getToHitRollableStr({ name, stat = undefined, prof = ProficiencyLevel.Prof }
                                   : { name: string, stat?: DStat, prof?: ProficiencyLevel }): string
    {
        if (stat == undefined) {
            stat = this.mainStat;
        }
        const mod = this.getMod(stat) + pbMod(this.sheet.pb, prof) + this.hitBonus;
        return this.doGetToHitRollableStr(mod);
    }

    public getDamageRollableStr(key: string): string
    {
        if (this.resolvedDamages == null) {
            throw new Error("Damage string queried before damages were " +
                            "resolved.");
        }
        return this.doGetDamageRollableStr(key);
    }

    public getMod(stat?: DStat): number
    {
        if (stat == undefined) {
            stat = this.mainStat;
        }
        return this.sheet.stats.get(stat).mod;
    }

    public getDc({ stat, prof = ProficiencyLevel.Prof }:
                     { stat?: DStat, prof?: ProficiencyLevel } = {}): number
    {
        if (stat == undefined) {
            stat = this.mainStat;
        }
        return 8 + this.getMod(stat) + pbMod(this.sheet.pb, prof) + this.dcBonus;
    }

    public bindDamages(damageParams: IAttackDamageParams): this
    {
        this.expectedDamage = damageParams.expectedDamage;
        this.damageTypes = damageParams.damageTypes ?? new Map();
        this.unassignedDamageRatios = damageParams.unassignedDamageRatios ?? new Map();
        this.assignedDamages = damageParams.assignedDamages ?? (() => new Map());
        return this;
    }

    public bindStats(sheet: IDStats): void
    {
        this.sheet = sheet;
    }

    public createContent(): string
    {
        this.resolveDamages();
        let content = this.contentGenerator(this);
        if (content.substring(0, 3) != '<p>') {
            content = `<p>${content}</p>`;
        }
        return `<p><strong><em>${this.title}</em>. ${this.subTitle} </strong>` +
               content.substring(3);
    }

    public get isDamaging() {
        return this.expectedDamage != null || this.assignedDamages != null;
    }

    protected resolveDamages()
    {
        if (!this.isDamaging) {
            return;
        }
        let totalAssignedDamage = 0;
        const assignedDamages = this.assignedDamages(this);
        if (this.expectedDamage != null) {
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
        }
        this.resolvedDamages = assignedDamages;
    }
}


// noinspection JSUnusedLocalSymbols
// class DDBAttack
//     extends Attack
// {
//     protected doGetDamageRollableStr(key: string): string {
//         const rollStr = new DamageRollable(this.resolvedDamages.get(key)).getRollString(false);
//         return `[rollable]${rollStr};{
//             "diceNotation":   "${rollStr}",
//             "rollType":       "damage",
//             "rollAction":     "${key}",
//             "rollDamageType": "${DamageType[this.damageTypes.get(key)]}"
//         }[/rollable] ${DamageType[this.damageTypes.get(key)]} damage`;
//     }
//
//     protected doGetToHitRollableStr(toHitMod: number): string {
//         const toHitStr = NatRollable.generate(toHitMod).getRollString(false);
//         return `[rollable]${toHitStr};{
//             "diceNotation": "1d20${toHitStr}",
//             "rollType":     "to hit",
//             "rollAction":   "${name}"
//         }[/rollable] to hit`;
//     }
// }


export class InternalAttack
    extends Attack
{
    protected doGetDamageRollableStr(key: string): string
    {
        const damagetype = DamageType[this.damageTypes.get(key)];
        const damagetypeString = damagetype ? `${damagetype} damage` : "";
        return `${wrapRoll(this.resolvedDamages.get(key))} 
                ${damagetypeString}`;
    }

    protected doGetToHitRollableStr(toHitMod: number): string
    {
        return wrapRoll(toHitMod);
    }
}


export interface IAttackContract
{
    shouldApply(attack: IBuffedAttack): boolean;
    modify(attack: IBuffedAttack): void;
}


class AttackContract
    implements IAttackContract
{
    constructor(public readonly shouldApply: (attack: IBuffedAttack) => boolean,
                public readonly modify: (attack: IBuffedAttack) => void)
    {}
}


export const AttackContracts: Map<string, AttackContract> = new Map([
    ["StimulusEnvy1", new AttackContract(
        (_: IBuffedAttack) => true,
        (attack: IBuffedAttack) => {
            const damages = attack.currentlyResolvedDamages;
            for (const damageDice of damages.values()) {
                for (const [die, count] of damageDice.entries()) {
                    if (die == D1) {
                        continue;
                    }
                    damageDice.set(die, count * 1.3);
                }
            }
        },
    )],
    ["StimulusEnvy2", new AttackContract(
        (_: IBuffedAttack) => true,
        (attack: IBuffedAttack) => {
            const damages = attack.currentlyResolvedDamages;
            for (const damageDice of damages.values()) {
                for (const [die, count] of damageDice.entries()) {
                    if (die == D1) {
                        continue;
                    }
                    damageDice.set(die, count * 1.6);
                }
            }
        },
    )],
    ["StimulusFree1", new AttackContract(
        (_: IBuffedAttack) => true,
        (attack: IBuffedAttack) => {
            const damages = attack.currentlyResolvedDamages;
            for (const damageDice of damages.values()) {
                for (const [die, count] of damageDice.entries()) {
                    if (die == D1) {
                        continue;
                    }
                    damageDice.set(die, count * 1.2);
                }
            }
        },
    )],
    ["StimulusFree2", new AttackContract(
        (_: IBuffedAttack) => true,
        (attack: IBuffedAttack) => {
            const damages = attack.currentlyResolvedDamages;
            for (const damageDice of damages.values()) {
                for (const [die, count] of damageDice.entries()) {
                    if (die == D1) {
                        continue;
                    }
                    damageDice.set(die, count * 1.7);
                }
            }
        },
    )],
    ["StimulusFree3", new AttackContract(
        (_: IBuffedAttack) => true,
        (attack: IBuffedAttack) => {
            const damages = attack.currentlyResolvedDamages;
            for (const damageDice of damages.values()) {
                for (const [die, count] of damageDice.entries()) {
                    if (die == D1) {
                        continue;
                    }
                    damageDice.set(die, count * 2.5);
                }
            }
        },
    )],
    ["Stimulus1", new AttackContract(
        (_: IBuffedAttack) => true,
        (attack: IBuffedAttack) => {
            const damages = attack.currentlyResolvedDamages;
            for (const damageDice of damages.values()) {
                for (const [die, count] of damageDice.entries()) {
                    if (die == D1) {
                        continue;
                    }
                    damageDice.set(die, count * 1.25);
                }
            }
        },
    )],
    ["Stimulus2",  new AttackContract(
        (_: IBuffedAttack) => true,
        (attack: IBuffedAttack) => {
            const damages = attack.currentlyResolvedDamages;
            for (const damageDice of damages.values()) {
                for (const [die, count] of damageDice.entries()) {
                    if (die == D1) {
                        continue;
                    }
                    damageDice.set(die, count * 1.5);
                }
            }
        },
    )],
    ["StimulusArrogance3",  new AttackContract(
        (_: IBuffedAttack) => true,
        (attack: IBuffedAttack) => {
            const damages = attack.currentlyResolvedDamages;
            for (const damageDice of damages.values()) {
                for (const [die, count] of damageDice.entries()) {
                    if (die == D1) {
                        continue;
                    }
                    damageDice.set(die, count * 1.5);
                }
            }
        },
    )],
]);


export class BuffedInternalAttack
    extends    InternalAttack
    implements IBuffedAttack
{
    private readonly contracts: Set<IAttackContract>;

    constructor(props: AttackParams)
    {
        super(props);
        this.contracts = new Set();
    }

    public activateContract(contract: IAttackContract)
    {
        this.contracts.add(contract);
    }

    public getContracts(): ReadonlySet<IAttackContract>
    {
        return this.contracts;
    }

    public deactivateContract(contract: IAttackContract)
    {
        this.contracts.delete(contract);
    }

    public getDamageTypes(): ReadonlyMap<string, DamageType>
    {
        return this.damageTypes;
    }

    public setDamageTypes(val: ReadonlyMap<string, DamageType>)
    {
        this.damageTypes = val;
    }

    public setContentGenerator(val: (args: IAttack) => string)
    {
        this.contentGenerator = val;
    }

    public createContent(): string
    {
        this.resolveDamages();
        for (const contract of this.contracts) {
            if (contract.shouldApply(this)) {
                contract.modify(this);
            }
        }

        let content = this.contentGenerator(this);
        if (content.substring(0, 3) != '<p>') {
            content = `<p>${content}</p>`;
        }
        return `<p><strong><em>${this.title}</em>. ${this.subTitle} </strong>` +
               content.substring(3);
    }

    public get currentlyResolvedDamages(): Map<string, Map<Dice, number>> {
        return this.resolvedDamages;
    }

    public get identificationInfo(): Map<string, string | number> {
        return new Map<string, string | number>([
                                                    // @ts-ignore
            ["Creature", this.sheet.monster_id],
            ["Attack", this.title],
        ]);
    }
}
