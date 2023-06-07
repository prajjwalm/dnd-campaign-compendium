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

import {getEnumIterator}                                      from "../common/common";
import {Character, NpcIndex}                                  from "../data/cards/character";
import {PARTY_INSIGHT, PcCharismaMods, PcIndex, PcTokenNames} from "../data/pcIndex";
import {GameTimestamp, T_NOW, T_START}                        from "./common";


enum PositiveEmotion {
    Affection,
    Gratitude,
    Trust,
    Respect
}

const NegativeEmotion = new Map([
    [PositiveEmotion.Affection, "Hatred"],
    [PositiveEmotion.Gratitude, "Envy"],
    [PositiveEmotion.Trust, "Paranoia"],
    [PositiveEmotion.Respect, "Contempt"],
]);


class NpcInteractionEvent
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
        if (this.insightGate > PARTY_INSIGHT) {
            return `<div class='event_li'>
                    <div class="timestamp">${this.timestamp.toString()}</div>
                    <div class="display_text">???</div>
                  </div>`;
        }
        const effectTags = [];
        for (const [emotion, value] of this.effects.entries()) {
            if (value == 0) {
                continue;
            }
            const zone = AttitudeHandler.getZoneForRating(value);

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
                    <div class="effect_tags">${effectTags.join("")}</div>
                  </div>`;
    }
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
        for (const [emotion, value] of event.effects.entries()) {
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
            $(`<div class="cell"><div class="npc_opinion" data-npc-id="${this.npc}" data-pc-id="${this.pc}">${this.affectionRating}</div>
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

const npcOpinions: Map<NpcIndex, Map<PcIndex, NpcOpinion>> = new Map();

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
            npcOpinions.get(npcIndex).set(pc, npcOpinion);
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
    // npcInteractionEvents.get(NpcIndex.ID_TAIHE).get(PcIndex.ID_QUINN).push(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 9, 30),
    //         "Fun to hang out with.",
    //         new Map([[PositiveEmotion.Respect, 1]])
    //     )
    // );

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
            18,
            new Map([[PositiveEmotion.Trust, true]])
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
                     [PositiveEmotion.Respect,   -1]]),
            10,
            new Map([[PositiveEmotion.Gratitude, true]])
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

function session4NpcInteractions()
{
    // Previous session.
    npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 13, 30),
            "Didn't seem to hold respect for my position.",
            new Map([[PositiveEmotion.Respect, -2],])
        )
    );
    // Talk with Coroto.
    npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Acknowledged my honor for the fatherland.",
            new Map([[PositiveEmotion.Respect, 1],
                     [PositiveEmotion.Gratitude, 2]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Comes from a weak country and a feminine race.",
            new Map([[PositiveEmotion.Respect, -2],
                     [PositiveEmotion.Trust,   -1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Appears to have respect for our fatherland.",
            new Map([[PositiveEmotion.Gratitude, 1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Comes from a powerful country and a noble race.",
            new Map([[PositiveEmotion.Respect, 2],
                     [PositiveEmotion.Trust,   1]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Was worried about our safety.",
            new Map([[PositiveEmotion.Gratitude, 1],
                     [PositiveEmotion.Trust,     2]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Promised with honor to defend us should the need arise.",
            new Map([[PositiveEmotion.Gratitude, 2],
                     [PositiveEmotion.Respect,   2]])
        )
    );
    for (const pc of [PcIndex.ID_HELIOS, PcIndex.ID_CYRION]) {
        npcInteractionEvents.get(NpcIndex.ID_COROTO).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 14, 30),
                "Was gallivanting with my wife.",
                new Map([[PositiveEmotion.Respect,   -1],
                         [PositiveEmotion.Trust,     -1],
                         [PositiveEmotion.Gratitude, -1],]),
                22
            )
        );
    }

    // Talk with Erica.
    npcInteractionEvents.get(NpcIndex.ID_ERICA).get(PcIndex.ID_PANZER).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 25),
            "Was interested in my youth with Coroto and our past together.",
            new Map([[PositiveEmotion.Gratitude, 1]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_ERICA).get(PcIndex.ID_PANZER).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 25),
            "Reminded me of happier times in my father's estate and Ivangrad.",
            new Map([[PositiveEmotion.Gratitude, 2]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_ERICA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 25),
            "Reminded me of happier times in my father's estate and Ivangrad.",
            new Map([[PositiveEmotion.Gratitude, 2]])
        )
    );

    for (const pc of [PcIndex.ID_PANZER, PcIndex.ID_HELIOS, PcIndex.ID_CYRION]) {
        npcInteractionEvents.get(NpcIndex.ID_ERICA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 14, 25),
                "Were polite to me when when, in my failing memory, I couldn't " +
                "help them much",
                new Map([[PositiveEmotion.Gratitude, 1],
                         [PositiveEmotion.Respect, 1]])
            )
        );
    }

    for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
        npcInteractionEvents.get(NpcIndex.ID_ERICA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 14, 30),
                "Their coming here will cause me much trouble.",
                new Map([[PositiveEmotion.Trust, -3]]),
                20
            )
        );
        npcInteractionEvents.get(NpcIndex.ID_COROTO).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 14, 30),
                "Their coming here will cause me much trouble.",
                new Map([[PositiveEmotion.Trust, -3]]),
                22
            )
        );
    }

    // In Jordi's house.
    for (const pc of [PcIndex.ID_PANZER, PcIndex.ID_HELIOS, PcIndex.ID_CYRION]) {
        npcInteractionEvents.get(NpcIndex.ID_JORDI).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 15, 30),
                "As a first impression, they seem to be kind and humble people.",
                new Map([[PositiveEmotion.Respect, 1],
                         [PositiveEmotion.Trust,   1]])
            )
        );
    }

    npcInteractionEvents.get(NpcIndex.ID_JORDI).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 15, 30),
            "Gazed at the sea wistfully.",
            new Map([[PositiveEmotion.Respect, 2],
                     [PositiveEmotion.Trust,   1]])
        )
    );

    for (const pc of [PcIndex.ID_HELIOS, PcIndex.ID_CYRION]) {
        npcInteractionEvents.get(NpcIndex.ID_JORDI).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 15, 45),
                "Was concerned about the disaster that struck our land and my " +
                "harsh experience in it.",
                new Map([[PositiveEmotion.Gratitude, 2],
                         [PositiveEmotion.Trust,     1]])
            )
        );

        npcInteractionEvents.get(NpcIndex.ID_JORDI).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 15, 45),
                "Was curious about the spearhead stone and of my uncle's " +
                "travels.",
                new Map([[PositiveEmotion.Gratitude, 2],
                         [PositiveEmotion.Trust,     1]])
            )
        );
    }

    npcInteractionEvents.get(NpcIndex.ID_JORDI).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 0),
            "Noted the value of fishing in enriching the local diet.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    // At Petra's meal.
    for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
        npcInteractionEvents.get(NpcIndex.ID_PETRA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 16, 30),
                "I'm sure they're all good youths and am happy to have them with us.",
                new Map([[PositiveEmotion.Respect, 3],
                         [PositiveEmotion.Trust, 3,],
                         [PositiveEmotion.Gratitude, 3]])
            )
        );
    }

    for (const pc of [PcIndex.ID_PANZER, PcIndex.ID_HELIOS, PcIndex.ID_CYRION]) {
        npcInteractionEvents.get(NpcIndex.ID_PETRA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 16, 30),
                "I'm glad they partook in the meal we made and gave us company.",
                new Map([[PositiveEmotion.Gratitude, 3]])
            )
        );
    }

    npcInteractionEvents.get(NpcIndex.ID_PETRA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "I'm surprised and happy that they are willing to hear out the " +
            "story of an old nobody like myself.",
            new Map([[PositiveEmotion.Gratitude, 4],
                     [PositiveEmotion.Respect, 3],
                     [PositiveEmotion.Trust, 2]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 30),
            "Starry-dude's not too fond of gaming, it seems.",
            new Map()
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_PANZER).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 30),
            "Huh, that stupid bot actually challenged my skills.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_PANZER).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 30),
            "Huh, that stupid bot admittedly got a decent run, for a first timer.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "Heh, his holiness would also go down the path of the gaming addict...",
            new Map([[PositiveEmotion.Respect, 1],
                     [PositiveEmotion.Trust,   1]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "Wait, the investiture changed... that intent... hmm...",
            new Map([[PositiveEmotion.Trust, -3],
                     [PositiveEmotion.Respect, 2]]),
            17,
            new Map([[PositiveEmotion.Trust, true]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "He actually beat the boss, guy's got a bright future. (even if...)",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_PANZER).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "The bot acknowledged my skills, maybe I could try my hand at his " +
            "modules...",
            new Map([[PositiveEmotion.Gratitude, 1],
                     [PositiveEmotion.Trust, 1]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "Starry-dude speaks fondly to gran.",
            new Map([[PositiveEmotion.Respect,   2],
                     [PositiveEmotion.Trust,     1],
                     [PositiveEmotion.Gratitude, 3]])
        )
    );

    for (const pc of [PcIndex.ID_HELIOS, PcIndex.ID_PANZER]) {
        npcInteractionEvents.get(NpcIndex.ID_PETRA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 16, 45),
                "They're having fun with Hina.",
                new Map([[PositiveEmotion.Gratitude, 1]])
            )
        );
    }
}


