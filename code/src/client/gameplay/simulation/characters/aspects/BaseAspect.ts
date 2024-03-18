import {Character}          from "../Character";
import {IBaseAspectFactory} from "./IBaseAspectFactory";


/**
 * The base aspect class all aspects extend. This provides the functionality to
 * ensure factory methods are called as needed - only once, at least once, not
 * after being marked as final etc.
 */
export abstract class BaseAspect
    implements IBaseAspectFactory
{
    /**
     * CTOR.
     */
    protected constructor(protected readonly c: Character)
    {}

    /**
     * Do something if the entire aspect is complete. For most, nothing should
     * be needed, although the user facing ones might want to do something which
     * adds some HTML to the page or interacts with some other classes.
     */
    public finalize(): void
    {}

    /**
     * Deep-copy this aspect to be used for another character.
     *
     * @param other The character we want to create the aspect for.
     */
    public abstract duplicate(other: Character): this;
}
