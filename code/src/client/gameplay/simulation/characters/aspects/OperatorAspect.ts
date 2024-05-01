import {CSkill, DSkill, Era, ProficiencyLevel, StatForSkill, VisibilityLevel} from "../../../data/constants";
import {NpcID}                                                                from "../../../data/npcIndex";
import {Rarity, Rating}                                                       from "../../../data/Rarity";
import {IDOMGenerator}                                                        from "../../../IDomGenerator";
import {wrapCSkill, wrapDSkill}                                               from "../../action/Wrap";
import {OperatorProfiles}                                                     from "../../base/Operator";
import {Character}                                                            from "../Character";
import {Morale, MoraleEffects, NpcMoraleEffects}                              from "../Morale";
import {BaseAspect}                                                           from "./BaseAspect";
import {IOperator}                                                            from "./IOperator";
import {CombatRatingMetric, IOperatorFactory}                                 from "./IOperatorFactory";


export class OperatorAspect
    extends BaseAspect
    implements IOperator,
               IOperatorFactory,
               IDOMGenerator
{
    public fatigue: number;

    public ratings: CombatRatingMetric;

    public readonly notableStuff: [string, string][];

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

        this.notableStuff = [];
        this._afflictions = [];
        this._items = [];

        this._chemistry = new Map();
    }

    public duplicate(other: Character): this
    {
        // todo: Is this the right way? also consider doing this in cards or
        //  that here.
        return null;
    }

    /**
     * @inheritDoc
     */
    public generateDOMString = () =>
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
                    <div class="npc_chemistry__npc">
                        <img src="${Character.get(npc).imgPath}" alt="">
                        <div class="npc_chemistry__value">${value}</div>
                    </div>
                    <div class="npc_chemistry__desc">${descStr}</div>
                </span>
            `);
        }

        const dSkillsByRating: Map<Rating, DSkill[]> = new Map();
        const cSkillsByRating: Map<Rating, CSkill[]> = new Map();

        for (const [skill, rating] of this.c.dSkillRatings.entries()) {
            if (!dSkillsByRating.has(rating)) {
                dSkillsByRating.set(rating, []);
            }
            dSkillsByRating.get(rating).push(skill);
        }
        for (const [skill, rating] of this.c.cSkillRatings.entries()) {
            if (!cSkillsByRating.has(rating)) {
                cSkillsByRating.set(rating, []);
            }
            cSkillsByRating.get(rating).push(skill);
        }

        const ratingToStrings = new Map([
            [Rating.F, "Useless"],
            [Rating.E, "Novice"],
            [Rating.D, "Hobbyist"],
            [Rating.C, "Professional"],
            [Rating.B, "Expertise"],
            [Rating.A, "Mastery"],
            [Rating.S, "Legendary"],
            [Rating.SS, "Mythic"],
            [Rating.SSS, "Titanic"],
        ]);

        const skillBlockDOMs = [];
        for (const rating of [Rating.D,
                              Rating.C,
                              Rating.B,
                              Rating.A,
                              Rating.S,
                              Rating.SS,
                              Rating.SSS])
        {
            if ((dSkillsByRating.has(rating) && dSkillsByRating.get(rating).length > 0) ||
                (cSkillsByRating.has(rating) && cSkillsByRating.get(rating).length > 0))
            {
                skillBlockDOMs.push(`
                <div class="skill_block dictionary__row">
                    <div class="dictionary__row__key">${ratingToStrings.get(rating)}</div>
                    <div class="dictionary__row__value">
                        ${dSkillsByRating.has(rating) ?
                          dSkillsByRating.get(rating)
                                         .map(x => wrapDSkill(x))
                                         .join("") : ""}
                        ${cSkillsByRating.has(rating) ?
                          cSkillsByRating.get(rating)
                                         .map(x => wrapCSkill(x))
                                         .join("") : ""}                    
                    </div>
                </div>`);
            }
        }

        const items = [];
        for (const [item, rarity] of this._items) {
            items.push(`<span class="inventory_item inventory_item--${Rarity[rarity]}">${item}</span>`);
        }

        return `
            <div class="operator_screen">
                <div class="operator_screen__title">Villager Profile: ${this.c.name} 
                    <span class="operator_screen__back"><i class="fa-solid fa-arrow-left"></i></span>
                </div>
                <div class="operator_screen__icon"><img src="${this.c.imgPath}" alt=""/></div>
                <div class="operator_screen__ratings icon_table">
                    <div class="icon_table__slot">
                        <div class="icon_table__slot__icon"><i class="fa-solid fa-swords"></i></div>
                        <div class="icon_table__slot__value">${this.ratings.damage}</div>
                        <div class="icon_table__slot__label">Damage Rating</div>
                    </div>
                    <div class="icon_table__slot">
                        <div class="icon_table__slot__icon"><i class="fa-sharp fa-solid fa-gears"></i></div>
                        <div class="icon_table__slot__value">${this.ratings.control}</div>
                        <div class="icon_table__slot__label">Control Rating</div>
                    </div>
                    <div class="icon_table__slot">
                        <div class="icon_table__slot__icon"><i class="fa-solid fa-shield-cross"></i></div>
                        <div class="icon_table__slot__value">${this.ratings.survival}</div>
                        <div class="icon_table__slot__label">Survival Rating</div>
                    </div>
                    <div class="icon_table__slot">
                        <div class="icon_table__slot__icon"><i class="fa-solid fa-user-tie"></i></div>
                        <div class="icon_table__slot__value">${this.ratings.pro}</div>
                        <div class="icon_table__slot__label">Professional Skills</div>
                    </div>
                </div>
                <div class="operator_screen__subtitle">Notable Information</div>
                <div class="operator_screen__details dictionary">
                    <div class="dictionary__row">
                        <span class="dictionary__row__key">From Era</span>
                        <span class="dictionary__row__value">${Era[this.era]}</span>
                    </div>
                    <div class="dictionary__row">
                        <span class="dictionary__row__key">Old Profession</span>
                        <span class="dictionary__row__value">${this.professions[0]}</span>
                    </div>
                    <div class="dictionary__row">
                        <span class="dictionary__row__key">Current Profession</span>
                        <span class="dictionary__row__value">${this.professions[1]}</span>
                    </div>
                    ${tableEntries.join("")}
                    <div class="dictionary__row">
                        <span class="dictionary__row__key">Morale</span>
                        <span class="dictionary__row__value">${Morale[this.morale]}</span>
                    </div>
                </div>
                <div class="operator_screen__subtitle">Specializing skills</div>
                <div class="operator_screen__skills">
                    ${skillBlockDOMs.join("")}
                </div>
                <div class="operator_screen__subtitle">Chemistry with other villagers</div>
                <div class="operator_screen__chemistry">
                    ${chemistry.join("")}
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

    public finalize(): void
    {
        OperatorProfiles.set(this.c.id, this.generateDOMString);
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
            this.c.dStats.pb =
                (this.c.pb + effects.get(NpcMoraleEffects.ProficiencyBonusModifier));
        }
        if (effects.has(NpcMoraleEffects.SkillModifier)) {
            for (let [skill, [num, vis]] of this.c.upgradedSkills) {
                num -= this.c.mod(StatForSkill.get(skill));
                this.c.dSkills.setSkillProficiency(
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
        throw new Error("Not implemented");
    }

    /**
     * @inheritDoc
     */
    public get notableDSkills(): ReadonlyMap<DSkill, [number, VisibilityLevel]>
    {
        return this.c.upgradedSkills;
    }

    public era: Era;

    public professions: [string, string];
}