import {D1, D100, D12, D20, D4, D6, D8, Dice, RollVariant} from "./diceConstants";


export class RollArgumentError
    extends Error
{
    constructor(msg: string) {
        super(msg);
    }
}

interface IRollable
{
    getRollString(bindRollable): string;
    roll(mode?: RollVariant): void;
    get parts(): Map<Dice, number[]>;
    get result(): number;
}

export class PrimitiveRollable
    implements IRollable
{
    private static lastUsedUid: number = 0;
    private static readonly ALL_ROLLABLES: Map<number, IRollable> = new Map();

    public static getRollableForUid(uid: number): IRollable {
        return this.ALL_ROLLABLES.get(uid);
    }

    protected static registerRollable(rollable: IRollable): number {
        const uid = this.lastUsedUid++;
        this.ALL_ROLLABLES.set(uid, rollable);
        return uid;
    }

    protected readonly uid: number;
    protected readonly dice: Map<Dice, number>;
    protected readonly rolls: Map<Dice, number[]> = new Map();
    private _debug: boolean;

    public constructor(dice: Map<Dice, number>,
                       private readonly rng: () => number = Math.random)
    {
        this.dice = new Map(
            [...dice.entries()].sort((a, b) => { return b[0].sides - a[0].sides;})
        );
        this._debug = false;
        this.uid = PrimitiveRollable.registerRollable(this);
    }

    protected static generateRollString(dice: Map<Dice, number>, sort: boolean = true)
    {
        let rollString = "";
        if (sort) {
            dice = new Map(
                [...dice.entries()].sort((a, b) => { return b[0].sides - a[0].sides;})
            );
        }
        for (const [die, count] of dice.entries()) {
            if (count == 0) {
                continue;
            }
            const sign = count > 0 ? (rollString.length == 0 ? "" : "+") : "-";
            const diceStr = die.sides > 1 ? `d${die.sides}` : "";
            // Important note: count needn't be an integer. CC buffs rely on
            // that to stack together properly.
            rollString += `${sign}${Math.abs(Math.round(count))}${diceStr}`
        }
        return rollString;
    }

    public getRollString(bindRollable)
    {
        return PrimitiveRollable.generateRollString(this.dice);
    }

    public roll(): void
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
                const roll = this.rollDie(die) * Math.sign(count);
                if (this._debug) {
                    console.log(die, roll);
                }
                this.rolls.get(die).push(roll);
            }
        }
    }

    private rollDie(d: Dice)
    {
        return Math.floor(this.rng() * d.sides) + 1;
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

    public get parts(): Map<Dice, number[]> {
        return this.rolls;
    }
}


