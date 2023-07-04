import {PcIndex}                                            from "../../../data/pcIndex";
import {NpcId, NpcIndex}                                    from "../../../npcs/npcIndex";
import {GameTimestamp}                                      from "../../common";
import {NpcInteractionEvent, NpcOpinionV2, PositiveEmotion} from "../npcOpinions";

export function session9NpcInteractions(
    npcInteractionEvents: Map<NpcId, Map<PcIndex, NpcOpinionV2>>)
{
    function addInteractionEvent(npc: NpcId,
                                 pcs: PcIndex[],
                                 timestamp: GameTimestamp,
                                 text: string,
                                 delta: Map<PositiveEmotion, number>,
                                 insightGate: number = 10,
                                 reverseEmotions: Set<PositiveEmotion> = new Set())
    {
        let reMap: Map<PositiveEmotion, boolean> = null;
        if (reverseEmotions) {
            reMap = new Map();
            for (const e of reverseEmotions) {
                reMap.set(e, true);
            }
        }
        for (const pc of pcs) {
            npcInteractionEvents.get(npc).get(pc).addEvent(
                new NpcInteractionEvent(timestamp, text, delta, insightGate, reMap)
            );
        }
    }

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 6, 12, 20),
        `Ahh, so it was her tinkering that led to Taihe's death... Ms. Dusk says 
        it wasn't deliberate but... Who the fuck asked her to mess with things 
        that she doesn't understand? Are our lives mere-`,
        new Map([
            [PositiveEmotion.Affection, -5],
            [PositiveEmotion.Respect, -2]
        ]),
        NpcIndex.get(NpcId.Dawn).passiveDeception + 5
    );

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 6, 12, 20),
        `STOP. She didn't know what she was doing, and it's a scholar's duty to 
        be inquisitive. Who am I kidding? This was happening sooner or later 
        anyway... if anything its my fault for not sharing everything with them
        sooner... In fact my crimes date far back...`,
        new Map([
            [PositiveEmotion.Affection, 5]
        ]),
        NpcIndex.get(NpcId.Dawn).passiveDeception + 5,
        new Set([PositiveEmotion.Affection])
    );

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 6, 12, 20),
        `I see, sent by Ruin, huh. Well, in that case nothing to do but to face
        the punishment that comes without inconveniencing the others. Sigh, I 
        should be happy that it happened...`,
        new Map([
            [PositiveEmotion.Affection, -1]
        ]),
        NpcIndex.get(NpcId.Dawn).passiveDeception + 5,
        new Set([PositiveEmotion.Affection])
    );

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 6, 12, 20),
        `Wait, she is coming. Stop thinking. Help her help the villagers, that's
         all that matters now. If the end is coming, might as well do it right. 
         Now smile.`,
        new Map([
            [PositiveEmotion.Affection, -1]
        ]),
        NpcIndex.get(NpcId.Dawn).passiveDeception
    );

    addInteractionEvent(
        NpcId.Ezell,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 12, 20),
        `It's always a pleasure to meet a fellow aasimar. From Terra no less, 
        Heh, looks like he was following Andoain all this while with no idea 
        of who he was. And got here by the aid of Mostima herself, though ofc
        she slipped away. <br/><em>(note to self: must file a report on this)</em>`,
        new Map([
            [PositiveEmotion.Respect, 3],
            [PositiveEmotion.Trust, 1],
        ]),
    );

    addInteractionEvent(
        NpcId.Ezell,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 12, 20),
        `Bound to an Honorspren, and the bond is strong enough for her to lead 
        him into the spiritual realm.`,
        new Map([
            [PositiveEmotion.Respect, 2],
            [PositiveEmotion.Trust, 7],
        ]),
    );

    addInteractionEvent(
        NpcId.Elysium,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 12, 20),
        `Windrunner? Good News.`,
        new Map([
            [PositiveEmotion.Trust, 5],
        ]),
    );

    addInteractionEvent(
        NpcId.Ezell,
        [PcIndex.ID_AURELIA,
         PcIndex.ID_HELIOS,
         PcIndex.ID_CYRION,
         PcIndex.ID_PANZER],
        new GameTimestamp(0, 6, 12, 30),
        `While their primary concern is probably to escape out of this curse, 
        it does seem like they're trying to help the people here without any 
        ulterior motivations.`,
        new Map([
            [PositiveEmotion.Respect, 2],
            [PositiveEmotion.Gratitude, 3],
        ]),
    );

    addInteractionEvent(
        NpcId.Elysium,
        [PcIndex.ID_AURELIA,
         PcIndex.ID_HELIOS,
         PcIndex.ID_CYRION,
         PcIndex.ID_PANZER],
        new GameTimestamp(0, 6, 12, 30),
        `While their primary concern is probably to escape out of this curse, 
        it does seem like they're trying to help the people here without any 
        ulterior motivations.`,
        new Map([
            [PositiveEmotion.Respect, 2],
            [PositiveEmotion.Gratitude, 2],
        ]),
    );
}