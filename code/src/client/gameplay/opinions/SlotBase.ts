import {EQ} from "../common";


/**
 * The {@link BufferedAttitudeListBase} essentially comprises many of these
 * 'slots' which are filled one by one. The number of filled non-buffered slots
 * is the magnitude of the rating, and their total value is the value.
 */
export abstract class SlotBase
{
    /**
     * Whether this slot belongs to a buffer.
     */
    public readonly isBuffered: boolean;

    /**
     * Any delta applied to this buffer will first be modified by (added to)
     * this value. The leftover value, if non-zero, will have the modification
     * undone.
     */
    public readonly deltaModifier: number;

    /**
     * The current value of this buffer. Should be between 0 and {@link size}.
     */
    protected _value: number;

    private crossedBefore: boolean;

    /**
     * CTOR.
     */
    protected constructor(isBuffered, deltaModifier)
    {
        if (isBuffered && deltaModifier != 0) {
            throw new Error("A buffer shouldn't have a delta modifier.");
        }

        this.isBuffered = isBuffered;
        this.deltaModifier = deltaModifier;
        this._value = 0;
        this.crossedBefore = false;
    }

    /**
     * Adjust the value of this buffer by the given amount.
     *
     * @returns The amount left over after the adjustment.
     */
    public adjust(by: number): number
    {
        if (this.shouldAutofillOnFirstCross && !this.crossedBefore) {
            this.crossedBefore = true;
            this._value = this.size;
            return by;
        }
        const bySign = Math.sign(by);
        by += this.deltaModifier;

        // If the sign of the delta changes cause of the modifier, we don't want
        // to apply it. (since a good gesture can't cause negativity)
        if (bySign != Math.sign(by)) {
            return 0;
        }

        const oldValue = this._value;
        this._value += by;

        if (Math.sign(this.size) * this._value < 0) {
            this._value = 0;
        } else if (Math.abs(this._value) > Math.abs(this.size)) {
            this._value = this.size;
        }
        const consumedBy = this._value - oldValue;
        const leftoverBy = by - consumedBy;

        if (EQ(0, leftoverBy)) {
            return 0;
        }

        // If some by is leftover, undo the delta modifier.
        //
        // NOTE: WE HAVE TO BE SUPER CAREFUL ON THE CALLER END THAT THIS DOESN'T
        // PRODUCE MOTION ON THE OPPOSITE DIRECTION
        // eg. slots - (total: -6, current: -6, mod: +3)
        //             (total: -5, current: -5, mod: +1)
        //  now a delta of +4, empties the first slot then sends a -2 to the
        //  next. After the next mod it becomes a -1 (sign doesn't change). We
        //  do not want to add a -1 to this slot... but we won't,
        //  since here we'll get a -1 and after mod +2 which will cause a break.
        //
        // Whew, this worked out of the box, but good to verify it.
        return leftoverBy - this.deltaModifier;
    }

    /**
     * Resets the state of this buffer.
     */
    public reset()
    {
        this._value = 0;
        this.crossedBefore = false;
    }

    /**
     * The maximum (signed) capacity of this buffer.
     */
    protected abstract get size(): number;

    /**
     * For zone-buffers (which are the only fixed size buffers we have now), we
     * don't want to spend goodwill/negativity points to fill them the first
     * time they're reached. These are autofilled.
     *
     * They do require being filled any future times they are crossed though.
     * This is needed to prevent exploitation.
     */
    protected get shouldAutofillOnFirstCross(): boolean
    {
        return this.isBuffered;
    }

    /**
     * Getter for the current value.
     */
    public get value(): number
    {
        return this._value;
    }

    public get isFilled(): boolean
    {
        return EQ(this.value, this.size);
    }

    public get isEmpty(): boolean
    {
        return EQ(this.value, 0);
    }
}
