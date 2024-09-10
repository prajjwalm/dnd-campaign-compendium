import {NpcId}   from "../../data/npcIndex";
import {PcIndex} from "../../data/pcIndex";
import {GameTimestamp}       from "../../GameTimestamp";
import {Character}           from "../../simulation/characters/Character";
import {PositiveEmotion}     from "../PositiveEmotion";
import {addInteractionEvent} from "./s9";


export function sessionOpinionEvents06()
{
    addInteractionEvent(
        NpcId.Erica,
        [],
        new GameTimestamp(0, 6, 6, 0),
        "Huh that was quite a shove. But given how polite they were in " +
        "asking if they could visit our garden yesterday, I can only " +
        "assume something has happened...",
        new Map([]),
    );

    addInteractionEvent(
        NpcId.Erica,
        [],
        new GameTimestamp(0, 6, 6, 30),
        "<span style='font-size: 11px'>The way Aurelia's owl was staring after me, hiding in the " +
        "bush until I saw it, then flying off - I'm sure of it. Probably one of her " +
        "spellcasting powers. I hope I'm mistaken, but... sigh, I doubt " +
        "it. That's how those with power act, and I was a fool to expect " +
        "otherwise. </span><span style='font-size: 9px'>Even after telling her " +
        "to leave me alone as clearly as I could, won't take no for an " +
        "answer. Let alone respect any measure of my privacy, I'm seen as " +
        "an object and downright forbidden to keep my secrets to myself. " +
        "Can't live with their own paranoia and would downright descend " +
        "to <em>spying</em> to find out whatever tf they suspect me of " +
        "hiding from their highnesses.</span><br/>" +
        "Wait, the owl being there was probably a coincidence. I hope " +
        "I'm overthinking stuff.",
        new Map([
                    [PositiveEmotion.Trust, -4],
                    [PositiveEmotion.Gratitude, -1],
                    [PositiveEmotion.Respect, -3],
                ]),
        Character.get(NpcId.Erica).passiveDeception + 5,
    );

    addInteractionEvent(
        NpcId.Dawn,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 6, 7, 30),
        "Channeled his investiture to heal me. God knows I needed that, " +
        "phew... <em>What the hell just happened?</em>&nbsp; What was this sudden " +
        "touch of death that almost snuffed all our souls out?",
        new Map([
                    [PositiveEmotion.Gratitude, 3]
                ]),
    );

    addInteractionEvent(
        NpcId.Tomasa,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 6, 7, 30),
        "Healed me, probably saving me from the verge of death... but... " +
        "what does it matter, now that... why... Taihe...",
        new Map([
                    [PositiveEmotion.Gratitude, 2]
                ]),
    );
}
