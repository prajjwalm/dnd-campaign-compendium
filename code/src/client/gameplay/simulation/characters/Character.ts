import {Dice}                    from "../../../homebrew/common/diceConstants";
import {
    Condition, DamageType, DStat, Prof, ProficiencyLevel, Sense, Skill, Speed,
    StatValue
}                                from "../../../homebrew/definitions/constants";
import {NpcId}                   from "../../../npcs/npcIndex";
import {Action}                  from "../action/Action";
import {IActionContext}          from "../action/IActionContext";
import {AspectNotSetupException} from "./aspects/AspectNotSetupException";
import {BaseAspect}              from "./aspects/BaseAspect";
import {CardAspect}              from "./aspects/CardAspect";
import {CombatAspect}            from "./aspects/CombatAspect";
import {CoreAspect}              from "./aspects/CoreAspect";
import {DSkillsAspect}           from "./aspects/DSkillsAspect";
import {DStatsAspect}            from "./aspects/DStatsAspect";
import {DuplicateSetupException} from "./aspects/DuplicateSetupException";
import {ICard}                   from "./aspects/ICard";
import {ICardFactory}            from "./aspects/ICardFactory";
import {ICombat}                 from "./aspects/ICombat";
import {ICombatFactory}          from "./aspects/ICombatFactory";
import {ICore}                   from "./aspects/ICore";
import {ICoreFactory}            from "./aspects/ICoreFactory";
import {IDSkills}                from "./aspects/IDSkills";
import {IDSkillsFactory}         from "./aspects/IDSkillsFactory";
import {IDStats}                 from "./aspects/IDStats";
import {IDStatsFactory}          from "./aspects/IDStatsFactory";
import {IOpinionated}            from "./aspects/IOpinionated";
import {IOpinionatedFactory}     from "./aspects/IOpinionatedFactory";
import {ISheet}                  from "./aspects/ISheet";
import {ISheetFactory}           from "./aspects/ISheetFactory";
import {OpinionAspect}           from "./aspects/OpinionAspect";
import {SheetAspect}             from "./aspects/SheetAspect";


/**
 *  1. Create the stat block.
 *  2. Be used for getting stuff like passive deception in session summaries.
 *  3. Be used for party simulation.
 *  4. Be used for character card creation.
 */
