import {getEnumIterator}        from "../../../../common/common";
import {DSkill}                 from "../../../data/constants";
import {NpcID}                  from "../../../data/npcIndex";
import {PcIndex, PcTokenNames}  from "../../../data/pcIndex";
import {GameTimestamp}          from "../../../GameTimestamp";
import {NpcInteractionEvent}    from "../../../opinions/NpcInteractionEvent";
import {NpcOpinion}             from "../../../opinions/NpcOpinions";
import {PositiveEmotion}        from "../../../opinions/PositiveEmotion";
import {arc21OpinionEvents}     from "../../../opinions/sessions/arc_21";
import {arc22OpinionEvents}     from "../../../opinions/sessions/arc_22";
import {arc23OpinionEvents}     from "../../../opinions/sessions/arc_23";
import {arc24OpinionEvents}     from "../../../opinions/sessions/arc_24";
import {sessionOpinionEvents10} from "../../../opinions/sessions/s10";
import {sessionOpinionEvents11} from "../../../opinions/sessions/s11";
import {sessionOpinionEvents02} from "../../../opinions/sessions/s2";
import {sessionOpinionEvents03} from "../../../opinions/sessions/s3";
import {sessionOpinionEvents04} from "../../../opinions/sessions/s4";
import {sessionOpinionEvents05} from "../../../opinions/sessions/s5";
import {sessionOpinionEvents06} from "../../../opinions/sessions/s6";
import {sessionOpinionEvents07} from "../../../opinions/sessions/s7";
import {sessionOpinionEvents08} from "../../../opinions/sessions/s8";
import {sessionOpinionEvents09} from "../../../opinions/sessions/s9";
import {TimeskipEvent}          from "../../../opinions/TimeskipEvent";
import {Character}              from "../Character";
import {BaseAspect}             from "./BaseAspect";
import {ICore}                  from "./ICore";
import {IOpinionated}           from "./IOpinionated";
import {IOpinionatedFactory}    from "./IOpinionatedFactory";


/**
 * An aspect that allows the character to have opinions.
 */
export class OpinionAspect
    extends BaseAspect
    implements IOpinionated,
               IOpinionatedFactory
{
    /**
     * Setups up the opinion table element after adding the various pc-npc
     * events in a session by session manner.
     */
    public static setupOpinionTable()
    {
        sessionOpinionEvents02();
        sessionOpinionEvents03();
        sessionOpinionEvents04();
        sessionOpinionEvents05();
        sessionOpinionEvents06();
        sessionOpinionEvents07();
        sessionOpinionEvents08();
        sessionOpinionEvents09();
        sessionOpinionEvents10();
        sessionOpinionEvents11();
        arc21OpinionEvents();
        arc22OpinionEvents();
        arc23OpinionEvents();
        arc24OpinionEvents();

        const $individualAst = $("#individual_ast");
        const $table_area = $("#attitude_summary_table_area");

        const pcCells = [];
        for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
            pcCells.push(
                `<div class="simple_table__row__cell character_token">
                <img src="./assets/images/character_tokens/C2/pcs/${PcTokenNames.get(pc)}.png" 
                     alt="[NULL]">
            </div>`
            );
        }
        const npcRows = [];
        for (const npcIndex of getEnumIterator(NpcID) as Generator<NpcID>) {
            const npc = Character.get(npcIndex);
            if (!npc || !npc.isOpinionated) {
                continue;
            }
            console.log(`Generating opinions for ${npc.name}`)
            npcRows.push(npc.generateOpinionDOM());
        }

        $table_area.append(`
        <div class='opinion_summary_table'>
            <div class='simple_table__row simple_table__row--header'>
                <div class='simple_table__row__cell'></div>
                ${pcCells.join("")}
            </div>
            <div class='simple_table__body'>
                ${npcRows.join("")}
            </div>
        </div>    
    `);

        $table_area.on("click", ".npc_opinion_circle", function () {
            const npcId: NpcID = $(this).data("npcId");
            const pcId: PcIndex = $(this).data("pcId");

            $individualAst.html(Character.get(npcId).generateOpinionTimelineDOM(pcId));
            $individualAst.show();
        });
    }

    /**
     * A reference to the properties supplied by the core aspect.
     */
    private core: ICore;

    /**
     * The opinions that this NPC holds towards the various pcs.
     */
    private opinions: Map<PcIndex, NpcOpinion>;

    /**
     * Whether this NPC has opinions.
     */
    private _opinionated: boolean;

    /**
     * CTOR.
     */
    constructor(c: Character)
    {
        super(c);

        this.core         = c;
        this._opinionated = false;
        this.opinions     = null;
    }

    /**
     * @inheritDoc
     */
    public duplicate(other: Character): this
    {
        const aspect = new OpinionAspect(other);
        aspect._opinionated = this._opinionated;

        if (aspect._opinionated) {
            throw new Error("Are you sure you should be duplicating the " +
                            "opinions of a character?")
        }
        return aspect as this;
    }

    /**
     * @inheritDoc
     *
     * Here we return a table row containing self token as the first column cell
     * and the opinions for all PCs as the other cells.
     */
    public generateDOMString(): string
    {
        const opinionStrings = [];

        for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
            const npcOpinion = this.opinions.get(pc);
            opinionStrings.push(npcOpinion.generateDOMString());
        }

        return `
            <div class='simple_table__row'>
                <div class='simple_table__row__cell character_token'>
                    <img src="${this.c.imgPath}" alt="[NULL]">
                </div>
                ${opinionStrings.join("")}
            </div>
        `;
    }

    /**
     * @inheritDoc
     */
    public addInteractionEvent(pcs: PcIndex[],
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
            this.opinions.get(pc).addEvent(
                new NpcInteractionEvent(timestamp, text, delta, insightGate, reMap)
            );
        }
    }

    /**
     * @inheritDoc
     */
    public addTimeskipEvent(pcs: PcIndex[],
                            timestamp1: GameTimestamp,
                            timestamp2: GameTimestamp,
                            text: string,
                            delta: Map<PositiveEmotion, number>)
    {
        for (const pc of pcs) {
            this.opinions.get(pc).addEvent(
                new TimeskipEvent(timestamp1, timestamp2, delta, text)
            );
        }
    }

    /**
     * Returns the DOM string for the timeline list.
     */
    public generateTimelineDOMString(pc: PcIndex): string
    {
        return this.opinions.get(pc).generateTimelineDOMString();
    }

    /**
     * @inheritDoc
     */
    public get isOpinionated(): boolean
    {
        return this.core.isActive && this._opinionated;
    }

    /**
     * @inheritDoc
     */
    public set isOpinionated(val: boolean)
    {
        this._opinionated = val;
        if (val) {
            this.opinions = new Map();
            for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
                this.opinions.set(pc, new NpcOpinion(this.c.id, pc));
            }
        }
    }

    /**
     * @inheritDoc
     */
    public get passiveDeception(): number
    {
        return 10 + this.c.getSkillMod(DSkill.Deception);
    }
}