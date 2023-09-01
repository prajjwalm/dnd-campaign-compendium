import {Rarity}            from "../../homebrew/definitions/Rarity";
import {UpgradeEdge}       from "./UpgradeEdge";
import {UpgradeGraph}      from "./UpgradeGraph";
import {UpgradeDescGenerators,
        UpgradeIcons,
        UpgradeNames,
        UpgradeRarityLevels,
        UpgradeVertexType} from "./UpgradeVertexConfig";
import {Vertex}            from "./Vertex";


export class UpgradeVertex
    extends Vertex
{
    private static readonly RarityToMaxActMap: Map<Rarity, number> = new Map([
        [Rarity.Black,     1],
        [Rarity.Common,    1],
        [Rarity.Uncommon,  2],
        [Rarity.Rare,      3],
        [Rarity.Epic,      5],
        [Rarity.Legendary, 7],
        [Rarity.Artefact,  7],
    ]);
    private static readonly RarityToColorMap: Map<Rarity, string> = new Map([
        [Rarity.Black,     "#FFE"],
        [Rarity.Common,    "#242528"],
        [Rarity.Uncommon,  "#1FC219"],
        [Rarity.Rare,      "#4990E2"],
        [Rarity.Epic,      "#9810E0"],
        [Rarity.Legendary, "#FEA227"],
        [Rarity.Artefact,  "#9a5c40"],
    ])

    public readonly maxActivation: number;

    private _activation: number;

    /**
     * CTOR.
     */
    constructor(public readonly graph: UpgradeGraph,
                public readonly renderable: boolean = true,
                public readonly type: UpgradeVertexType = null,
                public readonly rarity: Rarity = null,
                public readonly startActivation: number = 0)
    {
        super(graph.id, graph.vertexCount);
        graph.addVertex(this);

        this.maxActivation = UpgradeVertex.RarityToMaxActMap.get(this.rarity);

        if (this.startActivation > this.maxActivation || this.startActivation < 0) {
            throw new Error("Bad argument: start activation");
        }
        this._activation = this.startActivation;
    }

    /**
     * @inheritDoc
     */
    protected doRefreshRenderedElement($element: JQuery): void
    {
        $element.removeClass("connected touched active outer");
        if (this.isActive) {
            $element.addClass("active");
        }
        if (this.isTouched) {
            $element.addClass("touched");
        }
        if (this.isConnected) {
            $element.addClass("connected");
        }

        const coveredAngle = this._activation / this.maxActivation * 360;
        $element.find(".skill_vertex__backdrop").css(
            "background",
            `conic-gradient(${UpgradeVertex.RarityToColorMap.get(this.rarity)} 0deg, 
                            ${UpgradeVertex.RarityToColorMap.get(this.rarity)} ${coveredAngle}deg, 
                            #777                                               ${coveredAngle}deg,
                            #777                                               360deg)`
        );
    }

    /**
     * @inheritDoc
     */
    public generateDOMString(): string
    {
        const [x, y]: [number, number] =
            this.graph.mapLocalCoordinatesToScreenPosition([this.x, this.y]);

        if (!this.renderable) {
            // noinspection CssInvalidPropertyValue
            return `
                <div class="null_vertex"
                     id="${this.id}"
                     style="left: ${x}px; top: ${y}px;">
                </div>
            `;
        }

        const icon = this.type == null ? "" : UpgradeIcons.get(this.type);

        const extraClasses = [];
        if (this.rarity != null) {
            extraClasses.push(`rarity--${Rarity[this.rarity].toLowerCase()}`);
        }

        if (this.isActive) {
            extraClasses.push("active");
        }
        if (this.isTouched) {
            extraClasses.push("touched");
        }
        if (this.isConnected) {
            extraClasses.push("connected")
        }

        const spokes = [];
        if (this.maxActivation > 1) {
            for (let i = 0; i < this.maxActivation; i++) {
                const angle = 360 / this.maxActivation * i;
                spokes.push(`<div class="progress_circle__spoke" style="rotate: ${angle}deg;"></div>`);
            }
        }

        const coveredAngle = this._activation / this.maxActivation * 360;

        // noinspection CssInvalidPropertyValue
        return `
            <div class="skill_vertex ${extraClasses.join(" ")}"
                 id="${this.id}"
                 style="left: ${x}px; top: ${y}px;">
                <div class="skill_vertex__backdrop"
                     style="background: conic-gradient(${UpgradeVertex.RarityToColorMap.get(this.rarity)} 0deg, 
                                                       ${UpgradeVertex.RarityToColorMap.get(this.rarity)} ${coveredAngle}deg, 
                                                       #777                                               ${coveredAngle}deg,
                                                       #777                                               360deg);"></div>
                <div class="progress_circle">
                    ${spokes.join("")}                    
                </div>
                <div class="skill_vertex__cover" ></div>
                <div class="skill_vertex__core">
                    ${icon}
                </div>
                <div class="skill_vertex__info">
                    <div class="overhead_text"></div>
                    <div class="grunge_label">
                        <div class="grunge_label__title">
                            <div class="grunge_label__title__left">${Rarity[this.rarity]}</div>
                            <div class="grunge_label__title__right">${UpgradeNames.get(this.type)}</div>
                        </div>
                        <div class="grunge_label__desc">
                            ${UpgradeDescGenerators.get(this.type)(UpgradeRarityLevels.get(this.type).get(this.rarity))}
                        </div>                
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Activate this vertex by one degree.
     */
    public increaseActivation(): void
    {
        if (this._activation >= this.maxActivation) {
            return;
        }
        if (!this.isConnected) {
            throw new Error("Cannot activate unconnected vertex");
        }
        this._activation++;
        if (this._activation == 1) {
            // A new vertex was activated. Refresh the graph.
            this.graph.refreshRenderedElement();
        } else {
            // Only this vertex would've changed.
            this.refreshRenderedElement();
        }
    }

    /**
     * Reset this vertex to its original activation.
     */
    public resetActivation(): void
    {
        if (this._activation == this.startActivation) {
            return;
        }
        this._activation = this.startActivation;
    }

    /**
     * Whether is, or one of its neighbours is touched. A connected vertex can
     * be touched, if it isn't already active ofc.
     */
    public get isConnected(): boolean
    {
        if (this.isTouched) {
            return true;
        }
        for (const v of this.neighbours.values()) {
            if ((v.renderable && v.isTouched) || (!v.renderable && v.isConnected)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Whether the vertex has even slightly been activated.
     */
    public get isTouched(): boolean
    {
        if (!this.renderable) {
            return false;
        }
        return this._activation > 0;
    }

    /**
     * Whether the vertex is active.
     */
    public get isActive(): boolean
    {
        if (!this.renderable) {
            return false;
        }
        return this._activation == this.maxActivation;
    }

    /**
     * Returns the number of activations this vertex holds.
     */
    public get activation(): number
    {
        return this._activation;
    }
}
