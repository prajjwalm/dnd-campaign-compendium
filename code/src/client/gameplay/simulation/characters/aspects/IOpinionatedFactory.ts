import {GameTimestamp}   from "../../../GameTimestamp";
import {PositiveEmotion} from "../../../opinions/PositiveEmotion";
import {PcIndex}         from "../../../data/pcIndex";


/**
 * The factory interface needed to create the default {@link IOpinionated}
 * aspect.
 */
export interface IOpinionatedFactory
{
    /**
     * Set true to mark this character as opinionated.
     */
    set isOpinionated(val: boolean);

    /**
     * Add a {@link NpcInteractionEvent} between this npc and the given pcs with
     * the given parameters.
     */
    addInteractionEvent(pcs: PcIndex[],
                        timestamp: GameTimestamp,
                        text: string,
                        delta: Map<PositiveEmotion, number>,
                        insightGate: number,
                        reverseEmotions: Set<PositiveEmotion>);

    /**
     * Add a {@link TimeskipEvent} between this npc and the given pcs with the
     * given parameters.
     */
    addTimeskipEvent(pcs: PcIndex[],
                     timestamp1: GameTimestamp,
                     timestamp2: GameTimestamp,
                     text: string,
                     delta: Map<PositiveEmotion, number>);
}