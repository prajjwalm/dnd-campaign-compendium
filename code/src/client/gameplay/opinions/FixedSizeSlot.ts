import {SlotBase} from "./SlotBase";


/**
 * Slots with a fixed size. This is most of them.
 */
export class FixedSizeSlot
    extends SlotBase
{
    /**
     * CTOR.
     */
    public constructor(public readonly size,
                       isBuffered,
                       deltaModifier)
    {
        super(isBuffered, deltaModifier);
    }
}


export function testSlot(): void
{
    const slot = new FixedSizeSlot(7, false, -2);
    const revSlot = new FixedSizeSlot(-7, false, 2);

    function testAssert(slot, adjustment, value, expectedLeftover) {
        const leftover = slot.adjust(adjustment);
        console.assert(slot.value == value,
                       `(Adju ${adjustment}) Expected value ${value}, Got ${slot.value}`);
        console.assert(leftover == expectedLeftover,
                       `(Adju ${adjustment}) Expected leftover ${expectedLeftover}, Got ${leftover}`);
    }

    testAssert(slot,     0,  0,  0);
    testAssert(slot,    -1,  0, -1);
    testAssert(slot,     1,  0,  0);
    testAssert(slot,     5,  3,  0);
    testAssert(slot,    -1,  0,  0);
    testAssert(slot,     7,  5,  0);
    testAssert(slot,     7,  7,  5);
    testAssert(slot,    -6,  0,  1); // double check if this is good behaviour.
    testAssert(revSlot,  0,  0,  0);
    testAssert(revSlot,  1,  0,  1);
    testAssert(revSlot, -1,  0,  0);
    testAssert(revSlot, -5, -3,  0);
    testAssert(revSlot,  1,  0,  0);
    testAssert(revSlot, -7, -5,  0);
    testAssert(revSlot, -7, -7, -5);
    testAssert(revSlot,  6,  0, -1);
}