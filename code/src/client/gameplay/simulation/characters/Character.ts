import {Condition, CSkill, DamageType, DSkill, DStat, Era, pbMod, ProficiencyLevel, Sense, Speed} from "../../data/constants";
import {NpcId}                                                                                    from "../../data/npcIndex";
import {PcIndex}                                                                                  from "../../data/pcIndex";
import {Rating}                               from "../../data/Rarity";
import {Dice}                                 from "../../rolling/Dice";
import {Action}                               from "../action/Action";
import {AspectNotSetupException}              from "./aspects/AspectNotSetupException";
import {AspectOutOfOrderException}            from "./aspects/AspectOutOfOrderException";
import {BaseAspect}                           from "./aspects/BaseAspect";
import {CardAspect}                           from "./aspects/CardAspect";
import {CombatAspect}                         from "./aspects/CombatAspect";
import {CoreAspect}                           from "./aspects/CoreAspect";
import {CSkillsAspect}                        from "./aspects/CSkillsAspect";
import {DSkillsAspect}                        from "./aspects/DSkillsAspect";
import {DStatsAspect}                         from "./aspects/DStatsAspect";
import {ICard}                                from "./aspects/ICard";
import {ICardFactory}                         from "./aspects/ICardFactory";
import {ICombat}                              from "./aspects/ICombat";
import {ICombatFactory}                       from "./aspects/ICombatFactory";
import {ICore}                                from "./aspects/ICore";
import {ICoreFactory}                         from "./aspects/ICoreFactory";
import {ICSkills}                             from "./aspects/ICSkills";
import {ICSkillsFactory}                      from "./aspects/ICSkillsFactory";
import {IDSkills}                             from "./aspects/IDSkills";
import {IDSkillsFactory}                      from "./aspects/IDSkillsFactory";
import {IDStats}                              from "./aspects/IDStats";
import {IDStatsFactory}                       from "./aspects/IDStatsFactory";
import {IOperator}                            from "./aspects/IOperator";
import {CombatRatingMetric, IOperatorFactory} from "./aspects/IOperatorFactory";
import {IOpinionated}                         from "./aspects/IOpinionated";
import {IOpinionatedFactory}                  from "./aspects/IOpinionatedFactory";
import {ISheet}                               from "./aspects/ISheet";
import {ISheetFactory}                        from "./aspects/ISheetFactory";
import {OperatorAspect}                       from "./aspects/OperatorAspect";
import {OpinionAspect}                        from "./aspects/OpinionAspect";
import {SheetAspect}                          from "./aspects/SheetAspect";
import {Morale}                               from "./Morale";


/**
 * The various Aspects, listed in order. Attempting to initialize an aspect
 * after one of it successors should result in an
 * {@link AspectOutOfOrderException}, though some older sheets don't follow
 * this. Some aspects not being initialized at all is fine, but dependant
 * aspects might throw an
 * {@link AspectNotSetupException} if they encounter logic that required the
 * missing aspect.
 */
export enum EAspect
{
    Core,
    DStats,
    DSkills,
    CSkills,
    Operator,
    Card,
    Opinions,
    Combat,
    Sheet,
    AspectCount,
}


/**
 * So that we may be a bit more generous in the order of aspect initialization.
 */
const AspectDependencies: Map<EAspect, EAspect[]> = new Map
([
    [EAspect.Core,     []],
    [EAspect.DStats,   []],
    [EAspect.DSkills,  [EAspect.DStats]],
    [EAspect.CSkills,  []],
    [EAspect.Operator, [EAspect.Core, EAspect.DSkills, EAspect.CSkills]],
    [EAspect.Card,     [EAspect.Core]],
    [EAspect.Opinions, [EAspect.Core, EAspect.DSkills, EAspect.Operator]],
    [EAspect.Combat,   [EAspect.Core, EAspect.DSkills, EAspect.Operator]],
    [EAspect.Sheet,    [EAspect.Combat]],
]);

const AspectDependants: Map<EAspect, EAspect[]> = new Map();
for (const [aspect, dependencies] of AspectDependencies) {
    for (const dependency of dependencies) {
        if (!AspectDependants.has(dependency)) {
            AspectDependants.set(dependency, []);
        }
        AspectDependants.get(dependency).push(aspect);
    }
}


/**
 * The various constructors (classes) of the Aspects listed in enum order.
 */
