import {
    CSkill,
    DSkill,
    Prof,
    ProficiencyLevel,
    VisibilityLevel
}                      from "../../../data/constants";
import {
    Rarity
}                      from "../../../data/Rarity";
import {NpcID}         from "../../../data/npcIndex";
import {IDOMGenerator} from "../../../IDomGenerator";
import {Character}                               from "../Character";
import {Morale, MoraleEffects, NpcMoraleEffects} from "../Morale";
import {BaseAspect}                              from "./BaseAspect";
import {ICore}                                from "./ICore";
import {ICSkills}                             from "./ICSkills";
import {IDSkills}                             from "./IDSkills";
import {IDStats}                              from "./IDStats";
import {IOperator}                            from "./IOperator";
import {CombatRatingMetric, IOperatorFactory} from "./IOperatorFactory";


export class OperatorAspect
    extends BaseAspect
    implements IOperator,
               IOperatorFactory,
               IDOMGenerator
{
    public fatigue: number;

    public ratings: CombatRatingMetric;

    public readonly notableStuff: [string, string][];

    private readonly core: ICore;

    private readonly dStats: IDStats;

    private readonly dSkills: IDSkills;

    private readonly cSkills: ICSkills;

    private readonly _afflictions: string[];

    private readonly _chemistry: Map<NpcID, [number, string]>;

    private readonly _items: [string, Rarity][];

    private _morale: Morale;

    /**
     * CTOR.
     */
    public constructor(c: Character)
    {
        super(c);
        this.core = c;
        this.dStats = c;
        this.dSkills = c;
        this.cSkills = c;

        this.notableStuff = [];
        this._afflictions = [];
        this._items = [];

        this._chemistry = new Map();
    }

    /**
     * @inheritDoc
     */
    generateDOMString(): string
    {
        const tableEntries = [];
        for (const [key, value] of this.notableStuff) {
            tableEntries.push(`
                <div class="dictionary__row">
                    <span class="dictionary__row__key">${key}</span>
                    <span class="dictionary__row__value">${value}</span>
                </div>
            `);
        }

        const statuses = [];
        for (const affliction of this._afflictions) {
            statuses.push(`<span class="operator_screen__status__item">${affliction}</span>`);
        }

        const chemistry = [];
        for (const [npc, [value, desc]] of this._chemistry.entries()) {
            const descStr = desc == null || desc == "" ?
                            "" :
                            `<span class="npc_chemistry__desc">${desc}</span>`;
            chemistry.push(`
                <span class="npc_chemistry">
                    <span class="npc_chemistry__npc">${Character.get(npc).name}</span>
                    <span class="npc_chemistry__value">${value}</span>
                    ${descStr}
                </span>
            `);
        }

        const items = [];
        for (const [item, rarity] of this._items) {
            items.push(`<span class="inventory_item inventory_item--${Rarity[rarity]}">${item}</span>`);
        }

        return `
            <div class="operator_screen">
                <div class="operator_screen__title">${this.core.name}</div>
                <div class="operator_screen__icon"><img src="${this.core.imgPath}" alt=""/></div>
                <div class="operator_screen__ratings icon_table">
                    <div class="icon_table__slot">
                        <div class="icon_table__slot__icon"><i class="fa-solid fa-swords"></i></div>
                        <div class="icon_table__slot__label">
                            Destruction ${this.ratings.damage}
                        </div>
                    </div>
                    <div class="icon_table__slot">
                        <div class="icon_table__slot__icon"><i class="fa-sharp fa-solid fa-gears"></i></div>
                        <div class="icon_table__slot__label">
                            Control ${this.ratings.control}
                        </div>
                    </div>
                    <div class="icon_table__slot">
                        <div class="icon_table__slot__icon"><i class="fa-solid fa-shield-cross"></i></div>
                        <div class="icon_table__slot__label">
                            Defense ${this.ratings.control}
                        </div>
                    </div>
                </div>
                <div class="operator_screen__status">
                    ${statuses.join("")}
                </div>
                <div class="operator_screen__details dictionary">
                    ${tableEntries.join("")}
                </div>
                <div class="operator_screen__d_skills">
                    ${this.character.generateDSkillsDOM()}
                </div>
                <div class="operator_screen__c_skills">
                    ${this.character.generateCSkillsDOM()}
                </div>
                <div class="operator_screen__chemistry">
                    ${chemistry.join("")}
                </div>
                <div class="operator_screen__inventory">
                    ${items.join("")}                
                </div>
            </div>
        `;
    }

    /**
     * @inheritDoc
     */
    public addNotableStuff(k: string, v: string)
    {
        this.notableStuff.push([k, v]);
    }

    /**
     * @inheritDoc
     */
    public addAffliction(a: string)
    {
        this._afflictions.push(a);
    }

    /**
     * @inheritDoc
     */
    public setChemistryWith(npc: NpcID, v: number, s: string)
    {
        this._chemistry.set(npc, [v, s]);
    }

    /**
     * @inheritDoc
     */
    public addInventoryItem(item: string, rarity: Rarity)
    {
        this._items.push([item, rarity]);
    }

    /**
     * @inheritDoc
     */
    public get morale(): Morale
    {
        return this._morale;
    }

    /**
     * @inheritDoc
     */
    public set morale(value: Morale)
    {
        this._morale = value;
        const effects = MoraleEffects.get(value);
        if (effects.has(NpcMoraleEffects.ProficiencyBonusModifier)) {
            this.character.dStats.pb =
                Prof.get(this.dStats.pb.mod() + effects.get(NpcMoraleEffects.ProficiencyBonusModifier));
        }
        if (effects.has(NpcMoraleEffects.SkillModifier)) {
            for (const skill of [
                DSkill.Acrobatics,
                DSkill.AnimalHandling,
                DSkill.Arcana,
                DSkill.Athletics,
                DSkill.Deception,
                DSkill.History,
                DSkill.Insight,
                DSkill.Intimidation,
                DSkill.Investigation,
                DSkill.Medicine,
                DSkill.Nature,
                DSkill.Perception,
                DSkill.Performance,
                DSkill.Persuasion,
                DSkill.Religion,
                DSkill.SlightOfHand,
                DSkill.Stealth,
                DSkill.Survival,
            ])
            {
                const [num, vis] = this.dSkills.getSkillMod(skill, null, true);
                this.character.dSKills.setSkillProficiency(
                    skill,
                    vis,
                    ProficiencyLevel.None,
                    num + effects.get(NpcMoraleEffects.SkillModifier)
                );
            }
        }
    }

    /**
     * @inheritDoc
     */
    public get notableCSkills(): ReadonlyMap<CSkill, [number, VisibilityLevel]>
    {
        return this.cSkills.upgradedSkills;
    }

    /**
     * @inheritDoc
     */
    public get notableDSkills(): ReadonlyMap<DSkill, [number, VisibilityLevel]>
    {
        return this.dSkills.upgradedSKills;
    }
}