import {updateMap}                                                                                                           from "../../../../common/common";
import {AdventurerClass, ClassHitDice, Condition, DamageType, DSkill, DStat, pbMod, ProficiencyLevel, Sense, Speed, statMod} from "../../../data/constants";
import {NpcId}                                                                                                               from "../../../data/npcIndex";
import {D1, Dice}                                                                                                            from "../../../rolling/Dice";
import {Action}                                                                                                     from "../../action/Action";
import {AttackAbstraction}                                                                                          from "../../action/AttackAbstraction";
import {Character}                                                                                                  from "../Character";
import {BaseAspect}                                                                                                 from "./BaseAspect";
import {CombatTreeNode}                                                                                             from "./CombatTreeNode";
import {ICombat}                                                                                                    from "./ICombat";
import {ICombatFactory}                                                                                             from "./ICombatFactory";


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

    private readonly baseACSources: number[] = [];

    private readonly acBonuses: number[] = [];

    private readonly classes: Map<AdventurerClass, number> = new Map();

    private readonly _hpDice: Map<Dice, number> = new Map();

    private readonly _speeds: Map<Speed, number> = new Map();

    private readonly _senses: Map<Sense, number> = new Map();

    private readonly _res: Map<DamageType, number> = new Map();

    private readonly _saves: Map<DStat, [ProficiencyLevel, number]> = new Map();

    private readonly _conditionImmunities: Set<Condition> = new Set();

    private readonly _actions: Map<string, Action> = new Map();

    private readonly bioHpDice: [number, Dice][] = [];

    private _root: CombatTreeNode = null;

    private _bonusHP: number = 0;

    private _hp: number = -666;

    private _imbalance: [number, number, number] | null = null;

    constructor(c: Character)
    {
        super(c);
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
            console.warn("BladeSinger on non wizard:", NpcId[this.c.id]);
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

    public get root(): CombatTreeNode
    {
        if (this._root == null) {
            this._root = CombatTreeNode.constructActionTreeBase();
        }
        return this._root;
    }

    /**
     * So this evaluation of a character's combat stats basically depends on
     * two things. How many rounds are they likely to be a problem to a
     * party of their CR level, and how badly can they fuck up said party
     * per round.
     *
     * Now of course this is very subjective, so the numbers here are really
     * just an indication to show if something is wildly off track. But
     * here's how it goes.
     *
     * Every attack is rated on how much percent of HP can it reduce of a
     * character of the same CR. All other moves, and attacks too, gain a
     * multiplier which indicates how deadly they'd be when taken. All moves
     * are arranged in an and-or tree and the damage and multipliers are
     * (added/maxed) individually, and multiplied together.
     *
     * This combined number is multiplied to the number of turns the creature
     * is likely to live while not considering any healing. We consider the
     * HP, AC, Mean Save, and average res over basic damage types only. This
     * is compared to the expected to-hit and damage to a creature of their CR.
     *
     * Finally, the combined product is compared to the cube of their CR, and
     * the ratio is returned. Higher return values means the creature might be
     * OP.
     *
     * Like I said, the logic is all over the place and this is just an
     * indicator.
     */
    private evaluate(): void
    {
        // We assume the player's attack it with their strongest shot. But we do
        // not yet consider resistances or vulnerabilities.
        const saveVals = [];
        for (const stat of [DStat.Str,
                            DStat.Dex,
                            DStat.Con,
                            DStat.Int,
                            DStat.Wis,
                            DStat.Cha])
        {
            if (this._saves.has(stat)) {
                const [prof, mod] = this._saves.get(stat);
                saveVals.push(pbMod(this.pb, prof) + mod + (this.c.mod(stat)))
            }
            else {
                saveVals.push(this.c.mod(stat));
            }
        }
        saveVals.sort();
        const medianSave = saveVals[2];

        const imbalances: [number, number, number] = [-1, -1, -1];
        for (let i = 0; i < 3; i++) {
            const cr = this.cr - 1 + i;

            const damageTaken = Math.min(0.95, Math.max(
                (21 + AttackAbstraction.expectedToHit(cr) - this.ac) / 20,
                (19 + AttackAbstraction.expectedSaveDC(cr) - medianSave) / 40,
                0.05
            )) * AttackAbstraction.expectedDamage(cr);

            const rounds = Math.max(0.5, this.hp / damageTaken);
            this._root.computeMetrics(cr);

            const damageDealt = this._root.damageMetric;
            const severity    = this._root.severityMetric;

            // We divide by the CR cause the target won't just be a dummy relying on
            // merely its meat and fists. They'll have tricks up their sleeve too,
            // and getting past those tricks would be crucial in actually dealing
            // damage or evading their damage. (For example a simple spell may
            // completely disable the huge attacks, or just paralyse the victim,
            // making their HP worthless).
            console.log(this.c.name, cr, rounds, damageDealt, severity)
            imbalances[i] = ((rounds * damageDealt * severity) / AttackAbstraction.expectedSeverity(cr));
        }

        this._imbalance = imbalances;
    }

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

    public set hp(val: number)
    {
        this._hp = val;
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
        return this.c.getSkillMod(DSkill.Perception) + 10;
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

    public get imbalance(): [number, number, number] | null
    {
        return this._imbalance;
    }

    public finalize(): void
    {
        if (this._root != null) {
            this.evaluate();
        }
    }
}

