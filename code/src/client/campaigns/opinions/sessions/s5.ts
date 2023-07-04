import {CharacterCard}                                      from "../../../data/cards/characterCard";
import {PcIndex}                                            from "../../../data/pcIndex";
import {NpcId, NpcIndex}                                    from "../../../npcs/npcIndex";
import {GameTimestamp}                                      from "../../common";
import {NpcInteractionEvent, NpcOpinionV2, PositiveEmotion} from "../npcOpinions";


export function session5NpcInteractions(
    npcInteractionEvents: Map<NpcId, Map<PcIndex, NpcOpinionV2>>)
{
    for (const pc of [PcIndex.ID_HELIOS,
                      PcIndex.ID_AURELIA])
    {
        npcInteractionEvents.get(NpcId.Dawn).get(pc).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 17, 30),
                "It seems they're wreaking havoc on the paintbrushes.",
                new Map([[PositiveEmotion.Affection, 1]])
            )
        );
    }

    // for (const npc of [NpcIndex.ID_DAWN, NpcIndex.ID_TAIHE, NpcIndex.ID_TOMASA]) {
    for (const npc of [NpcId.Dawn,
                       NpcId.Tomasa])
    {
        npcInteractionEvents.get(npc).get(PcIndex.ID_CYRION).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 17, 30),
                "Oh, poor guy, apologizing for his friends. They must've got " +
                "him into trouble so many times...",
                new Map([[PositiveEmotion.Respect, 1]])
            )
        );
    }

    npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_AURELIA).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 35),
            "Got assaulted by my innocent canvas. So cute.",
            new Map([[PositiveEmotion.Affection, 2]])
        )
    );

    npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_AURELIA).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 35),
            "Has a good imagination and a poetic painting in mind.",
            new Map([[PositiveEmotion.Respect, 2]])
        )
    );

    npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 35),
            "Ms. Dusk Herself chose to give him a chance. And requested that " +
            "he paint for Her.",
            new Map([[PositiveEmotion.Respect, 5],
                     [PositiveEmotion.Trust, 2]]),
            NpcIndex.get(NpcId.Dawn).passiveDeception
        )
    );

    npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 40),
            "The painting comes out rather nice. He is clearly not a painter " +
            "by profession. Yet his spirit longs to express itself. Was that " +
            "why he was chosen?",
            new Map([[PositiveEmotion.Trust, 1]]),
        )
    );

    npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 40),
            "Helped stabilize his friend's hand by guiding it with the powers " +
            "of nature.",
            new Map([[PositiveEmotion.Respect, 2],
                     [PositiveEmotion.Gratitude, 1]]),
        )
    );

    npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_HELIOS).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 45),
            "The painting turned out so... inspired. <em>Honor holding back the " +
            "Wrath of Devotion.</em> Beautiful. And... it seems She agrees.",
            new Map([[PositiveEmotion.Respect, 7],
                     [PositiveEmotion.Trust, 4]])
        )
    );

    npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 17, 50),
            "<span style='font-size: 10px;'>I'm not the person they seem to think me to be.</span> <span style='font-size: 9px;'>I cannot give " +
            "an answer to their problems, or even some of their questions." +
            "I'm feeling a bit...  </span> <span style='font-size: 8px;'>overwhelmed... particularly when they " +
            "ask me what I was before. </span> <span style='font-size: 7px;'> It isn't...</span> Thanks for letting me get back.",
            new Map([[PositiveEmotion.Respect, 1],
                     [PositiveEmotion.Gratitude, 4]]),
            NpcIndex.get(NpcId.Dawn).passiveDeception
        )
    );

    for (const npc of [NpcId.Dawn, NpcId.Tomasa]) {
        // for (const npc of [NpcIndex.ID_DAWN, NpcIndex.ID_TAIHE, NpcIndex.ID_TOMASA]) {
        for (const pc of [PcIndex.ID_PANZER,
                          PcIndex.ID_AURELIA,
                          PcIndex.ID_HELIOS,
                          PcIndex.ID_CYRION])
        {
            npcInteractionEvents.get(npc).get(pc).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 0),
                    "They helped us out with cooking for the community dinner. They " +
                    "weren't quite particularly skilled, but that makes it good " +
                    "to see that they didn't consider good, honest labour like " +
                    "cooking beneath them.",
                    new Map([[PositiveEmotion.Respect, 1],
                             [PositiveEmotion.Gratitude, 1],
                             [PositiveEmotion.Trust, 1]])
                )
            );
        }
    }

    npcInteractionEvents.get(NpcId.Erica).get(PcIndex.ID_AURELIA).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 25),
            "Seemed to be interested in books and literature in all forms.",
            new Map([[PositiveEmotion.Respect, 1]]),
        )
    );

    npcInteractionEvents.get(NpcId.Erica).get(PcIndex.ID_AURELIA).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "Nudged me to write. Was being genuine when she mentioned she would " +
            "love to read something I came up with.",
            new Map([[PositiveEmotion.Gratitude, 7],
                     [PositiveEmotion.Respect, 3],
                     [PositiveEmotion.Trust, 4]]),
        )
    );

    npcInteractionEvents.get(NpcId.Coroto).get(PcIndex.ID_AURELIA).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "What's her game here? Why's this strange elf woman encouraging " +
            "my wife so? Just another fan of literature? Or is there some " +
            "ulterior motive I'm missing...",
            new Map([[PositiveEmotion.Trust, -2],
                     [PositiveEmotion.Respect, 1]]),
            NpcIndex.get(NpcId.Coroto).passiveDeception - 5,
            new Map([[PositiveEmotion.Trust, true]])
        )
    );

    npcInteractionEvents.get(NpcId.Jordi).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "Seemed to be even more interested in my tales from the seas.",
            new Map([[PositiveEmotion.Gratitude, 1]]),
        )
    );

    npcInteractionEvents.get(NpcId.Yuki).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "Why's he suddenly so interested in Hav? This druid's clearly not " +
            "a seafarer. In fact, I won't be surprised to know he's never sailed before. " +
            "Jordi's too naive for his own good, but this seems a touch too " +
            "blatant. I'll have to keep an eye out...",
            new Map([[PositiveEmotion.Trust, -3]]),
            NpcIndex.get(NpcId.Yuki).passiveDeception,
            new Map([[PositiveEmotion.Trust, true]])
        )
    );

    npcInteractionEvents.get(NpcId.Kastor).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "Ugh.. the way he socializes with those two losers. It's " +
            "nauseating... Just look at Jordi blabbering and that emo acting " +
            "all cool like he doesn't care...",
            new Map([[PositiveEmotion.Respect, -2]]),
        )
    );

    npcInteractionEvents.get(NpcId.Petra).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            new GameTimestamp(0, 5, 19, 30),
            "It's good to see how the kid can bring Jordi out of his shell " +
            "again. He's been brooding a lot lately...",
            new Map([[PositiveEmotion.Respect, 2]]),
        )
    );

    // Quinn interactions
    // npcInteractionEvents.get(NpcIndex.ID_COROTO).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 14, 30),
    //         "From Sadhvastan huh. I'm not quite sure I like this. Things must " +
    //         "be pretty bad if the Tsar had to pull out the associations with " +
    //         "them. What really is happening? And that appearance... oh shit, " +
    //         "Oh Shit. Oh SHIT!",
    //         new Map([
    //             [PositiveEmotion.Trust, -8],
    //             [PositiveEmotion.Respect, 8]
    //         ]),
    //         22
    //     )
    // );
    // npcInteractionEvents.get(NpcIndex.ID_INGRID).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 16, 30),
    //         "Talking to him was really a comfort. Been so long since I could " +
    //         "speak my heart out to someone.",
    //         new Map([
    //             [PositiveEmotion.Gratitude, 4],
    //             [PositiveEmotion.Trust, 1],
    //             [PositiveEmotion.Respect, 1]
    //         ])
    //     )
    // );
    // npcInteractionEvents.get(NpcIndex.ID_JAYE).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 17, 50),
    //         "Boss was a cool customer. But sly as an eel. Even now can't " +
    //         "understand how I let my guard down to reveal so much...",
    //         new Map([
    //             [PositiveEmotion.Respect, 4],
    //             [PositiveEmotion.Trust, -1]
    //         ]),
    //         13,
    //         new Map([[PositiveEmotion.Trust, true]])
    //     )
    // );
    // npcInteractionEvents.get(NpcIndex.ID_VERNA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         new GameTimestamp(0, 5, 18, 30),
    //         "A person hanging between life and death, who immediately saw " +
    //         "through me. But somehow I feel this is different, and <em>feel</em> " +
    //         "that he means no harm. I revealed more than I should have, but I " +
    //         "think I am glad I did.",
    //         new Map([
    //             [PositiveEmotion.Trust, 3],
    //             [PositiveEmotion.Gratitude, 2],
    //             [PositiveEmotion.Respect, 2],
    //         ])
    //     )
    // );


    ((memoriesErased) => {

        // In the midst of a blizzard, strange creatures showing up and general
        // confusion, Helios standing up calmly and rallying the villagers was a
        // huge source of comfort. But how do each of them react?
        // Well, I'm not going to copy and paste similar stuff and write
        // sentences for each of the twenty-something people, but some do merit
        // a unique interaction.
        const exclusionListH: NpcId[] = [
            NpcId.Elysium,
            NpcId.Bjorn,
            NpcId.Hav,
            NpcId.Sasha,
            NpcId.Cecelia
        ];

        const exclusionListC: NpcId[] = [
            NpcId.Elysium,
            NpcId.Bjorn,
            NpcId.Hav,
            NpcId.Sasha,
            NpcId.Cecelia
        ];

        const exclusionListA: NpcId[] = [
            NpcId.Elysium,
            NpcId.Bjorn,
            NpcId.Hav,
            NpcId.Sasha,
            NpcId.Cecelia
        ];

        const exclusionListP: NpcId[] = [
            NpcId.Elysium,
            NpcId.Bjorn,
            NpcId.Hav,
            NpcId.Sasha,
            NpcId.Cecelia
        ];

        // const exclusionListQ: NpcIndex[] = [
        //     NpcIndex.ID_ELYSIUM,
        //     NpcIndex.ID_BJORN,
        //     NpcIndex.ID_HAV,
        //     NpcIndex.ID_SASHA,
        //     NpcIndex.ID_CECELIA
        // ];

        // Some will retain their memories after what happens...
        npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_HELIOS).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Kept his cutlery back slowly and primly before standing and drawing his " +
                "weapon. Touché. Yep, dude's definitely a seasoned warrior...<br/>" +
                "and a killer through-and-through.",
                new Map([[PositiveEmotion.Trust, -2],
                         [PositiveEmotion.Respect, 5]]),
                10,
                new Map([[PositiveEmotion.Trust, true]])
            )
        );
        exclusionListH.push(NpcId.Hina);

        npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_CYRION).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "The others didn't seem to notice, but was a large part " +
                "responsible for us not getting ambushed right outside the " +
                "door. Doesn't seem addicted to violence.",
                new Map([[PositiveEmotion.Gratitude, 2],
                         [PositiveEmotion.Trust, 1],
                         [PositiveEmotion.Respect, 3]]),
            )
        );
        exclusionListC.push(NpcId.Hina);

        npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_PANZER).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Charged right out huh? Not very smart, but gets the job done... " +
                "Pity I didn't take the lectures on AI back in-",
                new Map([[PositiveEmotion.Respect, 2]]),
            )
        );
        exclusionListP.push(NpcId.Hina);

        npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_AURELIA).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Hmm... a spellcaster... they always find their throats to be " +
                "the first to be slit. But fireballs are cool anyway.",
                new Map([[PositiveEmotion.Respect, 4]]),
            )
        );
        exclusionListA.push(NpcId.Hina);

        // npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_QUINN).addEvent(
        //     new NpcInteractionEvent(
        //         new GameTimestamp(0, 5, 19, 45),
        //         "Stood by the villagers to protect them. I can respect that. " +
        //         "Seen far too many blood-thirsty folk place greater value in " +
        //         "death than in life.",
        //         new Map([[PositiveEmotion.Respect, 1],
        //                  [PositiveEmotion.Trust, 1]]),
        //     )
        // );
        // exclusionListQ.push(NpcIndex.ID_HINA);

        npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_HELIOS).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Acted as a beacon of hope and helped keep the villagers calm" +
                " when <em>they</em> came...",
                new Map([[PositiveEmotion.Gratitude, 3],
                         [PositiveEmotion.Trust, 1]]),
            )
        );
        exclusionListH.push(NpcId.Dawn);

        npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_CYRION).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Helped in organizing the villagers and keeping the inklings " +
                "at bay as he led us to Mr. Elysium's.",
                new Map([[PositiveEmotion.Gratitude, 3],
                         [PositiveEmotion.Respect, 1]]),
            )
        );
        exclusionListC.push(NpcId.Dawn);

        npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_AURELIA).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Fireball after fireball. Teleporting roof-to-roof in the " +
                "shadows. All for these poor inklings. Hehe, aren't we dramatic?",
                new Map([[PositiveEmotion.Respect, 2]]),
            )
        );
        exclusionListA.push(NpcId.Dawn);

        npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_PANZER).addEvent(
            new NpcInteractionEvent(
                new GameTimestamp(0, 5, 19, 45),
                "Charging right in, huh?",
                new Map([[PositiveEmotion.Respect, 2]]),
            )
        );
        exclusionListP.push(NpcId.Dawn);

        // npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_QUINN).addEvent(
        //     new NpcInteractionEvent(
        //         new GameTimestamp(0, 5, 19, 45),
        //         "Walked among our group to keep us safe.",
        //         new Map([[PositiveEmotion.Gratitude, 2]]),
        //     )
        // );
        // exclusionListQ.push(NpcIndex.ID_DAWN);

        if (!memoriesErased) {

            npcInteractionEvents.get(NpcId.Yuki).get(PcIndex.ID_HELIOS).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "He shines so bright... ugh, it burns. Also the way <em>that man</em> " +
                    "looks at me - cringe.",
                    new Map([[PositiveEmotion.Trust, 1],
                             [PositiveEmotion.Gratitude, -4],
                             [PositiveEmotion.Respect, 4]]),
                    19,
                )
            );
            exclusionListH.push(NpcId.Yuki);

            npcInteractionEvents.get(NpcId.Iona).get(PcIndex.ID_HELIOS).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Saved me!! Gods below, I didn't see that coming... Rusts, " +
                    "that thing would've... would've...",
                    new Map([[PositiveEmotion.Trust, 4],
                             [PositiveEmotion.Gratitude, 4],
                             [PositiveEmotion.Respect, 2]]),
                    19,
                )
            );
            exclusionListH.push(NpcId.Iona);

            npcInteractionEvents.get(NpcId.Cecelia).get(PcIndex.ID_HELIOS).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Chosen by a Ryshadium! A ryshadium who came to our aid " +
                    "during this fearsome storm with all the demons that " +
                    "emerged from it.",
                    new Map([[PositiveEmotion.Trust, 2],
                             [PositiveEmotion.Gratitude, 4],
                             [PositiveEmotion.Respect, 5]])
                )
            );

            npcInteractionEvents.get(NpcId.Sasha).get(PcIndex.ID_HELIOS).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Sent his mount to protect Cecilia and me.",
                    new Map([[PositiveEmotion.Trust, 1],
                             [PositiveEmotion.Gratitude, 5],
                             [PositiveEmotion.Respect, 3]])
                )
            );

            npcInteractionEvents.get(NpcId.Kastor).get(PcIndex.ID_HELIOS).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "The way he was so completely in command... I wish " +
                    "that was me instead.",
                    new Map([[PositiveEmotion.Trust, 1],
                             [PositiveEmotion.Gratitude, -2],
                             [PositiveEmotion.Respect, 4]]),
                    10,
                    new Map([[PositiveEmotion.Gratitude, true]])
                )
            );
            npcInteractionEvents.get(NpcId.Kastor).get(PcIndex.ID_HELIOS).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Did he not consider me worthy of assisting him in combat? " +
                    "And he considered <em>Yuki</em> worthy enough instead? Heh, " +
                    "and the coward didn't even pick up the weapon.",
                    new Map([[PositiveEmotion.Trust, -1],
                             [PositiveEmotion.Gratitude, -2],
                             [PositiveEmotion.Respect, -1]]),
                    10,
                    new Map([[PositiveEmotion.Gratitude, true]])
                )
            );
            exclusionListH.push(NpcId.Kastor);

            npcInteractionEvents.get(NpcId.Jaye).get(PcIndex.ID_HELIOS).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Now, why did he throw the spear towards me?",
                    new Map([])
                )
            );
            npcInteractionEvents.get(NpcId.Verna).get(PcIndex.ID_HELIOS).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Was more comfortable when the attack started compared " +
                    "to the dinner. It's been " +
                    "so long since I met someone like that. And in handing me " +
                    "the javelin, he also immediately noted me as a warrior. " +
                    "That... regrettably... makes me proud.",
                    new Map([[PositiveEmotion.Trust, 3],
                             [PositiveEmotion.Gratitude, 1],
                             [PositiveEmotion.Respect, 7]])
                )
            );

            npcInteractionEvents.get(NpcId.Verna).get(PcIndex.ID_HELIOS).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Saved Iona in the nick of time from that monster.",
                    new Map([[PositiveEmotion.Gratitude, 7]])
                )
            );
            exclusionListH.push(NpcId.Verna);

            npcInteractionEvents.get(NpcId.Coroto).get(PcIndex.ID_HELIOS).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Just as he warned, <em>the monsters from the north</em> came. How did he know? " +
                    "But he stood up for us, nobly and bravely like I'd expect. " +
                    "Did the Tsar send him? If so, for what purpose?",
                    new Map([[PositiveEmotion.Trust, -2],
                             [PositiveEmotion.Gratitude, 2],
                             [PositiveEmotion.Respect, 4]]),
                    10,
                    new Map([[PositiveEmotion.Trust, true]])
                )
            );
            exclusionListH.push(NpcId.Coroto);

            npcInteractionEvents.get(NpcId.Coroto).get(PcIndex.ID_CYRION).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Was in good command of the powers of nature as he covered " +
                    "our escape. Well, would suck if a druid from that weak nation " +
                    "couldn't even do that. But... I suppose there is a reason why " +
                    "the other strong folk keep him around...",
                    new Map([[PositiveEmotion.Trust, 4],
                             [PositiveEmotion.Gratitude, -1],
                             [PositiveEmotion.Respect, 4]]),
                    10,
                    new Map([[PositiveEmotion.Gratitude, true]])
                )
            );
            exclusionListC.push(NpcId.Coroto);

            npcInteractionEvents.get(NpcId.Jordi).get(PcIndex.ID_CYRION).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Amazing! I was considering him to be like myself, but there's " +
                    "no way I could stand against such odds and protect such a large " +
                    "group at the same time.",
                    new Map([[PositiveEmotion.Trust, 4],
                             [PositiveEmotion.Gratitude, 2],
                             [PositiveEmotion.Respect, 5]]),
                )
            );
            exclusionListC.push(NpcId.Jordi);

            npcInteractionEvents.get(NpcId.Yuki).get(PcIndex.ID_CYRION).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "Well, ig he doesn't want us dead at least. Too easy to feign " +
                    "weakness in this crisis and let the monsters do the rest.",
                    new Map([[PositiveEmotion.Trust, 3]]),
                )
            );
            exclusionListC.push(NpcId.Jordi);

            npcInteractionEvents.get(NpcId.Erica).get(PcIndex.ID_AURELIA).addEvent(
                new NpcInteractionEvent(
                    new GameTimestamp(0, 5, 19, 45),
                    "I suspected she was a powerful spellcaster, but damn, I don't " +
                    "think I, as an Ursine noble, met more than a handful of mages who could conjure " +
                    "fireballs! And with such frequency! Father would " +
                    "be so proud to meet her... but why would she care about " +
                    "someone like me?",
                    new Map([[PositiveEmotion.Respect, 5],
                             [PositiveEmotion.Gratitude, 3],]),
                )
            );
            exclusionListA.push(NpcId.Erica);

            for (const [npcIndex, npc] of CharacterCard.IndexById) {
                if (!npc.isVillageNpc) {
                    continue;
                }

                if (!exclusionListH.includes(npcIndex)) {
                    npcInteractionEvents.get(npcIndex).get(PcIndex.ID_HELIOS).addEvent(
                        new NpcInteractionEvent(
                            new GameTimestamp(0, 5, 19, 45),
                            "Was completely in control during the fearsome blizzard " +
                            "and took charge when the monsters arrived.",
                            new Map([[PositiveEmotion.Trust, 1],
                                     [PositiveEmotion.Gratitude, 1],
                                     [PositiveEmotion.Respect, 4]]),
                        )
                    );
                }
                if (!exclusionListC.includes(npcIndex)) {
                    npcInteractionEvents.get(npcIndex).get(PcIndex.ID_CYRION).addEvent(
                        new NpcInteractionEvent(
                            new GameTimestamp(0, 5, 19, 45),
                            "Organized our retreat while stalling the monsters " +
                            "nearby.",
                            new Map([[PositiveEmotion.Trust, 1],
                                     [PositiveEmotion.Gratitude, 4],
                                     [PositiveEmotion.Respect, 1]]),
                        )
                    );
                }
                if (!exclusionListA.includes(npcIndex)) {
                    npcInteractionEvents.get(npcIndex).get(PcIndex.ID_AURELIA).addEvent(
                        new NpcInteractionEvent(
                            new GameTimestamp(0, 5, 19, 45),
                            "Stood tall in the fearsome blizzard and granted us " +
                            "cover from the aerial roof.",
                            new Map([[PositiveEmotion.Trust, 1],
                                     [PositiveEmotion.Gratitude, 4],
                                     [PositiveEmotion.Respect, 1]]),
                        )
                    );
                }
                // if (!exclusionListQ.includes(npcIndex)) {
                //     npcInteractionEvents.get(npcIndex).get(PcIndex.ID_QUINN).addEvent(
                //         new NpcInteractionEvent(
                //             new GameTimestamp(0, 5, 19, 45),
                //             "Walked among our group to keep us safe.",
                //             new Map([[PositiveEmotion.Trust, 2],
                //                      [PositiveEmotion.Gratitude, 2],
                //                      [PositiveEmotion.Respect, 1]]),
                //         )
                //     );
                // }
                if (!exclusionListP.includes(npcIndex)) {
                    npcInteractionEvents.get(npcIndex).get(PcIndex.ID_PANZER).addEvent(
                        new NpcInteractionEvent(
                            new GameTimestamp(0, 5, 19, 45),
                            "Charged right into the heart of the enemy.",
                            new Map([[PositiveEmotion.Respect, 5],
                                     [PositiveEmotion.Trust, 2]]),
                        )
                    );
                }
            }
        }
    })(true); // TODO: REPLACE WITH PASSIVE DECPTS BEFORE RE_ENABLING.
}
