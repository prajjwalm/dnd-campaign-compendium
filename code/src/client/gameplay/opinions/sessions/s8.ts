import {NpcId}   from "../../data/npcIndex";
import {PcIndex} from "../../data/pcIndex";
import {GameTimestamp}       from "../../GameTimestamp";
import {Character}           from "../../simulation/characters/Character";
import {PositiveEmotion}     from "../PositiveEmotion";
import {addInteractionEvent} from "./s9";

export function sessionOpinionEvents08()
{
    addInteractionEvent(
        NpcId.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 12, 15),
        "Oh, an Honorspren-bound. Well he at least won't massacre us, " +
        " but... I'll probably need to keep a vigil for incoming bits of " +
        "wisdom... sigh.",
        new Map([
                    [PositiveEmotion.Trust, 10],
                    [PositiveEmotion.Respect, -1],
                ]));
    // for (const pc of [PcIndex.ID_HELIOS, PcIndex.ID_QUINN]) { }
    addInteractionEvent(
        NpcId.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 12, 15),
        "Wait, is that honorspren bound to the both of them? And are two" +
        " spren bound to Helios? What... sort of an orgy is happening here?",
        new Map([
                    [PositiveEmotion.Respect, 1],
                ]));

    addInteractionEvent(
        NpcId.Hina,
        [PcIndex.ID_HELIOS],
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
        Character.get(NpcId.Hina).passiveDeception
    );
}
