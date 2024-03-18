import {NpcID}               from "../../data/npcIndex";
import {PcIndex}             from "../../data/pcIndex";
import {GameTimestamp}       from "../../GameTimestamp";
import {Character}           from "../../simulation/characters/Character";
import {PositiveEmotion}     from "../PositiveEmotion";
import {addInteractionEvent} from "./s9";


export function sessionOpinionEvents04()
{
    // Previous session.
    addInteractionEvent(
        NpcID.Coroto,
        [],
        new GameTimestamp(0, 5, 13, 30),
        "Didn't seem to hold respect for my position.",
        new Map([[PositiveEmotion.Respect, -2],])
    );

    // Talk with Coroto.
    addInteractionEvent(
        NpcID.Coroto,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 14, 0),
        "Acknowledged my honor for the fatherland.",
        new Map([
                    [PositiveEmotion.Respect, 1],
                    [PositiveEmotion.Gratitude, 2]
                ])
    );

    addInteractionEvent(
        NpcID.Coroto,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 14, 0),
        "Comes from a weak country and a feminine race.",
        new Map([
                    [PositiveEmotion.Respect, -2],
                    [PositiveEmotion.Trust, -1]
                ])
    );

    addInteractionEvent(
        NpcID.Coroto,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 14, 0),
        "Appears to have respect for our fatherland.",
        new Map([[PositiveEmotion.Gratitude, 1]])
    );

    addInteractionEvent(
        NpcID.Coroto,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 14, 0),
        "Comes from a powerful country and a noble race.",
        new Map([
                    [PositiveEmotion.Respect, 2],
                    [PositiveEmotion.Trust, 1]
                ])
    );

    addInteractionEvent(
        NpcID.Coroto,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 14, 0),
        "Was worried about our safety.",
        new Map([
                    [PositiveEmotion.Gratitude, 1],
                    [PositiveEmotion.Trust, 2]
                ])
    );

    addInteractionEvent(
        NpcID.Coroto,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 14, 0),
        "Promised with honor to defend us should the need arise.",
        new Map([
                    [PositiveEmotion.Gratitude, 2],
                    [PositiveEmotion.Respect, 2]
                ])
    );

    addInteractionEvent(
        NpcID.Coroto,
        [
            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],
        new GameTimestamp(0, 5, 14, 30),
        "Was gallivanting with my wife.",
        new Map([
                    [PositiveEmotion.Respect, -1],
                    [PositiveEmotion.Trust, -1],
                    [PositiveEmotion.Gratitude, -1],
                ]),
        Character.get(NpcID.Coroto).passiveDeception + 5
    );


    // Talk with Erica.
    // npcInteractionEvents.get(NpcId.Erica).get(PcIndex.ID_PANZER).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 14, 25),
    //         "Was interested in my youth with Coroto and our past together.",
    //         new Map([[PositiveEmotion.Gratitude, 1]])
    //     )
    // );
    //
    // npcInteractionEvents.get(NpcId.Erica).get(PcIndex.ID_PANZER).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 14, 25),
    //         "Reminded me of happier times in my father's estate and
    // Ivangrad.", new Map([[PositiveEmotion.Gratitude, 2]]) ) );

    addInteractionEvent(
        NpcID.Erica,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 14, 25),
        "Reminded me of happier times in my father's estate and Ivangrad.",
        new Map([[PositiveEmotion.Gratitude, 2]])
    );

    addInteractionEvent(
        NpcID.Erica,
        [
            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],
        new GameTimestamp(0, 5, 14, 25),
        "Were polite to me when when, in my failing memory, I couldn't " +
        "help them much",
        new Map([
                    [PositiveEmotion.Gratitude, 1],
                    [PositiveEmotion.Respect, 1]
                ])
    );


    addInteractionEvent(
        NpcID.Erica,
        [
            PcIndex.ID_CYRION,
            PcIndex.ID_HELIOS
        ],
        new GameTimestamp(0, 5, 14, 30),
        "Their coming here will shake things up.",
        new Map([[PositiveEmotion.Trust, -2]]),
        Character.get(NpcID.Erica).passiveDeception + 5
    );

    addInteractionEvent(
        NpcID.Coroto,
        [
            PcIndex.ID_CYRION,
            PcIndex.ID_HELIOS
        ],
        new GameTimestamp(0, 5, 14, 30),
        "Their coming here can cause much trouble.",
        new Map([[PositiveEmotion.Trust, -2]]),
        Character.get(NpcID.Coroto).passiveDeception + 5
    )

    // In Jordi's house.
    addInteractionEvent(
        NpcID.Jordi,
        [
            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],
        new GameTimestamp(0, 5, 15, 30),
        "As a first impression, they seem to be kind and humble people.",
        new Map([
                    [PositiveEmotion.Respect, 2],
                    [PositiveEmotion.Trust, 1]
                ])
    );

    addInteractionEvent(
        NpcID.Jordi,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 15, 30),
        "Gazed at the sea wistfully. Does he too belong there?",
        new Map([
                    [PositiveEmotion.Respect, 2],
                    [PositiveEmotion.Trust, 1]
                ]));

    addInteractionEvent(
        NpcID.Jordi,
        [
            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],
        new GameTimestamp(0, 5, 15, 45),
        "The seemed to be concerned about the disaster that struck our land and my " +
        "harsh experience in it. If only I could remember-",
        new Map([
                    [PositiveEmotion.Gratitude, 2],
                    [PositiveEmotion.Trust, 1]
                ])
    );

    addInteractionEvent(
        NpcID.Jordi,
        [
            // PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],
        new GameTimestamp(0, 5, 15, 45),
        "Was curious about the spearhead stone and of my uncle's " +
        "travels.",
        new Map([
                    [PositiveEmotion.Gratitude, 2],
                    [PositiveEmotion.Trust, 1]
                ])
    );

    addInteractionEvent(
        NpcID.Jordi,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 16, 0),
        "He realizes the value of fishing in enriching the local diet. (The " +
        "others all just consider Hav useless).",
        new Map([[PositiveEmotion.Respect, 1]]));

    // At Petra's meal.

    addInteractionEvent(
        NpcID.Petra,
        [
            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],
        new GameTimestamp(0, 5, 16, 30),
        "I'm sure they're all good youths and am happy to have them with us.",
        new Map([
                    [PositiveEmotion.Respect, 3],
                    [PositiveEmotion.Trust, 3,],
                    [PositiveEmotion.Gratitude, 3]
                ])
    );


    addInteractionEvent(
        NpcID.Petra,
        [
            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],
        new GameTimestamp(0, 5, 16, 30),
        "I'm glad they partook in the meal we made and gave us company.",
        new Map([[PositiveEmotion.Gratitude, 3]]));

    addInteractionEvent(
        NpcID.Petra,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 16, 45),
        "I'm surprised and happy that they are willing to hear out the " +
        "story of an old nobody like myself.",
        new Map([
                    [PositiveEmotion.Gratitude, 4],
                    [PositiveEmotion.Respect, 3],
                    [PositiveEmotion.Trust, 2]
                ]));

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 16, 30),
        "Starry-dude's not too fond of gaming, it seems.",
        new Map()
    )

    //
    // npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_PANZER).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 16, 30),
    //         "Huh, that stupid bot actually challenged my skills.",
    //         new Map([[PositiveEmotion.Respect, 1]])
    //     )
    // );
    //
    // npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_PANZER).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 16, 30),
    //         "Huh, that stupid bot admittedly got a decent run, for a first
    // timer.", new Map([[PositiveEmotion.Respect, 1]]) ) );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 16, 45),
        "Heh, his holiness would also go down the path of the gaming addict...",
        new Map([
                    [PositiveEmotion.Respect, 1],
                    [PositiveEmotion.Trust, 2]
                ])
    );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 16, 45),
        "Wait, the investiture changed... that intent... hmm...",
        new Map([
                    [PositiveEmotion.Trust, -3],
                    [PositiveEmotion.Respect, 2]
                ]),
        Character.get(NpcID.Hina).passiveDeception,
        new Set([PositiveEmotion.Trust])
    );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 16, 45),
        "He actually beat the boss, guy's got a bright future. (even if...)",
        new Map([[PositiveEmotion.Respect, 1]])
    );

    // npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_PANZER).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 16, 45),
    //         "The bot acknowledged my skills, maybe I could try my hand at
    // his " + "modules...", new Map([[PositiveEmotion.Gratitude, 1],
    // [PositiveEmotion.Trust, 1]]) ) );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 16, 45),
        "Starry-dude speaks fondly to gran.",
        new Map([
                    [PositiveEmotion.Respect, 2],
                    [PositiveEmotion.Trust, 1],
                    [PositiveEmotion.Gratitude, 3]
                ]));

    addInteractionEvent(
        NpcID.Petra,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 16, 45),
        "He's having fun with Hina.",
        new Map([[PositiveEmotion.Gratitude, 1]]));
}
