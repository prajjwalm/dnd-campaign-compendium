import {DSkill, pbMod, ProficiencyLevel, StatForSkill} from "../../../data/constants";
import {Rating}                                        from "../../../data/Rarity";
import {Character}                                     from "../Character";
import {BaseAspect}                                    from "./BaseAspect";
import {IDSkills}                                      from "./IDSkills";
import {IDSkillsFactory}                               from "./IDSkillsFactory";


/**
 * Default implementation of a D&D skills aspect. Relies on the Stats and
 * Proficiency aspects to work.
 */
export class DSkillsAspect
    extends BaseAspect
    implements IDSkills,
               IDSkillsFactory
{
    private static getRatingForSkillModifier(mod: number): Rating
    {
        if (mod < 0) {
            return Rating.F;
        }
        if (mod <= 2) {
            return Rating.E;
        }
        if (mod <= 4) {
            return Rating.D;
        }
        if (mod <= 7) {
            return Rating.C;
        }
        if (mod <= 10) {
            return Rating.B;
        }
        if (mod <= 15) {
            return Rating.A;
        }
        if (mod <= 20) {
            return Rating.S;
        }
        if (mod <= 26) {
            return Rating.SS;
        }
        return Rating.SSS;
    }

    /**
     * The skills this character is notable in.
     */
    private readonly skills: Map<DSkill, [ProficiencyLevel, number]>;

    /**
     * CTOR.
     */
    constructor(c: Character)
    {
        super(c);
        this.skills = new Map();
    }

    /**
     * @inheritDoc
     */
    public duplicate(other: Character): this
    {
        const aspect = new DSkillsAspect(other);
        for (const [skill, [prof, mod]] of this.skills.entries()) {
            aspect.skills.set(skill, [prof, mod]);
        }
        return aspect as this;
    }

    /**
     * @inheritDoc
     */
    public setSkillProficiency(skill: DSkill,
                               proficiency: ProficiencyLevel = ProficiencyLevel.Prof,
                               mod: number = 0)
    {
        this.skills.set(skill, [proficiency, mod]);
    }

    /**
     * @inheritDoc
     */
    public getSkillMod(skill: DSkill,
                       profOverride: ProficiencyLevel = null,
                       tentative: boolean = false):
        number
    {
        // First get the contribution from the stat.
        let statMod = this.c.mod(StatForSkill.get(skill));

        // Now find the proficiency level to apply.
        let prof: ProficiencyLevel;
        let mod: number;
        if (this.skills.has(skill)) {
            [prof, mod] = this.skills.get(skill);
        } else if (this.skills.has(DSkill._ALL)) {
            [prof, mod] = this.skills.get(DSkill._ALL);
        } else {
            [prof, mod] = [ProficiencyLevel.None, 0];
        }

        if (profOverride) {
            prof = profOverride;
        }
        return statMod + pbMod(this.c.pb, prof) + mod;
    }

    /**
     * @inheritDoc
     */
    public finalizeSkills()
    {}

    public get upgradedSkills(): ReadonlyMap<DSkill, number>
    {
        const upgradedSkills: Map<DSkill, number> = new Map();
        if (this.skills.has(DSkill._ALL)) {
            const [minProf, minMod] = this.skills.get(DSkill._ALL);
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
                DSkill.Survival
            ])
            {
                upgradedSkills.set(
                    skill,
                    this.c.mod(StatForSkill.get(skill)) + pbMod(this.c.pb, minProf) + minMod
                );
            }
        }

        for (const [skill, [profLevel, mod]] of this.skills.entries()) {
            if (skill == DSkill._ALL) {
                continue;
            }
            upgradedSkills.set(skill, this.c.mod(StatForSkill.get(skill)) + pbMod(this.c.pb, profLevel) + mod);
        }
        return upgradedSkills;
    }

    public get dSkillRatings(): ReadonlyMap<DSkill, Rating>
    {
        const ratings: Map<DSkill, Rating> = new Map();
        for (const [skill, value] of this.upgradedSkills.entries()) {
            ratings.set(skill, DSkillsAspect.getRatingForSkillModifier(value));
        }
        return ratings;
    }
}