export class Character
    implements ICore,
               ICard,
               IDStats,
               IDSkills,
               IOpinionated,
               ICombat,
               ISheet
{
    /**
     * An index to make sure we don't ever get two objects for one character.
     */
    private static readonly _Index: Map<NpcId, Character> =
        new Map<NpcId, Character>();

    /**
     * Fetch the {@link Character} for the given id.
     */
    public static get(npcId: NpcId)
    {
        return Character._Index.get(npcId);
    }

    /**
     * The aspect handling the core 'fields'.
     */
    private _coreAspect: CoreAspect;

    /**
     * The aspect handling the D&D stats.
     */
    private _dStatsAspect: DStatsAspect;

    /**
     * The aspect handling the D&D skills.
     */
    private _dSkillsAspect: DSkillsAspect;

    /**
     * The aspect handling the interface to the opinion table.
     */
    private _opinionAspect: OpinionAspect;

    /**
     * The aspect handling the creation of the character card.
     */
    private _cardAspect: CardAspect;

    /**
     * The aspect handling the backend of combat.
     */
    private _combatAspect: CombatAspect;

    /**
     * The aspect handling stat sheet creation.
     */
    private _sheetAspect: SheetAspect

    /**
     * CTOR.
     */
    public constructor(public readonly id)
    {
        // if (Character._Index.has(id)) {
        //     throw new DuplicateSetupException(NpcId[id]);
        // }
        Character._Index.set(id, this);
        this._coreAspect = null;
        this._dStatsAspect = null;
        this._dSkillsAspect = null;
        this._cardAspect = null;
        this._opinionAspect = null;
        this._combatAspect = null;
        this._sheetAspect = null;
    }

    /**
     * @inheritDoc
     */
    public getSkillMod(skill: Skill, profOverride?: ProficiencyLevel): number
    {
        return this.dSkillsAspect.getSkillMod(skill, profOverride);
    }

    /**
     * @inheritDoc
     */
    public get upgradedSKills(): ReadonlyMap<Skill, number>
    {
        return this.dSkillsAspect.upgradedSKills;
    }

    /**
     * @inheritDoc
     */
    public getCardIndex(): string
    {
        return this.cardAspect.getCardIndex();
    }

    /**
     * @inheritDoc
     */
    public generatePrimaryToken(): string
    {
        return this.cardAspect.generatePrimaryToken();
    }

    /**
     * @inheritDoc
     */
    public createLink(displayText?: string): string
    {
        return this.cardAspect.createLink(displayText);
    }

    /**
     * @inheritDoc
     */
    public generateCard(floating: boolean): string
    {
        return this.cardAspect.generateCard(floating);
    }

    public render(): string
    {
        return "";
    }

    /**
     * Finalize({@link BaseAspect.finalize}) all the completed aspects.
     */
    public finalize(): void
    {
        console.log("A")
        // This finalization should've nothing to do with the setup, so the
        // order of finalization shouldn't matter.
        let aspect: BaseAspect;
        for (aspect of [
            this._coreAspect,
            this._dStatsAspect,
            this._dSkillsAspect,
            this._opinionAspect,
            this._cardAspect,
            this._combatAspect,
            this._sheetAspect
        ])
        {
            if (aspect == null) {
                continue;
            }
            aspect.finalize();
        }
    }

    /**
     * @inheritDoc
     */
    get ac(): number
    {
        return this._combatAspect.ac;
    }

    /**
     * @inheritDoc
     */
    public get stats(): ReadonlyMap<DStat, StatValue>
    {
        return this.dStatsAspect.stats;
    }

    /**
     * @inheritDoc
     */
    public mod(stat: DStat): number
    {
        return this.dStatsAspect.mod(stat);
    }

    /**
     * @inheritDoc
     */
    public get pb(): Prof
    {
        return this.dStatsAspect.pb;
    }

    /**
     * @inheritDoc
     */
    get hpDice(): ReadonlyMap<Dice, number>
    {
        return this.combatAspect.hpDice;
    }

    /**
     * @inheritDoc
     */
    get hp(): number
    {
        return this.combatAspect.hp;
    }

    /**
     * @inheritDoc
     */
    get speeds(): ReadonlyMap<Speed, number>
    {
        return this.combatAspect.speeds;
    }

    /**
     * @inheritDoc
     */
    get senses(): ReadonlyMap<Sense, number>
    {
        return this.combatAspect.senses;
    }

    /**
     * @inheritDoc
     */
    get saves(): ReadonlyMap<DStat, [ProficiencyLevel, number]>
    {
        return this.combatAspect.saves;
    }

    /**
     * @inheritDoc
     */
    public dc(stat: DStat): number
    {
        return this._combatAspect.dc(stat);
    }

    /**
     * @inheritDoc
     */
    get passivePerception(): number
    {
        return this.combatAspect.passivePerception;
    }

    /**
     * @inheritDoc
     */
    get passiveStealth(): number
    {
        return this.combatAspect.passiveStealth;
    }

    /**
     * @inheritDoc
     */
    get damageRes(): ReadonlyMap<DamageType, number>
    {
        return this.combatAspect.damageRes;
    }

    /**
     * @inheritDoc
     */
    get conditionImmunities(): ReadonlySet<Condition>
    {
        return this.combatAspect.conditionImmunities;
    }

    /**
     * @inheritDoc
     */
    get actions(): Action[]
    {
        return this.combatAspect.actions;
    }

    /**
     * @inheritDoc
     */
    public get actionContentAPI(): IActionContext
    {
        return this.dStatsAspect.actionContentAPI;
    }

    get isOpinionated(): boolean
    {
        return this.opinionAspect.isOpinionated;
    }

    /**
     * @inheritDoc
     */
    public get passiveDeception(): number
    {
        return this.opinionAspect.passiveDeception;
    }

    /**
     * @inheritDoc
     */
    public get name(): string
    {
        return this.coreAspect.name;
    }

    /**
     * @inheritDoc
     */
    public get imgPath(): string
    {
        return this.coreAspect.imgPath;
    }

    /**
     * Accessor to factory methods for setting up core data.
     */
    public get core(): ICoreFactory
    {
        if (this._coreAspect == null) {
            this._coreAspect = new CoreAspect(this);
        }
        return this._coreAspect;
    }

    /**
     * Accessor to factory methods for setting up the stats.
     */
    public get dStats(): IDStatsFactory
    {
        if (this._dStatsAspect == null) {
            this._dStatsAspect = new DStatsAspect(this);
        }
        return this._dStatsAspect;
    }

    /**
     * Accessor to factory methods for setting up the skills.
     */
    public get dSKills(): IDSkillsFactory
    {
        if (this._dSkillsAspect == null) {
            // [DesignChoice]
            // Choice between this & this.dStatsAspect - former allows lazy
            // setup. Latter requires stats to be at least setup before skills.
            // Since we're already providing a character reference I went with
            // that (and stating that the aspects won't have references to each
            // other) but yea this could be worth a thought someday?
            this._dSkillsAspect = new DSkillsAspect(this);
        }
        return this._dSkillsAspect;
    }

    /**
     * Accessor to factory methods for setting up opinion stuff.
     */
    public get opinions(): IOpinionatedFactory
    {
        if (this._opinionAspect == null) {
            this._opinionAspect = new OpinionAspect(this);
        }
        return this._opinionAspect;
    }

    /**
     * Accessor to factory methods for setting up the card related information.
     */
    public get card(): ICardFactory
    {
        if (this._cardAspect == null) {
            this._cardAspect = new CardAspect(this);
        }
        return this._cardAspect;
    }

    /**
     * Accessor to factory methods for setting up combat information.
     */
    public get combat(): ICombatFactory
    {
        if (this._combatAspect == null) {
            this._combatAspect = new CombatAspect(this);
        }
        return this._combatAspect;
    }

    /**
     * Accessor to factory methods for setting up sheet information.
     */
    public get sheet(): ISheetFactory
    {
        if (this._sheetAspect == null) {
            this._sheetAspect = new SheetAspect(this);
        }
        return this._sheetAspect;
    }

    /**
     * Shortcut getter for STR.
     */
    public get STR(): number
    {
        return this.mod(DStat.Str);
    }

    /**
     * Shortcut getter for DEX.
     */
    public get DEX(): number
    {
        return this.mod(DStat.Dex);
    }

    /**
     * Shortcut getter for CON.
     */
    public get CON(): number
    {
        return this.mod(DStat.Con);
    }

    /**
     * Shortcut getter for INT.
     */
    public get INT(): number
    {
        return this.mod(DStat.Int);
    }

    /**
     * Shortcut getter for WIS.
     */
    public get WIS(): number
    {
        return this.mod(DStat.Wis);
    }

    /**
     * Shortcut getter for CHA.
     */
    public get CHA(): number
    {
        return this.mod(DStat.Cha);
    }

    /**
     * Shortcut getter for semi-proficiency modifier.
     */
    public get SemiProf(): number
    {
        return this.pb.mod(ProficiencyLevel.Half);
    }

    /**
     * Shortcut getter for proficiency modifier.
     */
    public get Prof(): number
    {
        return this.pb.mod(ProficiencyLevel.Prof);
    }

    /**
     * Shortcut getter for expertise modifier.
     */
    public get Expertise(): number
    {
        return this.pb.mod(ProficiencyLevel.Expert);
    }

    private get cardAspect(): CardAspect
    {
        if (this._cardAspect == null) {
            throw new AspectNotSetupException("cardAspect");
        }
        return this._cardAspect;
    }

    private get opinionAspect(): OpinionAspect
    {
        if (this._opinionAspect == null) {
            throw new AspectNotSetupException("opinionAspect");
        }
        return this._opinionAspect;
    }

    private get dSkillsAspect(): DSkillsAspect
    {
        if (this._dSkillsAspect == null) {
            throw new AspectNotSetupException("dSkillsAspect");
        }
        return this._dSkillsAspect;
    }

    private get dStatsAspect(): DStatsAspect
    {
        if (this._dStatsAspect == null) {
            throw new AspectNotSetupException("dStatsAspect");
        }
        return this._dStatsAspect;
    }

    private get coreAspect(): CoreAspect
    {
        if (this._coreAspect == null) {
            throw new AspectNotSetupException("coreAspect");
        }
        return this._coreAspect;
    }

    private get combatAspect(): CombatAspect
    {
        if (this._combatAspect == null) {
            throw new AspectNotSetupException("combatAspect");
        }
        return this._combatAspect;
    }

    private get sheetAspect(): SheetAspect
    {
        if (this._sheetAspect == null) {
            throw new AspectNotSetupException("sheetAspect");
        }
        return this._sheetAspect;
    }
}

