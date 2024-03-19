import {DamageType} from "../../data/constants";
import {Dice}       from "../../rolling/Dice";


export const DebuffT1 = -10;
export const DebuffT2 = -30;
export const DebuffT3 = -60;
export const DebuffT4 = -100;
export const DebuffT5 = -200;
export const DebuffT6 = -400;

export const BuffT1 = 10;
export const BuffT2 = 40;
export const BuffT3 = 80;
export const BuffT4 = 150;
export const BuffT5 = 210;
export const BuffT6 = 350;
export const BuffT7 = 500;

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
                public readonly severity: number = 0)
    {
        if (toHit == null && saveDC == null && severity == 0) {
            throw new Error("One of to-hit/save-dc/severity must be given.");
        }
    }

    /**
     * Returns the damage dealt as HP-percentage against a creature of the given
     * CR. This CR is used to estimate the AC/Save they're expected to have.
     */
    private computeDamageAgainst(cr: number)
    {
        let totalDamage = 0;
        for (const [diceCount, dice, damageType] of this.damage) {
            let damage = diceCount * dice.E;
            if (damageType > DamageType._NonStandard) {
                const failP = AttackAbstraction.probabilityToFailDC20(cr);
                damage = failP * (damage * 2 + 10) + (1 - failP) * damage;
            }
            totalDamage += damage;
        }

        if (this.toHit != null) {
            return totalDamage * (21 + this.toHit - AttackAbstraction.expectedAC(cr)) / 20;

        }
        else {
            return totalDamage * (19 + this.saveDC - AttackAbstraction.expectedSave(cr)) / 40;
        }
    }

    /**
     * Returns the score which this attack would consume when used against
     * creatures that are equal to its CR.
     */
    public computeScore(cr: number)
    {
        if (this.saveDC == null && this.toHit == null) {
            return 0;
        }

        // Regardless of how large the damage, we assume the targets can scrape
        // by with at least 5% HP to avoid extremely skewed calculations.)
        const dr = Math.min(0.95, Math.max(0.05,
            this.computeDamageAgainst(cr) / AttackAbstraction.expectedHP(cr)
        ));
        // Damage ratios that almost drop the target's HP to zero can be more
        // dangerous by far than those that drop it to half.
        return dr * (1 + dr);
    }

    public static expectedDamage(cr: number)
    {
        return Math.round(8 + cr * (2 + cr * (1 / 8 + cr / 100)));
    }

    public static expectedToHit(cr: number)
    {
        return Math.round(3 + cr * (1 + Math.sqrt(cr) / 50));
    }

    public static expectedSaveDC(cr: number)
    {
        return 8 + this.expectedToHit(cr);
    }

    public static expectedSeverity(cr: number)
    {
        cr /= 15;
        return 1 + cr * (2 + cr * (3 + cr));
    }

    /**
     * The expected HP of a creature with the given CR.
     */
    private static expectedHP(cr: number)
    {
        return Math.round(7 + cr * (4 + cr / 5));
    }

    /**
     * The expected AC of a creature (likely a PC) with the given CR.
     */
    private static expectedAC(cr: number)
    {
        return Math.round(12 + cr * (1 / 2 + cr / 200));
    }

    /**
     * The expected Save modifier of a creature (likely a PC) with the given CR.
     */
    private static expectedSave(cr: number)
    {
        return Math.round(1 + cr * (1 / 4 + cr / 200));
    }

    private static probabilityToFailDC20(cr: number)
    {
        return (19 - AttackAbstraction.expectedSave(cr)) / 20;
    }

    public static generateCRTable()
    {
        const crRows = [];

        for (let i = 0; i < 31; i++) {
            crRows.push(`
<tr class="simple_table__row">
    <td>${i}</td>
    <td>${this.expectedSeverity(i).toFixed(1)}</td>
    <td>${this.expectedDamage(i)}</td>
    <td>${this.expectedToHit(i)}</td>
    <td>${this.expectedSaveDC(i)}</td>
    <td>${this.expectedHP(i)}</td>
    <td>${this.expectedAC(i)}</td>
    <td>${this.expectedSave(i)}</td>
</tr>`
            );
        }

        return `
<table class="simple_table">
    <tbody>
        <tr class="simple_table__row--header">
            <th>CR</th>
            <th>Severity</th>
            <th>Damage/Round</th>
            <th>To-Hit</th>
            <th>Save DC</th>
            <th>HP</th>
            <th>AC</th>
            <th>Median Save</th>
        </tr>
        ${crRows.join("")}
    </tbody>
</table>
<table class="simple_table" style="max-width: 360px;">
<tbody>
<tr class="simple_table__row--header"><th>Tier</th><th>Buff Severity</th> <th>Debuff Severity</th></tr>
<tr class="simple_table__row"><td>T1</td><td>+${BuffT1}%</td><td>-${DebuffT1}%</td></tr>
<tr class="simple_table__row"><td>T2</td><td>+${BuffT2}%</td><td>-${DebuffT2}%</td></tr>
<tr class="simple_table__row"><td>T3</td><td>+${BuffT3}%</td><td>-${DebuffT3}%</td></tr>
<tr class="simple_table__row"><td>T4</td><td>+${BuffT4}%</td><td>-${DebuffT4}%</td></tr>
<tr class="simple_table__row"><td>T5</td><td>+${BuffT5}%</td><td>-${DebuffT5}%</td></tr>
<tr class="simple_table__row"><td>T6</td><td>+${BuffT6}%</td><td>-${DebuffT6}%</td></tr>
<tr class="simple_table__row"><td>T7</td><td>+${BuffT7}%</td><td>-</td></tr>
</tbody>
</table>
        `
    }
}
