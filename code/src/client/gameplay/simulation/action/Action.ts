import {Activation}        from "../../data/constants";
import {Character}         from "../characters/Character";
import {AttackAbstraction} from "./AttackAbstraction";


export class Action
{
    public c: Character;

    constructor(private _activation: Activation,
                private _content: string | ((c: Character) => string),
                private readonly _abstraction: AttackAbstraction | null = null)
    {
        this.c = null;
    }

    public score() {
        return this._abstraction.computeScore(this.c.cr);
    }

    public get activation(): Activation
    {
        return this._activation;
    }

    public createContent(): string
    {
        if (typeof this._content === 'function') {
            return this._content(this.c);
        }
        return this._content;
    }
}
