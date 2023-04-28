import {Dice}                                 from "../common/diceConstants";
import {AdventurerClasses, AdventurerHitDice} from "./definitions/constants";

class NotImplementedError extends Error {}
class DuplicateInputError extends Error {}
class UnspecifiedInputError extends Error {}

interface IStatBlock {
    get cr(): number;
    get ac(): number;

    get hpDice(): Map<Dice, number>;
    get hpExpected(): number;
}

abstract class StatBlock
    implements IStatBlock
{
    private readonly _hpDice: Map<Dice, number>;

    public abstract get cr(): number;
    public abstract get ac(): number;
    public abstract get biologicalHpDice(): Map<Dice, number>;
    public abstract get adventurerLevels(): Map<AdventurerClasses, number>;

    constructor() {
        this._hpDice = new Map();
    }

    public refreshHp(): void {
        const hpDice = this._hpDice;
        for (const [die, count] of this.biologicalHpDice.entries()) {
            hpDice.set(die, count + (hpDice.get(die) ?? 0));
        }
        for (const [advClass, level] of this.adventurerLevels.entries()) {
            const die = AdventurerHitDice.get(advClass);
            hpDice.set(die, level + (hpDice.get(die) ?? 0));
        }
    }

    public get hpDice(): Map<Dice, number> {
        if (this._hpDice.size == 0) {
            this.refreshHp();
        }
        return this._hpDice;
    }

    public get hpExpected() {
        let hp = 0;
        for (const [die, count] of this.hpDice.entries()) {
            hp += (die + 1) / 2 * count;
        }
        return Math.round(hp);
    }
}

export class Monster
    extends    StatBlock
    implements IStatBlock
{
    private _cr = -1;
    private _ac = -1;

    constructor()
    {
        super();
        this._adventurerLevels = null;
    }

    private computeCR()
    {
        throw new NotImplementedError();
    }

    private computeAC()
    {
        throw new NotImplementedError();
    }

    public get ac(): number {
        return this._ac;
    }

    public get cr(): number {
        return this._cr;
    }

    private _adventurerLevels: Map<AdventurerClasses, number>;

    public set adventurerLevels(value: Map<AdventurerClasses, number>) {
        if (this._adventurerLevels != null) {
            throw new DuplicateInputError();
        }
        this._adventurerLevels = value;
    }

    public get adventurerLevels(): Map<AdventurerClasses, number> {
        if (this._adventurerLevels == null) {
            throw new UnspecifiedInputError();
        }
        return this._adventurerLevels;
    }

    public get biologicalHpDice(): Map<Dice, number> {
        throw new NotImplementedError();
    }
}
