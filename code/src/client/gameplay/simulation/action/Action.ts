import {Activation} from "../../data/constants";
import {IDStats}    from "../characters/aspects/IDStats";
import {IMeasurableAction} from "./IMeasurableAction";


export class Action
    implements IMeasurableAction
{
    constructor(private _activation: Activation,
                private _content: string)
    {
    }

    public measureImpact(given?: ReadonlyMap<ActionMeasureInput, number>):
        ReadonlyMap<ActionMeasureMetric, number>
    {
        throw new Error("Not implemented.");
    }

    public get activation(): Activation
    {
        return this._activation;
    }

    public bindStats(stats: IDStats): void
    { }

    public createContent(): string
    {
        return this._content;
    }
}
