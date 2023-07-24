import {
    Activation,
    Condition,
    CreatureSize,
    CRValue, DamageType,
    DStat, E, Sense, Skill, Speed
}                       from "../../../../homebrew/definitions/constants";
import {setupStatSheet} from "../../../../homebrew/monsters/instances";
import {
    wrapActivation,
    wrapCreatureSize, wrapDamageType, wrapRoll, wrapSkill
}                       from "../../action/Wrap";
import {Character}      from "../Character";
import {BaseAspect}     from "./BaseAspect";
import {ICombat}        from "./ICombat";
import {ICore}          from "./ICore";
import {IDSkills}       from "./IDSkills";
import {IDStats}        from "./IDStats";
import {ISheet}        from "./ISheet";
import {ISheetFactory} from "./ISheetFactory";


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
     * A reference to the {@link ICombat} aspect of this character, we will need
     * this to build the sheet.
     */
    private readonly combatAspect: ICombat;

    /**
     * A reference to the {@link ICore} aspect of this character, we will need
     * this to build the sheet.
     */
    private readonly coreAspect: ICore;

    /**
     * A reference to the {@link IDStats} aspect of this character, we will need
     * this to build the sheet.
     */
    private readonly statsAspect: IDStats;

    /**
     * A reference to the {@link IDSkills} aspect of this character, we will need
     * this to build the sheet.
     */
    private readonly skillAspect: IDSkills;

    /**
     * Backing field under {@link subtitle}.
     */
    private _subtitle: string;

    /**
     * Backing field under {@link acDesc}.
     */
    private _acDesc: string;

    /**
     * Backing field under {@link cr}.
     */
    private _cr: CRValue;

    /**
     * Backing field under {@link size}.
     */
    private _size: CreatureSize;

    /**
     * CTOR.
     */
    public constructor(c: Character)
    {
        super(c);
        this.combatAspect = c;
        this.coreAspect = c;
        this.skillAspect = c;
        this.statsAspect = c;

        this._subtitle = "";
        this._acDesc = "";
        this._cr = null;
    }

    /**
     * @inheritDoc
     */
    public render(): string
    {
        const speedList = [];
        for (const [speed, value] of this.combatAspect.speeds.entries()) {
            speedList.push(`${Speed[speed]} ${value} ft.`);
        }

        const senseList = [];
        for (const [sense, value] of this.combatAspect.senses.entries()) {
            senseList.push(`${Sense[sense]} ${value} ft.`);
        }

        const statList = [];
        for (const stat of [DStat.Str,
                            DStat.Dex,
                            DStat.Con,
                            DStat.Int,
                            DStat.Wis,
                            DStat.Cha])
        {
            const statVal = this.combatAspect.stats.get(stat);
            statList.push(`<td>${statVal.stat} ${wrapRoll(statVal.mod)}</td>`);
        }

        const saveList = [];
        for (const [stat, [prof, mod]] of this.combatAspect.saves.entries()) {
            const save = this.statsAspect.mod(stat) + this.combatAspect.pb.mod(prof) + mod;
            saveList.push(`${DStat[stat]} ${wrapRoll(save)}`);
        }

        const skillList = [];
        for (const [skill, mod] of this.skillAspect.upgradedSKills.entries()) {
            skillList.push(`${wrapSkill(skill)} ${wrapRoll(mod)}`);
        }


        const vul = [];
        const res = [];
        const imm = [];

        for (const [dt, r] of this.combatAspect.damageRes.entries()) {
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
                res.push(`${wrapDamageType(dt)} ${details}`);
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
        for (const v of this.combatAspect.conditionImmunities.values()) {
            ci.push(Condition[v]);
        }
        const ciStr = ci.length == 0 ?
                      "" :
                      `<tr><td>Condition Immunities</td><td>${ci.join(", ")}</td></tr>`;


        const contentList: Map<Activation, string[]> = new Map();

        for (const action of this.combatAspect.actions) {
            const activation = action.activation;
            if (!contentList.has(activation)) {
                contentList.set(activation, []);
            }
            action.bindStats(this.statsAspect);
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

        return `
        <div class="stat_sheet">
            <div class="sheet_header">
                <div class="header_zone">
                <h3 class="sheet_title">${this.coreAspect.name}</h3>
                <div class="sheet_subtitle">${wrapCreatureSize(this._size)} ${this._subtitle}</div>
                </div>
                <div class="header_zone">
                    <table class="ignore_common_style">
                        <tr><td>Armor Class</td><td>${this.combatAspect.ac} ${this._acDesc}</td></tr>
                        <tr><td>Hit Points</td><td>${this.combatAspect.hp } ${wrapRoll(this.combatAspect.hpDice)}</td></tr>
                        <tr><td>Speed</td><td>${speedList.join(", ")}</td></tr>
                    </table>
                </div>
                <div class="header_zone">
                    <table class="stats_table ignore_common_style">
                        <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
                        <tr>${statList.join("")}</tr>
                    </table>
                </div>
                <div class="header_zone">
                    <table class="ignore_common_style">
                        <tr><td>Senses</td><td>${senseList.join(" ")}</td></tr>
                        <tr><td>Saving Throws</td><td>${saveList.join(" ")}</td></tr>
                        <tr><td>Skills</td><td>${skillList.join(" ")}</td></tr>
                        <tr><td>Challenge Rating</td><td>${this._cr.cr}</td></tr>
                        <tr><td>Proficiency Bonus</td><td>${this.combatAspect.pb.mod()}</td></tr>
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
    public set cr(v: CRValue)
    {
        this._cr = v;
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
        setupStatSheet("human",
                       "human_" + this.id,
                       this.coreAspect.name,
                       this.coreAspect.imgPath,
                       () => this,
                       true);
    }
}
