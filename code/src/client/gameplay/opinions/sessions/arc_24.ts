import {NpcId}   from "../../data/npcIndex";
import {PcIndex} from "../../data/pcIndex";
import {GameTimestamp}       from "../../GameTimestamp";
import {Character}           from "../../simulation/characters/Character";
import {PositiveEmotion}     from "../PositiveEmotion";
import {addInteractionEvent} from "./s9";

export function arc24OpinionEvents()
{
    const jordi = Character.get(NpcId.Jordi);

    addInteractionEvent(
        NpcId.Jordi,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 16, 0),
        ``,
        new Map([
            [PositiveEmotion.Trust, 0],
        ]),
        jordi.passiveDeception,
        new Set([PositiveEmotion.Trust])
    );
}