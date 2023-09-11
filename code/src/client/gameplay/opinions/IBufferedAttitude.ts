export interface IBufferedAttitude
{
    adjustValue(by: number, isDecay?: boolean, days?: number);

    get rating(): number;
    get zone(): number;
}
