import {Rarity} from "../../../data/Rarity";
import {NpcID}  from "../../../data/npcIndex";
import {Morale} from "../Morale";


export interface CombatRatingMetric
{
    damage: number;
    control: number;
    survival: number;
}

export interface IOperatorFactory
{
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
