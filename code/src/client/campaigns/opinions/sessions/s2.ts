import {PcIndex}                               from "../../../data/pcIndex";
import {Character}                             from "../../../gameplay/simulation/characters/Character";
import {NpcId}                                 from "../../../npcs/npcIndex";
import {GameTimestamp}                         from "../../common";
import {NpcOpinionV2, PositiveEmotion}         from "../npcOpinions";
import {addInteractionEvent, addTimeSkipEvent} from "./s9";


export function session2NpcInteractions(
    npcOpinions: Map<NpcId, Map<PcIndex, NpcOpinionV2>>)
{
    addInteractionEvent(
        npcOpinions,
        NpcId.Dusk,
        [PcIndex.ID_AURELIA, PcIndex.ID_CYRION, PcIndex.ID_HELIOS],
        new GameTimestamp(0, 1, 12, 0),
        "Why are Champions of Ruin here? I do not remember doing " +
        "anything to provoke him. Anyway...",
        new Map([
            [PositiveEmotion.Trust, -1]
        ]),
        10,
        // Character.Index.get(NpcId.Dusk).passiveDeception + 5,
        new Set([PositiveEmotion.Trust])
    )

    addInteractionEvent(
        npcOpinions,
        NpcId.Dusk,
        [PcIndex.ID_JULIUS],
        new GameTimestamp(0, 1, 13, 0),
        "Oh. I get to see the coronation of a champion?",
        new Map([
                    [PositiveEmotion.Respect, 2]
                ]),
        Character.get(NpcId.Dusk).passiveDeception,
    )

    addInteractionEvent(
        npcOpinions,
        NpcId.Hina,
        [PcIndex.ID_JULIUS],
        new GameTimestamp(0, 1, 13, 0),
        "He connected to my cognitive shadow! HELP!",
        new Map([
                    [PositiveEmotion.Trust, -4]
                ]),
        Character.get(NpcId.Hina).passiveDeception,
    );

    addInteractionEvent(
        npcOpinions,
        NpcId.Hina,
        [PcIndex.ID_JULIUS],
        new GameTimestamp(0, 1, 13, 0),
        "This card... why's a member of the troupe here?",
        new Map([
                    [PositiveEmotion.Trust, -7]
                ]),
        Character.get(NpcId.Hina).passiveDeception,
    );

    addInteractionEvent(
        npcOpinions,
        NpcId.Hina,
        [PcIndex.ID_JULIUS],
        new GameTimestamp(0, 1, 13, 10),
        "Though he doesn't look like one of them...",
        new Map([
            [PositiveEmotion.Trust, 3]
        ]),
    );

    addInteractionEvent(
        npcOpinions,
        NpcId.Hina,
        [PcIndex.ID_JULIUS],
        new GameTimestamp(0, 1, 13, 15),
        "Wait.. What?! This guy's on our side???",
        new Map([
            [PositiveEmotion.Trust, 6]
        ]),
    );


    addInteractionEvent(
        npcOpinions,
        NpcId.Hina,
        [PcIndex.ID_JULIUS],
        new GameTimestamp(0, 1, 13, 15),
        "Heeehhh... not many people get a recommendation by the God of death itself.",
        new Map([
            [PositiveEmotion.Respect, 7]
        ]),
        Character.get(NpcId.Hina).passiveDeception
    );

    addInteractionEvent(
        npcOpinions,
        NpcId.Hina,
        [PcIndex.ID_JULIUS],
        new GameTimestamp(0, 2, 8, 0),
        "How come he doesn't need medical attention? Well it's probably not " +
        "that surprising considering everything, and at least I get to " +
        "slack off... (I think I'll just leave him here till he wakes - " +
        "don't want Ms Dawn to get all tensed up)",
        new Map([
            [PositiveEmotion.Respect, 1],
            [PositiveEmotion.Trust, -1],
            [PositiveEmotion.Gratitude, 1],
        ]),
    );

    addTimeSkipEvent(
        npcOpinions,
        NpcId.Hina,
        [PcIndex.ID_JULIUS],
        GameTimestamp.fromDays(3),
        GameTimestamp.fromDays(27),
        "",
        new Map([[PositiveEmotion.Trust, 0.1]])
    );

    addInteractionEvent(
        npcOpinions,
        NpcId.Dusk,
        [PcIndex.ID_AURELIA, PcIndex.ID_CYRION, PcIndex.ID_HELIOS],
        new GameTimestamp(0, 1, 13, 0),
        "So these guys being here is probably not related to me too..",
        new Map([
            [PositiveEmotion.Trust, 1]
        ]),
        10,
    )

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
                      PcIndex.ID_AURELIA])
    {
        addInteractionEvent(npcOpinions,
                            NpcId.Dawn,
                            [pc],
                            new GameTimestamp(0, 5, 9, 0),
                            "A polite bunch it seems.",
                            new Map([[PositiveEmotion.Respect, 1]]));
        addInteractionEvent(npcOpinions,
                            NpcId.Tomasa,
                            [pc],
                            new GameTimestamp(0, 5, 9, 0),
                            "Liked the soup I made.",
                            new Map([[PositiveEmotion.Gratitude, 1]]));
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

    addInteractionEvent(npcOpinions,
                        NpcId.Hina,
                        [PcIndex.ID_HELIOS],
                        new GameTimestamp(0, 5, 10, 0),
                        "Cooler than I expected aasimar/paladins to be.",
                        new Map([[PositiveEmotion.Respect, 2]]));

    // Interaction with Cec./Sasha pt.1.
    addInteractionEvent(
        npcOpinions,
        NpcId.Cecelia,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 10, 30),
        "A friend of my brother. Seems to be as noble and kind as I'd expect.",
        new Map([[PositiveEmotion.Respect, 4],
                 [PositiveEmotion.Trust, 4]])
    );

    // npcOpinions.get(NpcIndex.ID_SASHA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 10, 45),
    //         "Why's this fucker taking an interest in me?",
    //         new Map([[PositiveEmotion.Gratitude, 2]])
    //     )
    // );
}
