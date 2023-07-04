import {PcIndex}                                            from "../../../data/pcIndex";
import {NpcId, NpcIndex}                                    from "../../../npcs/npcIndex";
import {GameTimestamp}                                      from "../../common";
import {NpcInteractionEvent, NpcOpinionV2, PositiveEmotion} from "../npcOpinions";


export function session4NpcInteractions(
    npcInteractionEvents: Map<NpcId, Map<PcIndex, NpcOpinionV2>>)
{
    // Previous session.
    npcInteractionEvents.get(NpcId.Coroto).get(PcIndex.ID_AURELIA).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 13, 30),
            "Didn't seem to hold respect for my position.",
            new Map([[PositiveEmotion.Respect, -2],])
        )
    );
    // Talk with Coroto.
    npcInteractionEvents.get(NpcId.Coroto).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Acknowledged my honor for the fatherland.",
            new Map([[PositiveEmotion.Respect, 1],
                     [PositiveEmotion.Gratitude, 2]])
        )
    );
    npcInteractionEvents.get(NpcId.Coroto).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Comes from a weak country and a feminine race.",
            new Map([[PositiveEmotion.Respect, -2],
                     [PositiveEmotion.Trust, -1]])
        )
    );
    npcInteractionEvents.get(NpcId.Coroto).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Appears to have respect for our fatherland.",
            new Map([[PositiveEmotion.Gratitude, 1]])
        )
    );
    npcInteractionEvents.get(NpcId.Coroto).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Comes from a powerful country and a noble race.",
            new Map([[PositiveEmotion.Respect, 2],
                     [PositiveEmotion.Trust, 1]])
        )
    );
    npcInteractionEvents.get(NpcId.Coroto).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Was worried about our safety.",
            new Map([[PositiveEmotion.Gratitude, 1],
                     [PositiveEmotion.Trust, 2]])
        )
    );
    npcInteractionEvents.get(NpcId.Coroto).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 0),
            "Promised with honor to defend us should the need arise.",
            new Map([[PositiveEmotion.Gratitude, 2],
                     [PositiveEmotion.Respect, 2]])
        )
    );
    for (const pc of [PcIndex.ID_HELIOS,
                      PcIndex.ID_CYRION])
    {
        npcInteractionEvents.get(NpcId.Coroto).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 14, 30),
                "May have been gallivanting with my wife.",
                new Map([[PositiveEmotion.Respect, -1],
                         [PositiveEmotion.Trust, -1],
                         [PositiveEmotion.Gratitude, -1],]),
                NpcIndex.get(NpcId.Coroto).passiveDeception + 5
            )
        );
    }

    // Talk with Erica.
    npcInteractionEvents.get(NpcId.Erica).get(PcIndex.ID_PANZER).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 25),
            "Was interested in my youth with Coroto and our past together.",
            new Map([[PositiveEmotion.Gratitude, 1]])
        )
    );

    npcInteractionEvents.get(NpcId.Erica).get(PcIndex.ID_PANZER).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 25),
            "Reminded me of happier times in my father's estate and Ivangrad.",
            new Map([[PositiveEmotion.Gratitude, 2]])
        )
    );

    npcInteractionEvents.get(NpcId.Erica).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 14, 25),
            "Reminded me of happier times in my father's estate and Ivangrad.",
            new Map([[PositiveEmotion.Gratitude, 2]])
        )
    );

    for (const pc of [PcIndex.ID_PANZER,
                      PcIndex.ID_HELIOS,
                      PcIndex.ID_CYRION])
    {
        npcInteractionEvents.get(NpcId.Erica).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 14, 25),
                "Were polite to me when when, in my failing memory, I couldn't " +
                "help them much",
                new Map([[PositiveEmotion.Gratitude, 1],
                         [PositiveEmotion.Respect, 1]])
            )
        );
    }

    for (const pc of [PcIndex.ID_AURELIA,
                      PcIndex.ID_CYRION,
                      PcIndex.ID_PANZER,
                      PcIndex.ID_HELIOS])
    {
        npcInteractionEvents.get(NpcId.Erica).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 14, 30),
                "Their coming here will shake things up.",
                new Map([[PositiveEmotion.Trust, -2]]),
                NpcIndex.get(NpcId.Erica).passiveDeception + 5
            )
        );
        npcInteractionEvents.get(NpcId.Coroto).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 14, 30),
                "Their coming here can cause much trouble.",
                new Map([[PositiveEmotion.Trust, -2]]),
                NpcIndex.get(NpcId.Coroto).passiveDeception + 5
            )
        );
    }

    // In Jordi's house.
    for (const pc of [PcIndex.ID_PANZER,
                      PcIndex.ID_HELIOS,
                      PcIndex.ID_CYRION])
    {
        npcInteractionEvents.get(NpcId.Jordi).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 15, 30),
                "As a first impression, they seem to be kind and humble people.",
                new Map([[PositiveEmotion.Respect, 2],
                         [PositiveEmotion.Trust, 1]])
            )
        );
    }

    npcInteractionEvents.get(NpcId.Jordi).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 15, 30),
            "Gazed at the sea wistfully. Does he too belong there?",
            new Map([[PositiveEmotion.Respect, 2],
                     [PositiveEmotion.Trust, 1]])
        )
    );

    for (const pc of [PcIndex.ID_HELIOS,
                      PcIndex.ID_CYRION])
    {
        npcInteractionEvents.get(NpcId.Jordi).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 15, 45),
                "Was concerned about the disaster that struck our land and my " +
                "harsh experience in it.",
                new Map([[PositiveEmotion.Gratitude, 2],
                         [PositiveEmotion.Trust, 1]])
            )
        );

        npcInteractionEvents.get(NpcId.Jordi).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 15, 45),
                "Was curious about the spearhead stone and of my uncle's " +
                "travels.",
                new Map([[PositiveEmotion.Gratitude, 2],
                         [PositiveEmotion.Trust, 1]])
            )
        );
    }

    npcInteractionEvents.get(NpcId.Jordi).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 0),
            "Noted the value of fishing in enriching the local diet.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    // At Petra's meal.
    for (const pc of [PcIndex.ID_AURELIA,
                      PcIndex.ID_HELIOS,
                      PcIndex.ID_CYRION,
                      PcIndex.ID_PANZER])
    {
        npcInteractionEvents.get(NpcId.Petra).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 16, 30),
                "I'm sure they're all good youths and am happy to have them with us.",
                new Map([[PositiveEmotion.Respect, 3],
                         [PositiveEmotion.Trust, 3,],
                         [PositiveEmotion.Gratitude, 3]])
            )
        );
    }

    for (const pc of [PcIndex.ID_PANZER,
                      PcIndex.ID_HELIOS,
                      PcIndex.ID_CYRION])
    {
        npcInteractionEvents.get(NpcId.Petra).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 16, 30),
                "I'm glad they partook in the meal we made and gave us company.",
                new Map([[PositiveEmotion.Gratitude, 3]])
            )
        );
    }

    npcInteractionEvents.get(NpcId.Petra).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "I'm surprised and happy that they are willing to hear out the " +
            "story of an old nobody like myself.",
            new Map([[PositiveEmotion.Gratitude, 4],
                     [PositiveEmotion.Respect, 3],
                     [PositiveEmotion.Trust, 2]])
        )
    );

    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 30),
            "Starry-dude's not too fond of gaming, it seems.",
            new Map()
        )
    );

    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_PANZER).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 30),
            "Huh, that stupid bot actually challenged my skills.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_PANZER).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 30),
            "Huh, that stupid bot admittedly got a decent run, for a first timer.",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "Heh, his holiness would also go down the path of the gaming addict...",
            new Map([[PositiveEmotion.Respect, 1],
                     [PositiveEmotion.Trust, 2]])
        )
    );

    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "Wait, the investiture changed... that intent... hmm...",
            new Map([[PositiveEmotion.Trust, -3],
                     [PositiveEmotion.Respect, 2]]),
            NpcIndex.get(NpcId.Hina).passiveDeception,
            new Map([[PositiveEmotion.Trust, true]])
        )
    );

    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "He actually beat the boss, guy's got a bright future. (even if...)",
            new Map([[PositiveEmotion.Respect, 1]])
        )
    );

    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_PANZER).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "The bot acknowledged my skills, maybe I could try my hand at his " +
            "modules...",
            new Map([[PositiveEmotion.Gratitude, 1],
                     [PositiveEmotion.Trust, 1]])
        )
    );

    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 16, 45),
            "Starry-dude speaks fondly to gran.",
            new Map([[PositiveEmotion.Respect, 2],
                     [PositiveEmotion.Trust, 1],
                     [PositiveEmotion.Gratitude, 3]])
        )
    );

    for (const pc of [PcIndex.ID_HELIOS, PcIndex.ID_PANZER]) {
        npcInteractionEvents.get(NpcId.Petra).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 16, 45),
                "They're having fun with Hina.",
                new Map([[PositiveEmotion.Gratitude, 1]])
            )
        );
    }
}
