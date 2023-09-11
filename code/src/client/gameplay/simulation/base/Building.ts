import {IDOMGenerator} from "../../IDomGenerator";


export class Building
    implements IDOMGenerator
{
    /**
     * CTOR.
     */
    constructor()
    {

    }

    /**
     * @inheritDoc
     */
    public generateDOMString(): string
    {
        return `<div class="building_info"></div>`;
    }
}