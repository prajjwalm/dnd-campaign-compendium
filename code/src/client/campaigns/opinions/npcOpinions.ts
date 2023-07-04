/**
 * # Notes on emotion modeling
 *
 * ## On the choice of emotions
 *
 * 1. Positive and Negative emotions of the same numerical value are opposites
 *    that (usually) don't co-exist.
 *
 * 2. The zeroth emotion, affection, can be considered a kind of summary. It
 *    encompasses the feeling of happiness when in someone's presence. Of
 *    affection, warmth, fondness etc. In this model, we also subsume empathy
 *    within this - since all three envy, paranoia and contempt would kill it
 *    as they promote its opposite, coldness. That is also the case with love
 *    itself. No model can capture the complexity of human relationships
 *    perfectly, so an approximation must suffice. Approximating empathy as a
 *    form of love, in the absence of stronger feelings.
 *
 *    + I am uncertain if affection emerges in an absence of gratitude, trust or
 *      respect - but can maybe consider a light-hearted person feeling pleasant
 *      for a jovial character even in the absence of all that. Or maybe a grave
 *      person for someone who has been suffering? Or even a grave person for a
 *      jovial character, why not. This kind of does fall into the brackets of
 *      respect or empathy though. For the sake of empathy, I'll say the base
 *      metric too can be directly modified, though it should be rare.
 *
 * 3. Unlike these, emotions like respect and envy can co-exist for a while
 *    before one suffocates the other. Likewise, respect and fear. Or even say
 *    envy and trust.
 *
 * 4. On that note, fear is considered a part of paranoia, i.e. the form which a
 *    lack of trust takes when the opposing party is much more powerful than the
 *    self.
 *
 *
 * ## Short-term vs long-term
 *
 * 1. A person's attitude towards someone typically doesn't change instantly,
 *    except in extreme cases. Unlike say, their mood towards them.
 *
 * 2. An attitude changes on reflection, on "going over the events of the day",
 *    to speak. It depends on how strong an influence that event had when
 *    compared to everything else. A person who say hangs out with groups of
 *    five people every day probably won't think that much of a happy event they
 *    had with one person on a Friday. But if that same thing transpired
 *    between two people who rarely see others and who hung out together a while
 *    ago, it could very well leave a lasting impression.
 *
 * 3. That's easy to model - a fraction of a constant attitude delta is divided
 *    between the various moods felt during the week at the end of the week or
 *    something. That delta indicates how impressionable a person is on that
 *    regard.
 *
 * 4. It is possible that a person develops 'resistance' to a certain emotion,
 *    when they feel it all around themselves - in that case, they'd be
 *    particularly vulnerable to it's opposite...
 *
 *
 * Note that as a V1 model, I will not be distinguishing between short-term mood
 * and long-term attitude at least in interpersonal relationships. I can
 * roleplay short-term mood as the need arises in this case. It is unlikely I'll
 * need a reminder of that as compared to the long-term attitude.
 *
 * ## Learning
 *
 * 1. An advanced NPC AI might view high charisma with suspicion as they might
 *    figure out that you can't be good at deception without being highly
 *    charismatic. That sort of learning is out of the scope of this module at
 *    least - and I will mimic it by manually adjusting the effect's magnitude
 *    appropriately.
 *
 * ## UI
 *
 * One thing I don't like about many games I played is that you literally know
 * the inside of minds of npcs (looking at you Stardew Valley, thanks for letting
 * me know exactly when a person is likely to accept my proposal so that I never,
 * ever get rejected or taken by surprise).
 *
 * So I'm going to tweak things here a bit - the players won't get the full
 * information in the system (unless they look for it in the code lol, but I'm
 * not investing in security/backend for a dnd website) - but instead only as
 * much as the charisma of the highest character allows. That means they'll be
 * getting a range/density of values.
 *
 * This range will also be influenced by how the character wants themselves to
 * be perceived. But the ratio of that will drop
 *
 * But how do I render a range?
 *   + as a +/- error?
 *   + visually like a bar or something?
 *   + a color gradient? speaking of - do we also want to display the three
 *     components as a gradient in the summary? A color triangle sorta thing?
 *      (nah that would require webGL)
 *   + as a boundary? with the number in the center?
 *
 * Well for now I'll worry about this as I develop, no harm in handing out the
 * values directly this early in the campaign.
 */

