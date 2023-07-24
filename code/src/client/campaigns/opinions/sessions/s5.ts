import {getEnumIterator}                                    from "../../../common/common";
import {PcIndex}                                            from "../../../data/pcIndex";
import {Character}                                          from "../../../gameplay/simulation/characters/Character";
import {NpcId}                                              from "../../../npcs/npcIndex";
import {GameTimestamp}                                      from "../../common";
import {NpcInteractionEvent, NpcOpinionV2, PositiveEmotion} from "../npcOpinions";
import {addInteractionEvent, addTimeSkipEvent}              from "./s9";


export function session5NpcInteractions(
    npcInteractionEvents: Map<NpcId, Map<PcIndex, NpcOpinionV2>>)
{

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_HELIOS,
         PcIndex.ID_AURELIA],
        new GameTimestamp(0, 5, 17, 30),
        "It seems they're wreaking havoc on the paintbrushes.",
        new Map([[PositiveEmotion.Affection, 1]]));

    for (const npc of [NpcId.Dawn,
                       NpcId.Tomasa])
    {
        addInteractionEvent(npcInteractionEvents,
                            npc,
                            [PcIndex.ID_CYRION],
                            new GameTimestamp(0, 5, 17, 30),
                            "Oh, poor guy, apologizing for his friends. They must've got " +
                            "him into trouble so many times...",
                            new Map([[PositiveEmotion.Respect, 1]]));
    }

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 5, 17, 35),
        "Got assaulted by my innocent canvas. So cute.",
        new Map([[PositiveEmotion.Affection, 2]])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 5, 17, 35),
        "Has a good imagination and a poetic painting in mind.",
        new Map([[PositiveEmotion.Respect, 2]])
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Dusk,
        [PcIndex.ID_AURELIA, PcIndex.ID_HELIOS],
        GameTimestamp.fromDays(2),
        GameTimestamp.fromDays(5),
        "",
        new Map()
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dusk,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 17, 40),
        "Go ahead. Your intent did rouse me before. Now humour me ...",
        new Map([
                    [PositiveEmotion.Respect, 1]
                ]),
        10,
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dusk,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 5, 17, 40),
        "Know your place. It is not you the canvas beckons.",
        new Map([
                    [PositiveEmotion.Respect, -1]
                ]),
        10,
        new Set([PositiveEmotion.Respect])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 17, 35),
        "Ms. Dusk Herself chose to give him a chance. And requested that " +
        "he paint for Her.",
        new Map([[PositiveEmotion.Respect, 5],
                 [PositiveEmotion.Trust, 2]]),
        Character.get(NpcId.Dawn).passiveDeception
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 17, 40),
        "The painting comes out rather nice. He is clearly not a painter " +
        "by profession. Yet his spirit longs to express itself. Was that " +
        "why he was chosen?",
        new Map([[PositiveEmotion.Trust, 1]]),
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 17, 40),
        "Helped stabilize his friend's hand by guiding it with the powers " +
        "of nature.",
        new Map([[PositiveEmotion.Respect, 2],
                 [PositiveEmotion.Gratitude, 1]]),
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 17, 45),
        "The painting turned out so... inspired. <em>Honor holding back the " +
        "Wrath of Devotion.</em> Beautiful. And... it seems She agrees.",
        new Map([[PositiveEmotion.Respect, 7],
                 [PositiveEmotion.Trust, 4]])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dusk,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 5, 17, 45),
        "I am humoured. Nothing holds interest forever, but this work does " +
        "merit a moment of contemplation.",
        new Map([
                    [PositiveEmotion.Respect, 3],
                    [PositiveEmotion.Gratitude, 4],
                ]),
        10,
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 17, 50),
        "<span style='font-size: 10px;'>I'm not the person they seem to think me to be.</span> <span style='font-size: 9px;'>I cannot give " +
        "an answer to their problems, or even some of their questions." +
        "I'm feeling a bit...  </span> <span style='font-size: 8px;'>overwhelmed... particularly when they " +
        "ask me what I was before. </span> <span style='font-size: 7px;'> It isn't...</span> Thanks for letting me get back.",
        new Map([[PositiveEmotion.Respect, 1],
                 [PositiveEmotion.Gratitude, 4]]),
        Character.get(NpcId.Dawn).passiveDeception
    );

    for (const npc of [NpcId.Dawn, NpcId.Tomasa]) {
        // for (const npc of [NpcIndex.ID_DAWN, NpcIndex.ID_TAIHE, NpcIndex.ID_TOMASA]) {
        addInteractionEvent(
            npcInteractionEvents,
            npc,
            [PcIndex.ID_AURELIA,
             PcIndex.ID_HELIOS,
             PcIndex.ID_CYRION],
            new GameTimestamp(0, 5, 19, 0),
            "They helped us out with cooking for the community dinner. They " +
            "weren't quite particularly skilled, but that makes it good " +
            "to see that they didn't consider good, honest labour like " +
            "cooking beneath them.",
            new Map([[PositiveEmotion.Respect, 1],
                     [PositiveEmotion.Gratitude, 1],
                     [PositiveEmotion.Trust, 1]])
        )

    }

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Erica,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 5, 19, 25),
        "Seemed to be interested in books and literature in all forms.",
        new Map([[PositiveEmotion.Respect, 1]]),
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Erica,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 5, 19, 30),
        "Nudged me to write. Was being genuine when she mentioned she would " +
        "love to read something I came up with.",
        new Map([[PositiveEmotion.Gratitude, 7],
                 [PositiveEmotion.Respect, 3],
                 [PositiveEmotion.Trust, 4]]),
    )

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dusk,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 5, 19, 30),
        "<em style='font-size: 11px'>(Musing) " +
        "Books belong to the same world as works of art. Like paintings, the " +
        "ones worth mentioning all have a unique strength of character, form, " +
        "and carry decent meaning. None of that can ever come out of the " +
        "shallow of heart. By no means shallow, Erica might just break the " +
        "mould.</em><br/>" +
        "For encouraging her, you, Aurelia, have my respect.",
        new Map([
                    [PositiveEmotion.Respect, 9]
                ]),
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Coroto,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 5, 19, 30),
        "What's her game here? Why's this strange elf woman encouraging " +
        "my wife so? Just another fan of literature? Or is there some " +
        "ulterior motive I'm missing...",
        new Map([[PositiveEmotion.Trust, -2],
                 [PositiveEmotion.Respect, 1]]),
        Character.get(NpcId.Coroto).passiveDeception - 5,
        new Set([PositiveEmotion.Trust])
    )

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Jordi,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 19, 30),
        "Seemed to be even more interested in my tales from the seas.",
        new Map([[PositiveEmotion.Gratitude, 1]]),
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Yuki,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 19, 30),
        "Why's he suddenly so interested in Hav? This druid's clearly not " +
        "a seafarer. In fact, I won't be surprised to know he's never sailed before. " +
        "Jordi's too naive for his own good, but this seems a touch too " +
        "blatant. I'll have to keep an eye out...",
        new Map([[PositiveEmotion.Trust, -3]]),
        Character.get(NpcId.Yuki).passiveDeception,
        new Set([PositiveEmotion.Trust])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Kastor,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 19, 30),
        "Ugh.. the way he socializes with those two losers. It's " +
        "nauseating... Just look at Jordi blabbering and that emo acting " +
        "all cool like he doesn't care...",
        new Map([[PositiveEmotion.Respect, -2]]),
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Petra,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 5, 19, 30),
        "It's good to see how the kid can bring Jordi out of his shell " +
        "again. He's been brooding a lot lately...",
        new Map([[PositiveEmotion.Respect, 2]]),
    );

    const originalTimestamp = new GameTimestamp(0, 5, 19, 45);
    // Some will retain their memories after what happens...
    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Hina,
        [PcIndex.ID_HELIOS],
        originalTimestamp,
        "Kept his cutlery back slowly and primly before standing and drawing his " +
        "weapon. Touché. Yep, dude's definitely a seasoned warrior...<br/>" +
        "and a killer through-and-through.",
        new Map([[PositiveEmotion.Trust, -2],
                 [PositiveEmotion.Respect, 5]]),
        10,
        new Set([PositiveEmotion.Trust])
    )

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Hina,
        [PcIndex.ID_CYRION],
        originalTimestamp,
        "The others didn't seem to notice, but was a large part " +
        "responsible for us not getting ambushed right outside the " +
        "door. Doesn't seem addicted to violence.",
        new Map([[PositiveEmotion.Gratitude, 2],
                 [PositiveEmotion.Trust, 1],
                 [PositiveEmotion.Respect, 3]]),
    );

    // npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_PANZER).addEvent(
    //     new NpcInteractionEvent(
    //         applicableTimestamp,
    //         "Charged right out huh? Not very smart, but gets the job done... " +
    //         "Pity I didn't take the lectures on AI back in-",
    //         new Map([[PositiveEmotion.Respect, 2]]),
    //     )
    // );
    // exclusionListP.push(NpcId.Hina);

    npcInteractionEvents.get(NpcId.Hina).get(PcIndex.ID_AURELIA).addEvent(
        new NpcInteractionEvent(
            originalTimestamp,
            "Hmm... a spellcaster... they always find their throats to be " +
            "the first to be slit. But fireballs are cool anyway.",
            new Map([[PositiveEmotion.Respect, 4]]),
        )
    );

    // npcInteractionEvents.get(NpcIndex.ID_HINA).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         applicableTimestamp,
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
            originalTimestamp,
            "Acted as a beacon of hope and helped keep the villagers calm" +
            " when <em>they</em> came...",
            new Map([[PositiveEmotion.Gratitude, 3],
                     [PositiveEmotion.Trust, 1]]),
        )
    );

    npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_CYRION).addEvent(
        new NpcInteractionEvent(
            originalTimestamp,
            "Helped in organizing the villagers and keeping the inklings " +
            "at bay as he led us to Mr. Elysium's.",
            new Map([[PositiveEmotion.Gratitude, 3],
                     [PositiveEmotion.Respect, 1]]),
        )
    );

    npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_AURELIA).addEvent(
        new NpcInteractionEvent(
            originalTimestamp,
            "Fireball after fireball. Teleporting roof-to-roof in the " +
            "shadows. All for these poor inklings. Hehe, aren't we dramatic?",
            new Map([[PositiveEmotion.Respect, 2]]),
        )
    );
    combatMemories(npcInteractionEvents, false, originalTimestamp);

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
}

