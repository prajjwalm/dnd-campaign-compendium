import {Skill}                   from "../../../../homebrew/definitions/constants";
import {Character}               from "../Character";
import {AspectNotSetupException} from "./AspectNotSetupException";
import {BaseAspect}              from "./BaseAspect";
import {IDSkills}                from "./IDSkills";
import {IOpinionated}            from "./IOpinionated";
import {IOpinionatedFactory}     from "./IOpinionatedFactory";


export class OpinionAspect
    extends BaseAspect
    implements IOpinionated,
               IOpinionatedFactory
{
    private _isOpinionated: boolean;

    private readonly dSkills: IDSkills;

    constructor(c: Character)
    {
        super(c);
        this.dSkills = c;
    }

    public get isOpinionated(): boolean
    {
        return this._isOpinionated;
    }

    public set isOpinionated(val: boolean)
    {
        this._isOpinionated = val;
    }

    public get passiveDeception(): number
    {
        return 10 + this.dSkills.getSkillMod(Skill.Deception);
    }
}