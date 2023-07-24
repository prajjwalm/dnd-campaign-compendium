/**
 * Interface to mark a character as worthy of having opinions.
 */
export interface IOpinionated
{
    /**
     * Returns whether this character is worthy of having opinions.
     */
    get isOpinionated(): boolean;

    /**
     * Returns their passive deception with regard to secret opinions.
     */
    get passiveDeception(): number;
}