import {getEnumIterator}        from "../../common/common";
import {PARTY_INSIGHT, PcIndex} from "../../data/pcIndex";
import {NpcId}                  from "../../npcs/npcIndex";
import {GameTimestamp}          from "../common";


export enum PositiveEmotion {
    Affection,
    Gratitude,
    Trust,
    Respect
}


export const NegativeEmotion = new Map([
    [PositiveEmotion.Affection, "Hatred"],
    [PositiveEmotion.Gratitude, "Envy"],
    [PositiveEmotion.Trust, "Paranoia"],
    [PositiveEmotion.Respect, "Contempt"],
]);


interface RenderableEvent
{
    get startTime(): GameTimestamp;
    get eventDesc(): string;
}


export class NpcInteractionEvent
    implements RenderableEvent
{
    public constructor(
        public readonly timestamp: GameTimestamp,
        public readonly displayText: string,
        public readonly effects: Map<PositiveEmotion, number>,
        public readonly insightGate: number = 10,
        public readonly renderReverse: Map<PositiveEmotion, boolean> = null
    )
    { }

    public get eventDesc()
    {
        let insightLock;
        if (this.insightGate <= 10) {
            insightLock = "";
        }
        else if (this.insightGate <= PARTY_INSIGHT) {
            insightLock = `<div class='insight_lock--unlocked'><i class="fa-solid fa-unlock"></i>${this.insightGate}</div>`;
        }
        else {
            insightLock = `<div class='insight_lock--locked'><i class="fa-solid fa-lock"></i>${this.insightGate}</div>`;
        }

        if (this.insightGate > PARTY_INSIGHT) {
            return `<div class='event_li'>
                    <div class="timestamp">${this.timestamp.toString()}</div>
                    <div class="effect_tags">${insightLock}</div>
                  </div>`;
        }
        const effectTags = [];
        for (const [emotion, value] of this.effects.entries()) {
            if (value == 0) {
                continue;
            }
            const zone = getZone(value);

            let effect: string;
            let emotionStr: string;
            if (this.renderReverse == null || this.renderReverse.get(emotion) != true) {
                effect = zone == -1 ? "-" : "+".repeat(Math.abs(zone));
                emotionStr = zone < -1 ? NegativeEmotion.get(emotion) : PositiveEmotion[emotion];
            } else {
                effect = zone == -1 ? "+" : "-".repeat(Math.abs(zone));
                emotionStr = zone >= -1 ? NegativeEmotion.get(emotion) : PositiveEmotion[emotion];
            }

            const emotionColor = zone < 0 ? NegativeEmotion.get(emotion) : PositiveEmotion[emotion];
            effectTags.push(`<div class="effect_tag" data-emo="${emotionColor}">${emotionStr}${effect}</div>`);
        }
        return `<div class='event_li'>
                    <div class="timestamp">${this.timestamp.toString()}</div>
                    <div class="display_text">${this.displayText}</div>
                    <div class="effect_tags">${insightLock} ${effectTags.join("")}</div>
                  </div>`;
    }

    public get startTime(): GameTimestamp
    {
        return this.timestamp;
    }
}


export class TimeskipEvent
    implements RenderableEvent
{
    public constructor(
        public readonly startTime: GameTimestamp,
        public readonly endTime: GameTimestamp,
        public readonly ambientInteraction: Map<PositiveEmotion, number>
    )
    {}

    public get eventDesc()
    {
        if (this.ambientInteraction.size == 0) {
            return `<div class="timeskip_li">
                        The time between ${this.startTime.toString()} and 
                        ${this.endTime.toString()} passed with minimal/no
                        interaction.
                    </div>`
        }
        const $interactions = [];
        for (let [emotion, val] of this.ambientInteraction.entries()) {
            if (EQ(val, 0)) {
                continue;
            }
            const emotionString =
                val < -0.05 ? NegativeEmotion.get(emotion) : PositiveEmotion[emotion];
            if (val < -0.05) {
                val = -val;
            }
            if (val < 0) {
                $interactions.push(
                    `<div class="timeskip__emotion_desc">${emotionString} eroded slightly.</div>`
                );
            } else if (val < 0.05) {
                $interactions.push(
                    `<div class="timeskip__emotion_desc">${emotionString} increased slightly.</div>`
                );
            } else if (val < 0.15) {
                $interactions.push(
                    `<div class="timeskip__emotion_desc">${emotionString} increased moderately.</div>`
                );
            } else {
                $interactions.push(
                    `<div class="timeskip__emotion_desc">${emotionString} increased significantly.</div>`
                );
            }
        }
        return `<div class="interactions_list__item timeskip">
                    The time between 
                    <span class="timeskip__time">${this.startTime.toString()}</span> and 
                    <span class="timeskip__time">${this.endTime.toString()}</span> passed with the following notable 
                    ambient interaction for each day of the duration -
                    ${$interactions.join()}
                </div>`;
    }
}


