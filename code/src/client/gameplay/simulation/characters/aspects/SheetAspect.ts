import {Activation, Condition, CreatureSize, DStat, pbMod, statMod}                                   from "../../../data/constants";
import {setupStatSheet}                                                                               from "../../../monsters/instances";
import {wrapActivation, wrapCreatureSize, wrapDamageType, wrapDSkill, wrapRoll, wrapSense, wrapSpeed} from "../../action/Wrap";
import {Character}                                                                                    from "../Character";
import {BaseAspect}                                                                                   from "./BaseAspect";
import {ISheet}                                                                                       from "./ISheet";
import {ISheetFactory}                                                                                from "./ISheetFactory";


/**
 * An aspect that supports the creation and rendering of a (D&D5e combat) stat
 * sheet for an NPC.
 */
export class SheetAspect
    extends BaseAspect
    implements ISheet,
               ISheetFactory
{
    /**
     * Backing field under {@link subtitle}.
     */
    private _subtitle: string;

    /**
     * Backing field under {@link acDesc}.
     */
    private _acDesc: string;

    /**
     * Backing field under {@link size}.
     */
    private _size: CreatureSize;

    public category: string;

    public altName: string;

    public theme: string;

    /**
     * CTOR.
     */
    public constructor(c: Character)
    {
        super(c);
        this._subtitle = "";
        this.altName = null;
        this._acDesc = "";
        this.theme = "";
    }

    public duplicate(other: Character): this
    {
        const aspect = new SheetAspect(other);
        aspect._subtitle = this._subtitle;
        aspect._acDesc   = this._acDesc;
        aspect._size     = this._size;
        aspect.category  = this.category;
        aspect.altName   = this.altName;
        return aspect as this;
    }

    /**
     * @inheritDoc
     */
    public render(): string
    {
        const speedList = [];
        for (const [speed, value] of this.c.speeds.entries()) {
            speedList.push(`${wrapSpeed(speed)} ${value} ft.`);
        }

        const senseList = [];
        for (const [sense, value] of this.c.senses.entries()) {
            senseList.push(`${wrapSense(sense)} ${value} ft.`);
        }

        const statList = [];
        for (const stat of [DStat.Str,
                            DStat.Dex,
                            DStat.Con,
                            DStat.Int,
                            DStat.Wis,
                            DStat.Cha])
        {
            const statVal = this.c.stats.get(stat);
            statList.push(`<td>${statVal} ${wrapRoll(statMod(statVal))}</td>`);
        }

        const saveList = [];
        for (const [stat, [prof, mod]] of this.c.saves.entries()) {
            const save = this.c.mod(stat) + pbMod(this.c.pb, prof) + mod;
            saveList.push(`${DStat[stat]} ${wrapRoll(save)}`);
        }

        console.log(`Skills for ${this.c.name}`);
        const skillList = [];
        for (const [skill, [mod, _]] of this.c.upgradedSkills.entries()) {
            skillList.push(`<span style="display: inline-block;">${wrapDSkill(skill)} ${wrapRoll(mod)}</span>`);
        }

        const vul = [];
        const res = [];
        const imm = [];

        for (const [dt, r] of this.c.damageRes.entries()) {
            if (r < 0) {
                const details = r == -100 ? "" : `(${100 - r}% damage)`;
                vul.push(`${wrapDamageType(dt)} ${details}`);
            }
            else if (r == 0) {
            }
            else if (r < 100) {
                const details = r == 50 ? "" : `(${100 - r}% damage)`;
                res.push(`${wrapDamageType(dt)} ${details}`);
            }
            else {
                const details = r == 100 ? "" : `(Heals for ${r - 100}% damage)`;
                imm.push(`${wrapDamageType(dt)} ${details}`);
            }
        }

        const vulStr = vul.length == 0 ?
                       "" :
                       `<tr><td>Damage Vulnerabilities</td><td>${vul.join(", ")}</td></tr>`;
        const resStr = res.length == 0 ?
                       "" :
                       `<tr><td>Damage Resistances</td><td>${res.join(", ")}</td></tr>`;
        const immStr = imm.length == 0 ?
                       "" :
                       `<tr><td>Damage Immunities</td><td>${imm.join(", ")}</td></tr>`;

        const ci = [];
        for (const v of this.c.conditionImmunities.values()) {
            ci.push(Condition[v]);
        }
        const ciStr = ci.length == 0 ?
                      "" :
                      `<tr><td>Condition Immunities</td><td>${ci.join(", ")}</td></tr>`;


        const contentList: Map<Activation, string[]> = new Map();

        for (const action of this.c.actions.values()) {
            action.c = this.c;
            const activation = action.activation;
            if (!contentList.has(activation)) {
                contentList.set(activation, []);
            }
            contentList.get(activation).push(action.createContent());
        }

        const contents = []
        for (const [activation, actionStrings] of contentList.entries() )
        {
            if (activation != Activation.Special) {
                contents.push(`<h4 class="sheet_section_header">${wrapActivation(activation, true)}</h4>`);
            }
            for (const actionStr of actionStrings) {
                contents.push(`<div class="sheet_content">${actionStr}</div>`);
            }
        }

        const imbalanceValues = this.c.imbalance;
        let imbalanceStr;
        if (imbalanceValues == null) {
            imbalanceStr = "";
        }
        else {
            const imPercents = imbalanceValues.map(x => `${Math.round((x - 1) * 100)}%`).join(", ");
            imbalanceStr = `(<i class="fa-solid fa-scale-unbalanced" style="padding-right: 8px;"></i>  ${imPercents})`;
        }

        return `
        <div class="stat_sheet" id="stat_sheet_${this.category}_${this.c.id}">
            <div class="sheet_header">
                <div class="header_zone">
                <h3 class="sheet_title">${this.altName == null ? this.c.name : this.altName}</h3>
                <div class="sheet_subtitle"><em>${wrapCreatureSize(this._size)} ${this._subtitle}</em> <span>${imbalanceStr}</span></div>
                </div>
                <div class="header_zone">
                    <table>
                        <tr><td>Armor Class</td><td>${this.c.ac} ${this._acDesc}</td></tr>
                        <tr><td>Hit Points</td><td>${this.c.hp } ${wrapRoll(this.c.hpDice)}</td></tr>
                        <tr><td>Speed</td><td>${speedList.length == 0 ? "None" : speedList.join(", ")}</td></tr>
                    </table>
                </div>
                <div class="header_zone">
                    <table class="stats_table">
                        <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
                        <tr>${statList.join("")}</tr>
                    </table>
                </div>
                <div class="header_zone">
                    <table>
                        ${senseList.length > 0 ? `<tr><td>Senses</td><td>${senseList.join(" ")}</td></tr>` : ""} 
                        ${saveList .length > 0 ? `<tr><td>Saving Throws</td><td>${saveList.join(" ")}</td></tr>` : ""} 
                        ${skillList.length > 0 ? `<tr><td>Skills</td><td>${skillList.join(" ")}</td></tr>` : ""}
                        <tr><td>Challenge Rating</td><td>${this.c.cr}</td></tr>
                        <tr><td>Proficiency Bonus</td><td>${this.c.pb}</td></tr>
                        ${vulStr}${resStr}${immStr}${ciStr}
                    </table>
                </div>
            </div>
            ${contents.join("")}
        </div>`;
    }

    /**
     * @inheritDoc
     */
    public set subtitle(s: string)
    {
        this._subtitle = s;
    }

    /**
     * @inheritDoc
     */
    public set acDesc(s: string)
    {
        this._acDesc = s;
    }

    /**
     * @inheritDoc
     */
    public set size(s: CreatureSize)
    {
        this._size = s;
    }

    /**
     * @inheritDoc
     */
    public finalize(): void
    {
        super.finalize();
        setupStatSheet(this.category,
                       `${this.category}_${this.c.id}`,
                       this.c.name,
                       this.c.imgPath,
                       () => this,
                       true,
                       this.theme);
    }
}
