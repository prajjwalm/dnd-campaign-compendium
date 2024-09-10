import {Activation, Condition, CreatureSize, DStat, pbMod, statMod}                                   from "../../../data/constants";
import {NpcId}                                                                                        from "../../../data/npcIndex";
import {AttackAbstraction}                                                                            from "../../action/AttackAbstraction";
import {wrapActivation, wrapCreatureSize, wrapDamageType, wrapDSkill, wrapRoll, wrapSense, wrapSpeed} from "../../action/Wrap";
import {Character, EAspect}                                                                           from "../Character";
import {InklingCreators}                                                                              from "../legacy/inklings";
import {IStatSheet}                                                                                   from "../legacy/sheet";
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
     * A map from category to root to sets of sheets having the same root. Each
     * of those creatures would have a different theme.
     */
    public static CreatureSets: Map<string, Map<NpcId, [number, ISheet[]]>> = new Map([
        // Legacy creatures,
        ["inkling", new Map()],
    ]);

    public static getStatSheet(npcId: NpcId): IStatSheet
    {
        const c = Character.get(npcId);
        console.log(npcId, NpcId[npcId], c);
        if (c.hasAspect(EAspect.Sheet)) {
            return c;
        }

        // The inklings are buffable, so we create a new sheet for them everytime.
        return InklingCreators.get(npcId)();
    }

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

    /**
     * For mobs that are variants of others, this points to the root mob.
     */
    public root: NpcId;

    public altName: string;

    public danger: number;

    /**
     * CTOR.
     */
    public constructor(c: Character)
    {
        super(c);
        this._subtitle = "";
        this.root    = c.id;
        this.altName = null;
        this._acDesc = "";
        this.danger  = 0;
    }

    public duplicate(other: Character): this
    {
        const aspect = new SheetAspect(other);
        aspect._subtitle = this._subtitle;
        aspect._acDesc   = this._acDesc;
        aspect._size     = this._size;
        aspect.category  = this.category;
        aspect.altName   = this.altName;
        aspect.root      = this.root;
        return aspect as this;
    }

    public get id(): NpcId
    {
        return this.c.id;
    }

    /**
     * The DOM that would be generated as a flag to select character sheets.
     */
    public get bannerDom(): string
    {
        return `
            <div class="creature danger_${this.danger}" 
                 data-creature-id="${this.c.id}"
                 data-creature-root="${this.root}"
                 data-category="${this.category}"
                 data-danger="${this.danger}"
                 style="display: none;">
                <img class="icon_img" src="${this.c.imgPath}" alt="">
                <div class="title selected_only">${this.c.name}</div>
            </div>`;
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

        const skillList = [];
        for (const [skill, mod] of this.c.upgradedSkills.entries()) {
            skillList.push(`<span style="display: inline-block;">${wrapDSkill(skill)} ${wrapRoll(mod)}</span>`);
        }

        const vul = [];
        const res = [];
        const imm = [];

        for (const [dt, r] of this.c.damageRes.entries()) {
            if (r < 0) {
                const details = r == -100 ? "" : ` (${100 - r}% damage)`;
                vul.push(`${wrapDamageType(dt)}${details}`);
            }
            else if (r == 0) {
            }
            else if (r < 100) {
                const details = r == 50 ? "" : ` (${100 - r}% damage)`;
                res.push(`${wrapDamageType(dt)}${details}`);
            }
            else {
                const details = r == 100 ? "" : (r == 200 ? " (Absorb)" : ` (Heals for ${r - 100}% damage)`);
                imm.push(`${wrapDamageType(dt)}${details}`);
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
        let imbalanceStr: string;
        if (imbalanceValues == null) {
            imbalanceStr = "";
        }
        else {
            const imPercents = imbalanceValues.map(x => `${Math.round((x - 1) * 100)}%`).join(", ");
            imbalanceStr = `(<i class="fa-solid fa-scale-unbalanced" style="padding-right: 8px;"></i>  ${imPercents})`;
        }

        return `
        <div class="stat_sheet" id="stat_sheet_${this.c.id}">
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
     * For the sheet aspect we just register the stat sheet for now. When the
     * beastiary is created, all registered sheets will together be populated.
     *
     * Inherited Doc:
     *
     * @inheritDoc
     */
    public finalize(): void
    {
        super.finalize();

        let mobsInCategory: Map<NpcId, [number, ISheet[]]>;
        if (SheetAspect.CreatureSets.has(this.category)) {
            mobsInCategory = SheetAspect.CreatureSets.get(this.category);
        }
        else {
            mobsInCategory = new Map();
            SheetAspect.CreatureSets.set(this.category, mobsInCategory);
        }

        let mobsHavingRoot: ISheet[];
        if (mobsInCategory.has(this.root)) {
            mobsHavingRoot = mobsInCategory.get(this.root)[1];
        }
        else {
            mobsHavingRoot = [];
            mobsInCategory.set(this.root, [0, mobsHavingRoot]);
        }

        mobsHavingRoot.push(this);
    }

    /**
     * The logic to set up the beastiary.
     */
    public static setupBeastiary()
    {
        const $beastiary = $("#beastiary");
        const $crTable   = $("#cr_table");

        $crTable.html(AttackAbstraction.generateCRTable());

        // Set up the category logic.
        $beastiary.on("click", ".mob_category_icon", function ()
        {
            const categoryId = $(this).data("categoryId");

            $beastiary.find(".creature").hide();
            $beastiary.find(".beastiary_char_root").hide();

            $beastiary.find(`.beastiary_char_root[data-creature-category=${categoryId}]`).show();

            for (const [_, [active, mobsHavingRoot]] of
                SheetAspect.CreatureSets.get(categoryId).entries())
            {
                $beastiary.find(`.creature[data-creature-id="${mobsHavingRoot[active].id}"]`).show();
            }
        });

        // Set up the logic to reset on clicking white space.
        $beastiary.on("click", ".translational_flags_radio_container", function ()
        {
            $(this).children(".radio").removeClass("selected");
            $(this).children(".radio").find(".selected_only").hide();
            $(".stat_sheet").hide();
            $("#cr_table").show();
        });

        // Set up the general radio logic.
        $beastiary.on("click", ".radio:not(.disabled)", function (e)
        {
            e.stopPropagation();
            const $this = $(this);
            if ($this.hasClass("selected")) {
                // $this.removeClass("selected");
                // $this.find(".selected_only").hide();
                return;
            }
            $this.siblings(".radio").removeClass("selected");
            $this.siblings(".radio").find(".selected_only").hide();
            $this.addClass("selected");
            setTimeout(() => $this.find(".selected_only").fadeIn(100), 200);
        });

        // Set up the radio logic specific to the beastiary.
        $beastiary.on("click", ".creature:not(.disabled)", function ()
        {
            setTimeout(() => {
                const creatureId: NpcId = parseInt(
                    $(this).data("creatureId")
                );
                $(".stat_sheet").hide();

                const $sheet: JQuery = $(`#stat_sheet_${creatureId}`);

                if ($sheet.length > 0) {
                    $sheet.show();
                    $crTable.hide();
                    return;
                }

                $("#sheet_zone").append(SheetAspect.getStatSheet(creatureId).render());
                $crTable.hide();
            }, 1);
        });

        $beastiary.on("click", ".alter:not(.disabled)", function (e)
        {
            e.stopPropagation();
            const $rootContainer = $(this).parents(".beastiary_char_root");
            const rootMobId: NpcId = $rootContainer.data("rootMob");
            const category: string = $rootContainer.data("creatureCategory");

            const alterInfo =
                SheetAspect.CreatureSets.get(category).get(rootMobId);

            const [currentActivation, sheets] = alterInfo;

            const newActivation =
                $(this).hasClass("upgrade") ? 1 : -1 + currentActivation;

            if (newActivation < 0 || newActivation >= sheets.length) {
                console.error("Activation under/overflow!");
                return;
            }

            if (newActivation == 0) {
                $rootContainer.find(".downgrade").addClass("disabled");
            }
            else {
                $rootContainer.find(".downgrade").removeClass("disabled");
            }

            if (newActivation == sheets.length - 1) {
                $rootContainer.find(".upgrade").addClass("disabled");
            }
            else {
                $rootContainer.find(".upgrade").removeClass("disabled");
            }

            alterInfo[0] = newActivation;

            const currentId = sheets[currentActivation].id;
            const alterId = sheets[newActivation].id;
            $(".stat_sheet").hide();
            const $sheet: JQuery = $(`#stat_sheet_${alterId}`);

            if ($sheet.length > 0) {
                $sheet.show();
            }
            else {
                $("#sheet_zone").append(SheetAspect.getStatSheet(alterId).render());
            }
            $crTable.hide();

            $rootContainer.find(`.creature[data-creature-id="${currentId}"]`).hide();
            $rootContainer.find(`.creature[data-creature-id="${alterId}"]`).show();
        });

        // Populate the beastiary radio.
        const $beastiaryContainer: JQuery =
            $("#beastiary .translational_flags_radio_container");

        for (const inklingCreator of InklingCreators.values()) {
            inklingCreator();
        }

        for (const [category, mobsInCategory] of SheetAspect.CreatureSets.entries()) {
            for (const [root, [_, mobsHavingRoot]] of mobsInCategory.entries()) {
                const $rootContainer =
                    $(`<div class="beastiary_char_root radio" 
                            data-root-mob="${root}"
                            data-creature-category="${category}"
                            style="display: none;"></div>`);

                $rootContainer.appendTo($beastiaryContainer);

                for (const mob of mobsHavingRoot) {
                    $rootContainer.append(mob.bannerDom);
                }
                if (mobsHavingRoot.length > 1) {
                    const $modifier = $(`
                        <div class="danger_control selected_only">
                            <i class="alter downgrade fa-duotone fa-solid fa-chevrons-down disabled"></i>
                            <i class="alter upgrade fa-duotone fa-solid fa-chevrons-up"></i>
                        </div>`);

                    $rootContainer.append($modifier);
                }
            }
        }

        // Hide all content meant to be seen in a radio only when it is selected.
        $beastiary.find(".translational_flags_radio_container .radio .selected_only").hide();
    }
}
