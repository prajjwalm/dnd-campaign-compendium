import {NpcId}     from "../data/npcIndex";
import {Character} from "../simulation/characters/Character";
import {MapGraph}                                                           from "./MapGraph";
import {MapTransportation, TransportationToDOMString}                       from "./MapTransportation";
import {MapVertexStatus, MapVertexStatusDescriptions, MapVertexStatusIcons} from "./MapVertexStatus";
import {Vertex}                                                             from "./Vertex";


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
    private readonly _characterPaths: NpcId[];

    /**
     * If this vertex is the home base.
     */
    private isBase: boolean;

    /**
     * CTOR.
     */
    public constructor(private readonly status: MapVertexStatus,
                       private readonly interest: string,
                       public readonly graph: MapGraph)
    {
        super(graph.id, graph.vertexCount);

        this.name = "???";
        this.statusDescOverride = null;
        this.z = 0;
        this.intel = "<div>No intel available.</div>";
        this._sitesOfInterest = [];
        this._characterPaths = [];
        this.isBase = false;

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
                        <div class="grunge_label__title__right">${this.interest}</div>
                    </div>
                    <div class="grunge_label__desc"><span class="vertex_id">(${this.id})</span>${this.name}</div>                
                </div>
            </div>  
        </div>
        `;
    }


    /**
     * Marks this vertex as the home base.
     */
    public markAsBase(): void
    {
        this.isBase = true;
    }

    /**
     * Add a site of interest to this spot.
     */
    public addSiteOfInterest(name: string,
                             type: string,
                             desc: string,
                             info: [string, string][],
                             distance: number,
                             connections: Map<MapTransportation, string>)
        : void
    {
        const tableEntries = [];
        for (const [key, value] of info) {
            tableEntries.push(`
                <div class="dictionary__row">
                    <span class="dictionary__row__key site_of_interest__details__key">${key}</span>
                    <span class="dictionary__row__value site_of_interest__details__value">${value}</span>
                </div>
            `);
        }

        const navigationEntries = [];
        for (const [transportation, time] of connections.entries()) {
            navigationEntries.push(`
                <div class="navigation__type icon_table__slot">
                    <div class="navigation__type__means icon_table__slot__icon">${TransportationToDOMString.get(transportation)}</div>
                    <div class="icon_table__slot__label">
                        ${time}
                    </div>
                </div>
            `);
        }

        const navSection = navigationEntries.length > 0 ? `
                <span class="site_of_interest__subheader theme_subheader">Connectivity</span>
                <div class="site_of_interest__navigation navigation icon_table">
                    ${navigationEntries.join("")}
                </div>` : "";
        this._sitesOfInterest.push(`
            <div class="theme_box site_of_interest">
                <div class="site_of_interest__header">
                    <div class="site_of_interest__category">${name}</div>
                    <div class="site_of_interest__name">${type}</div>
                </div>
                <div class="site_of_interest__desc">${desc}</div>
                <div class="site_of_interest__details dictionary">
                    ${tableEntries.join("")}
                </div>
                ${navSection}
            </div>
        `);
    }

    /**
     * Add a token image to be displayed as a character token. It needn't
     * specifically belong to a character.
     */
    public addCharacterToken(character: NpcId)
    {
        this._characterPaths.push(character);
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

        let tokenDOM: string;
        if (this.isBase) {
            tokenDOM = "";
        }
        else if (this._characterPaths.length == 0) {
            tokenDOM = `
            <div class="map_vertex_details__subheader theme_subheader">
                NPCs in this area
            </div>
            <div class="map_vertex_details__desc">
                No known NPCs are wandering out here.
            </div>`;
        }
        else {
            const tokenDOMs = [];
            for (const path of this._characterPaths) {
                tokenDOMs.push(`<img class="token_s" src="${Character.get(path).imgPath}" alt="">`);
            }
            tokenDOM = `
            <div class="map_vertex_details__subheader theme_subheader">
                NPCs here
            </div>
            <div class="map_vertex_details__characters">
                ${tokenDOMs.join("")}
            </div>`;
        }

        let soiDOM: string;
        if (this.isBase) {
            soiDOM = "";
        }
        else if (this._sitesOfInterest.length == 0) {
            soiDOM = `
            <div class="map_vertex_details__subheader theme_subheader">
                Sites of interest
            </div>
            <div class="map_vertex_details__desc">
                No sites of interest have been discovered so far.
            </div>`
        }
        else {
            soiDOM = `
            <div class="map_vertex_details__subheader theme_subheader">
                Sites of interest
            </div>
            <div>
                ${this._sitesOfInterest.join("")}
            </div>`;
        }

        const baseDOM = this.isBase ?
                        "<div class='inspect_base grunge_nav_button'>Inspect Base</div>" : "";

        return `
        <div class="map_vertex_details theme--${lowerCaseTypeName}">
            <div class="map_vertex_details__header grunge_panel">
                <div class="grunge_panel__icon">${MapVertexStatusIcons.get(this.status)}</div>
                <div class="grunge_panel__subtitle">${statusDesc}</div>
                <div class="grunge_panel__title">${this.name}</div>
            </div>
            <div class="map_vertex_details__desc">
                <div class="theme_label">INTEL</div>
                ${this.intel}
            </div>
            ${soiDOM}
            ${tokenDOM}
            ${baseDOM}
        </div>
        `;
    }
}
