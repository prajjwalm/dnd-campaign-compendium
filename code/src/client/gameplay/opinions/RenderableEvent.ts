import {GameTimestamp} from "../GameTimestamp";
import {IDOMGenerator} from "../IDomGenerator";


export interface RenderableEvent
    extends IDOMGenerator
{
    get startTime(): GameTimestamp;
}
