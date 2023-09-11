import {EQ}            from "../common";
import {GameTimestamp} from "../GameTimestamp";
import {NegativeEmotion, PositiveEmotion} from "./PositiveEmotion";
import {RenderableEvent}                  from "./RenderableEvent";


export class TimeskipEvent
    implements RenderableEvent
{
    public constructor(
        public readonly startTime: GameTimestamp,
        public readonly endTime: GameTimestamp,
        public readonly ambientInteraction: Map<PositiveEmotion, number>,
        public readonly text: string)
    {}

    public generateDOMString()
    {
        if (this.ambientInteraction.size == 0) {
            return `<div class="timeskip_li">
                        The time between <span class="timeskip_li__time">${this.startTime.generateDOMString()}</span> and 
                        <span class="timeskip_li__time">${this.endTime.generateDOMString()}</span> passed with negligible
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
                    `<li class="timeskip__emotion_desc">
                        <span class="emotion_string--${emotionString.toLowerCase()}--neg">${emotionString}</span> eroded slightly.
                    </li>`
                );
            } else if (val < 0.35) {
                $interactions.push(
                    `<li class="timeskip__emotion_desc">
                        <span class="emotion_string--${emotionString.toLowerCase()}">${emotionString}</span> increased slightly.
                    </li>`
                );
            } else if (val < 0.75) {
                $interactions.push(
                    `<li class="timeskip__emotion_desc">
                        <span class="emotion_string--${emotionString.toLowerCase()}">${emotionString}</span> increased moderately.
                    </li>`
                );
            } else {
                $interactions.push(
                    `<li class="timeskip__emotion_desc">
                        <span class="emotion_string--${emotionString.toLowerCase()}">${emotionString}</span> increased significantly.
                    </li>`
                );
            }
        }
        const textHtml = this.text.length > 0 ? `<p class="timeskip_li__description">${this.text}</p>` : "";
        return `<div class="interactions_list__item timeskip_li">
                    The time between 
                    <span class="timeskip_li__time">${this.startTime.generateDOMString()}</span> and 
                    <span class="timeskip_li__time">${this.endTime.generateDOMString()}</span> passed with the following notable 
                    ambient interaction for each day of the duration -
                    <ul>
                        ${$interactions.join("")}
                    </ul>
                    ${textHtml}
                </div>`;
    }
}