import {NpcID}                                 from "../../data/npcIndex";
import {PcIndex}                               from "../../data/pcIndex";
import {GameTimestamp}                         from "../../GameTimestamp";
import {Character}                             from "../../simulation/characters/Character";
import {PositiveEmotion}                       from "../PositiveEmotion";
import {addInteractionEvent, addTimeSkipEvent} from "./s9";

export function sessionOpinionEvents10()
{
    addInteractionEvent(
        NpcID.Petra,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 12, 45),
        `Prodded me to confront the past. About what happened to... to... 
        AARGH!`,
        new Map([
                    [PositiveEmotion.Gratitude, 3],
                    [PositiveEmotion.Affection, -2],
                ]),
        10,
        new Set([PositiveEmotion.Affection])
    );

    addInteractionEvent(
        NpcID.Hina,
        [

            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],
        new GameTimestamp(0, 6, 14, 30),
        `So many people waiting outside my door? Ah, I see. I'm popular now it seems.`,
        new Map([
                ]),
    );

    addInteractionEvent(
        NpcID.Hina,
        [

            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],
        new GameTimestamp(0, 6, 14, 40),
        `Didn't get any idea of what I just did. Thank God.`,
        new Map([
                    [PositiveEmotion.Respect, -1],
                    [PositiveEmotion.Gratitude, 1],
                ]),
        Character.get(NpcID.Hina).passiveDeception
    );

    addInteractionEvent(
        NpcID.Elysium,
        [

            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],
        new GameTimestamp(0, 6, 21, 20),
        `Well, that was an expensive investment. Still, it's rare for Hina to 
        recommend someone, and the local Goddess also picked them for the fight
        to decide the fate of this village. Maybe this will pay off handsomely?`,
        new Map([
                    [PositiveEmotion.Respect, 4],
                    [PositiveEmotion.Trust, -3],
                ]),
        Character.get(NpcID.Elysium).passiveDeception,
        new Set([PositiveEmotion.Trust])
    );

    const timeSkips = new Map<NpcID, PcIndex[]>([
                                                    [
                                                        NpcID.Dusk,
                                                        [
                                                            PcIndex.ID_HELIOS,
                                                            
                                                        ]
                                                    ],
                                                    [NpcID.Dawn, []],
                                                    [
                                                        NpcID.Andri,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Athlon,
                                                        [

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    // [NpcId.Bjorn,
                                                    // [PcIndex.ID_HELIOS,
                                                    //
                                                    // PcIndex.ID_CYRION]],
                                                    [
                                                        NpcID.Cecelia,
                                                        [
                                                            PcIndex.ID_HELIOS,
                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Coroto,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Elysium,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Erica,
                                                        [
                                                            PcIndex.ID_HELIOS,
                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Genefe,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Hav,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Hina,
                                                        [
                                                            PcIndex.ID_HELIOS,
                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Ingrid,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Iona,
                                                        [
                                                            PcIndex.ID_HELIOS,
                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Jaye,
                                                        [

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Jordi,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Kastor,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Petra,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Roberta,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Sasha,
                                                        [
                                                            PcIndex.ID_HELIOS,
                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Sybilla,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Tomasa,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Verna,
                                                        [PcIndex.ID_CYRION]
                                                    ],
                                                    [
                                                        NpcID.Vitacia,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Yuki,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Ezell,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                    [
                                                        NpcID.Irene,
                                                        [
                                                            PcIndex.ID_HELIOS,

                                                            PcIndex.ID_CYRION
                                                        ]
                                                    ],
                                                ]);

    addTimeSkipEvent(
        NpcID.Roberta,
        [PcIndex.ID_CYRION],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `Hmm... it was pretty fun interacting with a good ol' backwaters hippy (100% real) druid 
         . Makes quite a difference from my usual clientele. Sigh,
         though he refused to become my client after all - but that's all right 
         - people are usually shy before they get a taste of my services. Not to
         mention he also managed to pick up bits of my 100% organic natural 
         herbal recipe... <br/>`,
        new Map([
                    [PositiveEmotion.Respect, 0.8],
                    [PositiveEmotion.Trust, 0.3],
                    [PositiveEmotion.Gratitude, 0.4],
                ])
    );

    addTimeSkipEvent(
        NpcID.Hina,
        [],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `She's putting in so much effort (it it a penance?), yet these kids... sigh. With them 
        being useless like that, I suppose I can't do my usual of utilizing class hours for catching up 
        on jet lag. While I hate to be the responsible student,
        I must admit... something about this classroom is... different...
        <br/>
        ...<br/>
        Fuck. I think I'm actually enjoying this.`,
        new Map([
                    [PositiveEmotion.Respect, 0.7],
                    [PositiveEmotion.Trust, 0.4],
                    [PositiveEmotion.Affection, 0.3]
                ])
    );

    addTimeSkipEvent(
        NpcID.Iona,
        [],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `Wow, a year ago, I'd never have imagined this. That I'll be going to a 
         regular school with a proper teacher and true friends. The others 
         probably don't appreciate this, having grown up in a sheltered environment.
         But I'm really, truly grateful for this. I'll do my best, I swear.`,
        new Map([
                    [PositiveEmotion.Gratitude, 0.8],
                    [PositiveEmotion.Respect, 0.25],
                    [PositiveEmotion.Trust, 0.1],
                ])
    );

    addTimeSkipEvent(
        NpcID.Verna,
        [],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `Her classes for the kids are actually pretty decent, and God knows this
         is something Iona needed for proper growth.`,
        new Map([
                    [PositiveEmotion.Gratitude, 0.45],
                    [PositiveEmotion.Respect, 0.25],
                ])
    );

    addTimeSkipEvent(
        NpcID.Cecelia,
        [],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `Damn it. It hurts watching her try so hard, and yet I can't reciprocate...
         But I can't! I just can't... I've got barely a year to live, the fuck 
         am I studying for anyway?<br/>
         Just leave me alone. Don't look at me. Don't expect things of me.<br/>
         Please...<br/>
         But of course you won't. And I suppose this classroom does have its 
         cool moments. Sigh... it does help to take my mind of ig...`,
        new Map([
                    [PositiveEmotion.Gratitude, 0.6],
                    [PositiveEmotion.Affection, -0.1],
                ])
    );

    addTimeSkipEvent(
        NpcID.Sasha,
        [],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `Another physics lesson??? Oh, we're going to the beach today?`,
        new Map([
                    [PositiveEmotion.Respect, 0.3],
                    [PositiveEmotion.Affection, -0.05]
                ])
    );

    addInteractionEvent(
        NpcID.Roberta,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 27, 20, 30),
        `You mean you grew all the herbs I'd mentioned in a secret grove to 
        which I'll have privileged access too?! Cool!<br/>
        Also, this means I won't have to keep beggin Bjorn always to remember to
        get those herbs for me, and won't have to depend on his whims? Woohooo!!
        (Wonder where he's disappeared off to anyway...)`,
        new Map([
                    [PositiveEmotion.Gratitude, 8],
                    [PositiveEmotion.Respect, 3]
                ])
    );

    addTimeSkipEvent(
        NpcID.Verna,
        [PcIndex.ID_HELIOS],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        ``,
        new Map([
                    [PositiveEmotion.Respect, 0.2],
                ])
    );

    addTimeSkipEvent(
        NpcID.Jaye,
        [PcIndex.ID_HELIOS],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `Ah it seems I got myself a routine customer (even if they don't pay). 
        Strange tho, never would've guessed him as a seafood lover...`,
        new Map([
                    [PositiveEmotion.Respect, 0.1],
                    [PositiveEmotion.Gratitude, 0.2],
                ])
    );

    addTimeSkipEvent(
        NpcID.Athlon,
        [PcIndex.ID_HELIOS],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(17),
        ``,
        new Map()
    );
    addInteractionEvent(
        NpcID.Athlon,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 17, 9, 30),
        "Negated the drink and forced me to face a world I can't bear to face.",
        new Map([
                    [PositiveEmotion.Gratitude, 1],
                    [PositiveEmotion.Affection, -3],
                ]),
        10,
        new Set([PositiveEmotion.Affection])
    );
    addTimeSkipEvent(
        NpcID.Athlon,
        [PcIndex.ID_HELIOS],
        GameTimestamp.fromDays(18),
        GameTimestamp.fromDays(27),
        ``,
        new Map()
    );

    addTimeSkipEvent(
        NpcID.Dusk,
        [PcIndex.ID_CYRION],
        GameTimestamp.fromDays(2),
        GameTimestamp.fromDays(27),
        "",
        new Map()
    );

    addTimeSkipEvent(
        NpcID.Dawn,
        [PcIndex.ID_HELIOS, PcIndex.ID_CYRION],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        "",
        new Map([
                    [PositiveEmotion.Trust, 0.2]
                ])
    );

    addTimeSkipEvent(
        NpcID.Erica,
        [],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        "",
        new Map([
                    [PositiveEmotion.Trust, 0.4],
                    [PositiveEmotion.Gratitude, 0.3],
                ])
    );


    for (const [npc, pcs] of timeSkips.entries()) {
        addTimeSkipEvent(
            npc,
            pcs,
            GameTimestamp.fromDays(7),
            GameTimestamp.fromDays(27),
            "",
            new Map()
        );

        // All those part of the timeskip, except dusk and hina, would have
        // something to say about the clash between Helios and Julius. Whose
        // side they take would mainly depend on how they feel about Helios
    }

}
