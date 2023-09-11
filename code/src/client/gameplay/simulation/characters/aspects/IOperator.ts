import {
    CSkill,
    DSkill,
    VisibilityLevel
}               from "../../../data/constants";
import {Morale} from "../Morale";
import {CombatRatingMetric} from "./IOperatorFactory";


export interface IOperator
{
    /**
     * The morale of this operator
     */
    get morale(): Morale;

    /**
     * How overworked this operator is.
     */
    get fatigue(): number;

    /**
     * Damage, Control, Survivability
     */
    get ratings(): CombatRatingMetric;

    /**
     * Get the notable D&D skills of this operator.
     */
    get notableDSkills(): ReadonlyMap<DSkill, [number, VisibilityLevel]>;

    /**
     * Get the notable CoC skills of this operator.
     */
    get notableCSkills(): ReadonlyMap<CSkill, [number, VisibilityLevel]>;

    /**
     * Any other information we'd like to display. (Pretty much everything)
     */
    get notableStuff(): ReadonlyArray<[string, string]>;
}