function session5NpcInteractions()
{
    for (const pc of [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA]) {
        npcInteractionEvents.get(NpcIndex.ID_DAWN).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 17, 30),
                "It seems they're wreaking havoc on the paintbrushes.",
                new Map([[PositiveEmotion.Affection, 1]])
            )
        );
    }

    // for (const npc of [NpcIndex.ID_DAWN, NpcIndex.ID_TAIHE, NpcIndex.ID_TOMASA]) {
    for (const npc of [NpcIndex.ID_DAWN, NpcIndex.ID_TOMASA]) {
        npcInteractionEvents.get(npc).get(PcIndex.ID_CYRION).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 17, 30),
                "Oh, poor guy, apologizing for his friends. They must've got " +
                "him into trouble so many times...",
                new Map([[PositiveEmotion.Respect, 1]])
            )
        );
    }

    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 35),
            "Got assaulted by my innocent canvas. So cute.",
            new Map([[PositiveEmotion.Affection, 2]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 35),
            "Has a good imagination and a poetic painting in mind.",
            new Map([[PositiveEmotion.Respect, 2]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 35),
            "Ms. Dusk Herself chose to give him a chance. And requested that " +
            "he paint for Her.",
            new Map([[PositiveEmotion.Respect, 5],
                     [PositiveEmotion.Trust, 2]]),
            22
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 40),
            "It seems clear his hands are not of a painter's and lack the " +
            "smooth motions. Yet his spirit longs to express itself. Was that " +
            "why he was chosen?",
            new Map([[PositiveEmotion.Trust, 1]]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 40),
            "Helped stabilize his friend's hand by guiding it with the powers " +
            "of nature.",
            new Map([[PositiveEmotion.Respect, 2],
                     [PositiveEmotion.Gratitude, 1]]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 45),
            "The painting turned out so... inspired. <em>Honor holding back the " +
            "Wrath of Devotion.</em> Beautiful. And... it seems She agrees.",
            new Map([[PositiveEmotion.Respect, 7],
                     [PositiveEmotion.Trust, 4]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 50),
            "<span style='font-size: 10px;'>I'm not the person they seem to think me to be.</span> <span style='font-size: 9px;'>I cannot give " +
            "an answer to their problems, or even some of their questions." +
            "I'm feeling a bit...  </span> <span style='font-size: 8px;'>overwhelmed... particularly when they " +
            "ask me what I was before. </span> <span style='font-size: 7px;'> It isn't...</span> Thanks for letting me get back.",
            new Map([[PositiveEmotion.Respect, 1],
                     [PositiveEmotion.Gratitude, 4]]),
            18
        )
    );

    for (const npc of [NpcIndex.ID_DAWN, NpcIndex.ID_TOMASA]) {
    // for (const npc of [NpcIndex.ID_DAWN, NpcIndex.ID_TAIHE, NpcIndex.ID_TOMASA]) {
        for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
            npcInteractionEvents.get(npc).get(pc).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 0),
                    "They helped us out with cooking for the community dinner. They " +
                    "weren't quite particularly skilled, but that makes it good " +
                    "to see that they didn't consider good, honest labour like " +
                    "cooking beneath them.",
                    new Map([[PositiveEmotion.Respect, 1],
                             [PositiveEmotion.Gratitude, 1],
                             [PositiveEmotion.Trust, 1]])
                )
            );
        }
    }

    npcInteractionEvents.get(NpcIndex.ID_ERICA).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 25),
            "Seemed to be interested in books and literature in all forms.",
            new Map([[PositiveEmotion.Respect, 1]]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_ERICA).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "Nudged me to write. Was being genuine when she mentioned she would " +
            "love to read something I came up with.",
            new Map([[PositiveEmotion.Gratitude, 7],
                     [PositiveEmotion.Respect, 3],
                     [PositiveEmotion.Trust, 4]]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "What's her game here? Why's this strange elf woman encouraging " +
            "my wife so? Just another fan of literature? Or is there some " +
            "ulterior motive I'm missing...",
            new Map([[PositiveEmotion.Trust, -2],
                     [PositiveEmotion.Respect, 1]]),
            18,
            new Map([[PositiveEmotion.Trust, true]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_JORDI).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "Seemed to be even more interested in my tales from the seas.",
            new Map([[PositiveEmotion.Gratitude, 1]]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_YUKI).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "Why's he suddenly so interested in Hav? This druid's clearly not " +
            "a seafarer. In fact, I won't be surprised to know he's never sailed before. " +
            "Jordi's too naive for his own good, but this seems a touch too " +
            "blatant. I'll have to keep an eye out...",
            new Map([[PositiveEmotion.Trust, -3]]),
            15,
            new Map([[PositiveEmotion.Trust, true]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_KASTOR).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "Ugh.. the way he socializes with those two losers. It's " +
            "nauseating... Just look at Jordi blabbering and that emo acting " +
            "all cool like he doesn't care...",
            new Map([[PositiveEmotion.Respect, -2]]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_PETRA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "It's good to see how the kid can bring Jordi out of his shell " +
            "again. He's been brooding a lot lately...",
            new Map([[PositiveEmotion.Respect, 2]]),
        )
    );


    // Quinn interactions
    npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 30),
            "From Sadhvastan huh. I'm not quite sure I like this. Things must " +
            "be pretty bad if the Tsar had to pull out the associations with " +
            "them. What really is happening? And that appearance... oh shit, " +
            "Oh Shit. Oh SHIT!",
            new Map([
                [PositiveEmotion.Trust, -8],
                [PositiveEmotion.Respect, 8]
            ]),
            22
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_INGRID).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 30),
            "Talking to him was really a comfort. Been so long since I could " +
            "speak my heart out to someone.",
            new Map([
                [PositiveEmotion.Gratitude, 4],
                [PositiveEmotion.Trust, 1],
                [PositiveEmotion.Respect, 1]
            ])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_JAYE).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 50),
            "Boss was a cool customer. But sly as an eel. Even now can't " +
            "understand how I let my guard down to reveal so much...",
            new Map([
                [PositiveEmotion.Respect, 4],
                [PositiveEmotion.Trust, -1]
            ]),
            13,
            new Map([[PositiveEmotion.Trust, true]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_VERNA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 18, 30),
            "A person hanging between life and death, who immediately saw " +
            "through me. But somehow I feel this is different, and <em>feel</em> " +
            "that he means no harm. I revealed more than I should have, but I " +
            "think I am glad I did.",
            new Map([
                [PositiveEmotion.Trust, 3],
                [PositiveEmotion.Gratitude, 2],
                [PositiveEmotion.Respect, 2],
            ])
        )
    );

    ((memoriesErased) => {

        // In the midst of a blizzard, strange creatures showing up and general
        // confusion, Helios standing up calmly and rallying the villagers was a
        // huge source of comfort. But how do each of them react?
        // Well, I'm not going to copy and paste similar stuff and write
        // sentences for each of the twenty-something people, but some do merit
        // a unique interaction.
        const exclusionListH: NpcIndex[] = [
            NpcIndex.ID_ELYSIUM,
            NpcIndex.ID_BJORN,
            NpcIndex.ID_HAV,
            NpcIndex.ID_SASHA,
            NpcIndex.ID_CECELIA
        ];

        const exclusionListC: NpcIndex[] = [
            NpcIndex.ID_ELYSIUM,
            NpcIndex.ID_BJORN,
            NpcIndex.ID_HAV,
            NpcIndex.ID_SASHA,
            NpcIndex.ID_CECELIA
        ];

        const exclusionListA: NpcIndex[] = [
            NpcIndex.ID_ELYSIUM,
            NpcIndex.ID_BJORN,
            NpcIndex.ID_HAV,
            NpcIndex.ID_SASHA,
            NpcIndex.ID_CECELIA
        ];

        const exclusionListP: NpcIndex[] = [
            NpcIndex.ID_ELYSIUM,
            NpcIndex.ID_BJORN,
            NpcIndex.ID_HAV,
            NpcIndex.ID_SASHA,
            NpcIndex.ID_CECELIA
        ];

        const exclusionListQ: NpcIndex[] = [
            NpcIndex.ID_ELYSIUM,
            NpcIndex.ID_BJORN,
            NpcIndex.ID_HAV,
            NpcIndex.ID_SASHA,
            NpcIndex.ID_CECELIA
        ];

        // Some will retain their memories after what happens...
        npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_HELIOS).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Kept his cutlery back slowly and primly before standing and drawing his " +
                "weapon. Touché. Yep, dude's definitely a seasoned warrior...<br/>" +
                "and a killer through-and-through.",
                new Map([[PositiveEmotion.Trust, -2],
                         [PositiveEmotion.Respect, 5]]),
                10,
                new Map([[PositiveEmotion.Trust, true]])
            )
        );
        exclusionListH.push(NpcIndex.ID_HINA);

        npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_CYRION).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "The others didn't seem to notice, but was a large part " +
                "responsible for us not getting ambushed right outside the " +
                "door. Doesn't seem addicted to violence.",
                new Map([[PositiveEmotion.Gratitude, 2],
                         [PositiveEmotion.Trust, 1],
                         [PositiveEmotion.Respect, 3]]),
            )
        );
        exclusionListC.push(NpcIndex.ID_HINA);

        npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_PANZER).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Charged right out huh? Not very smart, but gets the job done... " +
                "Pity I didn't take the lectures on AI back in-",
                new Map([[PositiveEmotion.Respect, 2]]),
            )
        );
        exclusionListP.push(NpcIndex.ID_HINA);

        npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_AURELIA).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Hmm... a spellcaster... they always find their throats to be " +
                "the first to be slit. But fireballs are cool anyway.",
                new Map([[PositiveEmotion.Respect, 4]]),
            )
        );
        exclusionListA.push(NpcIndex.ID_HINA);

        npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_QUINN).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Stood by the villagers to protect them. I can respect that. " +
                "Seen far too many blood-thirsty folk place greater value in " +
                "death than in life.",
                new Map([[PositiveEmotion.Respect, 1],
                         [PositiveEmotion.Trust, 1]]),
            )
        );
        exclusionListQ.push(NpcIndex.ID_HINA);

        npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_HELIOS).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Acted as a beacon of hope and helped keep the villagers calm" +
                " when <em>they</em> came...",
                new Map([[PositiveEmotion.Gratitude, 3],
                         [PositiveEmotion.Trust, 1]]),
            )
        );
        exclusionListH.push(NpcIndex.ID_DAWN);

        npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_CYRION).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Helped in organizing the villagers and keeping the inklings " +
                "at bay as he led us to Mr. Elysium's.",
                new Map([[PositiveEmotion.Gratitude, 3],
                         [PositiveEmotion.Respect, 1]]),
            )
        );
        exclusionListC.push(NpcIndex.ID_DAWN);

        npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_AURELIA).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Fireball after fireball. Teleporting roof-to-roof in the " +
                "shadows. All for these poor inklings. Hehe, aren't we dramatic?",
                new Map([[PositiveEmotion.Respect, 2]]),
            )
        );
        exclusionListA.push(NpcIndex.ID_DAWN);

        npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_PANZER).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Charging right in, huh?",
                new Map([[PositiveEmotion.Respect, 2]]),
            )
        );
        exclusionListP.push(NpcIndex.ID_DAWN);

        npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_QUINN).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Walked among our group to keep us safe.",
                new Map([[PositiveEmotion.Gratitude, 2]]),
            )
        );
        exclusionListQ.push(NpcIndex.ID_DAWN);

        if (!memoriesErased) {

            npcInteractionEvents.get(NpcIndex.ID_YUKI).get(PcIndex.ID_HELIOS).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "He shines so bright... ugh, it burns. Also the way <em>that man</em> " +
                    "looks at me - cringe.",
                    new Map([[PositiveEmotion.Trust, 1],
                             [PositiveEmotion.Gratitude, -4],
                             [PositiveEmotion.Respect, 4]]),
                    19,
                )
            );
            exclusionListH.push(NpcIndex.ID_YUKI);

            npcInteractionEvents.get(NpcIndex.ID_IONA).get(PcIndex.ID_HELIOS).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Saved me!! Gods below, I didn't see that coming... Rusts, " +
                    "that thing would've... would've...",
                    new Map([[PositiveEmotion.Trust, 4],
                             [PositiveEmotion.Gratitude, 4],
                             [PositiveEmotion.Respect, 2]]),
                    19,
                )
            );
            exclusionListH.push(NpcIndex.ID_IONA);

            npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_HELIOS).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Chosen by a Ryshadium! A ryshadium who came to our aid " +
                    "during this fearsome storm with all the demons that " +
                    "emerged from it.",
                    new Map([[PositiveEmotion.Trust, 2],
                             [PositiveEmotion.Gratitude, 4],
                             [PositiveEmotion.Respect, 5]])
                )
            );

            npcInteractionEvents.get(NpcIndex.ID_SASHA).get(PcIndex.ID_HELIOS).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Sent his mount to protect Cecilia and me.",
                    new Map([[PositiveEmotion.Trust, 1],
                             [PositiveEmotion.Gratitude, 5],
                             [PositiveEmotion.Respect, 3]])
                )
            );

            npcInteractionEvents.get(NpcIndex.ID_KASTOR).get(PcIndex.ID_HELIOS).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "The way he was so completely in command... I wish " +
                    "that was me instead.",
                    new Map([[PositiveEmotion.Trust, 1],
                             [PositiveEmotion.Gratitude, -2],
                             [PositiveEmotion.Respect, 4]]),
                    10,
                    new Map([[PositiveEmotion.Gratitude, true]])
                )
            );
            npcInteractionEvents.get(NpcIndex.ID_KASTOR).get(PcIndex.ID_HELIOS).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Did he not consider me worthy of assisting him in combat? " +
                    "And he considered <em>Yuki</em> worthy enough instead? Heh, " +
                    "and the coward didn't even pick up the weapon.",
                    new Map([[PositiveEmotion.Trust, -1],
                             [PositiveEmotion.Gratitude, -2],
                             [PositiveEmotion.Respect, -1]]),
                    10,
                    new Map([[PositiveEmotion.Gratitude, true]])
                )
            );
            exclusionListH.push(NpcIndex.ID_KASTOR);

            npcInteractionEvents.get(NpcIndex.ID_JAYE).get(PcIndex.ID_HELIOS).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Now, why did he throw the spear towards me?",
                    new Map([])
                )
            );
            npcInteractionEvents.get(NpcIndex.ID_VERNA).get(PcIndex.ID_HELIOS).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Was more comfortable when the attack started compared " +
                    "to the dinner. It's been " +
                    "so long since I met someone like that. And in handing me " +
                    "the javelin, he also immediately noted me as a warrior. " +
                    "That... regrettably... makes me proud.",
                    new Map([[PositiveEmotion.Trust, 3],
                             [PositiveEmotion.Gratitude, 1],
                             [PositiveEmotion.Respect, 7]])
                )
            );

            npcInteractionEvents.get(NpcIndex.ID_VERNA).get(PcIndex.ID_HELIOS).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Saved Iona in the nick of time from that monster.",
                    new Map([[PositiveEmotion.Gratitude, 7]])
                )
            );
            exclusionListH.push(NpcIndex.ID_VERNA);

            npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_HELIOS).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Just as he warned, <em>the monsters from the north</em> came. How did he know? " +
                    "But he stood up for us, nobly and bravely like I'd expect. " +
                    "Did the Tsar send him? If so, for what purpose?",
                    new Map([[PositiveEmotion.Trust, -2],
                             [PositiveEmotion.Gratitude, 2],
                             [PositiveEmotion.Respect, 4]]),
                    10,
                    new Map([[PositiveEmotion.Trust, true]])
                )
            );
            exclusionListH.push(NpcIndex.ID_COROTO);

            npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_CYRION).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Was in good command of the powers of nature as he covered " +
                    "our escape. Well, would suck if a druid from that weak nation " +
                    "couldn't even do that. But... I suppose there is a reason why " +
                    "the other strong folk keep him around...",
                    new Map([[PositiveEmotion.Trust, 4],
                             [PositiveEmotion.Gratitude, -1],
                             [PositiveEmotion.Respect, 4]]),
                    10,
                    new Map([[PositiveEmotion.Gratitude, true]])
                )
            );
            exclusionListC.push(NpcIndex.ID_COROTO);

            npcInteractionEvents.get(NpcIndex.ID_JORDI).get(PcIndex.ID_CYRION).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Amazing! I was considering him to be like myself, but there's " +
                    "no way I could stand against such odds and protect such a large " +
                    "group at the same time.",
                    new Map([[PositiveEmotion.Trust, 4],
                             [PositiveEmotion.Gratitude, 2],
                             [PositiveEmotion.Respect, 5]]),
                )
            );
            exclusionListC.push(NpcIndex.ID_JORDI);

            npcInteractionEvents.get(NpcIndex.ID_YUKI).get(PcIndex.ID_CYRION).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Well, ig he doesn't want us dead at least. Too easy to feign " +
                    "weakness in this crisis and let the monsters do the rest.",
                    new Map([[PositiveEmotion.Trust, 3]]),
                )
            );
            exclusionListC.push(NpcIndex.ID_JORDI);

            npcInteractionEvents.get(NpcIndex.ID_ERICA).get(PcIndex.ID_AURELIA).push(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "I suspected she was a powerful spellcaster, but damn, I don't " +
                    "think I, as an Ursine noble, met more than a handful of mages who could conjure " +
                    "fireballs! And with such frequency! Father would " +
                    "be so proud to meet her... but why would she care about " +
                    "someone like me?",
                    new Map([[PositiveEmotion.Respect, 5],
                             [PositiveEmotion.Gratitude, 3],]),
                )
            );
            exclusionListA.push(NpcIndex.ID_ERICA);

            for (const [npcIndex, npc] of Character.IndexById) {
                if (!npc.isVillageNpc) {
                    continue;
                }

                if (!exclusionListH.includes(npcIndex)) {
                    npcInteractionEvents.get(npcIndex).get(PcIndex.ID_HELIOS).push(
                        new NpcInteractionEvent(
                            new GameTimestamp(0, 5, 19, 45),
                            "Was completely in control during the fearsome blizzard " +
                            "and took charge when the monsters arrived.",
                            new Map([[PositiveEmotion.Trust, 1],
                                     [PositiveEmotion.Gratitude, 1],
                                     [PositiveEmotion.Respect, 4]]),
                        )
                    );
                }
                if (!exclusionListC.includes(npcIndex)) {
                    npcInteractionEvents.get(npcIndex).get(PcIndex.ID_CYRION).push(
                        new NpcInteractionEvent(
                            new GameTimestamp(0, 5, 19, 45),
                            "Organized our retreat while stalling the monsters " +
                            "nearby.",
                            new Map([[PositiveEmotion.Trust, 1],
                                     [PositiveEmotion.Gratitude, 4],
                                     [PositiveEmotion.Respect, 1]]),
                        )
                    );
                }
                if (!exclusionListA.includes(npcIndex)) {
                    npcInteractionEvents.get(npcIndex).get(PcIndex.ID_AURELIA).push(
                        new NpcInteractionEvent(
                            new GameTimestamp(0, 5, 19, 45),
                            "Stood tall in the fearsome blizzard and granted us " +
                            "cover from the aerial roof.",
                            new Map([[PositiveEmotion.Trust, 1],
                                     [PositiveEmotion.Gratitude, 4],
                                     [PositiveEmotion.Respect, 1]]),
                        )
                    );
                }
                if (!exclusionListQ.includes(npcIndex)) {
                    npcInteractionEvents.get(npcIndex).get(PcIndex.ID_QUINN).push(
                        new NpcInteractionEvent(
                            new GameTimestamp(0, 5, 19, 45),
                            "Walked among our group to keep us safe.",
                            new Map([[PositiveEmotion.Trust, 2],
                                     [PositiveEmotion.Gratitude, 2],
                                     [PositiveEmotion.Respect, 1]]),
                        )
                    );
                }
                if (!exclusionListP.includes(npcIndex)) {
                    npcInteractionEvents.get(npcIndex).get(PcIndex.ID_PANZER).push(
                        new NpcInteractionEvent(
                            new GameTimestamp(0, 5, 19, 45),
                            "Charged right into the heart of the enemy.",
                            new Map([[PositiveEmotion.Respect, 5],
                                     [PositiveEmotion.Trust, 2]]),
                        )
                    );
                }
            }
        }
    })(true);
}