export class NatRollable
    extends    PrimitiveRollable
    implements IRollable
{
    private _mode: RollVariant;
    private readonly _parts: Map<Dice, number[]> = new Map();


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

    protected constructor(private readonly modifier: number,
                          rng: () => number = Math.random)
    {
        super(new Map([[D20, 3], [D1, Math.round(modifier)]]), rng);
        this._mode = RollVariant.Normal;
    }

    public getRollString(bindRollable): string {
        // let d20str;
        // if (this._mode == RollVariant.Normal) {
        //     d20str = "d20";
        // } else if (this._mode == RollVariant.Advantage) {
        //     d20str = "2d20kh1";
        // } else if (this._mode == RollVariant.Disadvantage) {
        //     d20str = "2d20kl1";
        // } else if (this._mode == RollVariant.SuperAdvantage) {
        //     d20str = "3d20kh1";
        // } else if (this._mode == RollVariant.SuperDisadvantage) {
        //     d20str = "3d20kl1";
        // } else {
        //     throw new RollArgumentError(
        //         `Roll variant ${RollVariant[this._mode]} not supported`
        //     );
        // }
        // const mod_str =
        //     this.modifier > 0 ? `+${this.modifier}` :
        //     this.modifier < 0 ? this.modifier.toString() : "";
        //
        // return `${d20str}${mod_str}`;

        let baseRollable: string = (this.modifier >= 0 ? "+" : "") + this.modifier;
        if (!bindRollable) {
            return baseRollable;
        }
        return `<span class="rollable to_hit" data-rollable-uid="${this.uid}">${baseRollable}</span>`;
    }

    public roll(mode: RollVariant = RollVariant.Normal): void {
        if (mode == RollVariant.Critical) {
            throw new RollArgumentError("");
        }
        this._mode = mode;
        super.roll();
    }

    public get result(): number
    {
        const d20s = this.rolls.get(D20);
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

    public get parts(): Map<Dice, number[]> {
        return this._parts.size == 0 ? super.parts : this._parts;
    }
}


export class Rollable
    extends    PrimitiveRollable
    implements IRollable
{
    private readonly baseDice: Map<Dice, number>;
    private readonly modifier: number;

    private readonly _parts: Map<Dice, number[]> = new Map();

    private _mode: RollVariant;

    public constructor(dice: Map<Dice, number>, rng: () => number = Math.random)
    {
        const baseDice = new Map();
        let mod = 0;
        for (const [die, count] of dice.entries()) {
            if (die == D1) {
                mod = Math.round(count);
                continue;
            }
            dice.set(die, Math.round(count) * 2);
            baseDice.set(die, Math.round(count));
        }
        super(dice, rng);
        this.baseDice = baseDice;
        this.modifier = mod;
    }

    public getRollString(bindRollable): string
    {
        const baseRollString = PrimitiveRollable.generateRollString(this.baseDice);
        const mod_str =
            this.modifier > 0 ? `+${Math.round(this.modifier)}` :
            this.modifier < 0 ? Math.round(this.modifier).toString() : "";

        let s: string = `${baseRollString}${mod_str}`;
        if (!bindRollable) {
            return s
        }
        return `<span class="rollable" data-rollable-uid="${this.uid}">${s}</span>`;
    }

    public roll(mode: RollVariant = RollVariant.Normal): void {
        this._mode = mode;
        super.roll();
    }

    public get result()
    {
        this._parts.clear();
        if (this._mode == RollVariant.Normal) {
            let result = 0;
            for (const [dice, rolls] of this.rolls) {
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

    public get parts(): Map<Dice, number[]> {
        return this._parts.size == 0 ? super.parts : this._parts;
    }
}


export function enableRolling()
{
    const $toastZone = $("#toast-container");

    $("#beastiary").on("click", ".rollable", function (e) {
        const uid = $(this).data("rollableUid");
        const rollable = PrimitiveRollable.getRollableForUid(uid);

        let rollVariant = RollVariant.Normal;
        if (rollable instanceof NatRollable) {
            if (e.shiftKey) {
                rollVariant = e.altKey ? RollVariant.SuperAdvantage : RollVariant.Advantage;
            }
            else if (e.ctrlKey) {
                rollVariant = e.altKey ? RollVariant.SuperDisadvantage : RollVariant.Disadvantage;
            }
        } else if (rollable instanceof Rollable) {
            if (e.altKey) {
                rollVariant = RollVariant.Critical;
            }
        }

        rollable.roll(rollVariant);

        console.log(rollable.result);

        const buildupParts = [];
        for (const [dice, rolls] of rollable.parts.entries())
        {
            if (dice == D1) {
                continue;
            }
            for (const roll of rolls) {
                buildupParts.push(roll);
            }
        }

        console.log(buildupParts);
        const $toast = $(`
            <div class="toast">
                <div class="roll_result">${rollable.result}</div>
                <div class="roll_buildup">${buildupParts.join(", ")}</div>
            </div>`);

        $toast.hide();
        $toast.appendTo($toastZone);
        $toast.fadeIn(400);
        setTimeout(() => {
            $toast.fadeOut(400, () => {
                $toast.remove();
            });
        }, 3000);
    });
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

    const pr1 = new PrimitiveRollable(new Map([[D20, 1], [D1, 5]]), easyRandom);
    console.assert(pr1.getRollString(false) == "1d20+5");
    pr1.roll();
    console.assert(pr1.result == 20, `Expected: 20, Rolled: ${pr1.result}`);
    pr1.roll();
    console.assert(pr1.result == 25, `Expected: 25, Rolled: ${pr1.result}`);

    const pr2 = new PrimitiveRollable(
        new Map([[D100, -1], [D12, 4], [D8, 3], [D1, -10]]), easyRandom
    );
    console.assert(pr2.getRollString(false) == "-1d100+4d12+3d8-10");
    pr2.roll();
    console.assert(pr2.result == 27);
    pr2.roll();
    console.assert(pr2.result == 16);

    const pr3 = new PrimitiveRollable(new Map([[D8, 4]]));
    console.assert(pr3.getRollString(false) == "4d8");
    for (let i = 0; i < 100; i++) {
        pr3.roll();
        console.assert(pr3.result >= 4 && pr3.result <= 32);
    }

    const nr1 = NatRollable.generate(4, easyRandom);
    // nr1.debug = true;
    console.assert(nr1.getRollString(false) == "+4");
    nr1.roll(RollVariant.SuperAdvantage);
    console.assert(nr1.result == 20);
    console.assert(nr1.getRollString(false) == "+4");
    try {
        nr1.roll(RollVariant.Critical);
        console.error("Roll argument error not thrown.");
    } catch (e) {
        console.assert(e instanceof RollArgumentError,
                       "Roll argument error not thrown.");
    }
    nr1.debug = false;

    const r1 = new Rollable(new Map([[D6, 2]]), easyRandom);
    // r1.debug = true;
    console.assert(r1.getRollString(false) == "2d6");
    r1.roll(RollVariant.Critical);
    console.assert(r1.result == 13);
    console.assert(r1.getRollString(false) == "2d6");
    r1.debug = false;

    const r2 = new Rollable(new Map([[D4, 4], [D1, -10]]), easyRandom);
    // r2.debug = true;
    console.assert(r2.getRollString(false) == "4d4-10");
    r2.roll();
    console.assert(r2.result == 1);
    r2.debug = false;

    console.log("Rollable tests performed.");
}
