import {D1, Dice}       from "../../../../homebrew/common/diceConstants";
import {
    AdventurerClass, ClassHitDice, Condition, DamageType, DStat, Prof,
    ProficiencyLevel, Sense, Skill, Speed, StatValue
}                       from "../../../../homebrew/definitions/constants";
import {NpcId}          from "../../../../npcs/npcIndex";
import {Action}         from "../../action/Action";
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
            console.warn("BladeSinger on non wizard:", NpcId[this.id]);
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
        let adventurerHP = 0;
        let bestHPFromClass = 0;
        for (const [klass, levels] of this.classes.entries()) {
            const hpDie = ClassHitDice.get(klass);
            this._hpDice.set(
                hpDie,
                (this._hpDice.has(hpDie) ? this._hpDice.get(hpDie) : 0) + levels
            );
            this._hpDice.set(
                D1,
                (this._hpDice.has(D1) ? this._hpDice.get(D1) : 0) + levels * this.statsAspect.mod(DStat.Con)
            );
            let klassHP = hpDie.E;
            adventurerHP += levels * (klassHP + this.statsAspect.mod(DStat.Con));

            if (klassHP > bestHPFromClass) {
                bestHPFromClass = klassHP;
            }
        }
        adventurerHP += bestHPFromClass - 1;    // 2E = max+1
        this._hpDice.set(
            D1,
            (this._hpDice.has(D1) ? this._hpDice.get(D1) : 0) + this._bonusHP + bestHPFromClass - 1
        );
        this._hp = adventurerHP + this._bonusHP;
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
        return this.skillsAspect.getSkillMod(Skill.Perception) + 10;
    }

    public get passiveStealth(): number
    {
        return this.skillsAspect.getSkillMod(Skill.Stealth) + 10;
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

