import {NpcID}               from "../../data/npcIndex";
import {PcIndex}             from "../../data/pcIndex";
import {GameTimestamp}       from "../../GameTimestamp";
import {Character}           from "../../simulation/characters/Character";
import {PositiveEmotion}     from "../PositiveEmotion";
import {addInteractionEvent} from "./s9";


export function sessionOpinionEvents07()
{
    addInteractionEvent(
        NpcID.Dawn,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 8, 0),
        "Remained business-like in investigating last night even in the " +
        "face of Taihe's death. But I suppose it's to be expected, they'd " +
        "have seen death in their profession, but what happened last night " +
        "was bizarre and deserving of explanation.",
        new Map()
    );

    addInteractionEvent(
        NpcID.Dawn,
        [
            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION
        ],

        new GameTimestamp(0, 6, 8, 30),
        "So they were around the garden statue, huh. I did suspect " +
        "they were somehow involved in Taihe's death, given the " +
        "coincidence. But why would they do that? Must've been an " +
        "accident, right?",
        new Map([
                    [PositiveEmotion.Trust, -2]
                ]),
        Character.get(NpcID.Dawn).passiveDeception,
        new Set([PositiveEmotion.Trust,])
    );

    addInteractionEvent(
        NpcID.Tomasa,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 8, 0),
        "Tried to examine Taihe's body and analyze what happened.",
        new Map()
    );

    // npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_QUINN).addEvent(
    // new NpcInteractionEvent( new GameTimestamp(0, 6, 8, 0), "Volunteered for
    // hard labour with his own hands.", new Map([ [PositiveEmotion.Respect,
    // 2], [PositiveEmotion.Trust, 1], ]) ) );

    addInteractionEvent(
        NpcID.Roberta,
        [],
        new GameTimestamp(0, 6, 8, 0),
        "Seems to have some passing knowledge of alchemy.",
        new Map([
                    [PositiveEmotion.Respect, 1]
                ])
    );

    addInteractionEvent(
        NpcID.Vitacia,
        [
            PcIndex.ID_CYRION,
            PcIndex.ID_HELIOS
        ],
        new GameTimestamp(0, 6, 8, 15),
        "Their arrival brought doom!! They killed him. THEY KILLED HIM! " +
        "I know they did this. They made poor Taihe suffer so much. And " +
        "now... I must... live the rest of... no, no... I can't. ",
        new Map([
                    [PositiveEmotion.Respect, -1],
                    [PositiveEmotion.Trust, -1],
                    [PositiveEmotion.Affection, -2]
                ]),
        10,
        new Set([PositiveEmotion.Respect, PositiveEmotion.Trust,])
    );

    addInteractionEvent(
        NpcID.Vitacia,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 8, 15),
        "His face betrays his crime. The way he avoids my gaze. The weird " +
        "way his powers work. And the way he seems to know what happened " +
        "to Taihe's body. He must have done it! I know he did!",
        new Map([
                    [PositiveEmotion.Respect, -3],
                    [PositiveEmotion.Trust, -2],
                    [PositiveEmotion.Affection, -4]
                ]),
        10,
        new Set([
                    PositiveEmotion.Respect,
                    PositiveEmotion.Trust,
                ]));

    for (const pc of [
        PcIndex.ID_HELIOS,
        PcIndex.ID_CYRION,

    ])
    {
        addInteractionEvent(
            NpcID.Vitacia,
            [pc],
            new GameTimestamp(0, 6, 8, 18),
            "Oh Saints above! What was wrong with me? How did I just blame " +
            "them with no reasons whatever? My pain absolutely doesn't " +
            "excuse this unfairness! Yet... they don't seem to hate me for " +
            "it.",
            new Map([
                        [
                            PositiveEmotion.Respect,
                            pc == PcIndex.ID_CYRION ? 6 : 1
                        ],
                        [
                            PositiveEmotion.Trust,
                            pc == PcIndex.ID_CYRION ? 5 : 1
                        ],
                        [
                            PositiveEmotion.Affection,
                            pc == PcIndex.ID_CYRION ? 8 : 2
                        ]
                    ]),
            10,
            new Set([
                        pc == PcIndex.ID_CYRION ? PositiveEmotion.Respect : PositiveEmotion.Affection,
                        PositiveEmotion.Respect,
                        PositiveEmotion.Trust,
                    ]));
    }

    addInteractionEvent(
        NpcID.Vitacia,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 8, 30),
        "Even though I don't blame him for Taihe's death anymore, he seems to have " +
        "begun to hate himself for it. Just great, you've done it now, you " +
        "terrible, awful person. And even then he tries his best to console " +
        "me.",
        new Map([
                    [PositiveEmotion.Respect, 3],
                    [PositiveEmotion.Trust, 3],
                ]));

    // npcInteractionEvents.get(NpcIndex.ID_ROBERTA).get(PcIndex.ID_QUINN).addEvent(
    // new NpcInteractionEvent( new GameTimestamp(0, 6, 8, 30), "Offered 'Tacia
    // a potion to numb the pain. Unusual to find one versed " + "in those,
    // versed enough to know it's not a magic cure, and to " + "recommend
    // judicious use. And Saints know we needed it now.", new Map([
    // [PositiveEmotion.Respect, 4], [PositiveEmotion.Trust, 2],
    // [PositiveEmotion.Gratitude, 3] ]), ) );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 8, 30),
        "Fell under a powerful wave of guilt. But that clearly was his " +
        "vulnerable mind. Its signature is that of a false guilt complex. " +
        "Conscience strong with this guy. Fairly certain he's not the " +
        "killer.",
        new Map([
                    [PositiveEmotion.Trust, 4]
                ]),
        Character.get(NpcID.Hina).passiveDeception + 5
    );

    // npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_PANZER).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 6, 8, 30),
    //         "Expected levels of sub-conscious guilt when provoked. Not much
    // " + "in active consciousness. Nothing to remark here.", new Map([]),
    // NpcIndex.get(NpcId.Hina).passiveDeception + 10 ) );

    addInteractionEvent(
        NpcID.Hina,
        [],
        new GameTimestamp(0, 6, 8, 30),
        "Heh, decently suppressed, and I was distracted by the starry guy overreacting... " +
        "but it's clear. You're the killer, aren't you? That's some fresh guilt quashed in " +
        "there. You're not absolute scum, but it's too less for - ahem - <em>culpable " +
        "homicide not amounting to murder</em>...<br/>" +
        "Anyway, far be it from me to cast the first stone...",
        new Map([
                    [PositiveEmotion.Trust, -3],
                ]),
        Character.get(NpcID.Hina).passiveDeception + 5
    );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 8, 30),
        "Hmm, actually mitigated the guilt of his friend to some degree, " +
        "and didn't feel any of his own. Not now, and very little in the " +
        "past. Is it because he didn't focus on me enough, because he is " +
        "a hero? Or is it because he is a psychopath?",
        new Map([
                    [PositiveEmotion.Trust, 2],
                    [PositiveEmotion.Respect, 2]
                ]),
        Character.get(NpcID.Hina).passiveDeception + 5
    );

    // npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_QUINN).addEvent(
    // new NpcInteractionEvent( new GameTimestamp(0, 6, 9, 0), "You were the
    // harbinger of death after all. What did the boy do wrong? " + "Has the
    // Tsar sent you? Will he come after me next? Did I offend " + "the Tsar in
    // any way? Will I be killed for not knowing the boy's crimes?", new Map([
    // [PositiveEmotion.Trust, -4], [PositiveEmotion.Respect, 4] ]), 17 ) );

    addInteractionEvent(
        NpcID.Yuki,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 9, 0),
        "A soul sheared. A paladin. A druid digging up the pasts of people " +
        "here. Coincidences? I think not. Poor Taihe, you had no chance " +
        "did you... I shudder at the last sight those eyes of your saw. " +
        "The pure horror of inescapable death before they burnt. That bastard!" +
        "slaughtering a kid like that...",
        new Map([
                    [PositiveEmotion.Affection, -4],
                    [PositiveEmotion.Respect, -2]
                ]),
        Character.get(NpcID.Yuki).passiveDeception + 5
    );

    addInteractionEvent(
        NpcID.Erica,
        [],
        new GameTimestamp(0, 6, 9, 30),
        "So it was spying after all... sigh. I'd hoped I was wrong. " +
        "Apologizing after being caught still leaves a bad aftertaste, but " +
        "at least it makes her a much better person than one who wouldn't. " +
        "I'm not sure how far I can trust those words, but she did sound " +
        "genuinely remorseful, and not as arrogant as I feared. Maybe I'll " +
        "give it another try and see how it goes.",
        new Map([
                    [PositiveEmotion.Trust, 2],
                    [PositiveEmotion.Respect, 4],
                ]),
        Character.get(NpcID.Erica).passiveDeception - 5,
        new Set([PositiveEmotion.Trust])
    )

    // npcInteractionEvents.get(NpcIndex.ID_SASHA).get(PcIndex.ID_QUINN).addEvent(
    // new NpcInteractionEvent( new GameTimestamp(0, 6, 9, 30), "Guy did a
    // check-in on my mental health, but I wasn't really the " + "one who
    // needed it... Ah well, I suppose I'll be learning the " + "lute now.
    // Something to look forward to ig.", new Map([ [PositiveEmotion.Gratitude,
    // 2], ]), ) );

    addInteractionEvent(
        NpcID.Genefe,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 9, 30),
        "Hey! um... well.. yeah you may hold her wheelchair I suppose.",
        new Map([
                    [PositiveEmotion.Respect, -1],
                ]),
    );
    // npcInteractionEvents.get(NpcId.Genefe).get(PcIndex.ID_PANZER).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 6, 9, 30),
    //         "Seems concerned about the children's education. Seems to " +
    //         "consider those 'video games' from hell magical.",
    //         new Map([
    //             [PositiveEmotion.Respect, 0],
    //             [PositiveEmotion.Gratitude, -1],
    //         ]),
    //         10,
    //         new Map([[PositiveEmotion.Gratitude, true]])
    //     )
    // );

    addInteractionEvent(
        NpcID.Cecelia,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 9, 30),
        "Seems to know something is wrong here. Also gave off weird vibes " +
        "like Hina once did.",
        new Map([
                    [PositiveEmotion.Respect, 3],
                ]),
    )

    addInteractionEvent(
        NpcID.Cecelia,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 9, 30),
        "Claims he would try to search for a way to save me. I wish I " +
        "could believe that. Those probably aren't empty words, but I " +
        "don't think he could succeed, or if there even is a way to. " +
        "But... if someone's trying... dare I hope? ",
        new Map([
                    [PositiveEmotion.Gratitude, 5],
                ]),
    );

    addInteractionEvent(
        NpcID.Cecelia,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 9, 30),
        "No, no, no. Don't do that. Don't give me hope. Being alive " +
        "and powerful like yourself, it's easy to believe everything is " +
        "possible. But I am already a corpse. Please don't...",
        new Map([
                    [PositiveEmotion.Gratitude, -3],
                ]),
        Character.get(NpcID.Cecelia).passiveDeception + 5,
        new Set([PositiveEmotion.Affection])
    );

    // npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).addEvent(
    // new NpcInteractionEvent( new GameTimestamp(0, 6, 10, 30), "Was concerned
    // about Helios causing me hurt.", new Map([ [PositiveEmotion.Gratitude,
    // 3], ]), ) );

    // npcInteractionEvents.get(NpcIndex.ID_CECELIA).get(PcIndex.ID_QUINN).addEvent(
    // new NpcInteractionEvent( new GameTimestamp(0, 6, 10, 30), "When that
    // worry subsided, it became clear how much mutual trust " + "and joviality
    // lies in their friendship. Ahh... I wish I had " + "someone like that.",
    // new Map([ [PositiveEmotion.Respect, 3], [PositiveEmotion.Gratitude, -1],
    // ]), 19, new Map([[PositiveEmotion.Gratitude, true]]) ) );
    addInteractionEvent(
        NpcID.Cecelia,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 10, 30),
        "It's clear how much mutual trust and joviality lies in their " +
        "friendship. Ahh... I wish I had someone like that.",
        new Map([
                    [PositiveEmotion.Respect, 3],
                    [PositiveEmotion.Gratitude, -1],
                ]),
        Character.get(NpcID.Cecelia).passiveDeception + 5,
        new Set([PositiveEmotion.Gratitude])
    );

    // npcInteractionEvents.get(NpcIndex.ID_YUKI).get(PcIndex.ID_QUINN).addEvent(
    // new NpcInteractionEvent( new GameTimestamp(0, 6, 11, 30), "Was it my
    // imagination or did he know more about my circumstances " + "than met the
    // eye? At least it led to the resolution of my " + "suspicions and
    // prevented... any unfortunate mishaps.", new Map([
    // [PositiveEmotion.Gratitude, 2], [PositiveEmotion.Trust, -1] ]), 10, new
    // Map([[PositiveEmotion.Trust, true]]) ) );

    addInteractionEvent(
        NpcID.Yuki,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 11, 30),
        "Wait an alias attestable by the brat's father himself? And now " +
        "that I notice... his oath's clearly not that advanced yet. I was " +
        "barking up the wrong tree. I don't know how that makes me feel. " +
        "But I can't help seeing him as a misguided junior. Oh, you poor " +
        "boy, if only you knew... there's no point. After all, <em>Honor is dead</em>.",
        new Map([
                    [PositiveEmotion.Affection, 6],
                    [PositiveEmotion.Respect, 2]
                ]),
        Character.get(NpcID.Yuki).passiveDeception + 5,
        new Set([PositiveEmotion.Affection]));

    addInteractionEvent(
        NpcID.Yuki,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 11, 30),
        "All that said, the way he glows. That radiance is blinding. " +
        "Maybe... in another reality...",
        new Map([
                    [PositiveEmotion.Respect, 2],
                    [PositiveEmotion.Gratitude, -4]
                ]),
        Character.get(NpcID.Yuki).passiveDeception
    );

    addInteractionEvent(
        NpcID.Dawn,
        [],
        new GameTimestamp(0, 6, 11, 30),
        "Made a superficial attempt to console me, changing to her topics " +
        "of interest real quick at the slightest word from me. But then " +
        "she really didn't have a reason to care either.",
        new Map([
                    [PositiveEmotion.Trust, 1],
                ])
    );

    addInteractionEvent(
        NpcID.Dawn,
        [],
        new GameTimestamp(0, 6, 11, 45),
        "Took the initiative to teach the kids! I... that's... Thank you! " +
        "Thank you so much! With this, there may be some future for them yet.",
        new Map([
                    [PositiveEmotion.Respect, 7],
                    [PositiveEmotion.Gratitude, 7],
                    [PositiveEmotion.Trust, 3],
                ]));

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 11, 30),
        "Oh you poor boy, here we go. You did nothing wrong.",
        new Map([
                    [PositiveEmotion.Trust, 1]
                ]),
        Character.get(NpcID.Hina).passiveDeception + 5
    );

    for (const pc of [
        PcIndex.ID_HELIOS,
        PcIndex.ID_CYRION,

    ])
    {
        addInteractionEvent(
            NpcID.Dawn,
            [pc],
            new GameTimestamp(0, 6, 12, 0),
            "Finally, after all these years... people I could open up to...",
            new Map([
                        [
                            PositiveEmotion.Respect,
                            pc == PcIndex.ID_HELIOS ? 8 : 4
                        ],
                        [
                            PositiveEmotion.Gratitude,
                            pc == PcIndex.ID_HELIOS ? 9 : 5
                        ],
                        [
                            PositiveEmotion.Trust,
                            pc == PcIndex.ID_HELIOS ? 6 : 3
                        ],
                    ])
        );
    }

    addInteractionEvent(
        NpcID.Dawn,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 12, 0),
        "Feels sorry for my state. But if only he knew... just how little " +
        "I deserve that.",
        new Map([
                    [PositiveEmotion.Gratitude, 4],
                    [PositiveEmotion.Affection, 2],
                ]),
        Character.get(NpcID.Dawn).passiveDeception
    );
}
