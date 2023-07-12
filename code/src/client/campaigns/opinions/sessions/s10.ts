import {PcIndex}                               from "../../../data/pcIndex";
import {NpcId, NpcIndex}                       from "../../../npcs/npcIndex";
import {GameTimestamp}                         from "../../common";
import {NpcOpinionV2, PositiveEmotion}         from "../npcOpinions";
import {addInteractionEvent, addTimeSkipEvent} from "./s9";

export function session10NpcInteractions(
    npcInteractionEvents: Map<NpcId, Map<PcIndex, NpcOpinionV2>>)
{

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Petra,
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
        npcInteractionEvents,
        NpcId.Hina,
        [PcIndex.ID_AURELIA,
         PcIndex.ID_HELIOS,
         PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 14, 30),
        `So many people waiting outside my door? OH! Got it. I'm popular now.`,
        new Map([
            [PositiveEmotion.Gratitude, 1],
        ]),
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Hina,
        [PcIndex.ID_AURELIA,
         PcIndex.ID_HELIOS,
         PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 14, 40),
        `Didn't get any idea of what I just did. Thank God.`,
        new Map([
            [PositiveEmotion.Respect, -1],
            [PositiveEmotion.Gratitude, 1],
        ]),
        NpcIndex.get(NpcId.Hina).passiveDeception
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Elysium,
        [PcIndex.ID_AURELIA,
         PcIndex.ID_HELIOS,
         PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 21, 20),
        `Well, that was an expensive investment. Still, it's rare for Hina to 
        recommend someone, and the local Goddess also picked them for the fight
        to decide the fate of this village. Maybe this will pay off handsomely?`,
        new Map([
            [PositiveEmotion.Respect, 4],
            [PositiveEmotion.Trust, -3],
        ]),
        NpcIndex.get(NpcId.Elysium).passiveDeception,
        new Set([PositiveEmotion.Trust])
    );

    const timeSkips = new Map<NpcId, PcIndex[]>([
        [NpcId.Dusk,    [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA]],
        [NpcId.Dawn,    [                                                        ]],
        [NpcId.Andri,   [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Athlon,  [                   PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        // [NpcId.Bjorn,   [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Cecelia, [PcIndex.ID_HELIOS,                     PcIndex.ID_CYRION]],
        [NpcId.Coroto,  [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Elysium, [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Erica,   [PcIndex.ID_HELIOS,                     PcIndex.ID_CYRION]],
        [NpcId.Genefe,  [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Hav,     [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Hina,    [PcIndex.ID_HELIOS,                     PcIndex.ID_CYRION]],
        [NpcId.Ingrid,  [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Iona,    [PcIndex.ID_HELIOS,                     PcIndex.ID_CYRION]],
        [NpcId.Jaye,    [                   PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Jordi,   [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Kastor,  [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Petra,   [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Roberta, [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA,                  ]],
        [NpcId.Sasha,   [PcIndex.ID_HELIOS,                     PcIndex.ID_CYRION]],
        [NpcId.Sybilla, [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Tomasa,  [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Verna,   [                                       PcIndex.ID_CYRION]],
        [NpcId.Vitacia, [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Yuki,    [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Ezell,   [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
        [NpcId.Irene,   [PcIndex.ID_HELIOS, PcIndex.ID_AURELIA, PcIndex.ID_CYRION]],
    ]);

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Roberta,
        [PcIndex.ID_CYRION],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `Hmm... it was pretty fun interacting with a good ol' backwaters hippy druid 
         (real druid). Makes quite a difference from my usual clientele. Sigh,
         though he refused to become my client after all - but that's all right 
         - people are usually shy before they get a taste of my services. Not to
         mention he also managed to pick up bits of my 100% organic natural 
         herbal recipe... <br/>`,
        new Map([
            [PositiveEmotion.Respect,   0.7],
            [PositiveEmotion.Trust,     0.2],
            [PositiveEmotion.Gratitude, 0.3],
        ])
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Hina,
        [PcIndex.ID_AURELIA],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `She's putting in so much effort (a penance?), yet these kids... sigh. With them 
        being useless like that, I suppose I can't do my usual of utilizing class hours for catching up 
        on jet lag. While I hate to be the responsible student,
        I must admit... something about this classroom is... different...
        <br/>
        ...<br/>
        Fuck. I think I'm actually enjoying this.`,
        new Map([
            [PositiveEmotion.Respect,   0.5],
            [PositiveEmotion.Trust,     0.2],
            [PositiveEmotion.Affection, 0.1]
        ])
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Iona,
        [PcIndex.ID_AURELIA],
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
        npcInteractionEvents,
        NpcId.Verna,
        [PcIndex.ID_AURELIA],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `Her classes for the kids are actually pretty decent, and God knows this
         is something Iona needed for proper growth.`,
        new Map([
            [PositiveEmotion.Gratitude, 0.4],
            [PositiveEmotion.Respect, 0.2],
        ])
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Cecelia,
        [PcIndex.ID_AURELIA],
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
            [PositiveEmotion.Gratitude, 0.5],
            [PositiveEmotion.Affection, -0.1],
        ])
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Sasha,
        [PcIndex.ID_AURELIA],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `Another physics lesson??? Oh, we're going to the beach today?`,
        new Map([
            [PositiveEmotion.Respect, 0.3],
            [PositiveEmotion.Affection, -0.05]
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Roberta,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 27, 20, 30),
        `You mean you grew all the herbs I'd mentioned in a secret grove to 
        which I'll have privileged access too?! Cool!<br/>
        Also, this means I won't have to keep beggin Bjorn always to remember to
        get those herbs for me, and won't have to depend on his whims? Woohooo!!
        (Wonder where he's disappeared off to anyway...)`,
        new Map([
            [PositiveEmotion.Gratitude, 8],
            [PositiveEmotion.Respect,   3]
        ])
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Verna,
        [PcIndex.ID_HELIOS],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        ``,
        new Map([
            [PositiveEmotion.Respect, 0.1],
        ])
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Jaye,
        [PcIndex.ID_HELIOS],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        `Ah it seems I got myself a routine customer (even if they don't pay). 
        Strange tho, never would've guessed him as a seafood lover...`,
        new Map([
            [PositiveEmotion.Respect, 0.1],
            [PositiveEmotion.Gratitude, 0.1],
        ])
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Athlon,
        [PcIndex.ID_HELIOS],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(17),
        ``,
        new Map()
    );
    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Athlon,
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
        npcInteractionEvents,
        NpcId.Athlon,
        [PcIndex.ID_HELIOS],
        GameTimestamp.fromDays(18),
        GameTimestamp.fromDays(27),
        ``,
        new Map()
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Dusk,
        [PcIndex.ID_CYRION, PcIndex.ID_JULIUS],
        GameTimestamp.fromDays(2),
        GameTimestamp.fromDays(27),
        "",
        new Map()
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_HELIOS, PcIndex.ID_CYRION, PcIndex.ID_AURELIA],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        "",
        new Map([
            [PositiveEmotion.Trust, 0.1]
        ])
    );

    addTimeSkipEvent(
        npcInteractionEvents,
        NpcId.Erica,
        [PcIndex.ID_AURELIA],
        GameTimestamp.fromDays(7),
        GameTimestamp.fromDays(27),
        "",
        new Map([
            [PositiveEmotion.Trust, 0.35],
            [PositiveEmotion.Gratitude, 0.2],
        ])
    );


    for (const [npc, pcs] of timeSkips.entries()) {
        addTimeSkipEvent(
            npcInteractionEvents,
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
        //
        // Todo: it should also depend on their personal nature, I really need
        //  to get npc quirks lined up...
    }

    const conflictTime = new GameTimestamp(0, 27, 21, 0);

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dusk,
        [PcIndex.ID_HELIOS, PcIndex.ID_JULIUS],
        conflictTime,
        "Amusing.<br/>But let me interject-",
        new Map([
            [PositiveEmotion.Gratitude, 1]
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_HELIOS, PcIndex.ID_JULIUS],
        conflictTime,
        "I don't think I like this tension.... <br/>" +
        "Oh Shi- They've started fighting. Please sto-<br/>" +
        "Hold on. Ms. Dusk has something to say.",
        new Map([
            [PositiveEmotion.Respect, -1],
            [PositiveEmotion.Trust, -1],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_JULIUS],
        conflictTime,
        "Huh? What did Ms. Dusk mean when she said you're on her side? She has " +
        "a side??",
        new Map([
            [PositiveEmotion.Respect, 3],
            [PositiveEmotion.Respect, 2],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Dawn,
        [PcIndex.ID_HELIOS, PcIndex.ID_JULIUS],
        conflictTime,
        "Wow, they're really brothers-in-arms now? Yeah, adventurers do be " +
        "strange.",
        new Map([
            [PositiveEmotion.Respect, 3],
            [PositiveEmotion.Trust, 2],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Hina,
        [PcIndex.ID_JULIUS],
        conflictTime,
        "You really need to get better at lying, old man. Won't get anywhere in " +
        "the world of adults this way (smug).",
        new Map([
            [PositiveEmotion.Respect, -1],
            [PositiveEmotion.Trust, 3],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Elysium,
        [PcIndex.ID_JULIUS],
        conflictTime,
        "Wow-ho-ho, relax guys, this one's a fraudster yea, but not dangerous. But " +
        "the card Hina had-? Hmm... I think the database might be incomplete " +
        "on this one. But the Goddess vouched for him - Wait is that signature " +
        "Atium??<br/> Need to tread carefully here.",
        new Map([
            [PositiveEmotion.Respect, 5],
            [PositiveEmotion.Trust, -3],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Ezell,
        [PcIndex.ID_JULIUS],
        conflictTime,
        "Elysium looks anxious, but he's not asked me to shoot... Not often he " +
        "looks shaken.",
        new Map([
            [PositiveEmotion.Respect, 3],
            [PositiveEmotion.Trust, -1],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Cecelia,
        [PcIndex.ID_JULIUS],
        conflictTime,
        "Oh no! The way Helios reacted, and Mr. Elysium and Sir Enforcer are " +
        "tense too. Is he a bad man?",
        new Map([
            [PositiveEmotion.Trust, -2],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Cecelia,
        [PcIndex.ID_JULIUS],
        conflictTime,
        "But they're friends now, so there must've been a confusion. Thank God.",
        new Map([
            [PositiveEmotion.Gratitude, 1],
            [PositiveEmotion.Trust, 3],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Coroto,
        [PcIndex.ID_JULIUS, PcIndex.ID_HELIOS],
        conflictTime,
        "Yes this politicking is what nobility does best. And that sharp retort " +
        "with the elegant handling by the elderly gentleman? Yes very good.",
        new Map([
            [PositiveEmotion.Respect, 2],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Irene,
        [PcIndex.ID_JULIUS, PcIndex.ID_HELIOS],
        conflictTime,
        "Oh dear-",
        new Map([
            [PositiveEmotion.Respect, 1]
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Verna,
        [PcIndex.ID_JULIUS],
        conflictTime,
        "Do we have trouble? Wait... that scent... Dangerous",
        new Map([
            [PositiveEmotion.Respect, 1],
            [PositiveEmotion.Trust, -4],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Verna,
        [PcIndex.ID_JULIUS, PcIndex.ID_HELIOS],
        conflictTime,
        "I suppose if they're fighting side-by-side..." +
        " I should take it easy... the scent wasn't that strong anyway.",
        new Map([
            [PositiveEmotion.Respect, 1],
            [PositiveEmotion.Trust, 3],
        ])
    );

    addInteractionEvent(
        npcInteractionEvents,
        NpcId.Roberta,
        [PcIndex.ID_JULIUS],
        conflictTime,
        "Well that appearance is carefully managed... But he could use the " +
        "services of a pro anyway.",
        new Map([
            [PositiveEmotion.Respect, 2],
            [PositiveEmotion.Trust, -1],
        ])
    );
}
