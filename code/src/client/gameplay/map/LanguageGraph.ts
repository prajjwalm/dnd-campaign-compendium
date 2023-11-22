import {Graph}          from "./Graph";
import {LanguageEdge}   from "./LanguageEdge";
import {LanguageVertex} from "./LanguageVertex";


export class LanguageGraph
    extends Graph<LanguageVertex, LanguageEdge>
{
    public constructor(id: string)
    {
        super(id);
    }

    protected get StyleSubclass(): string
    {
        return "language";
    }

    protected get xPadding(): number
    {
        return 80;
    }

    protected get yPadding(): number
    {
        return 80;
    }
}


export function setupLanguageGraph($element: JQuery, graph: LanguageGraph)
{
    if ($element.length == 0) {
        return;
    }
    $element.append(graph.generateDOMString());
}
