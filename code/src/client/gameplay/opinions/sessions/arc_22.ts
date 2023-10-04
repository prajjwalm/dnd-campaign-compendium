import {NpcID}               from "../../data/npcIndex";
import {PcIndex}             from "../../data/pcIndex";
import {GameTimestamp}       from "../../GameTimestamp";
import {Character}           from "../../simulation/characters/Character";
import {PositiveEmotion}     from "../PositiveEmotion";
import {addInteractionEvent} from "./s9";

export function arc22OpinionEvents()
{
    const hinaDeception = Character.get(NpcID.Hina).passiveDeception;

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 29, 8),
        `Being called an ingrate after I pledged to give up my life for them 
         pricks just a bit. Sigh, she's probably kidding, isn't she? Though jokes 
         generally do build upon an element of truth...<br/>
         I don't want to see them turn out like other adults I've been with - 
         I suppose I should pre-pone <i>those</i> plans.`,
        new Map([
            [PositiveEmotion.Respect,   -3],
            [PositiveEmotion.Gratitude, -3],
        ]),
        hinaDeception + 5
    );

    addInteractionEvent(
        NpcID.Dawn,
        [PcIndex.ID_AURELIA, PcIndex.ID_CYRION, PcIndex.ID_HELIOS],
        new GameTimestamp(0, 29, 8),
        `They actually made it? Meaning... I needn't disappear...</br>
         I... get to live? A normal life? And Tomasa too??
         This has to be a dream, hasn't it?`,
        new Map([
            [PositiveEmotion.Respect,   4],
            [PositiveEmotion.Trust,     8],
            [PositiveEmotion.Gratitude, 12],
        ])
    );

    addInteractionEvent(
        NpcID.Elysium,
        [PcIndex.ID_AURELIA, PcIndex.ID_CYRION, PcIndex.ID_HELIOS],
        new GameTimestamp(0, 29, 8),
        `These guys actually returned successful from a mission this perilous 
         within 1 day?? Hmm, they're far from run-of-the-mill, I must admit.`,
        new Map([
            [PositiveEmotion.Respect, 4],
        ]),
        10,
        new Set<PositiveEmotion>([PositiveEmotion.Gratitude])
    );


    addInteractionEvent(
        NpcID.Ezell,
        [PcIndex.ID_AURELIA, PcIndex.ID_CYRION, PcIndex.ID_HELIOS],
        new GameTimestamp(0, 29, 8),
        `They're really amazing. To accomplish such a feat with such elegance. 
        Meanwhile we couldn't even enter- Ugh!`,
        new Map([
            [PositiveEmotion.Respect, 6],
            [PositiveEmotion.Gratitude, -2],
        ]),
        10,
        new Set<PositiveEmotion>([PositiveEmotion.Gratitude])
    );

    addInteractionEvent(
        NpcID.Roberta,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 29, 8, 15),
        `Oh dear, you really shouldn't go around accepting random injections from 
        strangers. Ah well, don't worry - I'm not gonna be the one to exploit 
        your gullibility.`,
        new Map([
            [PositiveEmotion.Trust, 2],
        ]),
        Character.get(NpcID.Roberta).passiveDeception
    );

    addInteractionEvent(
        NpcID.Elysium,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 29, 8, 15),
        `She spoke to the <i>survivor Himself</i>??! And to tell Him off because 
        she didn't like His ways? I continue to be amazed by your strength of 
        character, Ms. Aurelia.<br/>
        Well I suppose it may not be that surprising when you take into account 
        her unusual family. What's up with all of that mess with them anyway?`,
        new Map([
            [PositiveEmotion.Respect, 4],
        ])
    );

    addInteractionEvent(
        NpcID.Ezell,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 29, 8, 15),
        `How can it be?? The sigil of a higher vampiric family? On an aasimar?
         And he's not undead either?<br/>
         And did his halo change form? Were his wings always like this? Did he 
         even have them normally?<br/>
         <em>What the hell is going on here?</em>`,
        new Map([
            [PositiveEmotion.Respect, 4],
            [PositiveEmotion.Trust, -1],
        ]),
        10,
        new Set([PositiveEmotion.Trust])
    );

    addInteractionEvent(
        NpcID.Elysium,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 29, 8, 30),
        `One look at the sea terror and his conclusions already match mine. 
        That's impressive.`,
        new Map([
            [PositiveEmotion.Respect, 2],
        ])
    );
}