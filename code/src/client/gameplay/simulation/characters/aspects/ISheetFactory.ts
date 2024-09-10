import {CreatureSize}       from "../../../data/constants";
import {IBaseAspectFactory} from "./IBaseAspectFactory";


export interface ISheetFactory
    extends IBaseAspectFactory
{
    set subtitle(s: string);

    set altName(s: string);

    set acDesc(s: string);

    set size(s: CreatureSize);

    set category(s: string);

    set danger(s: number);
}
