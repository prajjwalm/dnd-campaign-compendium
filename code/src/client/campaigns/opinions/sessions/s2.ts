import {PcIndex}       from "../../../data/pcIndex";
import {NpcId}         from "../../../npcs/npcIndex";
import {GameTimestamp} from "../../common";
import {NpcInteractionEvent, NpcOpinionV2, PositiveEmotion} from "../npcOpinions";


export function session2NpcInteractions(
    npcOpinions: Map<NpcId, Map<PcIndex, NpcOpinionV2>>)
{
    // Conversation with Dawn.
    // npcOpinions.get(NpcIndex.ID_DAWN).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 9, 0),
    //         "Polite, and says funny stuff like asking if we want to sacrifice them...",
    //         new Map([[PositiveEmotion.Respect, 2]])
    //     )
    // );
    // npcOpinions.get(NpcIndex.ID_DAWN).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 9, 0),
    //         "Seems to have a rather exotic pet.",
    //         new Map([[PositiveEmotion.Respect, 1]])
    //     )
    // );
    for (const pc of [PcIndex.ID_HELIOS,
                      PcIndex.ID_CYRION,
                      PcIndex.ID_AURELIA,
                      PcIndex.ID_PANZER])
    {
        npcOpinions.get(NpcId.Dawn).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 9, 0),
                "A polite bunch it seems.",
                new Map([[PositiveEmotion.Respect, 1]])
            )
        );
        npcOpinions.get(NpcId.Tomasa).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 9, 0),
                "Liked the soup I made.",
                new Map([[PositiveEmotion.Gratitude, 1]])
            )
        );
    }

    // npcOpinions.get(NpcIndex.ID_TOMASA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 9, 30),
    //         "Fun to hang out with, also petted Julius.",
    //         new Map([[PositiveEmotion.Respect, 2]])
    //     )
    // );
    // npcInteractionEvents.get(NpcIndex.ID_TAIHE).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 9, 30),
    //         "Fun to hang out with.",
    //         new Map([[PositiveEmotion.Respect, 1]])
    //     )
    // );

    // Interaction with Hina as she took them to Cec.
    // npcOpinions.get(NpcIndex.ID_HINA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 10, 0),
    //         "Not entirely without a sense of humor.",
    //         new Map([[PositiveEmotion.Respect, 1],
    //                  [PositiveEmotion.Trust, 1]])
    //     )
    // );

    npcOpinions.get(NpcId.Hina).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 10, 0),
            "Cooler than I expected aasimar/paladins to be.",
            new Map([[PositiveEmotion.Respect, 2]])
        )
    );

    // Interaction with Cec./Sasha pt.1.
    npcOpinions.get(NpcId.Cecelia).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 10, 30),
            "A friend of my brother. Seems to be as noble and kind as I'd expect.",
            new Map([[PositiveEmotion.Respect, 4],
                     [PositiveEmotion.Trust, 4]])
        )
    );

    // npcOpinions.get(NpcIndex.ID_SASHA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 10, 45),
    //         "Why's this fucker taking an interest in me?",
    //         new Map([[PositiveEmotion.Gratitude, 2]])
    //     )
    // );
}
