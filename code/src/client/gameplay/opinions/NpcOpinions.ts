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
 *    + I am uncertain if affection emerges in an absence of gratitude, trust
 * or
 *      respect - but can maybe consider a light-hearted person feeling
 * pleasant
 *      for a jovial character even in the absence of all that. Or maybe a
 * grave
 *      person for someone who has been suffering? Or even a grave person for a
 *      jovial character, why not. This kind of does fall into the brackets of
 *      respect or empathy though. For the sake of empathy, I'll say the base
 *      metric too can be directly modified, though it should be rare.
 *
 * 3. Unlike these, emotions like respect and envy can co-exist for a while
 *    before one suffocates the other. Likewise, respect and fear. Or even say
 *    envy and trust.
 *
 * 4. On that note, fear is considered a part of paranoia, i.e. the form which
 * a
 *    lack of trust takes when the opposing party is much more powerful than
 * the
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
 *    five people every day probably won't think that much of a happy event
 * they
 *    had with one person on a Friday. But if that same thing transpired
 *    between two people who rarely see others and who hung out together a
 * while
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
 * Note that as a V1 model, I will not be distinguishing between short-term
 * mood
 * and long-term attitude at least in interpersonal relationships. I can
 * roleplay short-term mood as the need arises in this case. It is unlikely
 * I'll
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
 */

import {getEnumIterator}         from "../common";
import {PcCharismaMods, PcIndex} from "../data/pcIndex";
import {IDOMGenerator}           from "../IDomGenerator";
import {NpcID }                  from "../data/npcIndex";
import {GameTimestamp}           from "../GameTimestamp";
import {getZone}                          from "./common";
import {testSlot}                         from "./FixedSizeSlot";
import {IAttitudeHandler}                 from "./IAttitudeHandler";
import {NpcInteractionEvent}              from "./NpcInteractionEvent";
import {NegativeEmotion, PositiveEmotion} from "./PositiveEmotion";
import {RenderableEvent}                  from "./RenderableEvent";
import {
    StandardAttitudeHandler,
    testAttitudeHandler
}                                         from "./StandardAttitudeHandler";
import {testBufferedAttitude}             from "./StandardBufferedAttitudeList";
import {TimeskipEvent}                    from "./TimeskipEvent";


export class NpcOpinion
    implements IDOMGenerator
{
    private readonly attitudeHandlers: Map<PositiveEmotion, IAttitudeHandler> =
        new Map();

    private readonly events: RenderableEvent[] = [];

    private currentTime: GameTimestamp;

    public constructor(public readonly npc: NpcID,
                       public readonly pc: PcIndex)
    {
        this.currentTime = null;
        for (const emotion of getEnumIterator(PositiveEmotion) as Generator<PositiveEmotion>) {
            this.attitudeHandlers.set(emotion, new StandardAttitudeHandler());
        }
    }

    public addEvent(event: RenderableEvent): void
    {
        if (this.currentTime != null) {
            if (event.startTime.totalDays > this.currentTime.totalDays + 2) {
                console.warn(`Gap between events ${event.startTime.totalDays} -> ` +
                             `${this.currentTime.totalDays} not covered by timeskip.`);
            }
            if (event.startTime.totalMillis < this.currentTime.totalMillis) {
                throw new Error(
                    `Cannot move backward in time, current time ${this.currentTime.generateDOMString()} ` +
                    `event start time ${event.startTime.generateDOMString()}.`);
            }
        }
        else {
            // First impressions.
            // Add the base charisma respect since this is the first
            // interaction.
            this.currentTime = event.startTime;
            this.addEvent(new NpcInteractionEvent(
                event.startTime,
                "Base Charisma.",
                new Map([
                            [
                                PositiveEmotion.Respect,
                                PcCharismaMods.get(this.pc)
                            ]
                        ])
            ));
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
        }
        else if (event instanceof NpcInteractionEvent) {
            for (const [emotion, value] of event.effects.entries()) {
                this.attitudeHandlers.get(emotion).addEvent(value);
            }
            this.currentTime = event.timestamp;
        }
    }

    public generateDOMString(): string
    {
        const t = getZone(this.getEmotion(PositiveEmotion.Trust));
        const $trustBorder =
            t >= 0 ? `<div class="emotion_border emotion_border--trust emotion_border--value_${t}"></div>`
                   : `<div class="emotion_border emotion_border--paranoia emotion_border--value_${-t}"></div>`;

        const g = getZone(this.getEmotion(PositiveEmotion.Gratitude));
        const $gratitudeBorder =
            g >= 0 ? `<div class="emotion_border emotion_border--gratitude emotion_border--value_${g}"></div>`
                   : `<div class="emotion_border emotion_border--envy emotion_border--value_${-g}"></div>`;

        const r = getZone(this.getEmotion(PositiveEmotion.Respect));
        const $respectBorder =
            r >= 0 ? `<div class="emotion_border emotion_border--respect emotion_border--value_${r}"></div>`
                   : `<div class="emotion_border emotion_border--contempt emotion_border--value_${-r}"></div>`;

        let totalAffectionRating = 0;
        for (const emotion of getEnumIterator(PositiveEmotion) as Generator<PositiveEmotion>) {
            totalAffectionRating += this.getEmotion(emotion);
        }

        return `
            <div class="simple_table__row__cell opinion_cell">
                <div class="npc_opinion_circle" 
                     data-npc-id="${this.npc}" 
                     data-pc-id="${this.pc}">
                    ${totalAffectionRating}
                </div>
                ${$trustBorder}${$gratitudeBorder}${$respectBorder}
                <div class="emotion_border--backdrop"></div>
            </div>`;
    }

    public generateTimelineDOMString(): string
    {
        const eventsDesc = [];
        for (const npcInteractionEvent of this.events) {
            eventsDesc.push(npcInteractionEvent.generateDOMString());
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


/**
 * Testcases.
 */
export function test()
{
    testSlot();
    testBufferedAttitude();
    testAttitudeHandler();
}
