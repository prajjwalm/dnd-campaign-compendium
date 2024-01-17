import {
    CreatureSize, CRValue
} from "../../../data/constants";


export interface ISheetFactory
{
    set subtitle(s: string);

    set altName(s: string);

    set acDesc(s: string);

    set cr(v: CRValue);

    set size(s: CreatureSize);

    set category(s: string);

    set theme(s: string);
}
