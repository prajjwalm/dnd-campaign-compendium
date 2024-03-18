import {BaseUniqueDOMGenerator} from "../BaseUniqueDOMGenerator";
import {IUniqueDOMGenerator}    from "../IUniqueDOMGenerator";
import {Edge}                   from "./Edge";


/**
 * Context free implementation of a vertex that can be rendered.
 */
export abstract class Vertex
    extends BaseUniqueDOMGenerator
    implements IUniqueDOMGenerator
{
    /**
     * @inheritDoc
     *
     * Unique across all graphs. (Unlike the {@link numId} which is unique only
     * within a graph.)
     */
    public readonly id: string;

    /**
     * The position of this vertex wrt the origin in cartesian coordinates.
     */
    private _cartesian: [number, number];

    /**
     * The position of this vertex wrt the origin in radial coordinates.
     */
    private _radial: [number, number];

    /**
     * The neighbours of this vertex, mapped by the outgoing edge.
     */
    private readonly _neighbours: Map<Edge<this>, this>;

    /**
     * CTOR.
     */
    protected constructor(public readonly graphID: string,
                          public readonly numId: number)
    {
        super();
        this.id = `${graphID}${String(this.numId).padStart(3, '0')}`;
        this.radial = [0, 0];
        this._neighbours = new Map();
    }

    /**
     * @inheritDoc
     */
    public abstract generateDOMString(): string;

    /**
     * Set the position of this vertex wrt another vertex using radial offset.
     */
    public setRadiallyWrt(v: Vertex, r: number, theta: number)
    {
        theta *= Math.PI / 180;
        const [vx, vy] = v._cartesian;
        this.cartesian = [vx + r * Math.cos(theta), vy + r * Math.sin(theta)];
    }

    /**
     * Set the position of this vertex wrt another vertex using carte offset.
     */
    public setLinearlyWrt(v: Vertex, delta_x: number, delta_y: number)
    {
        const [vx, vy] = v._cartesian;
        this.cartesian = [vx + delta_x, vy + delta_y];
    }

    /**
     * @returns Squared distance from the given vertex.
     */
    public sqDistanceFrom(v: Vertex)
    {
        return (this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y);
    }

    /**
     * @returns The angle of the displacement from the given vertex to this one
     *          wrt the positive x-axis.
     */
    public displacementAngleWithX(v: Vertex)
    {
        return Vertex.vectorAngleWithX(v.x - this.x, v.y - this.y);
    }

    /**
     * x-coordinate of this vertex wrt the origin.
     */
    public get x(): number
    {
        return this._cartesian[0];
    }

    /**
     * y-coordinate of this vertex wrt the origin.
     */
    public get y(): number
    {
        return this._cartesian[1];
    }

    /**
     * Radial r of this vertex wrt the origin.
     */
    public get r(): number
    {
        return this._radial[0];
    }

    /**
     * Radial theta of this vertex wrt the origin.
     */
    public get theta(): number
    {
        return this._radial[1];
    }

    /**
     * Position the vertex radially wrt the origin.
     */
    public set radial(value: [number, number])
    {
        this._radial = value;
        const [r, theta] = value;
        this._cartesian = [r * Math.cos(theta), r * Math.sin(theta)];
    }

    /**
     * Position the vertex wrt the origin.
     */
    public set cartesian(value: [number, number])
    {
        this._cartesian = value;
        const [x, y] = value;
        this._radial = [Math.sqrt(x * x + y * y), Vertex.vectorAngleWithX(x, y)];
    }

    /**
     * Computes the angle the given vector subtends with pos x.
     */
    private static vectorAngleWithX(x: number, y: number)
    {
        return x != 0 ? (Math.atan(y / x) + (x > 0 ? 0 : (y >= 0 ? 1 : -1) * Math.PI))
                      : (Math.sign(y) * Math.PI / 2);
    }

    /**
     * Register an edge (and its other vertex) as a neighbour of this one.
     */
    public addNeighbour(e: Edge<this>)
    {
        if (e.v1 == this) {
            this._neighbours.set(e, e.v2);
        }
        else if (e.v2 == this) {
            this._neighbours.set(e, e.v1);
        }
        else {
            throw new Error();
        }
    }

    /**
     * The neighbours of this vertex, mapped by the outgoing edge.
     */
    public get neighbours(): ReadonlyMap<Edge<this>, this>
    {
        return this._neighbours;
    }
}