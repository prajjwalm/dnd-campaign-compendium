import {DamageType}              from "../../../homebrew/definitions/constants";
import {DamageTreeNodeTag}       from "./DamageTreeNodeTag";
import {DamageTreeNodeType}      from "./DamageTreeNodeType";
import {IDamageTreeLeafNodeBuff} from "./IDamageTreeLeafNodeBuff";


export interface IDamageTreeNode
{
    get tags(): ReadonlySet<DamageTreeNodeTag>;

    get nodeType(): DamageTreeNodeType;

    get children(): IDamageTreeNode[];

    get selfDamage(): ReadonlyMap<DamageType, IDamageParams>;

    computeDPR(expectedDefense: number, expectedRes: ReadonlyMap<DamageType, number>)
        : ReadonlyMap<DamageType, number>;

    applyBuff(buff: IDamageTreeLeafNodeBuff);

    removeBuff(buff: IDamageTreeLeafNodeBuff);

    resetBuffs();
}