export function combatMemories(npcInteractionEvents, memoriesErased, applicableTimestamp)
{
    // The time it happened was 19:45 on the 5th. But it'll feel like the event
    // happened when the memories return.

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
        NpcId.Cecelia,
        NpcId.Irene,
        NpcId.Dusk,
        NpcId.Dawn,
        NpcId.Hina,
        NpcId.Ezell
    ];

    const exclusionListC: NpcId[] = [
        NpcId.Elysium,
        NpcId.Bjorn,
        NpcId.Hav,
        NpcId.Sasha,
        NpcId.Cecelia,
        NpcId.Irene,
        NpcId.Dusk,
        NpcId.Dawn,
        NpcId.Hina,
        NpcId.Ezell
    ];

    const exclusionListA: NpcId[] = [
        NpcId.Elysium,
        NpcId.Bjorn,
        NpcId.Hav,
        NpcId.Sasha,
        NpcId.Cecelia,
        NpcId.Irene,
        NpcId.Dusk,
        NpcId.Dawn,
        NpcId.Hina,
        NpcId.Ezell
    ];

    // const exclusionListP: NpcId[] = [
    //     NpcId.Elysium,
    //     NpcId.Bjorn,
    //     NpcId.Hav,
    //     NpcId.Sasha,
    //     NpcId.Cecelia
    // ];

    // const exclusionListQ: NpcIndex[] = [
    //     NpcIndex.ID_ELYSIUM,
    //     NpcIndex.ID_BJORN,
    //     NpcIndex.ID_HAV,
    //     NpcIndex.ID_SASHA,
    //     NpcIndex.ID_CECELIA
    // ];
    // npcInteractionEvents.get(NpcId.Dawn).get(PcIndex.ID_PANZER).addEvent(
    //     new NpcInteractionEvent(
    //         applicableTimestamp,
    //         "Charging right in, huh?",
    //         new Map([[PositiveEmotion.Respect, 2]]),
    //     )
    // );
    // exclusionListP.push(NpcId.Dawn);

    // npcInteractionEvents.get(NpcIndex.ID_DAWN).get(PcIndex.ID_QUINN).addEvent(
    //     new NpcInteractionEvent(
    //         applicableTimestamp,
    //         "Walked among our group to keep us safe.",
    //         new Map([[PositiveEmotion.Gratitude, 2]]),
    //     )
    // );
    // exclusionListQ.push(NpcIndex.ID_DAWN);

    if (!memoriesErased) {
        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Yuki,
            [PcIndex.ID_HELIOS],
            applicableTimestamp,
            "He shines so bright... ugh, it burns. Also the way <em>that man</em> " +
            "looks at me - cringe.",
            new Map([[PositiveEmotion.Trust, 1],
                     [PositiveEmotion.Gratitude, -4],
                     [PositiveEmotion.Respect, 4]]),
            Character.get(NpcId.Yuki).passiveDeception,
        );
        exclusionListH.push(NpcId.Yuki);

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Iona,
            [PcIndex.ID_HELIOS],
            applicableTimestamp,
            "Saved me!! Gods below, I didn't see that coming... Rusts, " +
            "that thing would've... would've...",
            new Map([[PositiveEmotion.Trust, 4],
                     [PositiveEmotion.Gratitude, 4],
                     [PositiveEmotion.Respect, 2]]),
            Character.get(NpcId.Iona).passiveDeception - 5,
        );
        exclusionListH.push(NpcId.Iona);

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Cecelia,
            [PcIndex.ID_HELIOS],
            applicableTimestamp,
            "Chosen by a Ryshadium! A ryshadium who came to our aid " +
            "during this fearsome storm with all the demons that " +
            "emerged from it.",
            new Map([[PositiveEmotion.Trust, 2],
                     [PositiveEmotion.Gratitude, 4],
                     [PositiveEmotion.Respect, 5]])
        );

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Sasha,
            [PcIndex.ID_HELIOS],
            applicableTimestamp,
            "Sent his mount to protect Cecilia and me.",
            new Map([[PositiveEmotion.Trust, 1],
                     [PositiveEmotion.Gratitude, 5],
                     [PositiveEmotion.Respect, 3]]));

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Kastor,
            [PcIndex.ID_HELIOS],
            applicableTimestamp,
            "The way he was so completely in command... I wish " +
            "that was me instead.",
            new Map([[PositiveEmotion.Trust, 1],
                     [PositiveEmotion.Gratitude, -2],
                     [PositiveEmotion.Respect, 4]]),
            10,
            new Set([PositiveEmotion.Gratitude]));

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Kastor,
            [PcIndex.ID_HELIOS],
            applicableTimestamp,
            "Did he not consider me worthy of assisting him in combat? " +
            "And he considered <em>Yuki</em> worthy enough instead? Heh, " +
            "and the coward didn't even pick up the weapon.",
            new Map([[PositiveEmotion.Trust, -1],
                     [PositiveEmotion.Gratitude, -2],
                     [PositiveEmotion.Respect, -1]]),
            10,
            new Set([PositiveEmotion.Gratitude])
        );
        exclusionListH.push(NpcId.Kastor);

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Jaye,
            [PcIndex.ID_HELIOS],
            applicableTimestamp,
            "Now, why did he throw the spear towards me?",
            new Map([])
        );

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Verna,
            [PcIndex.ID_HELIOS],
            applicableTimestamp,
            "Was more comfortable when the attack started compared " +
            "to the dinner. It's been " +
            "so long since I met someone like that. And in handing me " +
            "the javelin, he also immediately noted me as a warrior. " +
            "That... regrettably... makes me proud.",
            new Map([[PositiveEmotion.Trust, 3],
                     [PositiveEmotion.Gratitude, 1],
                     [PositiveEmotion.Respect, 7]])
        );

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Verna,
            [PcIndex.ID_HELIOS],
            applicableTimestamp,
            "Saved Iona in the nick of time from that monster.",
            new Map([[PositiveEmotion.Gratitude, 7]])
        );
        exclusionListH.push(NpcId.Verna);

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Coroto,
            [PcIndex.ID_HELIOS],
            applicableTimestamp,
            "Just as he warned, <em>the monsters from the north</em> came. How did he know? " +
            "But he stood up for us, nobly and bravely like I'd expect. " +
            "Did the Tsar send him? If so, for what purpose?",
            new Map([[PositiveEmotion.Trust, -2],
                     [PositiveEmotion.Gratitude, 2],
                     [PositiveEmotion.Respect, 4]]),
            10,
            new Set([PositiveEmotion.Trust]));
        exclusionListH.push(NpcId.Coroto);

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Coroto,
            [PcIndex.ID_CYRION],
            applicableTimestamp,
            "Was in good command of the powers of nature as he covered " +
            "our escape. Well, would suck if a druid from that weak nation " +
            "couldn't even do that. But... I suppose there is a reason why " +
            "the other strong folk keep him around...",
            new Map([[PositiveEmotion.Trust, 4],
                     [PositiveEmotion.Gratitude, -1],
                     [PositiveEmotion.Respect, 4]]),
            10,
            new Set([PositiveEmotion.Gratitude]));
        exclusionListC.push(NpcId.Coroto);

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Jordi,
            [PcIndex.ID_CYRION],
            applicableTimestamp,
            "Amazing! I was considering him to be like myself, but there's " +
            "no way I could stand against such odds and protect such a large " +
            "group at the same time.",
            new Map([[PositiveEmotion.Trust, 4],
                     [PositiveEmotion.Gratitude, 2],
                     [PositiveEmotion.Respect, 5]]),
        );
        exclusionListC.push(NpcId.Jordi);

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Yuki,
            [PcIndex.ID_CYRION],
            applicableTimestamp,
            "Well, ig he doesn't want us dead at least. Too easy to feign " +
            "weakness in this crisis and let the monsters do the rest.",
            new Map([[PositiveEmotion.Trust, 3]]),
        )
        exclusionListC.push(NpcId.Jordi);

        addInteractionEvent(
            npcInteractionEvents,
            NpcId.Erica,
            [PcIndex.ID_AURELIA],
            applicableTimestamp,
            "I suspected she was a powerful spellcaster, but damn, I don't " +
            "think I, as an Ursine noble, met more than a handful of mages who could conjure " +
            "fireballs! And with such frequency! Father would " +
            "be so proud to meet her... but why would she care about " +
            "someone like me?",
            new Map([[PositiveEmotion.Respect, 5],
                     [PositiveEmotion.Gratitude, 3],]),
        );
        exclusionListA.push(NpcId.Erica);

        for (const npcIndex of getEnumIterator(NpcId) as Generator<NpcId>) {
            const npc = Character.get(npcIndex);
            if (!npc || !npc.isOpinionated) {
                continue;
            }

            if (!exclusionListH.includes(npcIndex)) {
                addInteractionEvent(
                    npcInteractionEvents,
                    npcIndex,
                    [PcIndex.ID_HELIOS],
                    applicableTimestamp,
                    "Was completely in control during the fearsome blizzard " +
                    "and took charge when the monsters arrived.",
                    new Map([[PositiveEmotion.Trust, 1],
                             [PositiveEmotion.Gratitude, 1],
                             [PositiveEmotion.Respect, 4]]),
                );
            }
            if (!exclusionListC.includes(npcIndex)) {
                addInteractionEvent(
                    npcInteractionEvents,
                    npcIndex,
                    [PcIndex.ID_CYRION],
                    applicableTimestamp,
                    "Organized our retreat while stalling the monsters " +
                    "nearby.",
                    new Map([[PositiveEmotion.Trust, 1],
                             [PositiveEmotion.Gratitude, 4],
                             [PositiveEmotion.Respect, 1]]),
                )
            }
            if (!exclusionListA.includes(npcIndex)) {
                addInteractionEvent(
                    npcInteractionEvents,
                    npcIndex,
                    [PcIndex.ID_AURELIA],
                    applicableTimestamp,
                    "Stood tall in the fearsome blizzard and granted us " +
                    "cover from the aerial roof.",
                    new Map([[PositiveEmotion.Trust, 1],
                             [PositiveEmotion.Gratitude, 4],
                             [PositiveEmotion.Respect, 1]]),
                )
            }
            // if (!exclusionListQ.includes(npcIndex)) {
            //     npcInteractionEvents.get(npcIndex).get(PcIndex.ID_QUINN).addEvent(
            //         new NpcInteractionEvent(
            //             applicableTimestamp,
            //             "Walked among our group to keep us safe.",
            //             new Map([[PositiveEmotion.Trust, 2],
            //                      [PositiveEmotion.Gratitude, 2],
            //                      [PositiveEmotion.Respect, 1]]),
            //         )
            //     );
            // }
            // if (!exclusionListP.includes(npcIndex)) {
            //     npcInteractionEvents.get(npcIndex).get(PcIndex.ID_PANZER).addEvent(
            //         new NpcInteractionEvent(
            //             applicableTimestamp,
            //             "Charged right into the heart of the enemy.",
            //             new Map([[PositiveEmotion.Respect, 5],
            //                      [PositiveEmotion.Trust, 2]]),
            //         )
            //     );
            // }
        }
    }
}
