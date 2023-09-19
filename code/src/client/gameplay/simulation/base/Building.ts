import {getEnumIterator} from "../../../common/common";
import {NpcID}           from "../../data/npcIndex";
import {Rarity}          from "../../data/Rarity";
import {IDOMGenerator}   from "../../IDomGenerator";
import {Character}       from "../characters/Character";


/**
 * Class needed to generate a building card in the base view.
 */
export class Building
    implements IDOMGenerator
{
    private readonly attributes: Map<string, string> = new Map();

    /**
     * CTOR.
     */
    constructor(private readonly name: string,
                private readonly imgPath: string,
                private readonly iconDOM: string,
                private readonly level: Rarity,
                private readonly levelValue: number,
                private readonly employeeValueComputer: (c: NpcID) => number,
                private readonly pros: NpcID[] // todo: this could later become a character aspect.
    )
    {}

    /**
     * @inheritDoc
     */
    public generateDOMString(): string
    {
        const workforce: Map<string, number> = new Map();

        for (const npcID of this.pros) {
            const npc = Character.get(npcID);
            if (npc == null) {
                workforce.set(NpcID[npcID], this.employeeValueComputer(npcID));
                continue;
            }
            workforce.set(npc.name, this.employeeValueComputer(npcID));
        }

        const workforceDOMs: string[] = [];

        for (const [name, rating] of workforce.entries()) {
            workforceDOMs.push(`
                <span class="workforce__item">
                    <span class="workforce__item__name">${name}</span>
                    (<span class="workforce__item__value">${rating}</span>)
                </span>`);
        }

        const dictDOMs: string[] = [];
        for (const [name, value] of this.attributes.entries()) {
            dictDOMs.push(`
            <div class="dictionary__row">
                <div class="dictionary__row__key">${name}</div>
                <div class="dictionary__row__value">${value}</div>
            </div>`);
        }

        return `
            <div class="building">
                <div class="building__art">
                    <img src="assets/images/${this.imgPath}" alt=""/>
                </div>
                <div class="icon_space">
                    <div class="building__icon ${Rarity[this.level].toLowerCase()}">
                        ${this.iconDOM}
                        <div class="icon_bar"></div>
                        <div class="rating">${this.levelValue}</div>
                    </div>
                </div>
                <div class="building__details">
                    <div class="building__title">
                        ${this.name}
                    </div>
                    <div class="workforce">
                        <span class="workforce_label">Operated by</span>
                        ${workforceDOMs.join(", ")}
                    </div>
                    <div class="building__dictionary">
                        ${dictDOMs.join("")}
                    </div>
                </div>
            </div>`;
    }

    /**
     * Add an attribute to be shown in tabular format.
     */
    public addAttribute(name: string, value: string) : this
    {
        this.attributes.set(name, value);
        return this;
    }
}
