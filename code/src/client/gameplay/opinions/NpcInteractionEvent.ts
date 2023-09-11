import {PARTY_INSIGHT} from "../data/pcIndex";
import {GameTimestamp} from "../GameTimestamp";
import {getZone}                          from "./common";
import {NegativeEmotion, PositiveEmotion} from "./PositiveEmotion";
import {RenderableEvent}                  from "./RenderableEvent";


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

    public generateDOMString()
    {
        let insightLock;
        if (this.insightGate <= 10) {
            insightLock = "";
        } else if (this.insightGate <= PARTY_INSIGHT) {
            insightLock = `<div class='insight_lock insight_lock--unlocked'><i class="fa-solid fa-unlock"></i>${this.insightGate}</div>`;
        } else {
            insightLock = `<div class='insight_lock insight_lock--locked'><i class="fa-solid fa-lock"></i>${this.insightGate}</div>`;
        }

        if (this.insightGate > PARTY_INSIGHT) {
            return `<div class='event_li'>
                    <div class="timestamp"><span>${this.timestamp.generateDOMString()}</span></div>
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
                    <div class="timestamp"><span>${this.timestamp.generateDOMString()}</span></div>
                    <div class="display_text">${this.displayText}</div>
                    <div class="effect_tags">${insightLock} ${effectTags.join("")}</div>
                  </div>`;
    }

    public get startTime(): GameTimestamp
    {
        return this.timestamp;
    }
}