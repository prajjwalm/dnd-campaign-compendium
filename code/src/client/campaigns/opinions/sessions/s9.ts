import {PcIndex} from "../../../data/pcIndex";
import {
    Character
}                from "../../../gameplay/simulation/characters/Character";
import {NpcId}   from "../../../npcs/npcIndex";
import {GameTimestamp}                                                     from "../../common";
import {NpcInteractionEvent, NpcOpinionV2, PositiveEmotion, TimeskipEvent} from "../npcOpinions";

export function addInteractionEvent(
    npcInteractionEvents: Map<NpcId, Map<PcIndex, NpcOpinionV2>>,
    npc: NpcId,
    pcs: PcIndex[],
    timestamp: GameTimestamp,
    text: string,
    delta: Map<PositiveEmotion, number>,
    insightGate: number = 10,
    reverseEmotions: Set<PositiveEmotion> = new Set())
{
    const c = Character.get(npc);
    if (!c || !c.isOpinionated) {
        return;
    }

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

export function addTimeSkipEvent(
    npcInteractionEvents: Map<NpcId, Map<PcIndex, NpcOpinionV2>>,
    npc: NpcId,
    pcs: PcIndex[],
    timestamp1: GameTimestamp,
    timestamp2: GameTimestamp,
    text: string,
    delta: Map<PositiveEmotion, number>)
{
    const c = Character.get(npc);
    if (!c || !c.isOpinionated) {
        return;
    }

    for (const pc of pcs) {
        npcInteractionEvents.get(npc).get(pc).addEvent(
            new TimeskipEvent(timestamp1, timestamp2, delta, text)
        );
    }
}

export function session9NpcInteractions(
    npcInteractionEvents: Map<NpcId, Map<PcIndex, NpcOpinionV2>>)
{

    addInteractionEvent(npcInteractionEvents,
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
                        Character.get(NpcId.Dawn).passiveDeception + 5
    );

    addInteractionEvent(npcInteractionEvents,
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
                        Character.get(NpcId.Dawn).passiveDeception + 5,
                        new Set([PositiveEmotion.Affection])
    );

    addInteractionEvent(npcInteractionEvents,
                        NpcId.Dawn,
                        [PcIndex.ID_AURELIA],
                        new GameTimestamp(0, 6, 12, 20),
                        `I see, sent by Ruin, huh. Well, in that case nothing to do but to face
        the punishment that comes without inconveniencing the others. Sigh, I 
        should be happy that it happened...`,
                        new Map([
                                    [PositiveEmotion.Affection, -1]
                                ]),
                        Character.get(NpcId.Dawn).passiveDeception + 5,
                        new Set([PositiveEmotion.Affection])
    );

    addInteractionEvent(npcInteractionEvents,
                        NpcId.Dawn,
                        [PcIndex.ID_AURELIA],
                        new GameTimestamp(0, 6, 12, 20),
                        `Wait, she is coming. Stop thinking. Help her help the villagers, that's
         all that matters now. If the end is coming, might as well do it right. 
         Now smile.`,
                        new Map([
            [PositiveEmotion.Affection, -1]
        ]),
                        Character.get(NpcId.Dawn).passiveDeception
    );

    addInteractionEvent(npcInteractionEvents,
                        NpcId.Dawn,
                        [PcIndex.ID_AURELIA],
                        new GameTimestamp(0, 6, 12, 20),
                        `Was concerned about how Ms Dusk treats us. Despite everything, it 
        feels... rather good, to have someone finally voice the apprehensions
        I've been clamping up for all these ages... Gods I am such a hypocrite.`,
                        new Map([
            [PositiveEmotion.Affection, 3],
            [PositiveEmotion.Respect, 3],
            [PositiveEmotion.Gratitude, 1],
        ]),
                        Character.get(NpcId.Dawn).passiveDeception
    );

    addInteractionEvent(npcInteractionEvents,
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

    addInteractionEvent(npcInteractionEvents,
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

    addInteractionEvent(npcInteractionEvents,
        NpcId.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 12, 25),
        `I was hungry. He gave me good food... ... want more...`,
        new Map([
            [PositiveEmotion.Affection, 2],
            [PositiveEmotion.Gratitude, 5],
        ]),
    );

    addInteractionEvent(npcInteractionEvents,
        NpcId.Elysium,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 12, 20),
        `Windrunner? Good News.`,
        new Map([
            [PositiveEmotion.Trust, 5],
        ]),
    );

    addInteractionEvent(npcInteractionEvents,
        NpcId.Ezell,
        [PcIndex.ID_AURELIA,
         PcIndex.ID_HELIOS,
         PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 12, 30),
        `While their primary concern is probably to escape out of this curse, 
        it does seem like they're trying to help the people here without any 
        ulterior motivations.`,
        new Map([
            [PositiveEmotion.Respect, 2],
            [PositiveEmotion.Gratitude, 3],
        ]),
    );

    addInteractionEvent(npcInteractionEvents,
        NpcId.Elysium,
        [PcIndex.ID_AURELIA,
         PcIndex.ID_HELIOS,
         PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 12, 30),
        `While their primary concern is probably to escape out of this curse, 
        it does seem like they're trying to help the people here without any 
        ulterior motivations.`,
        new Map([
            [PositiveEmotion.Respect, 3],
            [PositiveEmotion.Gratitude, 2],
        ]),
    );
    addInteractionEvent(npcInteractionEvents,
        NpcId.Elysium,
        [PcIndex.ID_AURELIA,
         PcIndex.ID_HELIOS,
         PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 12, 30),
        `Even though they just got here and are way out of their depths, 
         they're already willing to deep dive into the problems of the 
         multiverse. I must say I like their hunger for lore.`,
        new Map([
            [PositiveEmotion.Respect, 2],
        ]),
    );
    addInteractionEvent(npcInteractionEvents,
        NpcId.Elysium,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 6, 12, 35),
        `Not afraid to wade into the myriads of prosaic official journals I 
         keep.`,
        new Map([
            [PositiveEmotion.Respect, 4],
        ]),
    );
    addInteractionEvent(npcInteractionEvents,
        NpcId.Ezell,
        [PcIndex.ID_AURELIA,
         PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 12, 35),
        `So they've heard of the Order of St. Lataranus. Oh? As a shady criminal 
        cult? lmao.`,
        new Map([
            [PositiveEmotion.Respect, 2],
            [PositiveEmotion.Affection, 1],
        ]),
    );
}