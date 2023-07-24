/**
 * The factory interface needed to create the default {@link IOpinionated}
 * aspect.
 */
export interface IOpinionatedFactory
{
    /**
     * Set true to mark this character as opinionated.
     */
    set isOpinionated(val: boolean);
}