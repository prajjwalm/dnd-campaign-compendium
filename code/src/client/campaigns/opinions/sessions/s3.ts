import {PcIndex}       from "../../../data/pcIndex";
import {NpcId}         from "../../../npcs/npcIndex";
import {GameTimestamp} from "../../common";
import {NpcInteractionEvent, NpcOpinionV2, PositiveEmotion} from "../npcOpinions";


export function session3NpcInteractions(
    npcInteractionEvents: Map<NpcId, Map<PcIndex, NpcOpinionV2>>)
{
    // Cecelia-Helios/Aurelia
    npcInteractionEvents.get(NpcId.Cecelia).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 0),
            "Bearer of an awful truth about Mostima/Andoain.",
            new Map([[PositiveEmotion.Affection, -2],
                     [PositiveEmotion.Trust, 1],
                     [PositiveEmotion.Gratitude, 2]])
        )
    );
    npcInteractionEvents.get(NpcId.Cecelia).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 15),
            "Seemed concerned about my state.",
            new Map([[PositiveEmotion.Gratitude, 1]])
        )
    );
    npcInteractionEvents.get(NpcId.Cecelia).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 30),
            "Seemed interested in helping out Andoain and myself.",
            new Map([[PositiveEmotion.Gratitude, 1],
                     [PositiveEmotion.Respect, 1],
                     [PositiveEmotion.Trust, 1]])
        )
    );
    npcInteractionEvents.get(NpcId.Cecelia).get(PcIndex.ID_AURELIA).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 0),
            "Took an interest in my health and offered words of comfort.",
            new Map([[PositiveEmotion.Gratitude, 2]])
        )
    );

    // Sasha-Quinn/Cyrion
    // npcInteractionEvents.get(NpcIndex.ID_SASHA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 11, 15),
    //         "Continues to take an interest. Yet how long before he decides I'm " +
    //         "not worth it and leaves/hates me too...",
    //         new Map([[PositiveEmotion.Gratitude, 1],
    //                  [PositiveEmotion.Trust, -2]]),
    //         18,
    //         new Map([[PositiveEmotion.Trust, true]])
    //     )
    // );

    npcInteractionEvents.get(NpcId.Genefe).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 45),
            "Prying into how I look after these kids, like I were guilty of something.",
            new Map([[PositiveEmotion.Respect, -1],
                     [PositiveEmotion.Trust, -1]]),
            17
        )
    );

    npcInteractionEvents.get(NpcId.Sasha).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 11, 45),
            "Thinks I'm mentally unstable.",
            new Map([[PositiveEmotion.Respect, -1],
                     [PositiveEmotion.Trust, -1]])
        )
    );

    // npcInteractionEvents.get(NpcIndex.ID_SASHA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 11, 45),
    //         "Offered to break me out and pissed off that hag.",
    //         new Map([[PositiveEmotion.Respect, 1]])
    //     )
    // );

    // npcInteractionEvents.get(NpcIndex.ID_GENEFE).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 11, 45),
    //         "I don't think he was joking about letting the brat out.",
    //         new Map([[PositiveEmotion.Trust, -1]])
    //     )
    // );

    npcInteractionEvents.get(NpcId.Genefe).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 0),
            "Acknowledges how hard I work for these kids.",
            new Map([[PositiveEmotion.Trust, 2],
                     [PositiveEmotion.Respect, 2],
                     [PositiveEmotion.Gratitude, 2],])
        )
    );

    npcInteractionEvents.get(NpcId.Sasha).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 0),
            "Praising that hag.",
            new Map([[PositiveEmotion.Respect, -1]])
        )
    );

    // Quinn Cecelia flight.
    // npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 12, 30),
    //         "Agreed to a sudden, whimsical and imposing request because he gave his word.",
    //         new Map([[PositiveEmotion.Trust, 4],
    //                  [PositiveEmotion.Respect, 4]])
    //     )
    // );
    // npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 12, 30),
    //         "Let me experience flight.",
    //         new Map([[PositiveEmotion.Gratitude, 3]])
    //     )
    // );
    // npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 12, 30),
    //         "Flaunted his flight, compared his state to mine and made me puke.",
    //         new Map([[PositiveEmotion.Gratitude, -1],
    //                  [PositiveEmotion.Respect, -1]]),
    //         10,
    //         new Map([[PositiveEmotion.Gratitude, true]])
    //     )
    // );
    // npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 12, 30),
    //         "Didn't mind me puking over him, and consoled me with an anecdote.",
    //         new Map([[PositiveEmotion.Gratitude, 2],
    //                  [PositiveEmotion.Respect, 1],
    //                  [PositiveEmotion.Trust, 1]])
    //     )
    // );
    npcInteractionEvents.get(NpcId.Cecelia).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 12, 30),
            "Hehe, puked in his first flight despite being healthy.",
            new Map([[PositiveEmotion.Gratitude, 1],
                     [PositiveEmotion.Respect, -2]])
        )
    );

    // Quinn Hina
    // npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 13, 0),
    //         "Seems interested in gaming/tech/innovation and kept his humour on " +
    //         "seeing his own avatar. Probably can teach this neanderthal a " +
    //         "few things...",
    //         new Map([[PositiveEmotion.Respect, 2]])
    //     )
    // );

    // Interacting with Erica.
    for (const pc of [PcIndex.ID_HELIOS,
                      PcIndex.ID_CYRION,
                      PcIndex.ID_AURELIA,
                      PcIndex.ID_PANZER])
    {
        npcInteractionEvents.get(NpcId.Erica).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 13, 30),
                "Seem like a well-mannered bunch. Asked for permission to " +
                "enter our garden instead of jumping over the bush.",
                new Map([[PositiveEmotion.Respect, 2],
                         [PositiveEmotion.Trust, 1]])
            )
        );
    }
}
