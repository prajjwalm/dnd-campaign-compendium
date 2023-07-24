/**
 * The various metrics an action can be measured on. These will directly
 * correlate to the metrics a character can be measured on.
 *
 * The scores of these are abstracted and do not directly correspond to any
 * value.
 */
enum ActionMeasureMetric
{
    Complexity,
    DPR,
    BurstDamage,
    ResilienceSelf, // includes ac/hp/saves and score is context dependant
    ResilienceParty,
    ArcanaControl,
    ArcanaUtility,
}
