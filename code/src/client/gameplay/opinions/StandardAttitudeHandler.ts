import {EQ}                   from "../../common/common";
import {GameTimestamp}        from "../GameTimestamp";
import {AttitudeHandler}      from "./AttitudeHandler";
import {ITestAttitudeHandler} from "./ITestAttitudeHandler";


export class StandardAttitudeHandler
    extends AttitudeHandler
{
    public constructor()
    {
        super();
    }

    protected get forgetfulness()
    {
        const z = this.bufferedAttitude.zone;

        const zMag = Math.abs(z);
        const zSgn = Math.sign(z);

        return [0.2, 0.1, 0.05, 0.02][zMag] * (-zSgn);
    }
}


export function testAttitudeHandler(): void
{
    const ah: ITestAttitudeHandler = new StandardAttitudeHandler();

    console.assert(ah.rating == 0);
    ah.incrementTimeTo(GameTimestamp.fromDays(1))
    console.assert(ah.rating == 0);
    ah.addEvent(2.5);
    ah.incrementTimeTo(GameTimestamp.fromDays(2000));
    console.assert(ah.rating == 0);
    ah.testReset();

    ah.addEvent(7);
    console.assert(ah.rating == 2);
    ah.incrementTimeTo(GameTimestamp.fromDays(2002));
    console.assert(ah.rating == 1);
    ah.incrementTimeTo(GameTimestamp.fromDays(4000));
    console.assert(ah.rating == 1);
    console.assert(EQ(ah.value, 3), ah.value);

    ah.ambientInteraction = -0.1;
    ah.incrementTimeTo(GameTimestamp.fromDays(4021));
    console.assert(EQ(ah.value, 1.8), ah.value); // todo: wtf? how does this work?

}
