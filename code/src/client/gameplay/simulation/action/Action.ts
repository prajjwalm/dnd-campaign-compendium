import {Activation}        from "../../data/constants";
import {IDStats}           from "../characters/aspects/IDStats";
import {Character}         from "../characters/Character";
import {IMeasurableAction} from "./IMeasurableAction";


export class Action
    implements IMeasurableAction
{
    public c: Character;

    constructor(private _activation: Activation,
                private _content: string | ((c: Character) => string))
    {
        this.c = null;
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
        if (typeof this._content === 'function') {
            return this._content(this.c);
        }
        return this._content;
    }
}
