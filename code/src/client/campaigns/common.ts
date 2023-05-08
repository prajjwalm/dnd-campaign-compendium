import {getNumberSuffix} from "../common/common";


/**
 * The timestamp in in-game terms.
 *
 * For the purposes of Campaign#2, I'm going to assume time wrt. the plane of
 * Devotion and with t=0 as when they entered.
 */
export class GameTimestamp
{
    public static readonly DAY = 24 * 60 * 60 * 1000;

    /**
     * Factory method to get timestamp objects with only a discrete number of
     * days.
     */
    public static fromDays(nDays: number)
    {
        return new GameTimestamp(0, nDays);
    }

    public constructor(
        private readonly year: number = 0,  // In devotion terms this is 100 days long.
        private readonly day: number = 0,  // Just a metric of time. 24 hours long.
        private readonly hour: number = 0,
        private readonly minute: number = 0,
        private readonly second: number = 0,
        private readonly ms: number = 0)
    {}

    public get totalMillis(): number
    {
        return this.ms + 1000 * (
               this.second + 60 * (
               this.minute + 60 * (
               this.hour + 24 * (
               this.day + 100 *
               this.year
               ))));
    }

    public get totalDays(): number
    {
        return this.day + 100 * this.year;
    }

    public toString(): string {
        // This code is wrong since 2400 hours will cause the day to go bad,
        // but that can be fixed later.
        const year = this.year + Math.floor(this.day / 100);
        const day =  this.day % 100 + Math.floor(this.hour / 24);
        const hour =  this.hour % 24 + Math.floor(this.minute / 60);
        const minute =  this.minute % 60 + Math.floor(this.second / 60);

        const hourStr = String(hour).padStart(2, '0');
        const minStr = String(minute).padStart(2, '0');
        return `<p>${day}<sup>${getNumberSuffix(day)}</sup> of Year ${year}, ${hourStr}:${minStr}</p>`;
    }
}


export const T_START = new GameTimestamp(0, 5, 8, 0);
export const T_NOW = new GameTimestamp(0, 5, 17, 30);
