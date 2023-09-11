import {GameTimestamp} from "../GameTimestamp";


export interface IAttitudeHandler
{
    ambientInteraction: number;

    /**
     * Updates the internal timestamp to the given value, applying forgetfulness
     * if supported. Will throw an error if it is less than the current
     * timestamp.
     */
    incrementTimeTo(finalTime: GameTimestamp): void;

    /**
     * Records an event that produced the given delta to the attitude handler.
     */
    addEvent(eventValueDelta: number, eventTime?: GameTimestamp): void;

    /**
     * Returns an integer in [-10, 10] that tells of how much of this 'attitude'
     * is felt.
     */
    get rating(): number;

    /**
     * Returns the current timestamp.
     */
    get timestamp(): GameTimestamp;
}
