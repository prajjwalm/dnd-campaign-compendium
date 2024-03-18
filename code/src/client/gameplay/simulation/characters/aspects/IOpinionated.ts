import {PcIndex}       from "../../../data/pcIndex";
import {IDOMGenerator} from "../../../IDomGenerator";


/**
 * Interface to mark a character as worthy of having opinions.
 */
export interface IOpinionated
    extends IDOMGenerator
{
    /**
     * Returns whether this character is worthy of having opinions.
     */
    get isOpinionated(): boolean;

    /**
     * Returns their passive deception with regard to secret opinions.
     */
    get passiveDeception(): number;

    generateTimelineDOMString(pc: PcIndex): string;
}
