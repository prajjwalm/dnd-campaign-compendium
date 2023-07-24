/**
 * The factory interface needed to be supported to set up an {@link ICore}
 * object.
 */
export interface ICoreFactory
{
    /**
     * Set the display name.
     */
    set name(val: string);

    /**
     * Set the relative image path.
     */
    set imgPath(val: string);
}
