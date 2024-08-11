import {IBaseAspectFactory} from "./IBaseAspectFactory";


/**
 * The factory interface needed to be supported to set up an {@link ICore}
 * object.
 */
export interface ICoreFactory
    extends IBaseAspectFactory
{
    /**
     * Set the display name.
     */
    set name(val: string);

    /**
     * Set the active status.
     */
    set isActive(val: boolean);

    /**
     * Set the relative image path.
     */
    set imgPath(val: string);
}
