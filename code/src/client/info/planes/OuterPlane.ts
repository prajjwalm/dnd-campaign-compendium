import {EShard}              from "../shards/EShard";
import {EConventionalPlanes} from "./EConventionalPlanes";
import {Plane}               from "./Plane";
import {EPlaneNature}        from "./EPlaneNature";


export class OuterPlane
    extends Plane
{
    public readonly attributes: {
        economy?: string;
        planarEffects?: string;
    } = {};

    public constructor(title: string,
                       public readonly shaperShard: EShard,
                       public readonly inspiration: EConventionalPlanes)
    {
        super(`The ${title} of ${EShard[shaperShard]}`);
    }

    public generateDOMString(): string
    {
        return "";
    }

    public get nature(): EPlaneNature
    {
        return EPlaneNature.Outer;
    }

}
