import {Edge}          from "./Edge";
import {UpgradeGraph}  from "./UpgradeGraph";
import {UpgradeVertex} from "./UpgradeVertex";


export class UpgradeEdge
    extends Edge<UpgradeVertex>
{
    public zIndex: number;

    constructor(public readonly graph: UpgradeGraph,
                v1: UpgradeVertex,
                v2: UpgradeVertex,
                private readonly vc: UpgradeVertex = null)
    {
        super(v1, v2);

        if (vc != null) {
            if (vc.sqDistanceFrom(v1) - vc.sqDistanceFrom(v2) > 1) {
                throw new Error("Center vertex isn't equidistant to edge " +
                                "vertices.");
            }
        }
        this.zIndex = 0;

        graph.addEdge(this);
    }

    public generateDOMString(): string
    {
        if (this.vc == null) {
            const [x, y]: [number, number] =
                this.graph.mapLocalCoordinatesToScreenPosition(this.center);

            // noinspection CssInvalidPropertyValue
            return `
            <div id="${this.id}"
                 class="upgrade_edge--linear ${this.isActive ? "active" : ""} ${this.isConnected ? "connected" : ""}" 
                 style="width: ${this.length}px;
                        top: ${y}px;
                        left: ${x}px;
                        rotate: ${this.rotation}rad;
                        z-index: ${this.zIndex};">
            </div>`;
        }

        const diameter = Math.sqrt(this.vc.sqDistanceFrom(this.v1)) * 2 + 2;

        const [x, y]: [number, number] =
            this.graph.mapLocalCoordinatesToScreenPosition(this.center);

        const vc1_x = this.vc.displacementAngleWithX(this.v1);
        const vc2_x = this.vc.displacementAngleWithX(this.v2);

        const theta1 = Math.round(((90 - 180 / Math.PI * vc1_x) + 360) % 360);
        const theta2 = Math.round(((90 - 180 / Math.PI * vc2_x) + 360) % 360);

        const gradStops = [];
        if (theta2 > theta1) {
            gradStops.push([`transparent 0deg`,
                            `transparent ${theta1}deg`,
                            `#fff ${theta1}deg`,
                            `#fff ${theta2}deg`,
                            `transparent ${theta2}deg`,
                            `transparent 360deg`,])
        }
        else {
            gradStops.push([`#fff 0deg`,
                            `#fff ${theta2}deg`,
                            `transparent ${theta2}deg`,
                            `transparent ${theta1}deg`,
                            `#fff ${theta1}deg`,
                            `#fff 360deg`,])
        }

        // noinspection CssInvalidPropertyValue
        return `
            <div id="${this.id}"
                 class="upgrade_edge--circular ${this.isActive ? "active" : ""} ${this.isConnected ? "connected" : ""}"
                 style="top: ${y}px;
                        left: ${x}px;
                        width: ${diameter}px;
                        height: ${diameter}px;
                        background: conic-gradient(${gradStops.join(", ")});
                        z-index: ${this.zIndex};">
                <div class="upgrade_edge--circular__inner"></div>            
            </div>
        `;
    }

    /**
     * If this edge is activated. An outer vertex can only have <=1 edge active.
     */
    public get isActive(): boolean
    {
        let v1Touched: boolean = false;
        if (this.v1.renderable) {
            v1Touched = this.v1.isTouched;
        }
        else {
            for (const vertex of this.v1.neighbours.values()) {
                if (vertex != this.v2 && vertex.isTouched) {
                    v1Touched = true;
                    break;
                }
            }
        }
        let v2Touched: boolean = false;
        if (this.v2.renderable) {
            v2Touched = this.v2.isTouched;
        }
        else {
            for (const vertex of this.v2.neighbours.values()) {
                if (vertex != this.v1 && vertex.isTouched) {
                    v2Touched = true;
                    break;
                }
            }
        }
        return v1Touched && v2Touched;
    }

    /**
     * If this edge is touched.
     */
    public get isConnected(): boolean
    {
        return ((this.v1.renderable && this.v1.isTouched ||
                !this.v1.renderable && this.v1.isConnected) ||
                (this.v2.renderable && this.v2.isTouched ||
                !this.v2.renderable && this.v2.isConnected));
    }

    /**
     * @inheritDoc
     */
    protected doRefreshRenderedElement($element: JQuery): void
    {
        $element.removeClass("active connected");
        if (this.isActive) {
            $element.addClass("active");
            return;
        }
        if (this.isConnected) {
            $element.addClass("connected");
        }
    }

    public get center(): [number, number]
    {
        if (this.vc == null) {
            return super.center;
        }
        return [this.vc.x, this.vc.y];
    }
}
