import {GameTimestamp}                from "../GameTimestamp";
import {IBufferedAttitude}            from "./IBufferedAttitude";
import {ITestAttitudeHandler}         from "./ITestAttitudeHandler";
import {ITestBufferedAttitude}        from "./ITestBufferedAttitude";
import {StandardBufferedAttitudeList} from "./StandardBufferedAttitudeList";


/**
 * ## Conceptual Changes
 * Let me cover how the core concepts are supported via this class.
 *
 * <b>Forgiveness</b><br/>
 * As compared to v1 where there were forgiveness buffers for every rating,
 * which was way too excessive and required me to throw in huge values to undo
 * an event, in this there are forgiveness buffers for every zone cutoff, and
 * one on the current rating only. So say someone is at positive 6 and the
 * previous zone cutoffs are 1 and 4. So a negative event would first deplete
 * from the rating
 * 6 buffer, then deplete the value such that it is on the cutoff for rating 4.
 * After that another buffer is depleted first before the value could fall for
 * cutoff for rating 1, and so on.
 *
 * <b>Forgetfulness.</b><br/>
 * This still retains everything it had from v1, but I'm going to add an
 * ambient
 * interaction support here, since we're going to be doing a lot of timeskips.
 * So if the character is miles away and has no means of interaction with the
 * target of this AttitudeHandler, its value would be zero and decay would
 * proceed normally as in v1. But let's say they're living under the same roof
 * and interacting positively every day. There is no reason forgetfulness
 * should
 * act in this case (in fact we might even see a positive attitude rise), but I
 * can't put down an event in this case. On the other hand, let's say there
 * living in mutual tension, even though there's no direct interaction events,
 * any positive feelings should decline faster. Currently, I plan to just add
 * the ambient interaction additively with the forgetfulness (but this won't
 * become zero on a zone boundary). The complication, however rests in how I
 * will render this, since this info needs to be shown to the players.
 */
export abstract class AttitudeHandler
    implements ITestAttitudeHandler
{
    public ambientInteraction: number;

    protected readonly bufferedAttitude: IBufferedAttitude;

    private currentTime: GameTimestamp;

    protected constructor()
    {
        this.bufferedAttitude = new StandardBufferedAttitudeList();
        this.currentTime = new GameTimestamp();
        this.ambientInteraction = 0;
    }

    protected abstract get forgetfulness();

    testReset(): void
    {
        (this.bufferedAttitude as ITestBufferedAttitude).resetRatings();
    }

    public incrementTimeTo(finalTime: GameTimestamp): void
    {
        if (finalTime.totalMillis < this.currentTime.totalMillis) {
            throw new Error("Cannot move backwards in time.");
        }
        const forgetfulness = this.forgetfulness;
        const ambient = this.ambientInteraction;
        const decay = forgetfulness + ambient;

        // We do not cross zone boundaries only if ambient interaction is less
        // than forgetfulness and of the opposite direction.
        const naturalDecay =
            Math.sign(ambient) != Math.sign(forgetfulness) &&
            Math.abs(ambient) < Math.abs(forgetfulness);

        this.bufferedAttitude.adjustValue(
            decay * (finalTime.totalDays - this.currentTime.totalDays),
            naturalDecay,
            (finalTime.totalDays - this.currentTime.totalDays),
        );
        this.currentTime = finalTime;
    }

    public addEvent(eventValueDelta: number, eventTime?: GameTimestamp): void
    {
        this.bufferedAttitude.adjustValue(eventValueDelta);
    }

    get value(): number
    {
        return (this.bufferedAttitude as ITestBufferedAttitude).value;
    }

    public get rating(): number
    {
        return this.bufferedAttitude.rating;
    }

    public get timestamp(): GameTimestamp
    {
        return this.currentTime;
    }
}
