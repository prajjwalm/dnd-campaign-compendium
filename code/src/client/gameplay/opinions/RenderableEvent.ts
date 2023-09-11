import {IDOMGenerator} from "../IDomGenerator";
import {GameTimestamp} from "../GameTimestamp";


export interface RenderableEvent
    extends IDOMGenerator
{
    get startTime(): GameTimestamp;
}
