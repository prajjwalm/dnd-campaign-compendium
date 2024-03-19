import {Condition, DamageType, DStat, ProficiencyLevel, Sense, Speed} from "../../../data/constants";
import {Dice}                                                         from "../../../rolling/Dice";
import {Action}                                                       from "../../action/Action";
import {CombatTreeNode}                                               from "./CombatTreeNode";


/**
 * Any object supporting this interface has the raw data a character would
 * need to run combat. This is NOT the sheet API, that is one of the clients of
 * this.
 *
 * Note that some of the features it supports overlap with other aspects. That
 * is intentional. It is the choice of the implementing class to decide if to
 * rely on another aspect or provide some other way to support this interface.
 */
export interface ICombat
{
    get ac(): number;
    get stats(): ReadonlyMap<DStat, number>;
    get pb(): number;
    get hpDice(): ReadonlyMap<Dice, number>;
    get hp(): number;
    get speeds(): ReadonlyMap<Speed, number>;
    get senses(): ReadonlyMap<Sense, number>;
    get saves(): ReadonlyMap<DStat, [ProficiencyLevel, number]>;


    /**
     * Returns the base DC of a saving throw using this stat, assuming
     * proficiency and no other modifiers.
     */
    dc(stat: DStat): number;

    get passivePerception(): number;

    /**
     * The CR of the creature. We need this to estimate its opponents to measure
     * threat levels.
     */
    get cr(): number;

    /**
     * Damage taken is multiplied by 100% - res.
     *
     * @returns Map from damage type to its res in percentage units.
     */
    get damageRes(): ReadonlyMap<DamageType, number>;
    get conditionImmunities(): ReadonlySet<Condition>;

    get actions(): Map<string, Action>;

    get imbalance(): [number, number, number] | null;
}
