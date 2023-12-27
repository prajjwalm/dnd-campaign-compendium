import {Edge}           from "./Edge";
import {LanguageGraph}  from "./LanguageGraph";
import {LanguageVertex} from "./LanguageVertex";


export class LanguageEdge
    extends Edge<LanguageVertex>
{
    constructor(public readonly graph: LanguageGraph,
                start: LanguageVertex,
                end: LanguageVertex,
                private readonly weak: boolean)
    {
        super(start, end);
        this.graph.addEdge(this);
    }

    public generateDOMString(): string
    {
        const [x, y]: [number, number] =
            this.graph.mapLocalCoordinatesToScreenPosition(this.center);

        const isWeakStr = this.weak ? " language_edge--weak" : "";

        return `
        <div class="language_edge${isWeakStr}" style="width: ${this.length}px;
                                                      top: ${y}px;
                                                      left: ${x}px;
                                                      rotate: ${this.rotation}rad;">
        </div>
        `;
    }
}