function session6NpcInteractions()
{
    npcInteractionEvents.get(NpcIndex.ID_ERICA).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 6, 0),
            "Huh that was quite a shove. But given how polite they were in " +
            "asking if they could visit our garden yesterday, I can only " +
            "assume something has happened...",
            new Map([]),
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_ERICA).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 6, 30),
            "The way Ms. Aurelia's owl was staring after me, hiding in the " +
            "bush until I saw it, then flying off - I'm sure of it. Probably one of her " +
            "spellcasting powers. I hope I'm mistaken, but... sigh, I doubt " +
            "it. That's how those with power act, and I was a fool to expect " +
            "otherwise. <span style='font-size: 9px'>Even after telling her " +
            "to leave me alone as clearly as I could, won't take no for an " +
            "answer. Let alone respect any measure of my privacy, I'm seen as " +
            "an object and downright forbidden to keep my secrets to myself. " +
            "Can't live with their own paranoia and would downright descend " +
            "to <em>spying</em> to find out whatever tf they suspect me of " +
            "hiding from their highnesses.</span><br/>" +
            "Wait, the owl being there was probably a coincidence. I hope " +
            "I'm overthinking stuff.",
            new Map([
                [PositiveEmotion.Trust, -7],
                [PositiveEmotion.Gratitude, -2],
                [PositiveEmotion.Respect, -4],
            ]),
            20,
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 7, 30),
            "Channeled his investiture to heal me. God knows I needed that, " +
            "phew... <em>What the hell just happened?</em>&nbsp; What was this sudden " +
            "touch of death that almost snuffed all our souls out?",
            new Map([
                [PositiveEmotion.Gratitude, 3]
            ]),
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_TOMASA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 7, 30),
            "Healed me, probably saving me from the verge of death... but... " +
            "what does it matter, now that... why... Taihe...",
            new Map([
                [PositiveEmotion.Gratitude, 2]
            ]),
        )
    );
}


