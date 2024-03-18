import {updateMap}                                                                                           from "../../../../common/common";
import {AdventurerClass, ClassHitDice, Condition, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../data/constants";
import {NpcID}                                                                                               from "../../../data/npcIndex";
import {D1, Dice}                                                                                            from "../../../rolling/Dice";
import {Action}                                                                                              from "../../action/Action";
import {Character}                                                                                           from "../Character";
import {BaseAspect}                                                                                          from "./BaseAspect";
import {ICombat}                                                                                             from "./ICombat";
import {ICombatFactory}                                                                                      from "./ICombatFactory";


/**
 * Aspect handling the {@link ICombat} section of a character.
 *
 * todo: flags to ensure correctness.
 */
export class CombatAspect
    extends BaseAspect
    implements ICombat,
               ICombatFactory
{
    private readonly baseACSources: number[];

    private readonly acBonuses: number[];

    private readonly classes: Map<AdventurerClass, number>;

    private readonly _hpDice: Map<Dice, number>;

    private readonly _speeds: Map<Speed, number>;

    private readonly _senses: Map<Sense, number>;

    private readonly _res: Map<DamageType, number>;

    private readonly _saves: Map<DStat, [ProficiencyLevel, number]>;

    private readonly _conditionImmunities: Set<Condition>;

    private readonly _actions: Map<string, Action>;

    private readonly bioHpDice: [number, Dice][];

    constructor(c: Character)
    {
        super(c);

        this._hpDice = new Map();
        this._bonusHP = 0;
        this.bioHpDice = [];

        this.baseACSources = [];
        this.acBonuses = [];
        this.classes = new Map();
        this._speeds = new Map();
        this._senses = new Map();
        this._res = new Map();
        this._saves = new Map();
        this._conditionImmunities = new Set();
        this._actions = new Map();
    }

    public duplicate(other: Character): this
    {
        const aspect = new CombatAspect(other);

        aspect.baseACSources.push(...this.baseACSources);
        aspect.acBonuses.push(...this.acBonuses);

        aspect.cr = this.cr;
        for (const [cls, level] of this.classes.entries()) {
            aspect.classes.set(cls, level);
        }

        for (const [speedType, speed] of this._speeds.entries()) {
            aspect._speeds.set(speedType, speed);
        }

        for (const [sense, senseVal] of this._senses.entries()) {
            aspect._senses.set(sense, senseVal);
        }

        for (const [dType, res] of this._res.entries()) {
            aspect._res.set(dType, res);
        }

        for (const [save, bonus] of this._saves.entries()) {
            aspect._saves.set(save, bonus);
        }

        for (const conditionImmunity of this._conditionImmunities) {
            aspect._conditionImmunities.add(conditionImmunity);
        }

        for (const [key, action] of this._actions.entries()) {
            aspect._actions.set(key, action);
        }

        return aspect as this;
    }

    public setMagicalArmor(armorAC: number): void
    {
        this.baseACSources.push(armorAC + this.c.mod(DStat.Dex));
    }

    public setLightArmor(armorAC: number): void
    {
        this.baseACSources.push(armorAC + this.c.mod(DStat.Dex));
    }

    public setMediumArmor(armorAC: number): void
    {
        this.baseACSources.push(
            armorAC + Math.min(2, this.c.mod(DStat.Dex))
        );
    }

    public setHeavyArmor(armorAC: number): void
    {
        this.baseACSources.push(armorAC);
    }

    public addAcBonus(bonus: number): void
    {
        this.acBonuses.push(bonus)
    }

    public set bladeSingerAC(val: boolean)
    {
        if (!this.classes.has(AdventurerClass.Wizard)) {
            console.warn("BladeSinger on non wizard:", NpcID[this.c.id]);
        }
        this.baseACSources.push(
            this.c.mod(DStat.Dex) +
            this.c.mod(DStat.Int) + 10
        );
    }

    public addClassLevels(klass: AdventurerClass, levels: number)
    {
        if (klass == AdventurerClass.Monk) {
            this.baseACSources.push(
                this.c.mod(DStat.Dex) +
                this.c.mod(DStat.Wis) + 10
            );
        } else if (klass == AdventurerClass.Barbarian) {
            this.baseACSources.push(
                this.c.mod(DStat.Dex) +
                this.c.mod(DStat.Con) + 10
            );
        }
        this.classes.set(
            klass,
            (this.classes.has(klass) ? this.classes.get(klass) : 0) + levels
        );
    }

    private _bonusHP: number;

    public get bonusHP(): number
    {
        return this._bonusHP;
    }

    public set bonusHP(val: number)
    {
        this._bonusHP = val;

    }

    addBioHpDice(count: number, dice: Dice)
    {
        this.bioHpDice.push([count, dice]);
    }

    public computeHP()
    {
        this._hpDice.clear();

        const constPerDice = this.c.mod(DStat.Con);

        // Add all non-D1 HP dice first.
        for (const [klass, levels] of this.classes.entries()) {
            if (levels < 1) {
                throw new Error("AAAAAAARRRRRRRRRRGH");
            }
            if (this._hpDice.size == 0) {
                updateMap(this._hpDice,
                    D1,
                    ClassHitDice.get(klass).sides + constPerDice);
                updateMap(this._hpDice,
                    ClassHitDice.get(klass),
                    levels - 1);
            } else {
                updateMap(this._hpDice,
                    ClassHitDice.get(klass),
                    levels);
            }
        }
        for (const [count, dice] of this.bioHpDice) {
            updateMap(this._hpDice, dice, count);
        }

        // Now add const for all the dice.
        let totalDice = 0;
        for (const [die, count] of this._hpDice.entries()) {
            if (die.sides == 1) {
                continue;
            }
            totalDice += count;
        }
        updateMap(this._hpDice, D1, totalDice * constPerDice + this._bonusHP);

        // Now compute expected HP.

        this._hp = 0;
        for (const [die, count] of this._hpDice.entries()) {
            this._hp += count * die.E;
        }
        this._hp = Math.round(this._hp);
    }

    public setSave(save: DStat,
                   proficiency: ProficiencyLevel = ProficiencyLevel.Prof,
                   mod: number = 0)
    {
        this._saves.set(save, [proficiency, mod]);
    }

    public setSpeed(speedType: Speed, val: number)
    {
        this._speeds.set(speedType, val);
    }

    public setSense(senseType: Sense, val: number)
    {
        this._senses.set(senseType, val);
    }

    public setRes(damageType: DamageType, val: number)
    {
        this._res.set(damageType, val);
    }

    public addConditionImmunity(c: Condition)
    {
        this._conditionImmunities.add(c);
    }

    public addAction(a: Action, key: string | null = null)
    {
        if (key == null) {
            key = Math.random().toString();
        }
        this._actions.set(key, a);
    }

    private _hp: number;

    public get ac(): number
    {
        // Someday when I display armor names (computed), I may make armors more
        // than just numbers. Also, might be preferable to go for a lower AC for
        // other buffs later.
        let bestBaseAC = 10 + this.c.mod(DStat.Dex);
        for (const ac of this.baseACSources) {
            if (ac < bestBaseAC) {
                return;
            }
            bestBaseAC = ac;
        }
        let totalAC = bestBaseAC;
        for (const acBonus of this.acBonuses) {
            totalAC += acBonus;
        }
        return totalAC;
    }

    public get stats(): ReadonlyMap<DStat, number>
    {
        return this.c.stats;
    }

    public get pb(): number
    {
        return this.c.pb;
    }

    public get hpDice(): ReadonlyMap<Dice, number>
    {
        return this._hpDice;
    }

    public get hp(): number
    {
        return this._hp;
    }

    public get speeds(): ReadonlyMap<Speed, number>
    {
        return this._speeds;
    }

    public get senses(): ReadonlyMap<Sense, number>
    {
        return this._senses;
    }

    public get saves(): ReadonlyMap<DStat, [ProficiencyLevel, number]>
    {
        return this._saves;
    }

    /**
     * @inheritDoc
     */
    dc(stat: DStat): number
    {
        return 8 + this.c.mod(stat) + this.c.pb;
    }

    public get passivePerception(): number
    {
        return this.c.getSkillMod(DSkill.Perception)[0] + 10;
    }

    public cr: number;

    public get damageRes(): ReadonlyMap<DamageType, number>
    {
        return this._res;
    }

    public get conditionImmunities(): Set<Condition>
    {
        return this._conditionImmunities;
    }

    public get actions(): Map<string, Action>
    {
        return this._actions;
    }
}