interface IAttitudeHandler
{
    ambientInteraction: number;

    /**
     * Updates the internal timestamp to the given value, applying forgetfulness
     * if supported. Will throw an error if it is less than the current
     * timestamp.
     */
    incrementTimeTo(finalTime: GameTimestamp): void;

    /**
     * Records an event that produced the given delta to the attitude handler.
     */
    addEvent(eventValueDelta: number, eventTime?: GameTimestamp): void;

    /**
     * Returns an integer in [-10, 10] that tells of how much of this 'attitude'
     * is felt.
     */
    get rating(): number;

    /**
     * Returns the current timestamp.
     */
    get timestamp(): GameTimestamp;
}


/**
 * Interface for a test attitude handler object intended for debugging in
 * testcases.
 */
interface ITestAttitudeHandler
    extends IAttitudeHandler
{
    /**
     * Fully resets the state of the AttitudeHandler.
     */
    testReset(): void;

    /**
     * Returns the current value of the attitude which may be any number. The
     * rating is a function (in the mathematical sense) of this.
     */
    get value(): number;
}


/**
 * Returns the zone the rating belongs to. This zone is used while rendering,
 * i.e. it is shown on the site, hence the export.
 *
 * It may be also used to influence forgetfulness and forgiveness. For the latter,
 * it may be used to determine buffers while for the former it acts as a barrier.
 * That's why it can't be on the rendering code either.
 */
function getZone(rating: number)
{
    return Math.sign(rating) * Math.floor((Math.abs(rating) + 2) / 3);
}


/**
 * Objects of this class store the state of how one particular NPC feels towards
 * another character in regard to a specific attitude at a given point of time.
 *
 * This is relic code, I wrote it when I was still figuring out what I wanted,
 * and so it grew in an unruly manner. Use {@link AttitudeHandler} for any actual
 * use-cases, for that was written in a much more organized manner when I knew
 * what was to be done. It also has test-coverage. As far as this is concerned,
 * I just keep it around as a reminder of the 1st gen logic, and in case I need
 * to fall back in an emergency. (The relevance of both points is enough that I
 * don't want to fall back to git for this yet.)
 */
