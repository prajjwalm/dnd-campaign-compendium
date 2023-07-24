/**
 * The measure of an action would be a function of zero or more of these inputs.
 *
 * These have concrete values and meanings which are expected to be understood
 * with context. Like a damage bonus of 20 would mean all damage dice of the
 * action on which it is applied increase to a factor of 1.2. Or an extra attack
 * of 1 would mean the attack count increases by 1 and so on.
 */
enum ActionMeasureInput
{
    /**
     * A multiplicative factor to increase the damage dice by. Expressed as a
     * percentage.
     */
    DamageBonus,

    /**
     * The number of attacks to increase by. Cannot make the count drop below 1.
     */
    AttackCountBonus,

    /**
     * Set the attack count to a given value. Cannot set the count below 0.
     */
    AttackCountSet,

    /**
     * A fixed value to increase to-hit rolls and save dcs by.
     */
    AccuracyBonus,

    /**
     * Drops the critical requirement by a fifth (floor) of this value
     * (expressed in percentage).
     */
    CriticalChanceBonus,
}