function session7NpcInteractions()
{
    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 8, 0),
            "Remained business-like in investigating last night even in the " +
            "face of Taihe's death. But I suppose it's to be expected, they'd " +
            "have seen death in their profession, but what happened last night " +
            "was bizarre and deserving of explanation.",
            new Map()
        )
    );

    for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
        npcInteractionEvents.get(NpcIndex.ID_DAWN).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 6, 8, 30),
                "So they were around the garden statue, huh. I did suspect " +
                "they were somehow involved in Taihe's death, given the " +
                "coincidence. But why would they do that? Must've been an " +
                "accident, right?",
                new Map([
                    [PositiveEmotion.Affection, -2],
                    [PositiveEmotion.Trust, -3]
                ]),
                12,
                new Map([
                    [PositiveEmotion.Affection, true]
                ])
            )
        );
    }

    npcInteractionEvents.get(NpcIndex.ID_TOMASA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 8, 0),
            "Tried to examine Taihe's body and analyze what happened.",
            new Map()
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 8, 0),
            "Volunteered for hard labour with his own hands.",
            new Map([
                [PositiveEmotion.Respect, 2],
                [PositiveEmotion.Trust, 1],
            ])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_ROBERTA).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 8, 0),
            "Seems to have some passing knowledge of alchemy.",
            new Map([
                [PositiveEmotion.Respect, 1]
            ])
        )
    );


    for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
        npcInteractionEvents.get(NpcIndex.ID_VITACIA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 6, 8, 15),
                "Their arrival brought doom!! They killed him. THEY KILLED HIM! " +
                "I know they did this. They made poor Taihe suffer so much. And " +
                "now... I must... live the rest of... no, no... I can't. ",
                new Map([
                    [PositiveEmotion.Respect, -1],
                    [PositiveEmotion.Trust, -1],
                    [PositiveEmotion.Affection, -4]
                ])
            )
        );
    }

    npcInteractionEvents.get(NpcIndex.ID_VITACIA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 8, 15),
            "His face betrays his crime. The way he avoids my gaze. The weird " +
            "way his powers work. And the way he seems to know what happened " +
            "to Taihe's body. He must have done it! I know he did!",
            new Map([
                [PositiveEmotion.Respect, -4],
                [PositiveEmotion.Trust, -4],
                [PositiveEmotion.Affection, -6]
            ])
        )
    );

    for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
        npcInteractionEvents.get(NpcIndex.ID_VITACIA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 6, 8, 18),
                "Oh Saints above! What was wrong with me? How did I just blame " +
                "them with no reasons whatever? My pain absolutely doesn't " +
                "excuse this unfairness! Yet... they don't seem to hate me for " +
                "it.",
                new Map([
                    [PositiveEmotion.Respect, pc == PcIndex.ID_CYRION ? 9 : 3],
                    [PositiveEmotion.Trust, pc == PcIndex.ID_CYRION ? 9 : 3],
                    [PositiveEmotion.Affection, pc == PcIndex.ID_CYRION ? 9 : 6]
                ]),
                10,
                new Map([
                    [PositiveEmotion.Affection, true],
                    [PositiveEmotion.Respect, true],
                    [PositiveEmotion.Trust, true],
                ])
            )
        );
    }

    npcInteractionEvents.get(NpcIndex.ID_VITACIA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 8, 30),
            "Even though I don't blame him for Taihe's death anymore, he seems to have " +
            "begun to hate himself for it. Just great, you've done it now, you " +
            "terrible, awful person. And even then he tries his best to console " +
            "me.",
            new Map([
                [PositiveEmotion.Respect, 6],
                [PositiveEmotion.Trust, 5],
                [PositiveEmotion.Affection, 9]
            ]),
            10,
            new Map([[PositiveEmotion.Affection, true]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_ROBERTA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 8, 30),
            "Offered 'Tacia a potion to numb the pain. Unusual to find one versed " +
            "in those, versed enough to know it's not a magic cure, and to " +
            "recommend judicious use. And Saints know we needed it now.",
            new Map([
                [PositiveEmotion.Respect, 4],
                [PositiveEmotion.Trust, 2],
                [PositiveEmotion.Gratitude, 3]
            ]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 8, 30),
            "Fell under a powerful wave of guilt. But that clearly was his " +
            "vulnerable mind. Its signature is that of a false guilt complex. " +
            "Conscience strong with this guy. Fairly certain he's not the " +
            "killer.",
            new Map([
                [PositiveEmotion.Trust, 4]
            ]),
            30
        )
    );

    for (const pc of [PcIndex.ID_QUINN, PcIndex.ID_PANZER]) {
        npcInteractionEvents.get(NpcIndex.ID_HINA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 6, 8, 30),
                "Expected levels of sub-conscious guilt when provoked. Not much " +
                "in active consciousness. Nothing to remark here.",
                new Map([]),
                30
            )
        );
    }

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 8, 30),
            "Heh, decently suppressed, and I was distracted by the starry guy overreacting... " +
            "but it's clear. You're the killer, aren't you? That's some fresh guilt quashed in " +
            "there. You're not absolute scum, but it's too less for - ahem - <em>culpable " +
            "homicide not amounting to murder</em>...",
            new Map([
                [PositiveEmotion.Trust, -3],
                [PositiveEmotion.Respect, -2]
            ]),
            30
        )
    );


    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 8, 30),
            "Hmm, actually mitigated the guilt of his friend to some degree, " +
            "and didn't feel any of his own. Not now, and very little in the " +
            "past. Is it because he didn't focus on me enough, because he is " +
            "a hero? Or is it because he is a psychopath?",
            new Map([
                [PositiveEmotion.Trust, 1],
                [PositiveEmotion.Respect, 2]
            ]),
            30
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 9, 0),
            "You were the harbinger of death after all. What did the boy do wrong? " +
            "Has the Tsar sent you? Will he come after me next? Did I offend " +
            "the Tsar in any way? Will I be killed for not knowing the boy's crimes?",
            new Map([
                [PositiveEmotion.Trust, -4],
                [PositiveEmotion.Respect, 4]
            ]),
            17
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_YUKI).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 9, 0),
            "A soul sheared. A paladin. A druid digging up the pasts of people " +
            "here. Coincidences? I think not. Poor Taihe, you had no chance " +
            "did you... I shudder at the last sight those eyes of your saw. " +
            "The pure horror of inescapable death before they burnt. That bastard!" +
            "slaughtering a kid like that...",
            new Map([
                [PositiveEmotion.Affection, -6],
                [PositiveEmotion.Respect, -4]
            ]),
            20
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_ERICA).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 9, 30),
            "So it was spying after all... sigh. I'd hoped I was wrong. " +
            "Apologizing after being caught still leaves a bad aftertaste, but " +
            "at least it makes her a much better person than one who wouldn't. " +
            "I'm not sure how far I can trust those words, but she did sound " +
            "genuinely remorseful, and not as arrogant as I feared. Maybe I'll " +
            "give it another try and see how it goes.",
            new Map([
                [PositiveEmotion.Trust, 3],
                [PositiveEmotion.Respect, 6],
            ]),
            17,
            new Map([[PositiveEmotion.Trust, true]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_SASHA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 9, 30),
            "Guy did a check-in on my mental health, but I wasn't really the " +
            "one who needed it... Ah well, I suppose I'll be learning the " +
            "lute now. Something to look forward to ig.",
            new Map([
                [PositiveEmotion.Gratitude, 2],
            ]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_GENEFE).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 9, 30),
            "Hey! um... well.. yeah you may hold her wheelchair I suppose.",
            new Map([
                [PositiveEmotion.Respect, -1],
            ]),
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_GENEFE).get(PcIndex.ID_PANZER).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 9, 30),
            "Seems concerned about the children's education. Seems to " +
            "consider those 'video games' from hell magical.",
            new Map([
                [PositiveEmotion.Respect, 0],
                [PositiveEmotion.Gratitude, -1],
            ]),
            10,
            new Map([[PositiveEmotion.Gratitude, true]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 9, 30),
            "Seems to know something is wrong here. Also gave off weird vibes " +
            "like Hina once did.",
            new Map([
                [PositiveEmotion.Respect, 3],
            ]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 9, 30),
            "Claims he would try to search for a way to save me. I wish I " +
            "could believe that. Those probably aren't empty words, but I " +
            "don't think he could succeed, or if there even is a way to. " +
            "But... if someone's trying... dare I hope? ",
            new Map([
                [PositiveEmotion.Gratitude, 5],
            ]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 9, 30),
            "No, no, no. Don't do that. Don't give me hope. Being alive " +
            "and powerful like yourself, it's easy to believe everything is " +
            "possible. But I am already a corpse. Please don't...",
            new Map([
                [PositiveEmotion.Gratitude, -3],
                [PositiveEmotion.Affection, -2],
            ]),
            19,
            new Map([[PositiveEmotion.Affection, true]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 10, 30),
            "Was concerned about Helios causing me hurt.",
            new Map([
                [PositiveEmotion.Gratitude, 3],
            ]),
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 10, 30),
            "When that worry subsided, it became clear how much mutual trust " +
            "and joviality lies in their friendship. Ahh... I wish I had " +
            "someone like that.",
            new Map([
                [PositiveEmotion.Respect, 3],
                [PositiveEmotion.Gratitude, -1],
            ]),
            19,
            new Map([[PositiveEmotion.Gratitude, true]])
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 10, 30),
            "It's clear how much mutual trust and joviality lies in their " +
            "friendship. Ahh... I wish I had someone like that.",
            new Map([
                [PositiveEmotion.Respect, 3],
                [PositiveEmotion.Gratitude, -1],
            ]),
            19,
            new Map([[PositiveEmotion.Gratitude, true]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_YUKI).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 11, 30),
            "Was it my imagination or did he know more about my circumstances " +
            "than met the eye? At least it led to the resolution of my " +
            "suspicions and prevented... any unfortunate mishaps.",
            new Map([
                [PositiveEmotion.Gratitude, 2],
                [PositiveEmotion.Trust, -1]
            ]),
            10,
            new Map([[PositiveEmotion.Trust, true]])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_YUKI).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 11, 30),
            "Wait an alias attestable by the brat's father himself? And now " +
            "that I notice... his oath's clearly not that advanced yet. I was " +
            "barking up the wrong tree. I don't know how that makes me feel. " +
            "But I can't help seeing him as a misguided junior. Oh, you poor " +
            "boy, if only you knew... there's no point. After all, <em>Honor is dead</em>.",
            new Map([
                [PositiveEmotion.Affection, 9],
                [PositiveEmotion.Respect, 4]
            ]),
            20
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_YUKI).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 11, 30),
            "All that said, the way he glows. That radiance is blinding. " +
            "Maybe... in another reality...",
            new Map([
                [PositiveEmotion.Respect, 5],
                [PositiveEmotion.Gratitude, -4]
            ]),
            20
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 11, 30),
            "Made a superficial attempt to console me, changing to her topics " +
            "of interest real quick at the slightest word from me. But then " +
            "she really didn't have a reason to care either.",
            new Map([
                [PositiveEmotion.Trust, 1],
            ])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_AURELIA).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 11, 45),
            "Took the initiative to teach the kids! I... that's... Thank you! " +
            "Thank you so much! With this, there may be some future for them yet.",
            new Map([
                [PositiveEmotion.Respect, 7],
                [PositiveEmotion.Gratitude, 7],
                [PositiveEmotion.Trust, 3],
            ])
        )
    );

    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 11, 30),
            "Oh you poor boy, here we go. You did nothing wrong.",
            new Map([
                [PositiveEmotion.Trust, 1]
            ]),
            30
        )
    );

    for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
        npcInteractionEvents.get(NpcIndex.ID_DAWN).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 6, 12, 0),
                "Finally, after all these years... people I could open up to...",
                new Map([
                    [PositiveEmotion.Respect, pc == PcIndex.ID_HELIOS ? 8 : 4],
                    [PositiveEmotion.Gratitude, pc == PcIndex.ID_HELIOS ? 9 : 5],
                    [PositiveEmotion.Trust, pc == PcIndex.ID_HELIOS ? 6 : 3],
                ])
            )
        );
    }

    npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_CYRION).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 12, 0),
            "Feels sorry for my state. But if only he knew... just how little " +
            "I deserve that.",
            new Map([
                [PositiveEmotion.Gratitude, 4],
                [PositiveEmotion.Affection, 2],
            ])
        )
    );
}

