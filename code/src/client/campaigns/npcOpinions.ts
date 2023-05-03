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
 * So I'm gonna tweak things here a bit - the players won't get the full
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

import {getEnumIterator}                       from "../common/common";
import {Character, NpcIndex}                   from "../data/cards/character";
import {PcCharismaMods, PcIndex, PcTokenNames} from "../data/pcIndex";
import {GameTimestamp, T_NOW, T_START}         from "./common";


enum PositiveEmotion {
    Affection,        // vs. Hatred
    Gratitude,        // vs. Envy
    Trust,            // vs. Paranoia
    Respect           // vs. Contempt
}


class NpcInteractionEvent
{
    public constructor(
        public readonly timestamp: GameTimestamp,
        public readonly displayText: string,
        public readonly effect: Map<PositiveEmotion, number>,
        public readonly insightGate: number = 10)
    {}
}


/**
 * Objects of this class store the state of how one particular NPC feels towards
 * another character in regard to a specific attitude at a given point of time.
 */
class AttitudeHandler
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
        [...Array(11).keys()].map(r => AttitudeHandler.getCutoffValueForRating(r));

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

    /**
     * Which NPC's opinion of whom does this object consider.
     */
    private readonly npcOpinion: NpcOpinion;

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

    /**
     * CTOR.
     */
    public constructor(npcOpinion: NpcOpinion,
                       emotion: PositiveEmotion)
    {
        this.emotion = emotion;
        this.npcOpinion = npcOpinion;
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
            AttitudeHandler.getCutoffValueForRating(
                AttitudeHandler.ZONE_CUTOFF_RATINGS[Math.abs(this.getZone())]
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

    public addEvent(eventValueDelta: number, eventTime: GameTimestamp)
    {
        this.incrementTimeTo(eventTime);
        const deltaSgn = Math.sign(eventValueDelta);

        while (deltaSgn * eventValueDelta > 0) {

            const zoneMag = Math.abs(this.getZone());
            const startR = this.getRating();

            let bufferModifiedEventValueDelta =
                eventValueDelta
                - Math.sign(this._value) * AttitudeHandler.ZONE_BUFFER_MODIFIERS[zoneMag];
            if (bufferModifiedEventValueDelta * deltaSgn < 0) {
                bufferModifiedEventValueDelta = 0;
            }

            // The buffer is filled/emptied first.
            const oldBufferValue = this.bufferValue;
            this.bufferValue += bufferModifiedEventValueDelta;

            eventValueDelta -= (this.bufferValue - oldBufferValue);

            let valueModifiedEventValueDelta =
                eventValueDelta
                - Math.sign(this._value) * AttitudeHandler.ZONE_VALUE_MODIFIERS[zoneMag];
            if (valueModifiedEventValueDelta * deltaSgn < 0) {
                valueModifiedEventValueDelta = 0;
            }

            // Find the maximum we can move the value to until we hit the next
            // block. Damn this is getting ugly, and with the amount of logic here,
            // it should be a separate class.
            let maxMove;
            if (Math.sign(eventValueDelta) == Math.sign(this._value) &&
                Math.abs(this._value) > AttitudeHandler.VALUE_AT_RATINGS[AttitudeHandler.MAX_RATING])
            {
                maxMove = 1_000_000;
            } else {
                // Taking advantage that maxMove is always an unsigned qty. and
                // identical for symmetric positive/negative values.
                const absRating = Math.abs(this.getRating());
                const absVal = Math.abs(this._value);

                if (Math.sign(eventValueDelta) == Math.sign(this._value)) {
                    maxMove = AttitudeHandler.VALUE_AT_RATINGS[absRating + 1] - absVal;
                } else {
                    if (absVal == AttitudeHandler.VALUE_AT_RATINGS[absRating]) {
                        if (this._value == 0) {
                            maxMove = AttitudeHandler.VALUE_AT_RATINGS[1];
                        } else {
                            maxMove = absVal - AttitudeHandler.VALUE_AT_RATINGS[absRating - 1];
                        }
                    } else {
                        maxMove = absVal - AttitudeHandler.VALUE_AT_RATINGS[absRating];
                    }
                }
            }

            const movedAmount = Math.sign(valueModifiedEventValueDelta) *
                                Math.min(maxMove, Math.abs(valueModifiedEventValueDelta));

            eventValueDelta -= movedAmount;

            this._value += movedAmount;
            const endR = this.getRating();
            if (endR != startR) {
                this._bufferValue = this.getBufferSize();
            }

            if (movedAmount == 0) {
                break;
            }
        }
    }

    /**
     * A value between -10 to 10 which denotes how strongly this attitude is
     * felt. The divisions are not linear, and a +10 means way more than 'twice'
     * a +5.
     */
    public getRating(): number
    {
        const B = 2 * AttitudeHandler.C - 1;
        const v = Math.abs(this._value);

        return Math.sign(this._value) *
               Math.min(10, Math.floor((Math.sqrt(B * B + 8 * v) - B) / 2));
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

    private getBufferSize()
    {
        const r = this.getRating();
        return r == 0 ? 0 : r + Math.sign(r) * AttitudeHandler.C;
    }

    public static getZoneForRating(r)
    {
        return Math.sign(r) * Math.floor((Math.abs(r) + 2) / 3);
    }

    private getZone()
    {
        return AttitudeHandler.getZoneForRating(this.getRating());
    }

    private static getCutoffValueForRating(r0: number)
    {
        const r = Math.abs(r0);
        return Math.sign(r0) * (r * (AttitudeHandler.C + (r - 1) / 2));
    }

    private getDailyDecay()
    {
        return AttitudeHandler.ZONE_DECAY_RATES[Math.abs(this.getZone())];
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
}


class NpcOpinion
{
    private readonly attitudeHandlers: Map<PositiveEmotion, AttitudeHandler>
        = new Map();

    public constructor()
    {
        for (const emotion of getEnumIterator(PositiveEmotion) as Generator<PositiveEmotion>)
        {
            this.attitudeHandlers.set(emotion, new AttitudeHandler(this, emotion));
        }
    }

    public addEvent(event: NpcInteractionEvent): void
    {
        for (const [emotion, value] of event.effect.entries()) {
            this.attitudeHandlers.get(emotion).addEvent(value, event.timestamp);
        }
    }

    public setSnapshotTime(time: GameTimestamp)
    {
        for (const emotion of getEnumIterator(PositiveEmotion) as Generator<PositiveEmotion>)
        {
            this.attitudeHandlers.get(emotion).incrementTimeTo(time);
        }
    }

    public getEmotion(e: PositiveEmotion): number
    {
        return this.attitudeHandlers.get(e).getRating();
    }
}


// No need to make this self-updating (yet).
class RenderedNpcOpinion
    extends NpcOpinion
{
    private _$tableCell: JQuery = null;

    constructor(public readonly npc: NpcIndex,
                public readonly pc: PcIndex)
    {
        super();
    }

    private generateSummaryTableCellContents()
    {
        const t = AttitudeHandler.getZoneForRating(this.getEmotion(PositiveEmotion.Trust));
        const $trustBorder =
            t >= 0 ? `<div class="trust_border value_${t}"></div>`
                   : `<div class="paranoia_border value_${-t}"></div>`;

        const g = AttitudeHandler.getZoneForRating(this.getEmotion(PositiveEmotion.Gratitude));
        const $gratitudeBorder =
            g >= 0 ? `<div class="gratitude_border value_${g}"></div>`
                   : `<div class="envy_border value_${-g}"></div>`;

        const r = AttitudeHandler.getZoneForRating(this.getEmotion(PositiveEmotion.Respect));
        const $respectBorder =
            r >= 0 ? `<div class="respect_border value_${r}"></div>`
                   : `<div class="contempt_border value_${-r}"></div>`;

        this._$tableCell =
            $(`<div class="cell"><div class="npc_opinion">${this.affectionRating}</div>
                                 ${$trustBorder}${$gratitudeBorder}${$respectBorder}
                                 <div class="backdrop"></div></div>`);
    }

    public get $tableCell() {
        if (this._$tableCell == null) {
            this.generateSummaryTableCellContents();
        }
        return this._$tableCell;
    }

    private get affectionRating(): number {
        let totalAffectionRating = 0;
        for (const emotion of getEnumIterator(PositiveEmotion) as Generator<PositiveEmotion>) {
            totalAffectionRating += this.getEmotion(emotion);
        }
        return totalAffectionRating;
    }
}

const npcInteractionEvents: Map<NpcIndex, Map<PcIndex, NpcInteractionEvent[]>> =
    new Map();

export function renderNpcOpinionTable($container: JQuery): void
{
    const $table = $("<div class='opinion_summary_table'></div>");

    const $headerRow = $("<div class='row header'><div class='cell'></div></div>");
    for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
        const imgPath =
            `./assets/images/character_tokens/C2/pcs/${PcTokenNames.get(pc)}.png`;
        const $pcCell =
            $(`<div class="cell character_token"><img src="${imgPath}" alt="[Img not found]"></div>`);

        $pcCell.appendTo($headerRow);
    }
    $headerRow.appendTo($table);

    const $tableBody = $("<div class='table_body'></div>");

    for (const [npcIndex, npc] of Character.IndexById) {
        if (!npc.isVillageNpc) {
            continue;
        }
        const $tableRow = $("<div class='row'></div>");
        const $npcCell =
            $(`<div class='cell character_token'><img src="${npc.imgPath}" alt="[Img not found]"></div>`);
        $npcCell.appendTo($tableRow);

        for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
            const npcOpinion = new RenderedNpcOpinion(npcIndex, pc);

            for (const event of npcInteractionEvents.get(npcIndex).get(pc)) {
                npcOpinion.addEvent(event);
            }

            npcOpinion.setSnapshotTime(T_NOW);
            npcOpinion.$tableCell.appendTo($tableRow);
        }

        $tableRow.appendTo($tableBody);
    }

    $tableBody.appendTo($table);
    $table.appendTo($container);
}

/**
 * Testcases.
 */
export function test()
{
    // Todo: redo these given the changed parameters.
    //  Or add parameters to constructor.
    // const npcOp = new NpcOpinion();
    //
    // const ah = new AttitudeHandler(npcOp, PositiveEmotion.Trust);
    //
    // for (const sgn of [1, -1]) {
    //     console.assert(ah.value == 0);
    //     console.assert(ah.getRating() == 0);
    //     console.assert(ah.timestamp.totalMillis == 0);
    //
    //     ah.addEvent(2 * sgn, GameTimestamp.fromDays(0));
    //     console.assert(ah.value == 2 * sgn);
    //     console.assert(ah.getRating() == 0);
    //     console.assert(ah.timestamp.totalMillis == 0);
    //
    //     ah.incrementTimeTo(GameTimestamp.fromDays(1));
    //     console.assert(ah.value == sgn);
    //
    //     ah.addEvent(7 * sgn, GameTimestamp.fromDays(3));
    //     console.assert(ah.value == 7 * sgn);
    //     console.assert(ah.getRating() == sgn);
    //
    //     try {
    //         ah.incrementTimeTo(GameTimestamp.fromDays(1));
    //         console.error("Should've thrown an error on moving to the past.");
    //     } catch (e) {}
    //
    //     // Make sure we slip back from 2.
    //     ah.addEvent(3 * sgn, GameTimestamp.fromDays(4));
    //     console.assert(ah.value == 5 * sgn);
    //     console.assert(ah.getRating() == sgn);
    //
    //     // Make sure the buffer works as expected.
    //     ah.addEvent(-2 * sgn, GameTimestamp.fromDays(4));
    //     console.assert(ah.value == 5 * sgn);
    //
    //     ah.addEvent(sgn, GameTimestamp.fromDays(4));
    //     console.assert(ah.value == 5 * sgn);
    //
    //     // The buffer should have refilled by itself by now.
    //     ah.incrementTimeTo(GameTimestamp.fromDays(5));
    //     console.assert(ah.value == 4 * sgn);
    //
    //     ah.addEvent(sgn, GameTimestamp.fromDays(5));
    //     console.assert(ah.value == 5 * sgn);
    //
    //     // We should not fall beneath a checkpoint. (one more since we cross the val-1 zone)
    //     ah.addEvent(4 * sgn, GameTimestamp.fromDays(5));
    //     console.assert(ah.value == 8 * sgn);
    //
    //     ah.incrementTimeTo(GameTimestamp.fromDays(6));
    //     console.assert(ah.value == 7.5 * sgn);
    //
    //     ah.incrementTimeTo(GameTimestamp.fromDays(10));
    //     console.assert(ah.value == 7 * sgn);
    //
    //     ah.testReset();
    // }
    // console.log("Npc Opinion tests performed.");
}

function session2NpcInteractions()
{
    // Conversation with Dawn.
    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 9, 0),
            "Polite, and says funny stuff like asking if we want to sacrifice them...",
            new Map([[PositiveEmotion.Respect, 2]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 9, 0),
            "Seems to have a rather exotic pet.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 9, 0),
            "Polite.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 9, 0),
            "Polite.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 9, 0),
            "Polite.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_PANZER).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 9, 0),
            "Polite.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    // Interacting with Tomasa and Taihe.
    for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
        npcInteractionEvents.get(NpcIndex.ID_TOMASA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 9, 0),
                "Liked the food.",
                new Map([[PositiveEmotion.Gratitude, 1]])
            )
        );
    }
    npcInteractionEvents.get(NpcIndex.ID_TOMASA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 9, 30),
            "Fun to hang out with, also petted Julius.",
            new Map([[PositiveEmotion.Respect, 2]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_TAIHE).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 9, 30),
            "Fun to hang out with.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    // Interaction with Hina as she took them to Cec.
    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 10, 0),
            "Not entirely without a sense of humor.",
            new Map([[PositiveEmotion.Respect, 1],
                     [PositiveEmotion.Trust,   1]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 10, 0),
            "Cooler than I expected aasimar/paladins to be.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    // Interaction with Cec./Sasha pt.1.
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 10, 30),
            "A friend of my brother. Seems to be as noble and kind as I'd expect.",
            new Map([[PositiveEmotion.Respect, 4],
                     [PositiveEmotion.Trust,   4]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_SASHA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 10, 45),
            "Why's this fucker taking an interest in me?",
            new Map([[PositiveEmotion.Gratitude, 2]])
        )
    );
}

