import {SlotBase} from "./SlotBase";


/**
 * The slot for the dynamic buffer. It has variable size and autofills whenever
 * it is resized.
 */
export class DynamicBufferSlot
    extends SlotBase
{
    /**
     * The current size.
     */
    private _size;

    /**
     * CTOR.
     */
    public constructor()
    {
        super(true, 0);
        this._size = 0;
    }

    /**
     * This is never autofilled, nor is it ever crossed...
     * Instead, when size is set, the value is set to match.
     */
    protected get shouldAutofillOnFirstCross(): boolean
    {
        return false;
    }

    public reset(): void
    {
        super.reset();
        this._size = 0;
    }

    /**
     * Getter for size.
     */
    public get size()
    {
        return this._size;
    }

    /**
     * Setter for size. Does basic sanity checking and sets the value to full
     * too.
     */
    public set size(value)
    {
        if ((value - this.value) * (this.value) < 0) {
            throw new Error("New size set cannot fit the current value");
        }
        this._size = value;
        this._value = this._size;
    }
}
