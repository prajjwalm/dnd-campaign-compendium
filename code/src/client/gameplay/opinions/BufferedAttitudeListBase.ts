import {EQ}                from "../../common/common";
import {DynamicBufferSlot} from "./DynamicBufferSlot";
import {FixedSizeSlot}     from "./FixedSizeSlot";


export abstract class BufferedAttitudeListBase
{
    private readonly posSlots: FixedSizeSlot[];

    private readonly negSlots: FixedSizeSlot[];

    private readonly dynamicBuffer: DynamicBufferSlot;

    protected constructor()
    {
        this.posSlots = [];
        this.negSlots = [];
        this.dynamicBuffer = new DynamicBufferSlot();
    }

    protected abstract getValueCapacityOfRating(rating: number): number;

    protected abstract getBufferCapacityOfZone(zone: number): number;

    protected abstract getDynamicBufferSizeForRating(rating: number): number;

    protected abstract getZoneDeltaOffset(zone: number): number;

    protected abstract get zoneCutoffs(): number[];

    protected abstract get maxRating(): number;

    public resetRatings()
    {
        this.dynamicBuffer.reset();
        if (this.posSlots.length > 0) {
            for (const posSlot of this.posSlots) {
                posSlot.reset();
            }
            for (const negSlot of this.negSlots) {
                negSlot.reset();
            }
            return;
        }

        let nextZoneIndex = 0;
        for (let rating = 1; rating <= this.maxRating; rating++) {
            // Only after the first positive slot is filled do we fill the first
            // positive zone buffer.
            const ratingSlotSize = this.getValueCapacityOfRating(rating);
            const zoneDeltaOffset = this.getZoneDeltaOffset(nextZoneIndex);

            this.posSlots.push(new FixedSizeSlot(ratingSlotSize,
                                                 false,
                                                 -zoneDeltaOffset));
            this.negSlots.push(new FixedSizeSlot(-ratingSlotSize,
                                                 false,
                                                 zoneDeltaOffset));

            if (nextZoneIndex < this.zoneCutoffs.length &&
                rating >= this.zoneCutoffs[nextZoneIndex])
            {
                const zoneBufferSlotSize =
                    this.getBufferCapacityOfZone(this.zoneCutoffs[nextZoneIndex]);
                this.posSlots.push(new FixedSizeSlot(zoneBufferSlotSize,
                                                     true,
                                                     0));
                this.negSlots.push(new FixedSizeSlot(-zoneBufferSlotSize,
                                                     true,
                                                     0));
                nextZoneIndex++;
            }
        }
        // Put an 'infinite' size slot at the end so that we don't ever exceed
        // the final rating.
        this.posSlots.push(new FixedSizeSlot(0xffffff, false, 0));
        this.negSlots.push(new FixedSizeSlot(-0xffffff, false, 0));
    }

