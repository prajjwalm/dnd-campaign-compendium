import {NpcID}               from "../../data/npcIndex";
import {PcIndex}             from "../../data/pcIndex";
import {GameTimestamp}       from "../../GameTimestamp";
import {Character}           from "../../simulation/characters/Character";
import {PositiveEmotion}     from "../PositiveEmotion";
import {addInteractionEvent} from "./s9";

export function arc21OpinionEvents()
{
    const hinaDeception = Character.get(NpcID.Hina).passiveDeception;

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_AURELIA, PcIndex.ID_CYRION, PcIndex.ID_HELIOS],
        new GameTimestamp(0, 28, 12),
        `So literally the minute they found about my bondsmith powers, they 
        already found a use for it? Sigh, in the end all adults really are the 
        same aren't they?<br/>
        ... Fuck, what is wrong with me? This is Dawn's life we're talking about,
        and it's not like they have a choice here. If there is any situation 
        where my powers are used well, this is it. So be it, I'll help them 
        without complaint or bargaining.`,
        new Map([
            [PositiveEmotion.Respect, -1]
        ]),
        hinaDeception + 2,
        new Set([PositiveEmotion.Respect])
    );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_AURELIA, PcIndex.ID_CYRION, PcIndex.ID_HELIOS],
        new GameTimestamp(0, 28, 12, 5),
        `Wait a minute, Ruin has been talking to all of them too? All this time?`,
        new Map([
            [PositiveEmotion.Respect, 2],
            [PositiveEmotion.Trust, -4],
        ])
    );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 28, 12, 5),
        `Hmm... I don't really see Ruin's investiture on him - at least none 
        that hasn't been with him long enough to have become his own.`,
        new Map([
            [PositiveEmotion.Trust, 4],
        ]),
        hinaDeception
    );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 28, 12, 35),
        `Huh, was I sleep paralyzed? Possessed? Can't be- <br/>
        That said, that was a real horrible nightmare. I'm really... Thanks a 
        lot for expending so much investiture to rid me of that - though I fear 
        I may not be worth it-<br/>
        <em>Wait, did I kill all these guys? Ughh... </em>`,
        new Map([
            [PositiveEmotion.Gratitude, 3],
        ]),
        hinaDeception
    );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_AURELIA, PcIndex.ID_CYRION, PcIndex.ID_HELIOS],
        new GameTimestamp(0, 28, 12, 40),
        `...<br/>
        Yes, I think I'm certain. You are all good people. And possibly the best
        thing to have happened to our village.<br/>
        Ruzaki be damned, my own self be damned. I will not kill you.`,
        new Map([
            [PositiveEmotion.Trust, 1],
            [PositiveEmotion.Gratitude, 1],
            [PositiveEmotion.Respect, 1],
            [PositiveEmotion.Affection, 1],
        ])
    );


    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_HELIOS],
        new GameTimestamp(0, 28, 12, 40),
        `Wait, you protected me?? Again?<br/>
        oh no, no, NO! You cannot die like this!<br/>
        <span style="font-size: 9px;">So it does come to this in the end, all 
        said and done, even I <em>will not</em> break my oath. So all that's left
        is either I die alone, and remove the shardbearer from the equation, or 
        he kills me after dispatching you. In saving me today... I am not being 
        manipulated to do this. Yes, I give my life for yours of my own free 
        will.</span>`,
        new Map([
            [PositiveEmotion.Respect, 4],
            [PositiveEmotion.Gratitude, 1],
        ]),
    );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_CYRION],
        new GameTimestamp(0, 28, 12, 40),
        `You really brought <i>me</i> back to life? lmao...`,
        new Map([
            [PositiveEmotion.Gratitude, 10],
            [PositiveEmotion.Affection, 2]
        ]),
        hinaDeception
    );

    addInteractionEvent(
        NpcID.Hina,
        [PcIndex.ID_AURELIA],
        new GameTimestamp(0, 28, 12, 45),
        `Two very different professors, two very different lifetimes.<br/>
        This had to have been a horrormare - first that Shardic command, then that 
        <i>sleep</i>, and then... <span style="font-size: 11px; font-style: italic;">Ruzaki</span>. 
        Why him? Why now? Why here, so far away? Just so tired, bound, trapped. I...<br/>
        I really didn't want to be a burden... but... thank you for listening.
        Thank you for indulging me. Thank you for telling me, again and again, 
        as many times as I needed, that freedom was a choice I still had.<br/>
        You'll probably regret this day in the future, but I swear that until time 
        ends for me, I will remain loyal to you. And so I will grant you, for free,
        that which all of them would kill to get...`,
        new Map([
            [PositiveEmotion.Respect, 7],
            [PositiveEmotion.Gratitude, 10],
            [PositiveEmotion.Affection, 4],
            [PositiveEmotion.Trust, 6],
        ])
    );
    // todo: mostima entry here too, since she was watching... (once her opinions are enabled).

}