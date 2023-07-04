import {PcIndex}         from "../../../data/pcIndex";
import {NpcId, NpcIndex} from "../../../npcs/npcIndex";
import {GameTimestamp}   from "../../common";
import {NpcInteractionEvent, NpcOpinionV2, PositiveEmotion} from "../npcOpinions";

export function session8NpcInteractions(
    npcInteractionEvents: Map<NpcId, Map<PcIndex, NpcOpinionV2>>)
{
    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 12, 15),
            "Oh, an Honorspren-bound. Well he at least won't massacre us, " +
            " but... I'll probably need to keep a vigil for incoming bits of " +
            "wisdom... sigh.",
            new Map([
                [PositiveEmotion.Trust, 12],
                [PositiveEmotion.Respect, -1],
            ])
        )
    );
    // for (const pc of [PcIndex.ID_HELIOS, PcIndex.ID_QUINN]) { }
    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 12, 15),
            "Wait, is that honorspren bound to the both of them? And are two" +
            " spren bound to Helios? What... sort of an orgy is happening here?",
            new Map([
                [PositiveEmotion.Respect, 1],
            ])
        )
    );
    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 6, 12, 15),
            "Hmm... he's clearly never met another Windrunner, yet it's strange " +
            "how they all turn out according to prototype. Would easily suffer " +
            "the pain of death to help secure his friend's freedom.<br/>" +
            "He'll never betray, huh... Maybe, just maybe... for once..." +
            " I could rely on - NO!!",
            new Map([
                [PositiveEmotion.Trust, 9],
                [PositiveEmotion.Respect, 4],
                [PositiveEmotion.Affection, 3],
            ]),
            NpcIndex.get(NpcId.Hina).passiveDeception
        )
    );
}
