import {Dice, RollVariant} from "./diceConstants";


export class RollArgumentError
    extends Error
{
    constructor(msg: string) {
        super(msg);
    }
}


class PrimitiveRollable
{
    protected readonly dice: Map<Dice, number>;
    protected readonly rolls: Map<Dice, number[]> = new Map();
    private _debug: boolean;

    public constructor(dice: Map<Dice, number>,
                       private readonly rng: () => number = Math.random)
    {
        this.dice = new Map(
            [...dice.entries()].sort((a, b) => { return b[0] - a[0];})
        );
        this._debug = false;
    }

    public static generateRollString(dice: Map<Dice, number>)
    {
        let rollString = "";
        for (const [die, count] of dice.entries()) {
            if (count == 0) {
                continue;
            }
            const sign = count > 0 ? (rollString.length == 0 ? "" : "+") : "-";
            const diceStr = die > 1 ? `d${die}` : "";
            rollString += `${sign}${Math.abs(count)}${diceStr}`
        }
        return rollString;
    }

    public getRollString()
    {
        return PrimitiveRollable.generateRollString(this.dice);
    }

    public roll(): number
    {
        this.rolls.clear();
        for (const [die, count] of this.dice.entries()) {
            if (count == 0) {
                continue;
            }
            if (die == 1) {
                this.rolls.set(1, [count]);
                continue;
            }
            this.rolls.set(die, []);
            for (let i = 0; i < Math.abs(count); i++) {
                const roll = this.rollDie(die) * Math.sign(count);
                if (this._debug) {
                    console.log(die, roll);
                }
                this.rolls.get(die).push(roll);
            }
        }
        return this.result;
    }

    private rollDie(d)
    {
        return Math.floor(this.rng() * d) + 1;
    }

    public get result() {
        let result = 0;
        for (const [_, rolls] of this.rolls) {
            for (const roll of rolls) {
                result += roll;
            }
        }
        return result;
    }

    public set debug(value: boolean) {
        this._debug = value;
    }
}


export class NatRollable
    extends PrimitiveRollable
{
    private _mode: RollVariant;

    public constructor(private readonly modifier: number,
                       rng: () => number = Math.random)
    {
        super(new Map([[20, 3], [1, modifier]]), rng);
        this._mode = RollVariant.Normal;
    }

    public getRollString(): string {
        let d20str;
        if (this._mode == RollVariant.Normal) {
            d20str = "d20";
        } else if (this._mode == RollVariant.Advantage) {
            d20str = "2d20kh1";
        } else if (this._mode == RollVariant.Disadvantage) {
            d20str = "2d20kl1";
        } else if (this._mode == RollVariant.SuperAdvantage) {
            d20str = "3d20kh1";
        } else if (this._mode == RollVariant.SuperDisadvantage) {
            d20str = "3d20kl1";
        } else {
            throw new RollArgumentError(
                `Roll variant ${RollVariant[this._mode]} not supported`
            );
        }
        const mod_str =
            this.modifier > 0 ? `+${this.modifier}` :
            this.modifier < 0 ? this.modifier.toString() : "";
        return `${d20str}${mod_str}`;
    }

    public roll(mode: RollVariant = RollVariant.Normal): number {
        this._mode = mode;
        return super.roll();
    }

    public get result()
    {
        const d20s = this.rolls.get(20);
        const mod = this.rolls.get(1)[0];
        if (this._mode == RollVariant.Normal) {
            return d20s[0] + mod;
        } else if (this._mode == RollVariant.Advantage) {
            return Math.max(d20s[0], d20s[1]) + mod;
        } else if (this._mode == RollVariant.Disadvantage) {
            return Math.min(d20s[0], d20s[1]) + mod;
        } else if (this._mode == RollVariant.SuperAdvantage) {
            return Math.max(...d20s) + mod;
        } else if (this._mode == RollVariant.SuperDisadvantage) {
            return Math.min(...d20s) + mod;
        } else {
            throw new RollArgumentError(
                `Roll variant ${RollVariant[this._mode]} not supported`
            );
        }
    }
}