const AspectConstructors: (new(c: Character) => BaseAspect)[] = [
    CoreAspect,
    DStatsAspect,
    DSkillsAspect,
    CSkillsAspect,
    OperatorAspect,
    CardAspect,
    OpinionAspect,
    CombatAspect,
    SheetAspect,
];


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
               ISheet,
               ICSkills,
               IOperator
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

    protected readonly aspects: BaseAspect[];


    /**
     * CTOR.
     */
    public constructor(public readonly id: NpcId)
    {
        Character._Index.set(id, this);

        this.aspects = new Array(EAspect.AspectCount);
        this.aspects.fill(null);
    }

    public getOrCreateAspect(newAspect: EAspect): BaseAspect
    {
        if (this.aspects[newAspect] == null) {
            if (AspectDependants.has(newAspect)) {
                for (const aspect of AspectDependants.get(newAspect)) {
                    if (this.aspects[aspect] != null) {
                        throw new AspectOutOfOrderException();
                    }
                }
            }
            this.aspects[newAspect] = new AspectConstructors[newAspect](this);
        }
        return this.aspects[newAspect];
    }

    public getOrThrowAspect(aspect: EAspect): BaseAspect
    {
        if (this.aspects[aspect] == null) {
            throw new AspectNotSetupException(EAspect[aspect]);
        }
        return this.aspects[aspect];
    }


    // The following methods have been made public only so that the subclass
    // CharacterVariant can access these for another Character.

    public hasAspect(aspect: EAspect): boolean
    {
        return this.aspects[aspect] != null;
    }

    protected get coreAspect()     : ICore         { return this.getOrThrowAspect(EAspect.Core)      as CoreAspect     ; }
    protected get dStatsAspect()   : IDStats       { return this.getOrThrowAspect(EAspect.DStats)    as DStatsAspect   ; }
    protected get dSkillsAspect()  : IDSkills      { return this.getOrThrowAspect(EAspect.DSkills)   as DSkillsAspect  ; }
    protected get cSkillsAspect()  : ICSkills      { return this.getOrThrowAspect(EAspect.CSkills)   as CSkillsAspect  ; }
    protected get operatorAspect() : IOperator     { return this.getOrThrowAspect(EAspect.Operator)  as OperatorAspect ; }
    protected get cardAspect()     : ICard         { return this.getOrThrowAspect(EAspect.Card)      as CardAspect     ; }
    protected get opinionAspect()  : IOpinionated  { return this.getOrThrowAspect(EAspect.Opinions)  as OpinionAspect  ; }
    protected get combatAspect()   : ICombat       { return this.getOrThrowAspect(EAspect.Combat)    as CombatAspect   ; }
    protected get sheetAspect()    : ISheet        { return this.getOrThrowAspect(EAspect.Sheet)     as SheetAspect    ; }

    public get core()     : ICoreFactory        { return this.getOrCreateAspect(EAspect.Core)     as CoreAspect     ; }
    public get dStats()   : IDStatsFactory      { return this.getOrCreateAspect(EAspect.DStats)   as DStatsAspect   ; }
    public get dSkills()  : IDSkillsFactory     { return this.getOrCreateAspect(EAspect.DSkills)  as DSkillsAspect  ; }
    public get cSkills()  : ICSkillsFactory     { return this.getOrCreateAspect(EAspect.CSkills)  as CSkillsAspect  ; }
    public get operator() : IOperatorFactory    { return this.getOrCreateAspect(EAspect.Operator) as OperatorAspect ; }
    public get card()     : ICardFactory        { return this.getOrCreateAspect(EAspect.Card)     as CardAspect     ; }
    public get opinions() : IOpinionatedFactory { return this.getOrCreateAspect(EAspect.Opinions) as OpinionAspect  ; }
    public get combat()   : ICombatFactory      { return this.getOrCreateAspect(EAspect.Combat)   as CombatAspect   ; }
    public get sheet()    : ISheetFactory       { return this.getOrCreateAspect(EAspect.Sheet)    as SheetAspect    ; }

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
    public get isActive(): boolean
    {
        return this.coreAspect.isActive;
    }
    /**
     * @inheritDoc
     */
    public get imgPath(): string
    {
        return this.coreAspect.imgPath;
    }

    /**
     * @inheritDoc
     */
    public get stats(): ReadonlyMap<DStat, number>
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
    public get pb(): number
    {
        return this.dStatsAspect.pb;
    }

    /**
     * @inheritDoc
     */
    public getSkillMod(skill: DSkill,
                       profOverride: ProficiencyLevel = null,
                       tentative: boolean = false): number
    {
        return this.dSkillsAspect.getSkillMod(skill, profOverride, tentative);
    }

    /**
     * @inheritDoc
     */
    public get upgradedSkills(): ReadonlyMap<DSkill, number>
    {
        return this.dSkillsAspect.upgradedSkills;
    }

    /**
     * @inheritDoc
     */
    public get dSkillRatings(): ReadonlyMap<DSkill, Rating>
    {
        return this.dSkillsAspect.dSkillRatings;
    }

    /**
     * @inheritDoc
     */
    public getSkillVal(skill: CSkill): number
    {
        return this.cSkillsAspect.getSkillVal(skill);
    }

    /**
     * @inheritDoc
     */
    public get cSkillRatings(): ReadonlyMap<CSkill, Rating>
    {
        return this.cSkillsAspect.cSkillRatings;
    }

    public get era(): Era
    {
        return this.operatorAspect.era;
    }

    public get professions(): [string, string]
    {
        return this.operatorAspect.professions;
    }

    public get morale(): Morale
    {
        return this.operatorAspect.morale;
    }

    public get fatigue(): number
    {
        return this.operatorAspect.fatigue;
    }

    public get ratings(): CombatRatingMetric
    {
        return this.operatorAspect.ratings;
    }

    public get notableDSkills(): ReadonlyMap<DSkill, number>
    {
        return this.operatorAspect.notableDSkills;
    }

    public get notableCSkills(): ReadonlyMap<CSkill, number>
    {
        return this.operatorAspect.notableCSkills;
    }

    public get notableStuff(): ReadonlyArray<[string, string]>
    {
        return this.operatorAspect.notableStuff;
    }

    /**
     * Returns the DOM string generated by the operator aspect.
     */
    public generateOperatorDOM()
    {
        return this.operatorAspect.generateDOMString();
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

    public generateTimelineDOMString(pc: PcIndex): string
    {
        return this.opinionAspect.generateTimelineDOMString(pc);
    }

    /**
     * Returns the DOM string generated by the opinion aspect.
     */
    public generateOpinionDOM()
    {
        return this.opinionAspect.generateDOMString();
    }

    /**
     * Returns the timeline DOM string generated by the opinion aspect for a
     * particular PC.
     */
    public generateOpinionTimelineDOM(pc: PcIndex)
    {
        if (this.aspects[EAspect.Opinions] == null) {
            return null;
        }
        return this.opinionAspect.generateTimelineDOMString(pc);
    }

    /**
     * @inheritDoc
     */
    get isOpinionated(): boolean
    {
        return this.aspects[EAspect.Opinions] != null &&
               this.opinionAspect.isOpinionated;
    }

    /**
     * @inheritDoc
     */
    public get passiveDeception(): number
    {
        if (this.aspects[EAspect.Opinions] == null) {
            return null;
        }
        return this.opinionAspect.passiveDeception;
    }

    /**
     * @inheritDoc
     */
    get ac(): number
    {
        return this.combatAspect.ac;
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
        return this.combatAspect.dc(stat);
    }

    /**
     * @inheritDoc
     */
    get passivePerception(): number
    {
        return this.combatAspect.passivePerception;
    }

    public get cr(): number
    {
        return this.combatAspect.cr;
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
    get actions(): Map<string, Action>
    {
        return this.combatAspect.actions;
    }

    public get imbalance(): [number, number, number] | null
    {
        return this.combatAspect.imbalance;
    }

    /**
     * @inheritDoc
     */
    public get bannerDom(): string { return this.sheetAspect.bannerDom; }

    public get danger(): number { return this.sheetAspect.danger; }

    /**
     * @inheritDoc
     */
    public render(): string
    {
        return this.sheetAspect.render();
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
        return pbMod(this.pb, ProficiencyLevel.Half);
    }

    /**
     * Shortcut getter for proficiency modifier.
     */
    public get Prof(): number
    {
        return this.pb;
    }

    /**
     * Shortcut getter for expertise modifier.
     */
    public get Expertise(): number
    {
        return pbMod(this.pb, ProficiencyLevel.Expert);
    }

    public generateDOMString(): string
    {
        throw new Error("Not supported.");
    }
}

