import {Rarity}        from "../data/Rarity";
import {Language}      from "../languages/Language";
import {LanguageGraph} from "./LanguageGraph";
import {Vertex}        from "./Vertex";


export class LanguageVertex
    extends Vertex
{
    public constructor(public readonly graph: LanguageGraph,
                       public readonly language: Language | null,
                       private readonly weak: boolean)
    {
        super(graph.id, graph.vertexCount);
        graph.addVertex(this);
    }

    public generateDOMString(): string
    {
        const [x, y]: [number, number] =
            this.graph.mapLocalCoordinatesToScreenPosition([this.x, this.y]);

        const locationCSS = `left: ${x}px; top: ${y}px;`;

        if (this.language == null) {
            const isWeakStr = this.weak ? " language_vertex--weak" : "";
            return `<div class="language_vertex language_vertex--null${isWeakStr}"
                         id="${this.id}"
                         style="${locationCSS}"></div>
            `;
        }

        return `<div class="language_vertex language_vertex--${Rarity[this.rarity].toLowerCase()}"
                     id="${this.id}"
                     style="${locationCSS}">
                    <div class="language_vertex__difficulty">${this.language.difficulty}</div>
                    <div class="language_vertex__name grunge_label__title">
                        <div class="anti_skew">${this.language.name}</div>
                    </div>
<!--                    <div class="language_vertex__subtitle grunge_label__desc">Yet another boring language...</div>-->
                    <div class="language_vertex__icons"></div>
                </div>`;
    }

    public get rarity(): Rarity
    {
        if (this.language == null) {
            return null;
        }
        const difficulty = this.language.difficulty;

        if (difficulty <= 1) {
            return Rarity.Common;
        }
        else if (difficulty <= 2) {
            return Rarity.Uncommon;
        }
        else if (difficulty <= 3) {
            return Rarity.Rare;
        }
        else if (difficulty <= 5) {
            return Rarity.Epic;
        }
        else if (difficulty <= 8) {
            return Rarity.Legendary;
        }
        else if (difficulty <= 16) {
            return Rarity.Artefact;
        }
        else {
            return Rarity.Black;
        }
    }
}
