import {NpcID}               from "../../data/npcIndex";
import {BaseAspect}          from "./aspects/BaseAspect";
import {CardAspect}          from "./aspects/CardAspect";
import {CombatAspect}        from "./aspects/CombatAspect";
import {CoreAspect}          from "./aspects/CoreAspect";
import {CSkillsAspect}       from "./aspects/CSkillsAspect";
import {DSkillsAspect}       from "./aspects/DSkillsAspect";
import {DStatsAspect}        from "./aspects/DStatsAspect";
import {ICardFactory}        from "./aspects/ICardFactory";
import {ICombatFactory}      from "./aspects/ICombatFactory";
import {ICoreFactory}        from "./aspects/ICoreFactory";
import {ICSkillsFactory}     from "./aspects/ICSkillsFactory";
import {IDSkillsFactory}     from "./aspects/IDSkillsFactory";
import {IDStatsFactory}      from "./aspects/IDStatsFactory";
import {IOperatorFactory}    from "./aspects/IOperatorFactory";
import {IOpinionatedFactory} from "./aspects/IOpinionatedFactory";
import {ISheetFactory}       from "./aspects/ISheetFactory";
import {OperatorAspect}      from "./aspects/OperatorAspect";
import {OpinionAspect}       from "./aspects/OpinionAspect";
import {SheetAspect}         from "./aspects/SheetAspect";
import {Character, EAspect}  from "./Character";


/**
 * Allows a character to be extended from another.
 */
export class CharacterVariant
    extends Character
{
    /**
     * The character we're extending.
     */
    private readonly baseCharacter: Character;

    /**
     * CTOR.
     */
    public constructor(id: NpcID, baseId: NpcID)
    {
        super(id);
        this.baseCharacter = Character.get(baseId);
    }

    private GetOrDuplicateAspect(aspect: EAspect): BaseAspect
    {
        if (this.aspects[aspect] == null) {
            this.aspects[aspect] = this.baseCharacter
                                       .GetOrThrowAspect(aspect)
                                       .duplicate(this);
        }
        return this.aspects[aspect];
    }

    protected get cardAspect()     : CardAspect     { return this.GetOrDuplicateAspect(EAspect.Card)     as CardAspect     ; }
    protected get opinionAspect()  : OpinionAspect  { return this.GetOrDuplicateAspect(EAspect.Opinions) as OpinionAspect  ; }
    protected get dSkillsAspect()  : DSkillsAspect  { return this.GetOrDuplicateAspect(EAspect.DSkills)  as DSkillsAspect  ; }
    protected get dStatsAspect()   : DStatsAspect   { return this.GetOrDuplicateAspect(EAspect.DStats)   as DStatsAspect   ; }
    protected get coreAspect()     : CoreAspect     { return this.GetOrDuplicateAspect(EAspect.Core)     as CoreAspect     ; }
    protected get combatAspect()   : CombatAspect   { return this.GetOrDuplicateAspect(EAspect.Combat)   as CombatAspect   ; }
    protected get sheetAspect()    : SheetAspect    { return this.GetOrDuplicateAspect(EAspect.Sheet)    as SheetAspect    ; }
    protected get cSkillsAspect()  : CSkillsAspect  { return this.GetOrDuplicateAspect(EAspect.CSkills)  as CSkillsAspect  ; }
    protected get operatorAspect() : OperatorAspect { return this.GetOrDuplicateAspect(EAspect.Operator) as OperatorAspect ; }

    public get core()     : ICoreFactory         { return this.coreAspect     ; }
    public get dStats()   : IDStatsFactory       { return this.dStatsAspect   ; }
    public get dSkills()  : IDSkillsFactory      { return this.dSkillsAspect  ; }
    public get opinions() : IOpinionatedFactory  { return this.opinionAspect  ; }
    public get card()     : ICardFactory         { return this.cardAspect     ; }
    public get combat()   : ICombatFactory       { return this.combatAspect   ; }
    public get sheet()    : ISheetFactory        { return this.sheetAspect    ; }
    public get cSkills()  : ICSkillsFactory      { return this.cSkillsAspect  ; }
    public get operator() : IOperatorFactory     { return this.operatorAspect ; }
}