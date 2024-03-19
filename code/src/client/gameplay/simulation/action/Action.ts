import {Activation}        from "../../data/constants";
import {Character}         from "../characters/Character";


export class Action
{
    public c: Character;

    constructor(private _activation: Activation,
                private _content: string | ((c: Character) => string))
    {
        this.c = null;
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
