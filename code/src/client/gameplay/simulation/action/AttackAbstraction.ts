import {DamageType} from "../../data/constants";
import {Dice}       from "../../rolling/Dice";


export class AttackAbstraction
{
    /**
     * CTOR.
     *
     * @param damage      The damage dealt if this attack were to hit.
     * @param toHit       The to-hit modifier of this attack.
     * @param saveDC      The save DC of this attack.
     * @param severity    An abstraction ranging from 1 to 10 to denote any
     *                    extra complications if this attack were to hit.
     */
    constructor(private readonly damage: [number, Dice, DamageType][],
                private readonly toHit: number | null,
                private readonly saveDC: number | null = null,
                private readonly severity: number = 1)
    {
        if (toHit == null && saveDC == null) {
            throw new Error("One of to-hit/save-dc must be given.");
        }
    }

    /**
     * Returns the damage dealt as HP-percentage against a creature of the given
     * CR. This CR is used to estimate the AC/Save they're expected to have.
     */
    public computeDamageAgainst(cr: number)
    {
        let totalDamage = 0;
        for (const [diceCount, dice, damageType] of this.damage) {
            let damage = diceCount * dice.E;
            if (damageType > DamageType._NonStandard) {
                const failP = this.probabilityToFailDC20(cr);
                damage = failP * (damage * 2 + 10) + (1 - failP) * damage;
            }
            totalDamage += damage;
        }

        if (this.toHit != null) {
            return totalDamage * (21 + this.toHit - this.expectedAC(cr)) / 20;

        }
        else {
            return totalDamage * (19 + this.saveDC - this.expectedSave(cr)) / 40;
        }
    }

    /**
     * Returns the score which this attack would consume when used against
     * creatures that are equal to its CR.
     */
    public computeScore(cr: number)
    {
        // Regardless of how large the damage, we assume the targets can scrape
        // by with at least 2% HP to avoid extremely skewed calculations.)
        const damageRatio = Math.min(0.98, Math.max(0.02,
            this.computeDamageAgainst(cr) / this.expectedHP(cr)
        ));

        return 100 / (1 - damageRatio) - 100;
    }

    /**
     * The expected HP of a creature with the given CR.
     */
    private expectedHP(cr: number)
    {
        return 7 * (1 + cr);
    }

    /**
     * The expected AC of a creature (likely a PC) with the given CR.
     */
    private expectedAC(cr: number)
    {
        return Math.round(12 + cr / 2);
    }

    /**
     * The expected Save modifier of a creature (likely a PC) with the given CR.
     */
    private expectedSave(cr: number)
    {
        return Math.round(1 + cr / 4);
    }

    private probabilityToFailDC20(cr: number)
    {
        return 19 - this.expectedSave(cr) / 20;
    }
}