function session8NpcInteractions()
{
    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 12, 15),
            "Oh, an Honorspren-bound. Well he at least won't massacre us, " +
            " but... I'll probably need to keep a vigil for incoming bits of " +
            "wisdom... sigh.",
            new Map([
                [PositiveEmotion.Trust, 12],
                [PositiveEmotion.Respect, -1],
            ]),
            10
        )
    );
    for (const pc of [PcIndex.ID_HELIOS, PcIndex.ID_QUINN]) {
        npcInteractionEvents.get(NpcIndex.ID_HINA).get(pc).push(
            new NpcInteractionEvent(
                new GameTimestamp(0, 6, 12, 15),
                "Wait, is that honorspren bound to the both of them? And are two" +
                " spren bound to Helios? What... sort of an orgy is happening here?",
                new Map([
                    [PositiveEmotion.Respect, 1],
                ]),
                10
            )
        );
    }
    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_HELIOS).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 12, 15),
            "???",
            new Map([
                [PositiveEmotion.Trust, 2],
                [PositiveEmotion.Respect, 4],
            ]),
            30
        )
    );
    npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_QUINN).push(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 12, 15),
            "???",
            new Map([
                [PositiveEmotion.Trust, 7],
                [PositiveEmotion.Respect, 2],
            ]),
            30
        )
    );
}

