import {
    DStat, ProficiencyLevel
}                from "../../data/constants";
import {IDStats} from "../characters/aspects/IDStats";
import {IActionContext} from "./IActionContext";
import {wrapRoll}       from "./Wrap";


export class ActionContext
    implements IActionContext
{
    constructor(private readonly stats: IDStats)
    {}

    public get pb(): number
    {
        return this.stats.pb.mod();
    }

    public mod(stat: DStat): number
    {
        return this.stats.stats.get(stat).mod;
    }

    public hit(stat, { prof = ProficiencyLevel.Prof, mod = 0 }): string
    {
        return wrapRoll(this.stats.stats.get(stat).mod +
                        this.stats.pb.mod(prof) +
                        mod);
    }

    public dc(stat, { prof = ProficiencyLevel.Prof, mod = 0 }): string
    {
        return `DC ${this.stats.stats.get(stat).mod +
                     this.stats.pb.mod(prof) +
                     mod + 8}`;
    }
}
