import {Character} from "../Character";


export interface IBaseAspectFactory
{
    finalize(): void;

    duplicate(other: Character): this;
}