export class Rollable
    extends PrimitiveRollable
{
    private readonly baseDice: Map<Dice, number>;
    private readonly modifier: number;

    private _mode: RollVariant;

    public constructor(dice: Map<Dice, number>, rng: () => number = Math.random)
    {
        const baseDice = new Map();
        let mod = 0;
        for (const [die, count] of dice.entries()) {
            if (die == 1) {
                mod = count;
                continue;
            }
            dice.set(die, count * 2);
            baseDice.set(die, count);
        }
        super(dice, rng);
        this.baseDice = baseDice;
        this.modifier = mod;
    }

    public getRollString(): string
    {
        const baseRollString = PrimitiveRollable.generateRollString(this.baseDice);
        const mod_str =
            this.modifier > 0 ? `+${this.modifier}` :
            this.modifier < 0 ? this.modifier.toString() : "";
        if (this._mode == RollVariant.Critical) {
            return `(${baseRollString})&times;2${mod_str}`;
        } else {
            return `${baseRollString}${mod_str}`
        }
    }

    public roll(mode: RollVariant = RollVariant.Normal): number {
        this._mode = mode;
        return super.roll();
    }

    public get result()
    {
        if (this._mode == RollVariant.Normal) {
            let result = 0;
            for (const [dice, rolls] of this.rolls) {
                if (dice == 1) {
                    result += rolls[0];
                } else {
                    for (let i = 0; i < rolls.length / 2; i++) {
                        result += rolls[i];
                    }
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
    function easyRandom() {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    const pr1 = new PrimitiveRollable(new Map([[20, 1], [1, 5]]), easyRandom);
    console.assert(pr1.getRollString() == "1d20+5");
    pr1.roll();
    console.assert(pr1.result == 20, `Expected: 20, Rolled: ${pr1.result}`);
    pr1.roll();
    console.assert(pr1.result == 25, `Expected: 25, Rolled: ${pr1.result}`);

    const pr2 = new PrimitiveRollable(
        new Map([[100, -1], [12, 4], [8, 3], [1, -10]]), easyRandom
    );
    console.assert(pr2.getRollString() == "-1d100+4d12+3d8-10");
    pr2.roll();
    console.assert(pr2.result == 27);
    pr2.roll();
    console.assert(pr2.result == 16);

    const pr3 = new PrimitiveRollable(new Map([[8, 4]]));
    console.assert(pr3.getRollString() == "4d8");
    for (let i = 0; i < 100; i++) {
        pr3.roll();
        console.assert(pr3.result >= 4 && pr3.result <= 32);
    }

    const nr1 = new NatRollable(4, easyRandom);
    // nr1.debug = true;
    console.assert(nr1.getRollString() == "d20+4");
    console.assert(nr1.roll(RollVariant.SuperAdvantage) == 20);
    console.assert(nr1.getRollString() == "3d20kh1+4");
    try {
        nr1.roll(RollVariant.Critical);
        console.error("Roll argument error not thrown.");
    } catch (e) {
        console.assert(e instanceof RollArgumentError,
                       "Roll argument error not thrown.");
    }
    nr1.debug = false;

    const r1 = new Rollable(new Map([[6, 2]]), easyRandom);
    // r1.debug = true;
    console.assert(r1.getRollString() == "2d6");
    console.assert(r1.roll(RollVariant.Critical) == 13);
    console.assert(r1.result == 13);
    console.assert(r1.getRollString() == "(2d6)&times;2");
    r1.debug = false;

    const r2 = new Rollable(new Map([[4, 4], [1, -10]]), easyRandom);
    // r2.debug = true;
    console.assert(r2.getRollString() == "4d4-10");
    console.assert(r2.roll() == 1);
    r2.debug = false;

    console.log("Rollable tests performed.");
}