class OldAttitudeHandler
    implements IAttitudeHandler,
               ITestAttitudeHandler
{
    /**
     * The attitude values can be divided into ratings as -
     *
     * <pre>
     *     -7   -3   0   3    7    12     18      25
     * ... -+----+---+---+----+-----+------+-------+- ...
     *     -2   -1   0   1    2     3      4       5
     *      |                 |                    |
     * ... -+---- zone 0 -----+------ zone 1 ------+- ...
     * </pre>
     *
     * So say an (internal) attitude value of 19.25 would be exposed as a rating
     * of 4, while a value of -4 would be exposed as a rating of -1. This rating
     * is all the outside world gets from this class. {@link C} below is the
     * constant such that going from rating R to R + 1 takes a value increase of
     * C + R with R >= 0.
     */
    private static readonly C = 3;

    /**
     * The absolute value of the maximum rating possible (note: value can extend
     * beyond this.)
     */
    private static readonly MAX_RATING = 10;

    /**
     * The values at which we hit positive ratings.
     */
    private static readonly VALUE_AT_RATINGS: number[] =
        [...Array(11).keys()].map(r => OldAttitudeHandler.getCutoffValueForRating(r));

    /**
     * The attitude rating at which zones are cut. This is mirrored for negative
     * values.
     *
     * NOTE! This is redundant info along with {@link getZone}.
     */
    private static readonly ZONE_CUTOFF_RATINGS = [0, 1, 4, 7];

    // All three constants below could potentially be made NPC specific.

    /**
     * While adjusting the value, an event of the same (opposite) direction is
     * considered decreased (increased) by this modifier, to a minimum of zero.
     *
     * This is indexed by zone.
     */
    private static readonly ZONE_VALUE_MODIFIERS = [0, 0, 1, 3];

    /**
     * While adjusting the buffer, an event of the same (opposite) direction is
     * considered decreased (increased) by this modifier, to a minimum of zero.
     *
     * This is indexed by zone.
     *
     * For now, this is zeroes as I need more thought on how to implement this.
     * Say you really trust someone, and have room in your heart to forgive them,
     * should you be madder for a longer or shorter time when they do something
     * to shake that trust just a bit than if you had just begun to know them?
     * Should the buffer for forgiveness in your heart be easier or harder to
     * fill on a wound than when you barely know a person?
     *
     * As I can find arguments for both positive and negative numbers, I keep
     * them all zeroes for now. Maybe this is something I want to make NPC
     * specific?
     */
    private static readonly ZONE_BUFFER_MODIFIERS = [0, 0, 0, 0];

    /**
     * The rate at which the value falls towards zero given the zone.
     */
    private static readonly ZONE_DECAY_RATES = [1, 0.5, 0.25, 0.125];

    private static getCutoffValueForRating(r0: number)
    {
        const r = Math.abs(r0);
        return Math.sign(r0) * (r * (OldAttitudeHandler.C + (r - 1) / 2));
    }

    /**
     * Which emotion does this object deal with.
     */
    private readonly emotion: PositiveEmotion;

    /**
     * What's the current time as per this object's state.
     */
    private _timestamp: GameTimestamp;

    /**
     * What's the current value of this attitude.
     */
    private _value: number;

    /**
     * What's the current buffer value of this attitude.
     */
    private _bufferValue: number;

    public ambientInteraction: number;

    /**
     * CTOR.
     */
    public constructor(emotion: PositiveEmotion)
    {
        this.emotion = emotion;
        this._timestamp = new GameTimestamp();
        this._value = 0;
        this._bufferValue = 0;
    }

    public incrementTimeTo(finalTime: GameTimestamp): void
    {
        if (finalTime.totalMillis < this.timestamp.totalMillis) {
            throw new Error("Cannot go backwards in time.");
        }

        const sgn = Math.sign(this._value);
        const days = finalTime.totalDays - this._timestamp.totalDays;

        const zoneCutoffAbsValue =
            OldAttitudeHandler.getCutoffValueForRating(
                OldAttitudeHandler.ZONE_CUTOFF_RATINGS[Math.abs(getZone(this.rating))]
            );

        // Decay will never cause a zone shift. (note the clever 0 handing)
        this._value -= sgn * this.getDailyDecay() * days;
        if (sgn * this._value <= zoneCutoffAbsValue) {
            this._value = zoneCutoffAbsValue * sgn;
        }

        // The buffer extrema would be as per the new rating. The setter ensures
        // the increase doesn't exceed the extrema.
        this.bufferValue += sgn * days;

        this._timestamp = finalTime;
    }

    /**
     * Clears the entire state. Useful for testcases.
     */
    public testReset()
    {
        this._bufferValue = 0;
        this._value = 0;
        this._timestamp = new GameTimestamp();
    }

    public addEvent(eventValueDelta: number, eventTime: GameTimestamp)
    {
        this.incrementTimeTo(eventTime);
        const deltaSgn = Math.sign(eventValueDelta);

        while (deltaSgn * eventValueDelta > 0) {

            const zoneMag = Math.abs(getZone(this.rating));
            const startR = this.rating;

            let bufferModifiedEventValueDelta =
                eventValueDelta
                - Math.sign(this._value) * OldAttitudeHandler.ZONE_BUFFER_MODIFIERS[zoneMag];
            if (bufferModifiedEventValueDelta * deltaSgn < 0) {
                bufferModifiedEventValueDelta = 0;
            }

            // The buffer is filled/emptied first.
            const oldBufferValue = this.bufferValue;
            this.bufferValue += bufferModifiedEventValueDelta;

            eventValueDelta -= (this.bufferValue - oldBufferValue);

            let valueModifiedEventValueDelta =
                eventValueDelta
                - Math.sign(this._value) * OldAttitudeHandler.ZONE_VALUE_MODIFIERS[zoneMag];
            if (valueModifiedEventValueDelta * deltaSgn < 0) {
                valueModifiedEventValueDelta = 0;
            }

            // Find the maximum we can move the value to until we hit the next
            // block. Damn this is getting ugly, and with the amount of logic here,
            // it should be a separate class.
            let maxMove;
            if (Math.sign(eventValueDelta) == Math.sign(this._value) &&
                Math.abs(this._value) > OldAttitudeHandler.VALUE_AT_RATINGS[OldAttitudeHandler.MAX_RATING])
            {
                maxMove = 1_000_000;
            } else {
                // Taking advantage that maxMove is always an unsigned qty. and
                // identical for symmetric positive/negative values.
                const absRating = Math.abs(this.rating);
                const absVal = Math.abs(this._value);

                if (Math.sign(eventValueDelta) == Math.sign(this._value)) {
                    maxMove = OldAttitudeHandler.VALUE_AT_RATINGS[absRating + 1] - absVal;
                } else {
                    if (absVal == OldAttitudeHandler.VALUE_AT_RATINGS[absRating]) {
                        if (this._value == 0) {
                            maxMove = OldAttitudeHandler.VALUE_AT_RATINGS[1];
                        } else {
                            maxMove = absVal - OldAttitudeHandler.VALUE_AT_RATINGS[absRating - 1];
                        }
                    } else {
                        maxMove = absVal - OldAttitudeHandler.VALUE_AT_RATINGS[absRating];
                    }
                }
            }

            const movedAmount = Math.sign(valueModifiedEventValueDelta) *
                                Math.min(maxMove, Math.abs(valueModifiedEventValueDelta));

            eventValueDelta -= movedAmount;

            this._value += movedAmount;
            const endR = this.rating;
            if (endR != startR) {
                this._bufferValue = this.getBufferSize();
            }

            if (movedAmount == 0) {
                break;
            }
        }
    }

    private getBufferSize()
    {
        const r = this.rating;
        return r == 0 ? 0 : r + Math.sign(r) * OldAttitudeHandler.C;
    }

    private getDailyDecay()
    {
        return OldAttitudeHandler.ZONE_DECAY_RATES[Math.abs(getZone(this.rating))];
    }

    public get timestamp(): GameTimestamp {
        return this._timestamp;
    }

    public get value(): number {
        return this._value;
    }

    private get bufferValue(): number {
        return this._bufferValue;
    }

    private set bufferValue(value: number) {
        this._bufferValue = value;
        const bufferExtrema = this.getBufferSize();
        if (Math.sign(bufferExtrema) * value < 0) {
            this._bufferValue = 0;
        }
        if (Math.abs(this._bufferValue) > Math.abs(bufferExtrema)) {
            this._bufferValue = bufferExtrema;
        }
    }

    /**
     * A value between -10 to 10 which denotes how strongly this attitude is
     * felt. The divisions are not linear, and a +10 means way more than 'twice'
     * a +5.
     */
    public get rating(): number
    {
        const B = 2 * OldAttitudeHandler.C - 1;
        const v = Math.abs(this._value);

        return Math.sign(this._value) *
               Math.min(10, Math.floor((Math.sqrt(B * B + 8 * v) - B) / 2));
    }
}


