import {D1, D100, D12, D20, D4, D6, D8, Dice, RollVariant} from "./Dice";


export class RollArgumentError
    extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}


export interface IRollable
{
    roll(mode?: RollVariant): void;
    get parts(): Map<Dice, number[]>;
    get result(): number;
}


export class Rollable
    implements IRollable
{
    private readonly dice: Map<Dice, number>;
    private readonly rolls: Map<Dice, number[]> = new Map();

    public constructor(dice: Map<Dice, number>,
                       private readonly rng: () => number = Math.random)
    {
        this.dice = new Map(
            [...dice.entries()].sort((a,
                                      b) => { return b[0].sides - a[0].sides;})
        );
    }

    public roll(mode?: RollVariant): void
    {
        this.rolls.clear();
        for (const [die, count] of this.dice.entries()) {
            if (count == 0) {
                continue;
            }
            if (die == D1) {
                this.rolls.set(D1, [Math.round(count)]);
                continue;
            }
            this.rolls.set(die, []);
            for (let i = 0; i < Math.abs(Math.round(count)); i++) {
                const roll = die.roll(this.rng) * Math.sign(count);
                this.rolls.get(die).push(roll);
            }
        }
    }

    public get parts(): Map<Dice, number[]>
    {
        return this.rolls;
    }

    public get result()
    {
        let result = 0;
        for (const [_, rolls] of this.rolls) {
            for (const roll of rolls) {
                result += roll;
            }
        }
        return result;
    }
}


export class NatRollable
    extends Rollable
    implements IRollable
{
    // A small attempt to prevent memory leaks.
    private static NAT_ROLLABLE_CACHE: Map<number, NatRollable> = new Map();

    public static generate(modifier: number,
                           rng: () => number = Math.random): NatRollable
    {
        if (rng != Math.random) {
            return new NatRollable(modifier, rng);
        }

        if (this.NAT_ROLLABLE_CACHE.has(modifier)) {
            console.log("cache hit");
            return this.NAT_ROLLABLE_CACHE.get(modifier);
        }
        const rollable = new NatRollable(modifier, rng)
        this.NAT_ROLLABLE_CACHE.set(modifier, rollable);
        return rollable;
    }

    private readonly _parts: Map<Dice, number[]> = new Map();

    private _mode: RollVariant;

    protected constructor(private readonly modifier: number,
                          rng: () => number = Math.random)
    {
        super(new Map([[D20, 3], [D1, Math.round(modifier)]]), rng);
        this._mode = RollVariant.Normal;
    }

    public roll(mode: RollVariant = RollVariant.Normal): void
    {
        if (mode == RollVariant.Critical) {
            throw new RollArgumentError("");
        }
        this._mode = mode;
        super.roll();
    }

    public get parts(): Map<Dice, number[]>
    {
        return this._parts.size == 0 ? super.parts : this._parts;
    }

    public get result(): number
    {
        const d20s = super.parts.get(D20);
        const mod = this.modifier;
        this._parts.clear();
        if (this._mode == RollVariant.Normal) {
            this._parts.set(D20, [d20s[0]]);
            return d20s[0] + mod;
        } else if (this._mode == RollVariant.Advantage) {
            this._parts.set(D20, [d20s[0], d20s[1]]);
            return Math.max(d20s[0], d20s[1]) + mod;
        } else if (this._mode == RollVariant.Disadvantage) {
            this._parts.set(D20, [d20s[0], d20s[1]]);
            return Math.min(d20s[0], d20s[1]) + mod;
        } else if (this._mode == RollVariant.SuperAdvantage) {
            this._parts.set(D20, d20s);
            return Math.max(...d20s) + mod;
        } else if (this._mode == RollVariant.SuperDisadvantage) {
            this._parts.set(D20, d20s);
            return Math.min(...d20s) + mod;
        } else {
            throw new RollArgumentError(
                `Roll variant ${RollVariant[this._mode]} not supported`
            );
        }
    }
}


