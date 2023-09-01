import {BaseDOMGenerator} from "./BaseDOMGenerator";
import {IDOMGenerator}    from "./IDOMGenerator";
import {Vertex}           from "./Vertex";


/**
 * A context-free edge whose concrete implementations can be rendered on screen.
 */
export abstract class Edge<V extends Vertex>
    extends BaseDOMGenerator
    implements IDOMGenerator
{
    /**
     * CTOR.
     */
    protected constructor(public readonly v1: V,
                          public readonly v2: V)
    {
        super();
        if (v1 == v2) {
            throw new Error();
        }
        this.v1.addNeighbour(this);
        this.v2.addNeighbour(this);
    }

    /**
     * @inheritDoc
     */
    public get id(): string
    {
        return `${this.v1.id}___${this.v2.id}`;
    }

    /**
     * @inheritDoc
     */
    public abstract generateDOMString(): string;

    /**
     * The center of the edge - in world coordinates.
     */
    public get center(): [number, number]
    {
        return [
            (this.v1.x + this.v2.x) / 2,
            (this.v1.y + this.v2.y) / 2
        ];
    }

    /**
     * The length of the edge - in world scale.
     */
    public get length(): number
    {
        const deltaX = this.v1.x - this.v2.x;
        const deltaY = this.v1.y - this.v2.y;

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    /**
     * The degrees the edge needs to be rotated.
     */
    public get rotation(): number
    {
        const deltaX = this.v1.x - this.v2.x;
        const deltaY = this.v1.y - this.v2.y;

        return deltaY == 0 ? 0 : (Math.PI / 2) + Math.atan(deltaX / deltaY);
    }
}