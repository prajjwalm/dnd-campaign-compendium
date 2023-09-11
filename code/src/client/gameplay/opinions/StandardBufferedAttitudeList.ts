import {BufferedAttitudeListBase} from "./BufferedAttitudeListBase";
import {IBufferedAttitude}        from "./IBufferedAttitude";
import {ITestBufferedAttitude}    from "./ITestBufferedAttitude";


export class StandardBufferedAttitudeList
    extends BufferedAttitudeListBase
    implements IBufferedAttitude
{
    /**
     * CTOR.
     */
    public constructor()
    {
        super();
        this.resetRatings();
    }

    protected getBufferCapacityOfZone(zone: number): number
    {
        return Math.abs(zone);
    }

    protected getDynamicBufferSizeForRating(rating: number): number
    {
        return rating;
    }

    protected getValueCapacityOfRating(rating: number): number
    {
        return Math.abs(rating) + 2;
    }

    protected getZoneDeltaOffset(zone: number): number
    {
        return [0, 0, 1, 2][zone];
    }

    protected get zoneCutoffs(): number[]
    {
        return [1, 4, 7];
    }

    protected get maxRating(): number
    {
        return 10;
    }
}


export function testBufferedAttitude(): void
{
    const ba: ITestBufferedAttitude = new StandardBufferedAttitudeList();

    function testAssert(ba: ITestBufferedAttitude,
                        expectedValue: number,
                        expectedRating: number,
                        expectedBuffer: number)
    {
        console.assert(
            ba.value == expectedValue &&
            ba.rating == expectedRating &&
            ba.bufferedValue == expectedBuffer,
            `Expected (V, R, B): (${expectedValue}, ${expectedRating}, ` +
            `${expectedBuffer}). Got (${ba.value}, ${ba.rating}, ` +
            `${ba.bufferedValue}).`
        );
    }

    ba.adjustValue(1);
    testAssert(ba, 1, 0, 0);
    ba.adjustValue(-3);
    testAssert(ba, -2, 0, 0);
    ba.adjustValue(5);
    testAssert(ba, 3, 1, 2);
    ba.adjustValue(-8);
    testAssert(ba, -3, -1, -2);
    ba.resetRatings();

    ba.adjustValue(8);
    testAssert(ba, 8, 2, 3);
    ba.adjustValue(18);
    testAssert(ba, 25, 5, 10);
    ba.adjustValue(-1);
    testAssert(ba, 25, 5, 9); // double check this!
    ba.adjustValue(-5);
    testAssert(ba, 23, 4, 5);
    ba.adjustValue(-5);
    testAssert(ba, 18, 4, 5);
    ba.adjustValue(-2);
    testAssert(ba, 18, 4, 3);
    ba.adjustValue(-2);
    testAssert(ba, 18, 4, 1);
    ba.adjustValue(-2);
    testAssert(ba, 16, 3, 1);
    ba.adjustValue(-2);
    testAssert(ba, 14, 3, 1);
    ba.adjustValue(2);
    testAssert(ba, 14, 3, 3);

    ba.resetRatings();
    ba.adjustValue(7);
    ba.adjustValue(-0.1, true);
    testAssert(ba, 6.9, 1, 3);
}
