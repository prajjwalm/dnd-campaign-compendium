import {NpcId}   from "../../data/npcIndex";
import {PcIndex} from "../../data/pcIndex";
import {GameTimestamp}       from "../../GameTimestamp";
import {Character}           from "../../simulation/characters/Character";
import {PositiveEmotion}     from "../PositiveEmotion";
import {addInteractionEvent} from "./s9";

export function arc23OpinionEvents()
{
    const hina = Character.get(NpcId.Hina);
    const yuki = Character.get(NpcId.Yuki);
    const dawn = Character.get(NpcId.Dawn);
    const elysium = Character.get(NpcId.Elysium);

    addInteractionEvent(
        NpcId.Hina,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 29, 16),
        `Who's he? Quite the resistance to-`,
        new Map([
            [PositiveEmotion.Trust, -1],
            [PositiveEmotion.Respect, 4],
        ]),
        hina.passiveDeception + 5,
        new Set([PositiveEmotion.Trust])
    );

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 29, 16),
        `I.. feel so... exalted, ecstatic. I'm not dying. I'M NOT DYING. And 
         with Dusk gone, the bonds loosened, I'm... free? No, sir, you're not
         catching a cold or collapsing from exhaustion while I'm here.`,
        new Map([
            [PositiveEmotion.Gratitude, 3],
            [PositiveEmotion.Affection, 3],
        ]),
    );

    addInteractionEvent(
        NpcId.Elysium,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 29, 16, 15),
        `Ezell and the other's are caught in the fight, so they didn't notice, 
         but the way he gets up on being knocked out... curious.`,
        new Map([
            [PositiveEmotion.Trust, -1]
        ]),
        elysium.passiveDeception + 2
    )

    addInteractionEvent(
        NpcId.Ezell,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 29, 16, 15),
        `Quite adept with the shadows and the darkness... why do I feel it should 
         remind me of a certain someone?`,
        new Map([
            [PositiveEmotion.Trust, 1],
            [PositiveEmotion.Respect, 3]
        ]),
    )

    addInteractionEvent(
        NpcId.Hina,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 29, 16, 30),
        `Oh, he's another Ruin boy. Nice. Po'Shan's certainly on its way to 
         greatness.<br/> 
         I wonder what sensei lacked tho, I'd have thought she's pretty good at
         making Ruin proud.`,
        new Map([
            [PositiveEmotion.Trust, -4],
        ]),
    );


    addInteractionEvent(
        NpcId.Hina,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 29, 16, 30),
        `Ah well, not from the castle at least, and no metal piercing fetish. 
         We're cool then, don't mind me and I won't mind you.`,
        new Map([
            [PositiveEmotion.Trust, 6],
        ]),
    );

    addInteractionEvent(
        NpcId.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 29, 16, 30),
        `Whoa that's a lot of passion. He's going to break my screen, isn't he? 
         El probably won't gift me another, so better tuck it awa- Oh nvm, he's 
         frozen now. Cool.`,
        new Map([
                ]),
    );

    addInteractionEvent(
        NpcId.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 29, 16, 30),
        `Though, I should've taken out more time for them. He'd do well with around 
         236 more deaths, I think. Sigh, At this novice grade ragequit resistance, 
         he's just waiting to become Odium's next fused.<br/>
         Well, we'll binge for sure when I'm back-<br/>
         ...<br/>`,
        new Map([
            [PositiveEmotion.Gratitude, 1],
        ]),
        hina.passiveDeception,
    );

    addInteractionEvent(
        NpcId.Hina,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 29, 16, 45),
        `Wait. wait. wait. When he turned. There's a bond between him and-<br/>
         Oh. That means... AAH!<br/>
         And he knows it all, but not the slightest emotion. <i>Preem</i><br/>`,
        new Map([
                    [PositiveEmotion.Trust, -1],
                    [PositiveEmotion.Gratitude, -1],
                    [PositiveEmotion.Respect, 7],
                ]),
        hina.passiveDeception + 5,
    );

    addInteractionEvent(
        NpcId.Hina,
        [],
        new GameTimestamp(0, 29, 17, 0),
        `You really feel bad about me going on this mission, don't you? But if 
         I can't use my powers when needed, what good am I anyway - to you or 
         anyone?<br/>
         Sigh, but I suppose you care about me just as a person ...`,
        new Map([
            [PositiveEmotion.Gratitude, 10],
            [PositiveEmotion.Affection, 7],
        ]),
    );

    addInteractionEvent(
        NpcId.Hina,
        [],
        new GameTimestamp(0, 29, 17, 0),
        `But no, don't hold me back now, Aurelia. I don't need a comfortable 
        life. If I don't do this, there's really no reason for me, a weapon, 
        and nothing besides, to exist anymore. I do this of my own violation, 
        and I won't let anyone, no matter how good willing their intent may be,
        hold me back from... from-`,
        new Map([
        ]),
        hina.passiveDeception + 10
    );

    addInteractionEvent(
        NpcId.Yuki,
        [],
        new GameTimestamp(0, 29, 16, 45),
        `<i>She's</i> the one Odium chose? But why??!<br/>
         She's literally radiating Ruin's investiture, and do her kind - the 
         'rational' sorts - even understand what loyalty or passion is??<br/>
         I was certain it'd be the Radiant, that he'd follow my- URGH! 
         <em>Annoying</em>... <br/>
         Why does this infuriate me so? Hadn't I given up my unworthy
         passions to Him? <br/> Must be another doing of that knavish, superficial 
         dragon.`,
        new Map([
                    [PositiveEmotion.Gratitude, -10],
                    [PositiveEmotion.Affection, -1],
                    [PositiveEmotion.Respect, 3],
                ]),
        yuki.passiveDeception,
        new Set([PositiveEmotion.Affection])
    );

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 29, 16, 45),
        `We're all so lucky to have you here, Cyrion. Hina told me- Plus, even
         with the situation at hand, and even with my life on Terra - somehow I'm
         not afraid we'll starve. Instead, I live again, <em>I actually live again</em>,
         and to think my biggest concern is literally just wriggling out of Roberta's 
         incessant chattering...`,
        new Map([
                    [PositiveEmotion.Gratitude, 7],
                    [PositiveEmotion.Affection, 3],
                    [PositiveEmotion.Respect, 3],
                ]),
        dawn.passiveDeception
    );

    addInteractionEvent(
        NpcId.Roberta,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 29, 16, 45),
        `Hey real druid, I'm done cookin'. Whew, this has been a real nice vacation.`,
        new Map([
                    [PositiveEmotion.Gratitude, 1],
                ]),
    );

    addInteractionEvent(
        NpcId.Roberta,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 29, 17, 0),
        `Wait. You're telling me you guys don't give into primal rage and transform
         into direwolves and rip the fuck out of then feast on people's hearts to grow 
         stronger to get more hearts every full moon? <em>Boring...</em>`,
        new Map([
            [PositiveEmotion.Affection, 1],
        ]),
    );

    addInteractionEvent(
        NpcId.Dawn,
        [],
        new GameTimestamp(0, 29, 17, 0),
        `Damn, wizards sure are fast learners. It's only been a couple of days 
        since we've begun to hear of technology beyond our time and already she
        employs that knowledge to mitigate our food quandaries.`,
        new Map([
            [PositiveEmotion.Respect, 2],
            [PositiveEmotion.Gratitude, 1],
        ]),
    );

    addInteractionEvent(
        NpcId.Ezell,
        [],
        new GameTimestamp(0, 29, 17, 0),
        `She's a bit cautious, but her heart's in the right direction. Prefers 
        a casual approach to formality, that's nice. A bit unexpected for a 
        noble, but still nice. Some of the Saint ettiquettes can get a tad 
        tiresome at times.`,
        new Map([
            [PositiveEmotion.Trust, 1],
            [PositiveEmotion.Respect, 1]
        ])
    );

    addInteractionEvent(
        NpcId.Ezell,
        [],
        new GameTimestamp(0, 29, 17, 0),
        `She really does care about Cecilia, doesn't she? That's... really kind of 
         her. They've not known each other for that long, and don't share a 
         Saint's bond either, but she's still willing to help - even venture 
         as far as the labs if needed. Thanks a lot, honestly.`,
        new Map([
            [PositiveEmotion.Respect, 3],
            [PositiveEmotion.Gratitude, 5],
        ])
    );

    addInteractionEvent(
        NpcId.Elysium,
        [],
        new GameTimestamp(0, 29, 17, 15),
        `I see, willing to pitch for Cecilia, huh. Nice of her. Ordering food 
        via Logistics? Well we're already requesting the Aluminium mesh, so 
        might as well. Damn, all this is seriously worth a fortune. Not that I 
        mind, given the strategic value of this village... but... something...
        about this lot. I don't know, it's unnerving.`,
        new Map([
            [PositiveEmotion.Trust, -1],
            [PositiveEmotion.Gratitude, 1],
        ]),
        elysium.passiveDeception + 5,
        new Set([PositiveEmotion.Trust])
    );

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 29, 17, 0),
        `Not above hunting for survival, huh. You sure are one with nature.<br/>
         Truly a pleasure interacting with someone so grounded.`,
        new Map([
            [PositiveEmotion.Respect, 4],
            [PositiveEmotion.Gratitude, 1],
        ]),
    );

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 29, 18, 0),
        `Umm.. you're new here, yet you help out fix the mess Ms. Dusk has 
        graciously landed us into. And I know how day-long manual labour on an 
        empty stomach feels. Thank you, truly.`,
        new Map([
            [PositiveEmotion.Respect, 2],
            [PositiveEmotion.Gratitude, 4],
        ]),
    );

    // Todo: Tibalt tree cutting interactions.

    addInteractionEvent(
        NpcId.Tomasa,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 29, 19, 30),
        `Thanks for the cooking assistance, appreciate it. (He and the others 
         just saved the village, and myself, right?)`,
        new Map([
            [PositiveEmotion.Gratitude, 7],
            [PositiveEmotion.Respect, 4],
            [PositiveEmotion.Trust, 4],
        ])
    );

    addInteractionEvent(
        NpcId.Yuki,
        [],
        new GameTimestamp(0, 30, 0, 0),
        `Immediately got the message... I'd have expected more resistance or 
         bitching. Well, He did select her, so she'd probably not be a complete 
         waste.`,
        new Map([
            [PositiveEmotion.Respect, 1]
        ])
    );

    addInteractionEvent(
        NpcId.Yuki,
        [],
        new GameTimestamp(0, 30, 0, 15),
        `So you won't sell Hina out. The loyalty is commendable... yet if I'm 
        correct, misplaced. Terribly misplaced. Am I correct? And if I am, are 
        you aware of the villain you protect?`,
        new Map([
            [PositiveEmotion.Respect, 5],
            [PositiveEmotion.Trust, -4],
        ]),
        yuki.passiveDeception + 5
    );

    addInteractionEvent(
        NpcId.Yuki,
        [],
        new GameTimestamp(0, 30, 0, 20),
        `Take the damn blade, I cannot bear to-`,
        new Map([
            [PositiveEmotion.Gratitude, 1],
        ]),
    );

    addInteractionEvent(
        NpcId.Hina,
        [],
        new GameTimestamp(0, 30, 0, 20),
        `Damn! The prince's emotions have gone completely haywire. This is bad. 
         Bad. BAD! One mistake with a shardbearer, and it's goodnight.<br/>
         Wake up, you lazy gonks!`,
        new Map([
            [PositiveEmotion.Affection, 4],
            [PositiveEmotion.Gratitude, -1],
        ]),
        hina.passiveDeception + 10
    );

    addInteractionEvent(
        NpcId.Yuki,
        [],
        new GameTimestamp(0, 30, 0, 25),
        `Why are you still agreeing? YOU WERE SUPPOSED TO COWER AND BACK DOWN, 
         DAMN IT. No, no, she's faking it. She's tricking me, pretending to 
         agree and inside thinking how best she'll back out of this. Either that
         or her weak will simply can't comprehend the significance of the task 
         she's been granted.<br/>
         Wait, I'll drag the truth out of you for sure.`,
        new Map([
            [PositiveEmotion.Trust, -7],
            [PositiveEmotion.Gratitude, -4],
        ]),
    );

    addInteractionEvent(
        NpcId.Yuki,
        [],
        new GameTimestamp(0, 30, 0, 30),
        `And now you show your true colors. Watch over me, Odium, as I smite 
         her with your almighty wrath.`,
        new Map([
            [PositiveEmotion.Trust, -1],
            [PositiveEmotion.Affection, -4],
            [PositiveEmotion.Gratitude, 2],
        ]),
    );

    addInteractionEvent(
        NpcId.Yuki,
        [],
        new GameTimestamp(0, 30, 0, 30),
        `Wait.. I'm loosing? No... it can't be. IT CAN'T BE. ODIUM WHY-
        <br/>
        Why can't I move, Damn it??<br/>
        So...&nbsp;&nbsp;&nbsp;
        numb...`,
        new Map([
        ]),
    );

    addInteractionEvent(
        NpcId.Yuki,
        [],
        new GameTimestamp(0, 30, 0, 40),
        `So Hina <em>is</em> the one who- <span style="font-size: 11px;">Did you know, 
         Aurelia?</span> DID YOU KNOW AND STILL PROTECT HER?<br/>
        Ruin take you. All OF YOU!`,
        new Map([
            [PositiveEmotion.Trust, -4],
            [PositiveEmotion.Affection, -4],
        ]),
    );

    addInteractionEvent(
        NpcId.Yuki,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 0, 40),
        `No wait! Wait! You don't understand... you're siding with the wrong 
         person. She's literally the murderer here. Why don't you-<br/>
         Of course, with what you just witnessed, you'd probably side with Ruin 
         Himself against me. ARGHH! Why did I get so pissed off there? Must be 
         the stress of leaving the blade. Rusted spren, won't even leave me in 
         death.<br/>
         Never mind, just stay out of this.`,
        new Map([
            [PositiveEmotion.Respect, 2],
            [PositiveEmotion.Gratitude, 1],
        ]),
    );

    addInteractionEvent(
        NpcId.Hina,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 0, 40),
        `Put Cyrion out of commission too. Pro shit, very pro. And you don't 
         interfere. Like I said, don't mind me and I won't mind you.`,
        new Map([
            [PositiveEmotion.Respect, 4],
            [PositiveEmotion.Trust, 2]
        ])
    );

    addInteractionEvent(
        NpcId.Roberta,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 1, 50),
        `Wha- I was... about TO DIE??! Gods! That- Spear?! If it... <span style="font-size: 9px;">hit</span>...<br/>
         NO, FUCK YOU! I didn't escape to the middle of nowhere just to get my brains splayed out at the mouth of a stupid cave!`,
        new Map([
            [PositiveEmotion.Gratitude, 11]
        ])
    );

    addInteractionEvent(
        NpcId.Roberta,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 30, 1, 50),
        `He's escorting us.. to safety. So far from home, yet it's good to have 
        someone to rely on.`,
        new Map([
            [PositiveEmotion.Gratitude, 3],
            [PositiveEmotion.Trust, 4]
        ])
    );

    addInteractionEvent(
        NpcId.Roberta,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 1, 50),
        `But wait, how did he even manage to hit a spear in motion? Via a 
         perpendicular shot no less??! He wasn't even aware of who shot it.<br/>
         That said, what was the spear made of anyway? Calcium? Phosphorus? When
         his laser struck... Gods, in that infinitesimal time, the spear legit 
         burned brighter than the sun itself.`,
        new Map([
            [PositiveEmotion.Respect, 7],
            [PositiveEmotion.Trust, -1],
        ]),
        10,
        new Set([PositiveEmotion.Trust])
    );

    addInteractionEvent(
        NpcId.Jordi,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 1, 50),
        `Oh thank the Fools, someone came! She was definitely looking in trouble.`,
        new Map([
            [PositiveEmotion.Gratitude, 6],
        ]),
    );

    addInteractionEvent(
        NpcId.Irene,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 1, 50),
        `Wait. Stop! Ugh, not now, I can't hold this one back and guard you at the 
         same time.. just go after the others damn-it.`,
        new Map([
            [PositiveEmotion.Gratitude, -1],
        ]),
    );

    addInteractionEvent(
        NpcId.Irene,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 1, 50),
        `Ok wait... you might be able to- If I take out all three spheres...
         Big gambit, but it's all I got-`,
        new Map([
        ]),
    );

    addInteractionEvent(
        NpcId.Jordi,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 1, 50),
        `He... charged into the brand?! At the strongest foe? Without even a 
         pause? Just how brave is this man?! And the horse... <span style="font-size: 10px;">beautiful</span>.
         A beast made for war, a fierce package of loyalty, courage and dependability.
         As opposed to the beasts that frolicked on the grassy slopes back home...
         they really look so <em>different</em>, so capable of great adventure
         when supporting a warrior in his struggle.`,
        new Map([
            [PositiveEmotion.Respect, 7],
        ]),
    );

    addInteractionEvent(
        NpcId.Jordi,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 1, 50),
        `The jump, the strikes... depths below, what was that? She felt it,
         didn't she? Irene instinctively relied upon him, that's why she went 
         fully aggressive in one killing blow, heedless of the consequence, 
         certain that he would... I-`,
        new Map([
            [PositiveEmotion.Gratitude, -7],
            [PositiveEmotion.Respect, 7],
        ]),
    );


    addInteractionEvent(
        NpcId.Irene,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 1, 50),
        `That worked!! YES! a bit more brutality would be nice, but this was 
        cool too. Whew, tired. I take my thoughts back, glad you came.`,
        new Map([
            [PositiveEmotion.Gratitude, 5],
            [PositiveEmotion.Respect, 3],
            [PositiveEmotion.Trust, 4],
                ]),
    );

    addInteractionEvent(
        NpcId.Irene,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 1, 50),
        `I would've killed Jordi if you weren't here now. I... feel good I 
        didn't. You're probably right, the boy doesn't deserve this.`,
        new Map([
            [PositiveEmotion.Gratitude, 4],
        ]),
    );

    addInteractionEvent(
        NpcId.Jordi,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 1, 50),
        `She... really was a hair's breath away from killing me, wasn't she? I-
         Would that really be better for everyone? Even so, I don't want to 
         die? Thank you, and for saving us. I deeply apologize for my ingrate
         self.`,
        new Map([
            [PositiveEmotion.Gratitude, 5],
        ]),
    );

    addInteractionEvent(
        NpcId.Elysium,
        [PcIndex.ID_CYRION, PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 1, 50),
        `Hmm... it is very injured; almost dying. To take on a nourished 
        shrieker, to almost bring it down before it hit a populated area. You're
        all super cool...<br/>
        But it's either me or these dozen here-`,
        new Map([
            [PositiveEmotion.Respect, 6],
        ]),
    );

    addInteractionEvent(
        NpcId.Elysium,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 30, 1, 50),
        `I, revived?<br/>
         ...<br/>
         scary, painful, i can't-`,
        new Map([
            [PositiveEmotion.Gratitude, 3],
        ]),
    );

    addInteractionEvent(
        NpcId.Ezell,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 30, 1, 50),
        `Thank you. Thank you! Thank you!<br/>
         That fool really just went and died for real. Saints past, I really 
         hate that hero.`,
        new Map([
            [PositiveEmotion.Gratitude, 12],
            [PositiveEmotion.Respect, 3],
            [PositiveEmotion.Trust, 3],
        ]),
    );

    addInteractionEvent(
        NpcId.Erica,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 30, 1, 50),
        `I suppose- that would be too convenient, and too easy.`,
        new Map([
        ]),
    );

    addInteractionEvent(
        NpcId.Kastor,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 30, 1, 50),
        `WHY-`,
        new Map([
            [PositiveEmotion.Respect, -1]
        ]),
    );

    addInteractionEvent(
        NpcId.Verna,
        [PcIndex.ID_CYRION, PcIndex.ID_HELIOS, PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 1, 50),
        `Once again, it's you all who save us all. Once again, Iona lives 
        because of you. Elysium's not even a fighter, but even he- And yet, I 
        couldn't even get close, how did you-`,
        new Map([
            [PositiveEmotion.Respect, 5],
            [PositiveEmotion.Gratitude, 5],
            [PositiveEmotion.Trust, 5],
        ]),
    );

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_CYRION, PcIndex.ID_HELIOS, PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 1, 50),
        `Even in Dusk's absence, we keep faith we'll live to see another day. 
         Thank you.`,
        new Map([
            [PositiveEmotion.Gratitude, 3],
        ]),
    );

    addInteractionEvent(
        NpcId.Erica,
        [PcIndex.ID_HELIOS, PcIndex.ID_CYRION, PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 1, 55),
        `They consider my loss as their own. They make constructive and ambitious, 
        yet well advised suggestions for the future. Thank you.`,
        new Map([
            [PositiveEmotion.Gratitude, 4],
            [PositiveEmotion.Respect, 1],
        ]),
    );

    addInteractionEvent(
        NpcId.Irene,
        [PcIndex.ID_HELIOS, PcIndex.ID_CYRION, PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 1, 55),
        `Yes that's right. Even when the tides rise, we must never back down, never cower away! It is 
         us they'll be afraid of, us who'll bring in the terror!`,
        new Map([
            [PositiveEmotion.Respect, 4],
        ]),
    );

    addInteractionEvent(
        NpcId.Jordi,
        [PcIndex.ID_HELIOS, PcIndex.ID_CYRION, PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 1, 55),
        `What is this madness? This psychotic frenzy? You can't seriously be 
        considering...?`,
        new Map([
            [PositiveEmotion.Respect, -3],
        ]),
    );

    addInteractionEvent(
        NpcId.Erica,
        [PcIndex.ID_HELIOS, PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 2, 0),
        `Thank you, for allowing my husband to have some dignity in death. Thank
         you, for bearing with us.`,
        new Map([
                    [PositiveEmotion.Gratitude, 4],
                ]),
    );

    addInteractionEvent(
        NpcId.Kastor,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 9, 0),
        `He's right, if I die, Mother- <br/>
         Unlike the others here, he's actually a true warrior. Maybe I should 
         liste-<br/>
         HE DARES TO LAUGH? AT OUR PLIGHT?! THAT BASTARD YUKI!`,
        new Map([
            [PositiveEmotion.Respect, 3],
        ]),
    );

    addInteractionEvent(
        NpcId.Irene,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 9, 5),
        `Thanks... for taking Jordi's side. I'll.. feel better knowing he's with
        us.`,
        new Map([
                    [PositiveEmotion.Gratitude, 3],
                ]),
    );

    addInteractionEvent(
        NpcId.Jordi,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 9, 5),
        `Thank you! For agreeing to me coming along. I promise you, it'll be 
        worth it. I know. I just know...`,
        new Map([
                    [PositiveEmotion.Gratitude, 3],
                ]),
    );

    addInteractionEvent(
        NpcId.Erica,
        [PcIndex.ID_HELIOS, PcIndex.ID_CYRION],
        new GameTimestamp(0, 30, 9, 0),
        `I'm really sorry for my son...`,
        new Map([
            [PositiveEmotion.Gratitude, 1],
        ]),
    );

    addInteractionEvent(
        NpcId.Cecelia,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 9, 5),
        `You're becoming a Saint, too? Can one even become a Saint? By Virtuous 
        deeds? But then why not Elysium? Maybe it's only for aasimar.. but that 
        doesn't sound good, somehow. Was that what my brother didn't like?`,
        new Map([
            [PositiveEmotion.Respect, 5],
        ]),
    );

    const cel = Character.get(NpcId.Cellinia);

    addInteractionEvent(
        NpcId.Cellinia,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 9, 5),
        `Aasimar, not saint... but part saint? Very curious. Associated with 
         Andoain, I see. Higher vampire sigil. Hmm, Eternity? Dangerous. Might
         deserve investigation.`,
        new Map([
                    [PositiveEmotion.Respect, 4],
                    [PositiveEmotion.Trust, -3],
                ]),
        cel.passiveDeception + cel.Prof,
        new Set([PositiveEmotion.Trust])
    );

    addInteractionEvent(
        NpcId.Cellinia,
        [PcIndex.ID_HELIOS, PcIndex.ID_CYRION],
        new GameTimestamp(0, 30, 9, 5),
        `Relied upon by Elysium, and Cecilia, it seems. Ezell too probably.`,
        new Map([
            [PositiveEmotion.Respect, 1],
            [PositiveEmotion.Trust, 1],
        ]),
        10,
    );

    addInteractionEvent(
        NpcId.Cellinia,
        [PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 9, 5),
        `Highly invested armor. Only ones who give this now are... Hmm. 
         Ghostblood, I see. Getting interesting~`,
        new Map([
                [PositiveEmotion.Respect, 3],
                [PositiveEmotion.Trust, -5],
            ]),
        cel.passiveDeception + cel.Prof,
    );

    addInteractionEvent(
        NpcId.Cellinia,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 30, 9, 5),
        `Druid, reasonably invested. Yet they ordered food. Hmm, were caught 
         unaware it seems. Aligns with how we only first heard of them two 
         days back. No intel - I see.`,
        new Map([
        ]),
        cel.passiveDeception + cel.Prof,
    );

    // addInteractionEvent(
    //     NpcID.Cellinia,
    //     [],
    //     new GameTimestamp(0, 30, 9, 5),
    //     `Had her servant help out instead of stooping to perform manual labour.
    //      Lazy, efficient, prideful. Expected of invested mages, I suppose. Let's
    //      see... University of Veteres, huh. Far from home, are we?`,
    //     new Map([
    //         [PositiveEmotion.Respect, 2]
    //     ]),
    //     cel.passiveDeception + cel.Prof,
    // );

    addInteractionEvent(
        NpcId.Erica,
        [PcIndex.ID_HELIOS, PcIndex.ID_CYRION, PcIndex.ID_TIBALT],
        new GameTimestamp(0, 30, 9, 30),
        `Thank you, for going through with this. For putting the safety of our 
        village at priority. <br/>
        ...<br/>
        For venturing out into the unknown and avenging my husband.`,
        new Map([
            [PositiveEmotion.Gratitude, 4],
            [PositiveEmotion.Respect, 4],
        ]),
    );

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 30, 10, 30),
        `He could... communicate... with the God of the inklings? With Ms Dusk's 
         own persona? How- That's amazing. To not let anyone know, but literally
         secure the most reliable, and most dangerous, of help to protect us. I
         can see why Ms Dusk was so taken by you now.`,
        new Map([
            [PositiveEmotion.Gratitude, 5],
            [PositiveEmotion.Respect, 8],
        ]),
    );
}