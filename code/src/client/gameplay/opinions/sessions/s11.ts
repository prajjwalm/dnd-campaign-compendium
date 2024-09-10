import {NpcId}   from "../../data/npcIndex";
import {PcIndex} from "../../data/pcIndex";
import {GameTimestamp}       from "../../GameTimestamp";
import {Character}           from "../../simulation/characters/Character";
import {PositiveEmotion}     from "../PositiveEmotion";
import {addInteractionEvent} from "./s9";

export function sessionOpinionEvents11()
{

    addInteractionEvent(
        NpcId.Jaye,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 27, 21, 0),
        "You know boss, you got one hell of a silver tongue. Ok, I'm convinced, " +
        "but you owe me <em>big</em> time now.",
        new Map([
                    [PositiveEmotion.Respect, 4],
                    [PositiveEmotion.Trust, -1],
                    [PositiveEmotion.Gratitude, -1],
                ])
    );

    const npcReactions = new Map([
                                     // NpcId.Dusk,
                                     // NpcId.Dawn,
                                     [
                                         NpcId.Andri,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Athlon,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Cecelia,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         4
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         -1
                                                     ],
                                                     [PositiveEmotion.Trust, 1],
                                                     [
                                                         PositiveEmotion.Affection,
                                                         -1
                                                     ],
                                                 ])
                                     ],
                                     [
                                         NpcId.Coroto,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Elysium,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         4
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         1
                                                     ],
                                                     [PositiveEmotion.Trust, 3]
                                                 ])
                                     ],
                                     [
                                         NpcId.Erica,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         3
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Genefe,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         1
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Hav,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Hina,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         0
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         1
                                                     ],
                                                     [PositiveEmotion.Trust, 3]
                                                 ])
                                     ],
                                     [
                                         NpcId.Ingrid,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Iona,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         4
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     // [NpcId.Jaye,      new
                                     // Map([[PositiveEmotion.Respect, 2],
                                     // [PositiveEmotion.Gratitude, 2],
                                     // [PositiveEmotion.Trust, 2]])],
                                     [
                                         NpcId.Jordi,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Kastor,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         4
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         -4
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Petra,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Roberta,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Sasha,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         4
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         1
                                                     ],
                                                     [PositiveEmotion.Trust, 1]
                                                 ])
                                     ],
                                     [
                                         NpcId.Sybilla,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Tomasa,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Verna,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         4
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         2
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Vitacia,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         3
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         4
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Yuki,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         4
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         0
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                     [
                                         NpcId.Ezell,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         4
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         1
                                                     ],
                                                     [PositiveEmotion.Trust, 3]
                                                 ])
                                     ],
                                     [
                                         NpcId.Irene,
                                         new Map([
                                                     [
                                                         PositiveEmotion.Respect,
                                                         2
                                                     ],
                                                     [
                                                         PositiveEmotion.Gratitude,
                                                         1
                                                     ],
                                                     [PositiveEmotion.Trust, 2]
                                                 ])
                                     ],
                                 ]);

    const aftermathTime = new GameTimestamp(0, 28, 11, 0);
    for (const [npc, reactionMap] of npcReactions.entries()) {
        addInteractionEvent(
            npc,
            [
                PcIndex.ID_HELIOS,
                PcIndex.ID_CYRION,
            ],
            aftermathTime,
            "<em>(On Dawn explaining the entire situation and the combat.)</em>",
            reactionMap
        );
    }

    addInteractionEvent(
        NpcId.Jaye,
        [
            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION,
        ],
        aftermathTime,
        "Well, despite everything, I gotta say - didn't experience this " +
        "adrenaline in a long time, Boss(es?). You fight like real polar bears. " +
        "Also, I daresay I'll get more customers now. Right, gotta get back to the " +
        "chopping board!<br/>",
        new Map([
                    [PositiveEmotion.Respect, 8],
                    [PositiveEmotion.Gratitude, 9],
                    [PositiveEmotion.Trust, 6],
                ])
    );

    addInteractionEvent(
        NpcId.Dawn,
        [
            PcIndex.ID_HELIOS,
            PcIndex.ID_CYRION,
        ],
        aftermathTime,
        "I suppose... it is over? 400 years. But I don't want to -",
        new Map([
                    [PositiveEmotion.Gratitude, -3],
                    [PositiveEmotion.Affection, -2],
                ]),
        Character.get(NpcId.Dawn).passiveDeception - 5
    );

    addInteractionEvent(
        NpcId.Verna,
        [PcIndex.ID_HELIOS],
        aftermathTime,
        "So that's what the sparring was about. (Sad smile) Pricks just a " +
        "bit...",
        new Map([
                    [PositiveEmotion.Gratitude, -1],
                ]),
        Character.get(NpcId.Verna).passiveDeception,
        new Set([PositiveEmotion.Gratitude])
    );

    addInteractionEvent(
        NpcId.Dusk,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 28, 9, 0),
        "Oh? He's hot.<br/>" +
        "<p style='font-size: 11px'>And could be called cool too, now that I think of it... hmm, Sun and wind...<br/>" +
        "And just like that, an artist, slumbering for way too long, gets " +
        "inspiration again. <br/> And going all in? in that state? Huh, coming from " +
        "a champion of Ruin, that's... dangerous.<br/>" +
        "Logically, I should draw the sword, but Whimsy compels me to the " +
        "brush instead.</p>",
        new Map([
                    [PositiveEmotion.Respect, 4],
                    [PositiveEmotion.Gratitude, 7],
                ])
    );

    addInteractionEvent(
        NpcId.Dusk,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 28, 9, 0),
        "Stands back, out of the limelight. But without him, Mr. Shash " +
        "would've been dead two times over. Boring as a primary subject, but " +
        "the reliability makes the backdrop oh so much better...",
        new Map([
                    [PositiveEmotion.Respect, 3],
                    [PositiveEmotion.Trust, 3],
                ])
    );
}