function session3NpcInteractions()
{
    // Cecelia-Helios/Aurelia
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 0),
            "Bearer of an awful truth about Mostima/Andoain.",
            new Map([[PositiveEmotion.Affection, -1],
                     [PositiveEmotion.Trust,      1],
                     [PositiveEmotion.Gratitude,  1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 15),
            "Seemed concerned about my state.",
            new Map([[PositiveEmotion.Gratitude,  1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 30),
            "Seemed interested in helping out Andoain and myself.",
            new Map([[PositiveEmotion.Gratitude, 2],
                     [PositiveEmotion.Respect,   1],
                     [PositiveEmotion.Trust,     1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 0),
            "Took an interest in my health and offered words of comfort.",
            new Map([[PositiveEmotion.Gratitude, 3]])
        )
    );

    // Sasha-Quinn/Cyrion
    npcInteractionEvents.get(NpcIndex.ID_SASHA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 15),
            "Continues to take an interest. Yet how long before he decides I'm " +
            "not worth it and leaves/hates me too...",
            new Map([[PositiveEmotion.Gratitude,  1],
                     [PositiveEmotion.Trust,     -2]]),
            18
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_GENEFE).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 45),
            "Prying into how I look after these kids, like I were guilty of something.",
            new Map([[PositiveEmotion.Respect, -1],
                     [PositiveEmotion.Trust,   -1]]),
            17
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_SASHA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 45),
            "Thinks I'm mentally unstable.",
            new Map([[PositiveEmotion.Respect, -1],
                     [PositiveEmotion.Trust,   -1]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_SASHA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 45),
            "Offered to break me out and pissed off that hag.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_GENEFE).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 45),
            "I don't think he was joking about letting the brat out.",
            new Map([[PositiveEmotion.Trust, -1]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_GENEFE).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 0),
            "Acknowledges how hard I work for these kids.",
            new Map([[PositiveEmotion.Trust,     1],
                     [PositiveEmotion.Respect,   2],
                     [PositiveEmotion.Gratitude, 2],])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_SASHA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 0),
            "Praising that hag.",
            new Map([[PositiveEmotion.Respect, -1]])
        )
    );

    // Quinn Cecelia flight.
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 30),
            "Agreed to a sudden, whimsical and imposing request because he gave his word.",
            new Map([[PositiveEmotion.Trust,   4],
                     [PositiveEmotion.Respect, 4]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 30),
            "Let me experience flight.",
            new Map([[PositiveEmotion.Gratitude, 3]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 30),
            "Flaunted his flight, compared his state to mine and made me puke.",
            new Map([[PositiveEmotion.Gratitude, -1],
                     [PositiveEmotion.Respect,   -1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 30),
            "Didn't mind me puking over him, and consoled me with an anecdote.",
            new Map([[PositiveEmotion.Gratitude, 2],
                     [PositiveEmotion.Respect,   1],
                     [PositiveEmotion.Trust,     1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 30),
            "Hehe, puked in his first flight despite being healthy.",
            new Map([[PositiveEmotion.Gratitude, 1],
                     [PositiveEmotion.Respect,  -2]])
        )
    );

    // Quinn Hina
    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 13, 0),
            "Seems interested in gaming/tech/innovation and kept his humour on " +
            "seeing his own avatar. Probably can teach this neanderthal a " +
            "few things...",
            new Map([[PositiveEmotion.Respect, 2]])
        )
    );

    // Interacting with Erica.
    for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
        npcInteractionEvents.get(NpcIndex.ID_ERICA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 13, 30),
                "Seem like a well-mannered bunch. Asked for permission to " +
                "enter our garden instead of jumping over the bush.",
                new Map([[PositiveEmotion.Respect, 2]])
            )
        );
    }
}

export function setupNpcOpinions()
{
    for (const [npcIndex, npc] of Character.IndexById) {
        if (!npc.isVillageNpc) {
            continue;
        }
        const npcMap: Map<PcIndex, NpcInteractionEvent[]> = new Map();
        for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
            npcMap.set(pc, []);
        }
        npcInteractionEvents.set(npcIndex, npcMap);
    }

    // Adjust for charisma respect.
    for (const [npcIndex, npc] of Character.IndexById) {
        if (!npc.isVillageNpc) {
            continue;
        }
        for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
            npcInteractionEvents.get(npcIndex).get(pc).push(
                new NpcInteractionEvent(
                    T_START,
                    "Base Charisma.",
                    new Map([[PositiveEmotion.Respect, PcCharismaMods.get(pc)]])
                )
            );
        }
    }

    session2NpcInteractions();
    session3NpcInteractions();

    renderNpcOpinionTable($("#attitude_summary_table_area"));
}
