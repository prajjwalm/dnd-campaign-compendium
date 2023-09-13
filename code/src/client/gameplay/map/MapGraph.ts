import {generateBaseDOM} from "../simulation/base/Base";
import {Graph}           from "./Graph";
import {MapEdge}         from "./MapEdge";
import {MapVertex}       from "./MapVertex";
import {SidePanel}       from "./SidePanel";


export class MapGraph
    extends Graph<MapVertex, MapEdge>
{
    public worldDistancePerPixel: number;

    public constructor(id: string)
    {
        super(id);
        this.worldDistancePerPixel = 0;
    }

    protected get StyleSubclass(): string
    {
        return "map";
    }

    /**
     * @returns The areal distance between two vertices of this graph.
     */
    public getSpacialDistance(v1: MapVertex, v2: MapVertex)
    {
        if (v1.graph != this || v2.graph != this) {
            throw new Error();
        }
        return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) +
                         (v1.y - v2.y) * (v1.y - v2.y) +
                         (v1.z - v2.z) * (v1.z - v2.z));
    }

    /**
     * @returns The edge distance between two neighbouring vertices of this
     *     graph.
     */
    public getEdgeDistance(v1: MapVertex, v2: MapVertex)
    {
        if (v1.graph != this || v2.graph != this) {
            throw new Error();
        }
        const lesserIdx = Math.min(v1.numId, v2.numId);
        const higherIdx = Math.max(v1.numId, v2.numId);

        if (!this.edges.has(lesserIdx) ||
            !this.edges.get(lesserIdx).has(higherIdx))
        {
            throw new Error();
        }

        const edge = this.edges.get(lesserIdx).get(higherIdx);
        return edge.worldLength;
    }
}

function setupMapGraphLogic($area: JQuery, graph: MapGraph)
{
    const $sideBanner = $("#side_banner");
    const $mapGraph = $(".graph--map");
    const sidePanel = new SidePanel($sideBanner);
    let activeVertex: MapVertex = null;

    function resetGraphState()
    {
        $mapGraph.find(".map_vertex").addClass("inactive");

        // Side banner handling.
        sidePanel.reset();

        // Distances Handling.
        $mapGraph.find(".map_vertex .overhead_text").text("");

        activeVertex = null;
    }

    $mapGraph.on("click", ".map_vertex", function (e)
    {
        if (!$(this).hasClass("inactive")) {
            return;
        }

        $mapGraph.find(".map_vertex").addClass("inactive");
        $(this).removeClass("inactive");

        const selectedVertexElement: HTMLElement = $(this)[0];
        const domRect: DOMRect = selectedVertexElement.getBoundingClientRect();

        const vid = $(this).attr("id");
        const vertex = graph.lookupVertexById(vid);

        // Distances handling.
        $mapGraph.find(".map_vertex").each(function () {
            const v2id = $(this).attr("id");
            const vertex2 = graph.lookupVertexById(v2id);

            const distance = graph.getSpacialDistance(vertex, vertex2) *
                             graph.worldDistancePerPixel;

            const distanceText =
                `~${(Math.round(distance / 100) * 100).toLocaleString()} km`;

            let edgeDistanceText: string;
            if (graph.areNeighbours(vertex, vertex2)) {
                const edgeDistance = graph.getEdgeDistance(vertex, vertex2);

                edgeDistanceText = ` / ~${(Math.round(edgeDistance)).toLocaleString()} km`;
            }
            else {
                edgeDistanceText = "";
            }

            $(this).find(".overhead_text").text(distanceText + edgeDistanceText);
        });

        // Side banner handling.
        sidePanel.swapContentAndReshow(
            domRect.x + domRect.width / 2 > window.innerWidth / 2,
            vertex.generateSiteDOMString()
        );

        activeVertex = vertex;
        e.stopPropagation();
    });

    $sideBanner.on("click", ".inspect_base", function () {
        if ($(this).hasClass("disabled")) {
            return;
        }
        sidePanel.toggleFullSpan(generateBaseDOM());
    });

    $sideBanner.on("click", ".hide_base", function () {
        sidePanel.toggleFullSpan(activeVertex.generateSiteDOMString());
    });

    $area.on("click", resetGraphState);
}


export function setupMapGraph($element: JQuery, graph: MapGraph)
{
    if ($element.length == 0) {
        return;
    }
    $element.append(graph.generateDOMString());
    // Todo: super broken stuff, will fall apart the minute we have two graphs.
    setupMapGraphLogic($element, graph);
}

