import {IBufferedAttitude} from "./IBufferedAttitude";


export interface ITestBufferedAttitude
    extends IBufferedAttitude
{
    get value(): number;
    get bufferedValue(): number;
    resetRatings();
}
