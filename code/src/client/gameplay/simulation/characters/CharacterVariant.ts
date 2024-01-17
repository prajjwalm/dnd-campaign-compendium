import {NpcID}               from "../../data/npcIndex";
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
import {Character}           from "./Character";


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

    /**
     * @inheritDoc
     */
    public get cardAspect(): CardAspect
    {
        if (this._cardAspect == null) {
            this._cardAspect = this.baseCharacter.cardAspect.duplicate(this);
        }
        return this._cardAspect;
    }

    /**
     * @inheritDoc
     */
    public get opinionAspect(): OpinionAspect
    {
        if (this._opinionAspect == null) {
            this._opinionAspect = this.baseCharacter.opinionAspect.duplicate(this);
        }
        return this._opinionAspect;
    }

    /**
     * @inheritDoc
     */
    public get dSkillsAspect(): DSkillsAspect
    {
        if (this._dSkillsAspect == null) {
            this._dSkillsAspect = this.baseCharacter.dSkillsAspect.duplicate(this);
        }
        return this._dSkillsAspect;
    }

    /**
     * @inheritDoc
     */
    public get dStatsAspect(): DStatsAspect
    {
        if (this._dStatsAspect == null) {
            this._dStatsAspect = this.baseCharacter.dStatsAspect.duplicate(this);
        }
        return this._dStatsAspect;
    }

    /**
     * @inheritDoc
     */
    public get coreAspect(): CoreAspect
    {
        if (this._coreAspect == null) {
            this._coreAspect = this.baseCharacter.coreAspect.duplicate(this);
        }
        return this._coreAspect;
    }

    /**
     * @inheritDoc
     */
    public get combatAspect(): CombatAspect
    {
        if (this._combatAspect == null) {
            this._combatAspect = this.baseCharacter.combatAspect.duplicate(this);
        }
        return this._combatAspect;
    }

    /**
     * @inheritDoc
     */
    public get sheetAspect(): SheetAspect
    {
        if (this._sheetAspect == null) {
            this._sheetAspect = this.baseCharacter.sheetAspect.duplicate(this);
        }
        return this._sheetAspect;
    }

    /**
     * @inheritDoc
     */
    public get cSkillsAspect(): CSkillsAspect
    {
        if (this._cSkillsAspect == null) {
            this._cSkillsAspect = this.baseCharacter.cSkillsAspect.duplicate(this);
        }
        return this._cSkillsAspect;
    }

    /**
     * @inheritDoc
     */
    public get operatorAspect(): OperatorAspect
    {
        if (this._operatorAspect == null) {
            this._operatorAspect = this.baseCharacter.operatorAspect.duplicate(this);
        }
        return this._operatorAspect;
    }

    /**
     * @inheritDoc
     */
    public get core(): ICoreFactory
    {
        return this.coreAspect;
    }

    /**
     * @inheritDoc
     */
    public get dStats(): IDStatsFactory
    {
        return this.dStatsAspect;
    }

    /**
     * @inheritDoc
     */
    public get dSKills(): IDSkillsFactory
    {
        return this.dSkillsAspect;
    }

    /**
     * @inheritDoc
     */
    public get opinions(): IOpinionatedFactory
    {
        return this.opinionAspect;
    }

    /**
     * @inheritDoc
     */
    public get card(): ICardFactory
    {
        return this.cardAspect;
    }

    /**
     * @inheritDoc
     */
    public get combat(): ICombatFactory
    {
        return this.combatAspect;
    }

    /**
     * @inheritDoc
     */
    public get sheet(): ISheetFactory
    {
        return this.sheetAspect;
    }

    /**
     * @inheritDoc
     */
    public get cSkills(): ICSkillsFactory
    {
        return this.cSkillsAspect;
    }

    /**
     * @inheritDoc
     */
    public get operator(): IOperatorFactory
    {
        return this.operatorAspect;
    }
}