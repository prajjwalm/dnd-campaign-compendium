import {BaseDOMGenerator} from "./BaseDOMGenerator";
import {Edge}             from "./Edge";
import {IDOMGenerator}    from "./IDOMGenerator";
import {Vertex}           from "./Vertex";


/**
 * A graph that can be rendered as an element.
 */
export abstract class Graph<V extends Vertex, E extends Edge<V>>
    extends BaseDOMGenerator
    implements IDOMGenerator
{
    private static readonly PADDING = [50, 50];

    protected readonly vertices: Map<string, V>;

    protected readonly edges: Map<number, Map<number, E>>;

    protected readonly neighbours: Map<V, Set<V>>;

    private xMin: number;

    private yMin: number;

    private xMax: number;

    private yMax: number;

    /**
     * CTOR.
     */
    protected constructor(public readonly id: string)
    {
        super();
        this.vertices = new Map();
        this.edges = new Map();
        this.neighbours = new Map();

        this.xMin = Number.POSITIVE_INFINITY;
        this.yMin = Number.POSITIVE_INFINITY;
        this.xMax = Number.NEGATIVE_INFINITY;
        this.yMax = Number.NEGATIVE_INFINITY;
    }

    /**
     * Any additional style classes (space separated) to add to the graph while
     * generating its DOM.
     */
    protected get AdditionalElementClasses()
    {
        return "";
    }

    /**
     * The subclass which should be appended to graph-- for style handling.
     */
    protected abstract get StyleSubclass(): string;

    /**
     * @inheritDoc
     */
    public generateDOMString()
    {
        const sortedVertices: V[] = [];
        for (const vertex of this.vertices.values()) {
            sortedVertices.push(vertex);
        }
        sortedVertices.sort((a, b) => b.x - a.x);

        const vertexStrings = [];
        for (const vertex of sortedVertices) {
            vertexStrings.push(vertex.generateDOMString());
        }
        const edgeStrings = [];
        for (const edgesPerLesserVertex of this.edges.values()) {
            for (const edge of edgesPerLesserVertex.values()) {
                edgeStrings.push(edge.generateDOMString());
            }
        }
        // noinspection CssInvalidPropertyValue
        return `
        <div class="graph--${this.StyleSubclass} ${this.AdditionalElementClasses}" 
             style="width: ${this.xSpan}px; 
                    height: ${this.ySpan}px;"
             id="${this.id}">
            <div class="graph__edges">
                ${edgeStrings.join("")}                
            </div>
            <div class="graph__vertices">
                ${vertexStrings.join("")}            
            </div>
        </div>
        `;
    }

    /**
     * Add the given vertex to the graph.
     */
    public addVertex(v: V)
    {
        if (v.graphID != this.id) {
            throw new Error();
        }

        this.xMin = Number.POSITIVE_INFINITY;
        this.yMin = Number.POSITIVE_INFINITY;
        this.xMax = Number.NEGATIVE_INFINITY;
        this.yMax = Number.NEGATIVE_INFINITY;

        this.vertices.set(v.id, v);
    }

    /**
     * Remove the given vertex from the graph.
     */
    public removeVertex(v: V)
    {
        this.xMin = Number.POSITIVE_INFINITY;
        this.yMin = Number.POSITIVE_INFINITY;
        this.xMax = Number.NEGATIVE_INFINITY;
        this.yMax = Number.NEGATIVE_INFINITY

        this.vertices.delete(v.id);
    }

    /**
     * Add the given edge to the graph.
     */
    public addEdge(e: E)
    {
        const v1 = e.v1 as V;
        const v2 = e.v2 as V;

        if (v1 == v2) {
            return null;
        }
        const lesserNumId = Math.min(v1.numId, v2.numId);
        const higherNumId = Math.max(v1.numId, v2.numId);
        if (!this.edges.has(lesserNumId)) {
            this.edges.set(lesserNumId, new Map());
        }
        if (this.edges.get(lesserNumId).has(higherNumId)) {
            console.log(lesserNumId, higherNumId);
            throw new Error();
        }
        this.edges.get(lesserNumId).set(higherNumId, e);

        if (!this.neighbours.has(v1)) {
            this.neighbours.set(v1, new Set());
        }
        this.neighbours.get(v1).add(v2);
        if (!this.neighbours.has(v2)) {
            this.neighbours.set(v2, new Set());
        }
        this.neighbours.get(v2).add(v1);

        return e;
    }

    /**
     * Remove the given edge from the graph.
     */
    public removeEdge(e: E)
    {
        const v1 = e.v1 as V;
        const v2 = e.v2 as V;

        const lesserVId = Math.min(v1.numId, v2.numId);
        const higherVId = Math.max(v1.numId, v2.numId);

        console.assert(this.edges.get(lesserVId).get(higherVId) == e);
        this.edges.get(lesserVId).delete(higherVId);

        this.neighbours.get(v1).delete(v2);
        this.neighbours.get(v2).delete(v1);
    }

    /**
     * @returns If the two vertices are neighbours.
     */
    public areNeighbours(v1: V, v2: V)
    {
        return this.neighbours.has(v1) &&
               this.neighbours.get(v1).has(v2);
    }

    /**
     * Maps(x, y) in cartesian pixels to (left, top) positions in pixels.
     */
    public mapLocalCoordinatesToScreenPosition([x, y]): [number, number]
    {
        if (this.xMax < this.xMin) {
            for (const vertex of this.vertices.values()) {
                if (this.xMin > vertex.x) {
                    this.xMin = vertex.x;
                }
                if (this.xMax < vertex.x) {
                    this.xMax = vertex.x;
                }
                if (this.yMin > vertex.y) {
                    this.yMin = vertex.y;
                }
                if (this.yMax < vertex.y) {
                    this.yMax = vertex.y;
                }
            }
        }
        if (this.xMax < this.xMin) {
            throw new Error(`Coordinate system undefined. (${this.xMax}, ${this.xMin})`);
        }

        return [this.origin[0] + x, this.origin[1] - y];
    }

    /**
     * @returns The vertex with the given id.
     */
    public lookupVertexById(id: string): V
    {
        return this.vertices.get(id);
    }

    /**
     * @returns The number of vertices in the graph.
     */
    public get vertexCount(): number
    {
        return this.vertices.size;
    }

    /**
     * The minimum number of horizontal pixels this map would consume.
     */
    protected get xSpan(): number
    {
        // This relies on the 1:1 ratio.
        // See docstring on mapLocalCoordinatesToScreenPosition.
        return Math.max(0, this.xMax - this.xMin) + 2 * Graph.PADDING[0];
    }

    /**
     * The minimum number of vertical pixels this map would consume.
     */
    protected get ySpan(): number
    {
        return Math.max(0, this.yMax - this.yMin) + 2 * Graph.PADDING[1];
    }

    /**
     * The absolute position of (0, 0).
     */
    private get origin(): [number, number]
    {
        // Since middle point of world space would go to middle point of pixel
        // space.
        return [
            this.xSpan / 2 - (this.xMax + this.xMin) / 2,
            this.ySpan / 2 + (this.yMax + this.yMin) / 2
        ];
    }
}