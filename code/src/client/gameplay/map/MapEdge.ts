import {Edge}          from "./Edge";
import {IDOMGenerator} from "./IDOMGenerator";
import {MapGraph}      from "./MapGraph";
import {MapVertex}     from "./MapVertex";


/**
 * The edges of a graph denoting a map. For now, we only support linear edges.
 */
export class MapEdge
    extends    Edge<MapVertex>
    implements IDOMGenerator
{
    /**
     * The id number of the vertex with the lower id number.
     */
    public readonly lesserVId: number;

    /**
     * The id number of the vertex with the higher id number.
     */
    public readonly higherVId: number;

    /**
     * Backing field for {@link worldLengthMultiplier}.
     */
    private _worldLengthMultiplier: number;

    /**
     * CTOR.
     */
    constructor(public readonly graph: MapGraph,
                start: MapVertex,
                end: MapVertex)
    {
        super(start, end);

        this.lesserVId = Math.min(start.numId, end.numId);
        this.higherVId = Math.max(start.numId, end.numId);

        this._worldLengthMultiplier = 1;

        this.graph.addEdge(this);
    }

    /**
     * @inheritDoc
     */
    public generateDOMString()
    {
        const [x, y]: [number, number] =
            this.graph.mapLocalCoordinatesToScreenPosition(this.center);

        return `
        <div class="map_edge" style="width: ${this.length}px;
                                     top: ${y}px;
                                     left: ${x}px;
                                     rotate: ${this.rotation}rad;">
        </div>
        `;
    }

    /**
     * The length of this edge in world units.
     */
    public get worldLength(): number
    {
        return this.length * this._worldLengthMultiplier;
    }

    /**
     * Set the world length multiplier for this edge. Not all edges need to have
     * the same multiplier between their length in pixels and the actual length
     * they denote on the map.
     */
    public set worldLengthMultiplier(value: number)
    {
        this._worldLengthMultiplier = value;
    }
}
