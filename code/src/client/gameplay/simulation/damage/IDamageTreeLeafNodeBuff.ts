import {DamageType}      from "../../../homebrew/definitions/constants";
import {IDamageTreeNode} from "./IDamageTreeNode";


export interface IDamageTreeLeafNodeBuff
{
    shouldApply(node: IDamageTreeNode): boolean;
    apply(on: Map<DamageType, IDamageParams>): Map<DamageType, IDamageParams>;
}