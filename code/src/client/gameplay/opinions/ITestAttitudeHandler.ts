import {IAttitudeHandler} from "./IAttitudeHandler";


/**
 * Interface for a test attitude handler object intended for debugging in
 * testcases.
 */
export interface ITestAttitudeHandler
    extends IAttitudeHandler
{
    /**
     * Fully resets the state of the AttitudeHandler.
     */
    testReset(): void;

    /**
     * Returns the current value of the attitude which may be any number. The
     * rating is a function (in the mathematical sense) of this.
     */
    get value(): number;
}