interface IBufferedAttitude
{
    adjustValue(by: number, isDecay?: boolean);

    get rating(): number;
    get zone(): number;
}


interface ITestBufferedAttitude
    extends IBufferedAttitude
{
    get value(): number;
    get bufferedValue(): number;
    resetRatings();
}


// todo move this out
function EQ(a, b) {
    return Math.abs(a - b) < 0.00001;
}


/**
 * The {@link BufferedAttitudeListBase} essentially comprises many of these
 * 'slots' which are filled one by one. The number of filled non-buffered slots
 * is the magnitude of the rating, and their total value is the value.
 */
abstract class SlotBase
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
        }
        else if (Math.abs(this._value) > Math.abs(this.size)) {
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

/**
 * Slots with a fixed size. This is most of them.
 */
class FixedSizeSlot
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

/**
 * The slot for the dynamic buffer. It has variable size and autofills whenever
 * it is resized.
 */
class DynamicBufferSlot
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
    protected get shouldAutofillOnFirstCross(): boolean {
        return false;
    }

    public reset(): void {
        super.reset();
        this._size = 0;
    }

    /**
     * Getter for size.
     */
    public get size() {
        return this._size;
    }

    /**
     * Setter for size. Does basic sanity checking and sets the value to full
     * too.
     */
    public set size(value) {
        if ((value - this.value) * (this.value) < 0) {
            throw new Error("New size set cannot fit the current value");
        }
        this._size = value;
        this._value = this._size;
    }
}


