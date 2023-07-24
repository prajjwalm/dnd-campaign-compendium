import {DamageType}              from "../../../homebrew/definitions/constants";
import {IDamageTreeLeafNodeBuff} from "./IDamageTreeLeafNodeBuff";
import {IDamageTreeNode}         from "./IDamageTreeNode";


export class DamageTreeLeafNodeBuff
    implements IDamageTreeLeafNodeBuff
{
    constructor(public readonly shouldApply: (node: IDamageTreeNode) => boolean,
                public readonly apply: (on: Map<DamageType, IDamageParams>) => Map<DamageType, IDamageParams>)
    {}
}
