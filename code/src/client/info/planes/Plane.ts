import {IDOMGenerator} from "../../gameplay/IDomGenerator";
import {EPlaneNature}  from "./EPlaneNature";


export abstract class Plane
    implements IDOMGenerator
{
    protected constructor(public readonly name: string)
    {}

    public abstract get nature(): EPlaneNature;

    public abstract generateDOMString(): string;
}