abstract class BufferedAttitudeListBase
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
                this.posSlots.push(new FixedSizeSlot(zoneBufferSlotSize, true, 0));
                this.negSlots.push(new FixedSizeSlot(-zoneBufferSlotSize, true, 0));
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
     */
    public adjustValue(delta: number, isNatualDecay: boolean = false)
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
        }
        else if (existingDirection < 0) {
            forwardSlots = this.negSlots;
            reverseSlots = this.posSlots;
        }
        else {
            forwardSlots = deltaDirection > 0 ? this.posSlots : this.negSlots;
            reverseSlots = deltaDirection > 0 ? this.negSlots : this.posSlots;
        }

        // First fill/empty the dynamic buffer, assuming this isn't natural
        // decay.
        if (!isNatualDecay) {
            delta = this.dynamicBuffer.adjust(delta);
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
                this.dynamicBuffer.size = this.getDynamicBufferSizeForRating(this.rating);
                slotIdx++;
            }

            if (filledSomething) {
                this.dynamicBuffer.size =
                    this.getDynamicBufferSizeForRating(this.rating);
            }
        }
        else {
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

    get zone() {
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


class StandardBufferedAttitudeList
    extends BufferedAttitudeListBase
    implements IBufferedAttitude
{
    /**
     * CTOR.
     */
    public constructor()
    {
        super();
        this.resetRatings();
    }

    protected getBufferCapacityOfZone(zone: number): number
    {
        return Math.abs(zone);
    }

    protected getDynamicBufferSizeForRating(rating: number): number
    {
        return rating;
    }

    protected getValueCapacityOfRating(rating: number): number
    {
        return Math.abs(rating) + 2;
    }

    protected getZoneDeltaOffset(zone: number): number
    {
        return [0, 0, 1, 2][zone];
    }

    protected get zoneCutoffs(): number[]
    {
        return [1, 4, 7];
    }

    protected get maxRating(): number {
        return 10;
    }
}


/**
 * ## Conceptual Changes
 * Let me cover how the core concepts are supported via this class.
 *
 * <b>Forgiveness</b><br/>
 * As compared to v1 where there were forgiveness buffers for every rating, which
 * was way too excessive and required me to throw in huge values to undo an event,
 * in this there are forgiveness buffers for every zone cutoff, and one on the
 * current rating only. So say someone is at positive 6 and the previous zone
 * cutoffs are 1 and 4. So a negative event would first deplete from the rating
 * 6 buffer, then deplete the value such that it is on the cutoff for rating 4.
 * After that another buffer is depleted first before the value could fall for
 * cutoff for rating 1, and so on.
 *
 * <b>Forgetfulness.</b><br/>
 * This still retains everything it had from v1, but I'm going to add an ambient
 * interaction support here, since we're going to be doing a lot of timeskips.
 * So if the character is miles away and has no means of interaction with the
 * target of this AttitudeHandler, its value would be zero and decay would
 * proceed normally as in v1. But let's say they're living under the same roof
 * and interacting positively every day. There is no reason forgetfulness should
 * act in this case (in fact we might even see a positive attitude rise), but I
 * can't put down an event in this case. On the other hand, let's say there
 * living in mutual tension, even though there's no direct interaction events,
 * any positive feelings should decline faster. Currently, I plan to just add
 * the ambient interaction additively with the forgetfulness (but this won't
 * become zero on a zone boundary). The complication, however rests in how I
 * will render this, since this info needs to be shown to the players.
 */
abstract class AttitudeHandler
    implements ITestAttitudeHandler
{
    public ambientInteraction: number;

    protected readonly bufferedAttitude: IBufferedAttitude;

    private currentTime: GameTimestamp;

    protected constructor()
    {
        this.bufferedAttitude = new StandardBufferedAttitudeList();
        this.currentTime = new GameTimestamp();
        this.ambientInteraction = 0;
    }

    protected abstract get forgetfulness();

    testReset(): void {
        (this.bufferedAttitude as ITestBufferedAttitude).resetRatings();
    }

    public incrementTimeTo(finalTime: GameTimestamp): void
    {
        if (finalTime.totalMillis < this.currentTime.totalMillis) {
            throw new Error("Cannot move backwards in time.");
        }
        const forgetfulness = this.forgetfulness;
        const ambient = this.ambientInteraction;
        const decay = forgetfulness + ambient;

        // We do not cross zone boundaries only if ambient interaction is less
        // than forgetfulness and of the opposite direction.
        const naturalDecay =
            Math.sign(ambient) != Math.sign(forgetfulness) &&
            Math.abs(ambient) < Math.abs(forgetfulness);

        this.bufferedAttitude.adjustValue(
            decay * (finalTime.totalDays - this.currentTime.totalDays),
            naturalDecay
        );
        this.currentTime = finalTime;
    }

    public addEvent(eventValueDelta: number, eventTime?: GameTimestamp): void
    {
        this.bufferedAttitude.adjustValue(eventValueDelta);
    }

    get value(): number {
        return (this.bufferedAttitude as ITestBufferedAttitude).value;
    }

    public get rating(): number
    {
        return this.bufferedAttitude.rating;
    }

    public get timestamp(): GameTimestamp
    {
        return this.currentTime;
    }
}


class StandardAttitudeHandler
    extends AttitudeHandler
{
    public constructor() {
        super();
    }


    protected get forgetfulness() {
        const z = this.bufferedAttitude.zone;

        const zMag = Math.abs(z);
        const zSgn = Math.sign(z);

        return [0.2, 0.1, 0.05, 0.02][zMag] * (-zSgn);
    }

}


export class NpcOpinionV2
{
    private currentTime: GameTimestamp;

    private readonly attitudeHandlers: Map<PositiveEmotion, IAttitudeHandler> =
        new Map();

    private readonly events: RenderableEvent[] = [];

    public constructor(public readonly npc: NpcId,
                       public readonly pc: PcIndex)
    {
        this.currentTime = null;
        for (const emotion of getEnumIterator(PositiveEmotion) as Generator<PositiveEmotion>) {
            this.attitudeHandlers.set(emotion, new StandardAttitudeHandler());
        }
    }

    public addEvent(event: RenderableEvent): void {
        if (this.currentTime != null &&
            event.startTime.totalDays > this.currentTime.totalDays + 2)
        {
            throw new Error("Gap between events not covered by timeskip.");
        }
        this.events.push(event);
        if (event instanceof TimeskipEvent) {
            for (const emotion of getEnumIterator(PositiveEmotion) as Generator<PositiveEmotion>) {
                const amb = event.ambientInteraction.has(emotion) ?
                            event.ambientInteraction.get(emotion) :
                            0;
                const ah = this.attitudeHandlers.get(emotion);
                ah.ambientInteraction = amb;
                ah.incrementTimeTo(event.endTime);
            }
            this.currentTime = event.endTime;
        } else if (event instanceof NpcInteractionEvent) {
            for (const [emotion, value] of event.effects.entries()) {
                this.attitudeHandlers.get(emotion).addEvent(value);
            }
            this.currentTime = event.timestamp;
        }
    }

    public generateSummaryTableCellContents(): string
    {
        const t = getZone(this.getEmotion(PositiveEmotion.Trust));
        const $trustBorder =
            t >= 0 ? `<div class="trust_border value_${t}"></div>`
                   : `<div class="paranoia_border value_${-t}"></div>`;

        const g = getZone(this.getEmotion(PositiveEmotion.Gratitude));
        const $gratitudeBorder =
            g >= 0 ? `<div class="gratitude_border value_${g}"></div>`
                   : `<div class="envy_border value_${-g}"></div>`;

        const r = getZone(this.getEmotion(PositiveEmotion.Respect));
        const $respectBorder =
            r >= 0 ? `<div class="respect_border value_${r}"></div>`
                   : `<div class="contempt_border value_${-r}"></div>`;

        let totalAffectionRating = 0;
        for (const emotion of getEnumIterator(PositiveEmotion) as Generator<PositiveEmotion>) {
            totalAffectionRating += this.getEmotion(emotion);
        }

        return `
            <div class="cell">
                <div class="npc_opinion" 
                     data-npc-id="${this.npc}" 
                     data-pc-id="${this.pc}">
                    ${totalAffectionRating}
                </div>
                ${$trustBorder}${$gratitudeBorder}${$respectBorder}
                <div class="backdrop"></div>
            </div>`;
    }

    public generateTimeline(): string
    {
        const eventsDesc = [];
        for (const npcInteractionEvent of this.events) {
            eventsDesc.push(npcInteractionEvent.eventDesc);
        }

        const opinionTags = [];
        for (const e of getEnumIterator(PositiveEmotion) as Generator<PositiveEmotion>) {
            opinionTags.push(this.generateOpinionTag(e));
        }

        return `
                <h4>Interaction Details</h4>
                <div class="opinion_tags">${opinionTags.join("")}</div>
                <div class="events_list">${eventsDesc.join("")}</div>
            `;

    }

    private generateOpinionTag(e: PositiveEmotion)
    {
        const r = this.getEmotion(e);
        if (r == 0) return '';
        const tText = r > 0 ? PositiveEmotion[e] : NegativeEmotion.get(e);
        const tVal = Math.abs(r);
        return `<div class="effect_tag" data-emo="${tText}">${tText}: ${tVal}</div>`;
    }

    private getEmotion(e: PositiveEmotion): number
    {
        return this.attitudeHandlers.get(e).rating;
    }
}


function testSlot(): void
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

function testBufferedAttitude(): void
{
    const ba: ITestBufferedAttitude = new StandardBufferedAttitudeList();

    function testAssert(ba: ITestBufferedAttitude,
                        expectedValue: number,
                        expectedRating: number,
                        expectedBuffer: number)
    {
        console.assert(
            ba.value == expectedValue &&
            ba.rating == expectedRating &&
            ba.bufferedValue == expectedBuffer,
            `Expected (V, R, B): (${expectedValue}, ${expectedRating}, ` +
            `${expectedBuffer}). Got (${ba.value}, ${ba.rating}, ` +
            `${ba.bufferedValue}).`
        );
    }

    ba.adjustValue(1);
    testAssert(ba, 1, 0, 0);
    ba.adjustValue(-3);
    testAssert(ba, -2, 0, 0);
    ba.adjustValue(5);
    testAssert(ba, 3, 1, 2);
    ba.adjustValue(-8);
    testAssert(ba, -3, -1, -2);
    ba.resetRatings();

    ba.adjustValue(8);
    testAssert(ba, 8, 2, 3);
    ba.adjustValue(18);
    testAssert(ba, 25, 5, 10);
    ba.adjustValue(-1);
    testAssert(ba, 25, 5, 9); // double check this!
    ba.adjustValue(-5);
    testAssert(ba, 23, 4, 5);
    ba.adjustValue(-5);
    testAssert(ba, 18, 4, 5);
    ba.adjustValue(-2);
    testAssert(ba, 18, 4, 3);
    ba.adjustValue(-2);
    testAssert(ba, 18, 4, 1);
    ba.adjustValue(-2);
    testAssert(ba, 16, 3, 1);
    ba.adjustValue(-2);
    testAssert(ba, 14, 3, 1);
    ba.adjustValue(2);
    testAssert(ba, 14, 3, 3);

    ba.resetRatings();
    ba.adjustValue(7);
    ba.adjustValue(-0.1, true);
    testAssert(ba, 6.9, 1, 3);
}

function testAttitudeHandler(): void
{
    const ah: ITestAttitudeHandler = new StandardAttitudeHandler();

    console.assert(ah.rating == 0);
    ah.incrementTimeTo(GameTimestamp.fromDays(1))
    console.assert(ah.rating == 0);
    ah.addEvent(2.5);
    ah.incrementTimeTo(GameTimestamp.fromDays(2000));
    console.assert(ah.rating == 0);
    ah.testReset();

    ah.addEvent(7);
    console.assert(ah.rating == 2);
    ah.incrementTimeTo(GameTimestamp.fromDays(2002));
    console.assert(ah.rating == 1);
    ah.incrementTimeTo(GameTimestamp.fromDays(4000));
    console.assert(ah.rating == 1);
    console.assert(EQ(ah.value, 3), ah.value);

    ah.ambientInteraction = -0.1;
    ah.incrementTimeTo(GameTimestamp.fromDays(4021));
    console.assert(EQ(ah.value, 1.8), ah.value); // todo: wtf? how does this work?

}

/**
 * Testcases.
 */
export function test()
{
    testSlot();
    testBufferedAttitude();
    testAttitudeHandler();
}
