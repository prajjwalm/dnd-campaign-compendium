import {Character}         from "../Character";
import {AspectFactoryFlag} from "./AspectFactoryFlag";
import {BaseAspect}        from "./BaseAspect";
import {ICore}             from "./ICore";
import {ICoreFactory}      from "./ICoreFactory";


/**
 * The implementation of the aspect providing the core functionalities.
 */
export class CoreAspect
    extends    BaseAspect
    implements ICore,
               ICoreFactory
{
    /**
     * Backing field for {@link name}.
     */
    private _name;

    /**
     * Backing field for {@link imgPath}.
     */
    private _imgPath;

    /**
     * CTOR.
     */
    constructor(c: Character)
    {
        super(c);
    }

    public duplicate(other: Character): this
    {
        // We prob. don't want to duplicate either name or image.
        return new CoreAspect(other) as this;
    }

    /**
     * @inheritDoc
     */
    public set name(value)
    {
        this.setupSentinel(AspectFactoryFlag.CoreNameSetup);
        this._name = value;
    }

    /**
     * @inheritDoc
     */
    public get name(): string
    {
        this.ensure(AspectFactoryFlag.CoreNameSetup);
        return this._name;
    }

    /**
     * @inheritDoc
     */
    public set imgPath(value)
    {
        this.setupSentinel(AspectFactoryFlag.CoreImgPathSetup);
        this._imgPath = value;
    }

    /**
     * @inheritDoc
     */
    public get imgPath(): string
    {
        this.ensure(AspectFactoryFlag.CoreImgPathSetup);
        return `./assets/images/${this._imgPath}`;
    }
}