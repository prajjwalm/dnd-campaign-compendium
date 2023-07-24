import {ISheetAction} from "./ISheetAction";


/**
 * An action whose impact can be measured.
 */
export interface IMeasurableAction
    extends ISheetAction
{
    measureImpact(given?: ReadonlyMap<ActionMeasureInput, number>):
        ReadonlyMap<ActionMeasureMetric, number>;
}