import {CSkill, DSkill, Era, VisibilityLevel} from "../../../data/constants";
import {IDOMGenerator}                        from "../../../IDomGenerator";
import {Morale}                               from "../Morale";
import {CombatRatingMetric}                   from "./IOperatorFactory";


export interface IOperator
    extends IDOMGenerator
{
    /**
     * The era in terms of science this operator comes from.
     */
    get era(): Era;

    /**
     * The old, current professions the character had.
     */
    get professions(): [string, string];

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
