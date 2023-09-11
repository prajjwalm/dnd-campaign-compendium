import {DamageType}      from "../../data/constants";
import {IDamageTreeNode} from "./IDamageTreeNode";


export interface IDamageTreeLeafNodeBuff
{
    shouldApply(node: IDamageTreeNode): boolean;
    apply(on: Map<DamageType, IDamageParams>): Map<DamageType, IDamageParams>;
}