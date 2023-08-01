import {
    CreatureSize, CRValue
} from "../../../../homebrew/definitions/constants";


export interface ISheetFactory
{
    set subtitle(s: string);

    set acDesc(s: string);

    set cr(v: CRValue);

    set size(s: CreatureSize);

    set category(s: string);
}