let $individualAst : JQuery;
let $eventsList : JQuery;
let $opinionTags : JQuery;

function generateOpinionTag(e: PositiveEmotion, r: number)
{
    if (r == 0) return '';
    const tText = r > 0 ? PositiveEmotion[e] : NegativeEmotion.get(e);
    const tVal = Math.abs(r);
    return `<div class="effect_tag" data-emo="${tText}">${tText}: ${tVal}</div>`;
}

function renderDetails()
{
    const npcId: NpcIndex = $(this).data("npcId");
    const pcId: PcIndex = $(this).data("pcId");

    $eventsList.empty();
    $opinionTags.empty();

    const eventsDesc = [];
    for (const npcInteractionEvent of npcInteractionEvents.get(npcId).get(pcId)) {
        eventsDesc.push(npcInteractionEvent.eventDesc);
    }

    for (const e of getEnumIterator(PositiveEmotion) as Generator<PositiveEmotion>) {
        $opinionTags.append(
            generateOpinionTag(e, npcOpinions.get(npcId).get(pcId).getEmotion(e))
        );
    }

    $eventsList.html(eventsDesc.join(""));
    $individualAst.show();
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
        npcOpinions.set(npcIndex, new Map());
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
    session4NpcInteractions();
    session5NpcInteractions();
    session6NpcInteractions();
    session7NpcInteractions();
    session8NpcInteractions();

    $individualAst = $("#individual_ast");
    $eventsList = $("#individual_ast .events_list");
    $opinionTags = $("#individual_ast .opinion_tags");
    const $table_area = $("#attitude_summary_table_area");
    renderNpcOpinionTable($table_area);

    $table_area.on("click", ".npc_opinion", renderDetails);
}
