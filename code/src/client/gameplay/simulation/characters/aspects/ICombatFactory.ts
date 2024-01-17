import {Dice}   from "../../../rolling/Dice";
import {
    Activation,
    AdventurerClass, Condition, CreatureSize, DamageType, DStat,
    ProficiencyLevel, Sense,
    Speed
}               from "../../../data/constants";
import {Action} from "../../action/Action";


/**
 * Factory needed to set up stuff needed for {@link ICombat}, while relying on
 * other aspects (the default implementation).
 */
export interface ICombatFactory
{
    setMagicalArmor(armorAC: number): void;
    setLightArmor(armorAC: number): void;
    setMediumArmor(armorAC: number): void;
    setHeavyArmor(armorAC: number): void;
    addAcBonus(bonus: number): void;

    // Monk and Barb ac's can be derived from classes.
    set bladeSinger(val: boolean);

    addClassLevels(klass: AdventurerClass, levels: number);

    set bonusHP(val:number);
    addBioHpDice(count: number, dice: Dice);
    computeHP();

    setSave(save: DStat, proficiency?: ProficiencyLevel, mod?: number);

    setSpeed(speedType: Speed, val: number);
    setSense(senseType: Sense, val: number);
    setRes(damageType: DamageType, val: number);

    addConditionImmunity(c: Condition);

    addAction(a: Action, key?: string | null);
}
