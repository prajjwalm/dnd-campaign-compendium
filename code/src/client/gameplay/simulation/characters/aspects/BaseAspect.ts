import {NpcId}                   from "../../../../npcs/npcIndex";
import {Character}               from "../Character";
import {AspectFactoryFlag}       from "./AspectFactoryFlag";
import {AspectNotSetupException} from "./AspectNotSetupException";
import {DuplicateSetupException} from "./DuplicateSetupException";


/**
 * The base aspect class all aspects extend. This provides the functionality to
 * ensure factory methods are called as needed - only once, at least once, not
 * after being marked as final etc.
 */
export class BaseAspect
{
    /**
     * The set of flags marking this elements state.
     */
    private readonly flags: Set<AspectFactoryFlag>;

    /**
     * CTOR.
     */
    constructor(private readonly character: Character)
    {
        this.flags = new Set<AspectFactoryFlag>();
    }

    /**
     * A sentinel method to ensure a setup method is called only once.
     *
     * @param flag The flag whose presence we check to see if the method was
     *             called previously.
     */
    protected setupSentinel(flag: AspectFactoryFlag): void
    {
        if (this.flags.has(flag)) {
            throw new DuplicateSetupException();
        }
        this.flags.add(flag);
    }

    /**
     * A sentinel method to ensure a build method isn't called after a part of
     * an aspect has been declared as final.
     *
     * @param buildFlag The flag we set when an aspect is built upon.
     * @param finalFlag The flag we set to mark a step-by-step built part of an
     *                  aspect as complete.
     */
    protected buildSentinel(buildFlag: AspectFactoryFlag,
                            finalFlag: AspectFactoryFlag): void
    {
        if (this.flags.has(finalFlag)) {
            throw new DuplicateSetupException();
        }
        this.flags.add(buildFlag);
    }

    /**
     * Ensure that a setup method has been invoked.
     *
     * @param flag  The flag to check whether a setup/build operation has been
     *              done earlier, now that it is being used.
     * @param crash If we should crash on failure, or just give a warning. We
     *              may want to do the latter for step-by-step aspect parts
     *              where we've added what is needed here, but want to remind
     *              ourselves that this needs to be completed.
     */
    protected ensure(flag: AspectFactoryFlag, crash: boolean = true): void
    {
        if (this.flags.has(flag)) {
            return;
        }
        if (crash) {
            throw new AspectNotSetupException();
        }
        else {
            console.warn(
                `Aspect Factory setup not completed wrt ${AspectFactoryFlag[flag]} ` +
                `on character ${NpcId[this.character.id]}.`
            );
        }
    }

    /**
     * Do something if the entire aspect is complete. For most, nothing should
     * be needed, although the user facing ones might want to do something which
     * adds some HTML to the page or interacts with some other classes.
     */
    public finalize(): void
    {}

    /**
     * It's ok for all aspects to know the id.
     */
    protected get id()
    {
        // Or is it? What if they query the entire character itself using that?
        return this.character.id;
    }
}