export class DamageRollable
    extends Rollable
    implements IRollable
{
    private readonly baseDice: Map<Dice, number>;

    private readonly _parts: Map<Dice, number[]> = new Map();

    private _mode: RollVariant;

    public constructor(dice: Map<Dice, number>, rng: () => number = Math.random)
    {
        const baseDice = new Map();
        const critDice = new Map();
        for (const [die, count] of dice.entries()) {
            if (die == D1) {
                critDice.set(die, Math.round(count));
            } else {
                critDice.set(die, Math.round(count) * 2);
            }
            baseDice.set(die, Math.round(count));
        }
        super(critDice, rng);
        this.baseDice = baseDice;
    }

    public roll(mode: RollVariant = RollVariant.Normal): void
    {
        this._mode = mode;
        super.roll();
    }

    public get parts(): Map<Dice, number[]>
    {
        return this._parts.size == 0 ? super.parts : this._parts;
    }

    public get result()
    {
        this._parts.clear();
        if (this._mode == RollVariant.Normal) {
            let result = 0;
            for (const [dice, rolls] of super.parts) {
                if (dice == D1) {
                    result += Math.round(rolls[0]);
                } else {
                    const shownRolls = [];
                    for (let i = 0; i < rolls.length / 2; i++) {
                        result += rolls[i];
                        shownRolls.push(rolls[i])
                    }
                    this._parts.set(dice, shownRolls);
                }
            }
            return result;
        } else if (this._mode == RollVariant.Critical) {
            return super.result;
        } else {
            throw new RollArgumentError(
                `Roll variant ${RollVariant[this._mode]} not supported`
            );
        }
    }
}


export function test()
{
    let seed = 1;

    /**
     * A quick and simple seed-able rng. Courtesy -
     * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
     */
    function easyRandom()
    {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    const pr1 = new Rollable(new Map([[D20, 1], [D1, 5]]), easyRandom);
    // console.assert(pr1.getRollString(false) == "1d20+5");
    pr1.roll();
    console.assert(pr1.result == 20, `Expected: 20, Rolled: ${pr1.result}`);
    pr1.roll();
    console.assert(pr1.result == 25, `Expected: 25, Rolled: ${pr1.result}`);

    const pr2 = new Rollable(
        new Map([[D100, -1], [D12, 4], [D8, 3], [D1, -10]]), easyRandom
    );
    // console.assert(pr2.getRollString(false) == "-1d100+4d12+3d8-10");
    pr2.roll();
    console.assert(pr2.result == 27);
    pr2.roll();
    console.assert(pr2.result == 16);

    const pr3 = new Rollable(new Map([[D8, 4]]));
    // console.assert(pr3.getRollString(false) == "4d8");
    for (let i = 0; i < 100; i++) {
        pr3.roll();
        console.assert(pr3.result >= 4 && pr3.result <= 32);
    }

    const nr1 = NatRollable.generate(4, easyRandom);
    // console.assert(nr1.getRollString(false) == "+4");
    nr1.roll(RollVariant.SuperAdvantage);
    console.assert(nr1.result == 20);
    // console.assert(nr1.getRollString(false) == "+4");
    try {
        nr1.roll(RollVariant.Critical);
        console.error("Roll argument error not thrown.");
    } catch (e) {
        console.assert(e instanceof RollArgumentError,
                       "Roll argument error not thrown.");
    }

    const r1 = new DamageRollable(new Map([[D6, 2]]), easyRandom);
    // r1.debug = true;
    // console.assert(r1.getRollString(false) == "2d6");
    r1.roll(RollVariant.Critical);
    console.assert(r1.result == 13);
    // console.assert(r1.getRollString(false) == "2d6");

    const r2 = new DamageRollable(new Map([[D4, 4], [D1, -10]]), easyRandom);
    // r2.debug = true;
    // console.assert(r2.getRollString(false) == "4d4-10");
    r2.roll();
    console.assert(r2.result == 1);

    console.log("Rollable tests performed.");
}
