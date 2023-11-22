import {Edge}           from "./Edge";
import {LanguageGraph}  from "./LanguageGraph";
import {LanguageVertex} from "./LanguageVertex";


export class LanguageEdge
    extends Edge<LanguageVertex>
{
    constructor(public readonly graph: LanguageGraph,
                start: LanguageVertex,
                end: LanguageVertex)
    {
        super(start, end);
        this.graph.addEdge(this);
    }

    public generateDOMString(): string
    {
        const [x, y]: [number, number] =
            this.graph.mapLocalCoordinatesToScreenPosition(this.center);

        return `
        <div class="language_edge" style="width: ${this.length}px;
                                     top: ${y}px;
                                     left: ${x}px;
                                     rotate: ${this.rotation}rad;">
        </div>
        `;
    }
}
