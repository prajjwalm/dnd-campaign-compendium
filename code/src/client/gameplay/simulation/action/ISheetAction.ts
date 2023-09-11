import {IDStats}        from "../characters/aspects/IDStats";
import {Activation}     from "../../data/constants";
import {IActionContext} from "./IActionContext";

/**
 * The absolute minimum needed to render an action onto a character sheet.
 */
export interface ISheetAction
{
    /**
     *  Which part of the round does the attack execute in.
     */
    get activation(): Activation;

    /**
     * Build upon the given core stats and PB.
     */
    bindStats(stats: IDStats): void;

    /**
     * Generate the attack's text content.
     */
    createContent(): string;
}