    /**
     * @param delta The amount to adjust.
     * @param isNatualDecay When true, the movement is expected to be towards
     *                      zero, and we do not cross zero or a zone boundary.
     * @param days If specified, the number of days this (timeskip) adjustment
     *             spans.
     */
    public adjustValue(delta: number,
                       isNatualDecay: boolean = false,
                       days?: number)
    {
        // Basic sanity checks.
        console.assert(this.posSlots[0].value * this.negSlots[0].value == 0);

        if (delta == 0) {
            return;
        }

        // First get rid of the signs.
        const existingDirection =
            Math.sign(this.posSlots[0].value + this.negSlots[0].value);
        const deltaDirection = Math.sign(delta);

        const isIncreasing = existingDirection * deltaDirection >= 0;
        let forwardSlots: FixedSizeSlot[];
        let reverseSlots: FixedSizeSlot[];
        if (existingDirection > 0) {
            forwardSlots = this.posSlots;
            reverseSlots = this.negSlots;
        } else if (existingDirection < 0) {
            forwardSlots = this.negSlots;
            reverseSlots = this.posSlots;
        } else {
            forwardSlots = deltaDirection > 0 ? this.posSlots : this.negSlots;
            reverseSlots = deltaDirection > 0 ? this.negSlots : this.posSlots;
        }

        // First fill/empty the dynamic buffer, assuming this isn't natural
        // decay.
        if (!isNatualDecay) {
            delta = this.dynamicBuffer.adjust(delta);
        } else {
            // If this is natural decay, there's very little interaction. It
            // means the dynamic buffer would fill naturally bit-by-bit. This
            // doesn't affect the by at all.
            // todo: work on this better
            if (days) {
                this.dynamicBuffer.adjust(Math.sign(this.dynamicBuffer.size) * days * 0.1);
            }
        }

        // If this itself consumes all the delta, do nothing more.
        if (delta == 0) {
            return;
        }

        if (isIncreasing) {
            // Find the highest non-full forward slot.
            let slotIdx;
            for (slotIdx = 0; slotIdx < forwardSlots.length; slotIdx++) {
                if (!forwardSlots[slotIdx].isFilled) {
                    break;
                }
            }

            // Now keep on filling until we can't anymore. (Note this approach
            // automatically handles zone buffers.)
            let filledSomething = false;
            for (let i = 0; i < 100; i++) {
                delta = forwardSlots[slotIdx].adjust(delta);
                if (!forwardSlots[slotIdx].isFilled) {
                    break;
                }
                filledSomething = true;
                this.dynamicBuffer.size = this.getDynamicBufferSizeForRating(
                    this.rating);
                slotIdx++;
            }

            if (filledSomething) {
                this.dynamicBuffer.size =
                    this.getDynamicBufferSizeForRating(this.rating);
            }
        } else {
            // Find the highest non-empty forward slot.
            let slotIdx;
            for (slotIdx = 0; slotIdx < forwardSlots.length; slotIdx++) {
                if (forwardSlots[slotIdx].isEmpty) {
                    slotIdx--;
                    break;
                }
            }

            // Now keep on emptying until we can't anymore.
            for (let i = 0; i < 100; i++) {
                if (slotIdx < 0) {
                    break;
                }

                if (isNatualDecay && forwardSlots[slotIdx].isBuffered) {
                    // Nothing more to do if we've reached a zone buffer
                    // in natural decay.
                    return;
                }

                delta = forwardSlots[slotIdx].adjust(delta);
                if (!forwardSlots[slotIdx].isEmpty) {
                    break;
                }
                slotIdx--;
            }

            // If we still have delta left, then it means we've exhausted all
            // forward slots. Start filling up the reverse ones then.
            if (EQ(delta, 0)) {
                return;
            }

            console.assert(forwardSlots[0].isEmpty, "My logic failed badly.");

            if (isNatualDecay) {
                // Nothing more to do if we've reached zero in natural decay.
                return;
            }

            // Fill reverse slots as above.
            let filledSomething = false;
            slotIdx = 0;
            for (let i = 0; i < 100; i++) {
                delta = reverseSlots[slotIdx].adjust(delta);
                if (!reverseSlots[slotIdx].isFilled) {
                    break;
                }
                slotIdx++;
                filledSomething = true;
            }

            if (filledSomething) {
                this.dynamicBuffer.size =
                    this.getDynamicBufferSizeForRating(this.rating);
            }
        }
    }

    public get rating()
    {
        const havePosValues = this.posSlots[0].value > 0;
        const haveNegValues = this.negSlots[0].value < 0;

        if (haveNegValues && havePosValues) {
            throw new Error("both positive and negative buffers filled");
        }

        if (!haveNegValues && !havePosValues) {
            return 0;
        }

        const slots = havePosValues ? this.posSlots : this.negSlots;

        let sgn = havePosValues ? 1 : -1;

        let filled = 0;
        for (const ratingValue of slots) {
            if (!ratingValue.isFilled) {
                // They fill as a stack, one less than max implies all the ones
                // after it are zero.
                break;
            }
            if (ratingValue.isBuffered) {
                continue;
            }
            filled++;
        }
        return sgn * filled;
    }

    public get value()
    {
        let total = 0;
        for (const ratingValue of this.posSlots) {
            if (ratingValue.isBuffered) {
                continue;
            }
            total += ratingValue.value;
            if (ratingValue.value < ratingValue.size) {
                break;
            }
        }
        for (const ratingValue of this.negSlots) {
            if (ratingValue.isBuffered) {
                continue;
            }
            total += ratingValue.value;
            if (ratingValue.value > ratingValue.size) {
                break;
            }
        }
        return total;
    }

    public get bufferedValue()
    {
        let total = this.dynamicBuffer.value;
        for (const ratingValue of this.posSlots) {
            if (!ratingValue.isBuffered) {
                continue;
            }
            total += ratingValue.value;
        }
        for (const ratingValue of this.negSlots) {
            if (!ratingValue.isBuffered) {
                continue;
            }
            total += ratingValue.value;
        }
        return total;
    }

    get zone()
    {
        const rating = this.rating;

        const ratingMag = Math.abs(rating);
        const ratingSgn = Math.sign(rating);
        let r = 0;
        for (const zoneCutoff of this.zoneCutoffs) {
            if (zoneCutoff > ratingMag) {
                break;
            }
            r++;
        }
        return r * ratingSgn;
    }
}
