import {Era}                from "../../../data/constants";
import {NpcID}              from "../../../data/npcIndex";
import {Rarity}             from "../../../data/Rarity";
import {Morale}             from "../Morale";
import {IBaseAspectFactory} from "./IBaseAspectFactory";


export interface CombatRatingMetric
{
    pro: string;
    damage: string;
    control: string;
    survival: string;
}

export interface IOperatorFactory
    extends IBaseAspectFactory
{
    set era(v: Era);

    set professions(v: [string, string]);

    /**
     * Damage, Control, Survivability
     */
    set ratings(v: CombatRatingMetric);

    set fatigue(v: number);

    set morale(v: Morale);

    addNotableStuff(k: string, v: string);

    /**
     * Add a condition that ails or aids (rare) this operator.
     */
    addAffliction(a: string);

    /**
     * Mention a numerical value of what an operator thinks of another.
     */
    setChemistryWith(npc: NpcID, v: number, s: string);

    /**
     * Grant the character the possession of an item.
     */
    addInventoryItem(item: string, rarity: Rarity)
}
