import {updateMap} from "../../../common";
import {D1, Dice}  from "../../../rolling/Dice";
import {
    AdventurerClass, ClassHitDice, Condition, DamageType, DStat, Prof,
    ProficiencyLevel, Sense, DSkill, Speed, StatValue
}                 from "../../../data/constants";
import {NpcID}    from "../../../data/npcIndex";
import {Action}   from "../../action/Action";
import {Character}      from "../Character";
import {BaseAspect}     from "./BaseAspect";
import {ICombat}        from "./ICombat";
import {ICombatFactory} from "./ICombatFactory";
import {IDSkills}       from "./IDSkills";
import {IDStats}        from "./IDStats";


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
    private readonly statsAspect: IDStats;

    private readonly skillsAspect: IDSkills;

    private readonly baseACSources: number[];

    private readonly acBonuses: number[];

    private readonly classes: Map<AdventurerClass, number>;

    private readonly _hpDice: Map<Dice, number>;

    private readonly _speeds: Map<Speed, number>;

    private readonly _senses: Map<Sense, number>;

    private readonly _res: Map<DamageType, number>;

    private readonly _saves: Map<DStat, [ProficiencyLevel, number]>;

    private readonly _conditionImmunities: Set<Condition>;

    private readonly _actions: Action[];

    private _bonusHP: number;

    private _hp: number;

    private bioHpDice: [number, Dice][];

    constructor(c: Character)
    {
        super(c);
        this.statsAspect = c;
        this.skillsAspect = c;

        this.baseACSources = [];
        this.acBonuses = [];
        this.classes = new Map();
        this._hpDice = new Map();
        this._bonusHP = 0;

        this._speeds = new Map();
        this._senses = new Map();

        this._res = new Map();

        this._saves = new Map();

        this._conditionImmunities = new Set();

        this._actions = [];
        this.bioHpDice = [];
    }

    addBioHpDice(count: number, dice: Dice) {
        this.bioHpDice.push([count, dice]);
    }

    /**
     * @inheritDoc
     */
    dc(stat: DStat): number
    {
        return 8 + this.statsAspect.mod(stat) + this.statsAspect.pb.mod();
    }


    public setMagicalArmor(armorAC: number): void
    {
        this.baseACSources.push(armorAC + this.statsAspect.mod(DStat.Dex));
    }

    public setLightArmor(armorAC: number): void
    {
        this.baseACSources.push(armorAC + this.statsAspect.mod(DStat.Dex));
    }

    public setMediumArmor(armorAC: number): void
    {
        this.baseACSources.push(
            armorAC + Math.min(2, this.statsAspect.mod(DStat.Dex))
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

    public set bladeSinger(val: boolean)
    {
        if (!this.classes.has(AdventurerClass.Wizard)) {
            console.warn("BladeSinger on non wizard:", NpcID[this.id]);
        }
        this.baseACSources.push(
            this.statsAspect.mod(DStat.Dex) +
            this.statsAspect.mod(DStat.Int) + 10
        );
    }

    public addClassLevels(klass: AdventurerClass, levels: number)
    {
        if (klass == AdventurerClass.Monk) {
            this.baseACSources.push(
                this.statsAspect.mod(DStat.Dex) +
                this.statsAspect.mod(DStat.Wis) + 10
            );
        } else if (klass == AdventurerClass.Barbarian) {
            this.baseACSources.push(
                this.statsAspect.mod(DStat.Dex) +
                this.statsAspect.mod(DStat.Con) + 10
            );
        }
        this.classes.set(
            klass,
            (this.classes.has(klass) ? this.classes.get(klass) : 0) + levels
        );
    }

    public get bonusHP(): number
    {
        return this._bonusHP;
    }

    public set bonusHP(val: number)
    {
        this._bonusHP = val;

    }

    public computeHP()
    {
        this._hpDice.clear();

        const constPerDice = this.statsAspect.mod(DStat.Con);

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
            }
            else {
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
        updateMap(this._hpDice, D1, totalDice * constPerDice);

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

    public addAction(a: Action)
    {
        this._actions.push(a);
    }

    public get ac(): number
    {
        // Someday when I display armor names (computed), I may make armors more
        // than just numbers. Also, might be preferable to go for a lower AC for
        // other buffs later.
        let bestBaseAC = 10 + this.statsAspect.mod(DStat.Dex);
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

    public get stats(): ReadonlyMap<DStat, StatValue>
    {
        return this.statsAspect.stats;
    }

    public get pb(): Prof
    {
        return this.statsAspect.pb;
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

    public get passivePerception(): number
    {
        return this.skillsAspect.getSkillMod(DSkill.Perception)[0] + 10;
    }

    public get damageRes(): ReadonlyMap<DamageType, number>
    {
        return this._res;
    }

    public get conditionImmunities(): Set<Condition>
    {
        return this._conditionImmunities;
    }

    public get actions(): Action[]
    {
        return this._actions;
    }
}

