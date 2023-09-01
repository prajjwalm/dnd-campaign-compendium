import {MapGraph}                                     from "./MapGraph";
import {MapTransportation, TransportationToDOMString} from "./MapTransportation";
import {MapVertexStatus, MapVertexStatusDescriptions} from "./MapVertexStatus";
import {MapVertexType, MapVertexTypeDescriptions}     from "./MapVertexType";
import {Vertex}                                       from "./Vertex";


/**
 * A {@link Vertex} which belongs to a graph denoting a map of an location.
 */
export class MapVertex
    extends Vertex
{
    /**
     * The name of this vertex.
     */
    public name: string;

    /**
     * Optional override to the textual description of the status.
     */
    public statusDescOverride: string;

    /**
     * Optional override to the textual description of the type.
     */
    public typeDescOverride: string;

    /**
     * A 'z-coordinate' of this vertex, used to affect world distance.
     */
    public z: number;

    /**
     * The known intel of this site of interest. Should be within 100 words.
     */
    public intel: string;

    /**
     * The various sites of interest at this spot.
     */
    private readonly _sitesOfInterest: string[];

    /**
     * The paths of the images of the tokens of the various characters present
     * here. The logic of mapping a {@link Character} to its location doesn't
     * come under the scope of this class.
     */
    private readonly _characterPaths: string[];

    /**
     * CTOR.
     */
    public constructor(private readonly status: MapVertexStatus,
                       private readonly type: MapVertexType,
                       public readonly graph: MapGraph)
    {
        super(graph.id, graph.vertexCount);

        this.name = "???";
        this.statusDescOverride = null;
        this.typeDescOverride = null;
        this.z = 0;
        this.intel = "<div>No intel available.</div>";
        this._sitesOfInterest = [];
        this._characterPaths = [];

        this.graph.addVertex(this);
    }

    /**
     * @inheritDoc
     */
    public generateDOMString(): string
    {
        const lowerCaseTypeName = MapVertexStatus[this.status].toLowerCase();
        const statusDesc = this.statusDescOverride == null
                           ? MapVertexStatusDescriptions.get(this.status)
                           : this.statusDescOverride;
        const typeDesc = this.typeDescOverride == null
                         ? MapVertexTypeDescriptions.get(this.type)
                         : this.typeDescOverride;

        const [x, y]: [number, number] =
            this.graph.mapLocalCoordinatesToScreenPosition([this.x, this.y]);

        // noinspection CssInvalidPropertyValue
        return `
        <div class="map_vertex map_vertex--${lowerCaseTypeName} inactive"
             id="${this.id}"
             style="left: ${x}px; top: ${y}px;">
            <img src="assets/images/gui/${lowerCaseTypeName}/RadioBg.png" 
                 alt=""
                 class="map_vertex__background"/>
            <img src="assets/images/gui/${lowerCaseTypeName}/Radio.png" 
                 alt=""
                 class="map_vertex__foreground"/>   
            <div class="map_vertex__info">
                <div class="overhead_text"></div>
                <div class="grunge_label">
                    <div class="grunge_label__title">
                        <div class="grunge_label__title__left">${statusDesc}</div>
                        <div class="grunge_label__title__right">${typeDesc}</div>
                    </div>
                    <div class="grunge_label__desc"><span class="vertex_id">(${this.id})</span>${this.name}</div>                
                </div>
            </div>  
        </div>
        `;
    }

    /**
     * Add a site of interest to this spot.
     */
    public addSiteOfInterest(name: string,
                             type: string,
                             info: [string, string][],
                             connections: Map<MapTransportation, [number, number]>)
        : void
    {
        const tableEntries = [];
        for (const [key, value] of info) {
            tableEntries.push(`
                <div class="theme_map__row">
                    <span class="theme_map__row__key site_of_interest__details__key">${key}</span>
                    <span class="theme_map__row__value site_of_interest__details__value">${value}</span>
                </div>
            `);
        }

        const navigationEntries = [];
        for (const [transportation, [nDays, safety]] of connections.entries()) {
            navigationEntries.push(`
                <div class="navigation__type">
                    <div class="navigation__type__means">${TransportationToDOMString.get(transportation)}</div>
                    <div class="navigation__type__time">${nDays} days</div>
                    <div class="navigation__type__safety">${safety}%</div>
                </div>
            `);
        }

        this._sitesOfInterest.push(`
            <div class="theme_box site_of_interest">
                <div class="site_of_interest__header">
                    <div class="site_of_interest__category">${type}</div>
                    <div class="site_of_interest__name">${name}</div>
                </div>
                <div class="site_of_interest__details theme_map">
                    ${tableEntries.join("")}
                </div>
                <div class="site_of_interest__navigation navigation">
                    ${navigationEntries.join("")}
                </div>
            </div>
        `);
    }

    /**
     * Add a token image to be displayed as a character token. It needn't
     * specifically belong to a character.
     */
    public addCharacterToken(path: string)
    {
        this._characterPaths.push(path);
    }

    /**
     * Generate a DOM String corresponding to the description of this vertex.
     */
    public generateSiteDOMString()
    {
        const lowerCaseTypeName = MapVertexStatus[this.status].toLowerCase();
        const statusDesc = this.statusDescOverride == null
                           ? MapVertexStatusDescriptions.get(this.status)
                           : this.statusDescOverride;

        const tokenDOMs = [];
        for (const path of this._characterPaths) {
            tokenDOMs.push(`<img class="token_s" src="${path}" alt="">`);
        }

        return `
        <div class="map_vertex_details theme--${lowerCaseTypeName}">
            <div class="map_vertex_details__header grunge_panel">
                <div class="grunge_panel__icon"></div>
                <div class="grunge_panel__subtitle">${statusDesc}</div>
                <div class="grunge_panel__title">${this.name}</div>
            </div>
            <div class="map_vertex_details__desc">
                <div class="theme_label">INTEL</div>
                ${this.intel}
            </div>
            <div class="map_vertex_details__subheader theme_subheader">
                Sites of interest
            </div>
            <div>
                ${this._sitesOfInterest.join("")}
            </div>
            <div class="map_vertex_details__subheader theme_subheader">
                Characters here
            </div>
            <div class="map_vertex_details__characters">
                ${tokenDOMs.join("")}
            </div>
        </div>
        `;
    }
}
