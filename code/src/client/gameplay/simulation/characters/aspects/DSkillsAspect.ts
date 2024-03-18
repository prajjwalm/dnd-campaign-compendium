import {DSkill, pbMod, ProficiencyLevel, Shown, StatForSkill, VisibilityLevel} from "../../../data/constants";
import {Rating}                                                                from "../../../data/Rarity";
import {Character}                                                             from "../Character";
import {BaseAspect}                                                            from "./BaseAspect";
import {IDSkills}                                                              from "./IDSkills";
import {IDSkillsFactory}                                                       from "./IDSkillsFactory";


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
    private readonly skills: Map<DSkill, [ProficiencyLevel, number, VisibilityLevel]>;

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
        for (const [skill, [prof, mod, vis]] of this.skills.entries()) {
            aspect.skills.set(skill, [prof, mod, vis]);
        }
        return aspect as this;
    }

    /**
     * @inheritDoc
     */
    public setSkillProficiency(skill: DSkill,
                               visibility: VisibilityLevel,
                               proficiency: ProficiencyLevel = ProficiencyLevel.Prof,
                               mod: number = 0)
    {
        this.skills.set(skill, [proficiency, mod, visibility]);
    }

    /**
     * @inheritDoc
     */
    public getSkillMod(skill: DSkill,
                       profOverride: ProficiencyLevel = null,
                       tentative: boolean = false):
        [number, VisibilityLevel]
    {
        // First get the contribution from the stat.
        let statMod = this.c.mod(StatForSkill.get(skill));

        // Now find the proficiency level to apply.
        let prof: ProficiencyLevel;
        let mod: number;
        let vis: VisibilityLevel;
        if (this.skills.has(skill)) {
            [prof, mod, vis] = this.skills.get(skill);
        } else if (this.skills.has(DSkill._ALL)) {
            [prof, mod, vis] = this.skills.get(DSkill._ALL);
        } else {
            [prof, mod, vis] = [ProficiencyLevel.None, 0, Shown];
        }

        if (profOverride) {
            prof = profOverride;
        }
        return [statMod + pbMod(this.c.pb, prof) + mod, vis];

        // if (!this.skills.has(skill)) {
        //     prof = ProficiencyLevel.None;
        //     mod = 0;
        //     vis = Shown;
        // }
        // else {
        //     [prof, mod, vis] = this.skills.get(skill);
        // }
        // if (profOverride) {
        //     prof = profOverride;
        // }
        // if (this.skills.has(DSkill._ALL)) {
        //     const [minProf, minMod, _] = this.skills.get(DSkill._ALL);
        //     if (prof < minProf) {
        //         prof = minProf;
        //     }
        //     if (mod < minMod) {
        //         mod = minMod;
        //     }
        // }
        //
        // return [this.c.mod(StatForSkill.get(skill)) +
        //         this.c.pb.mod(prof) +
        //         mod,
        //         vis
        // ];
    }

    /**
     * @inheritDoc
     */
    public finalizeSkills()
    {}

    public get upgradedSkills(): ReadonlyMap<DSkill, [number, VisibilityLevel]>
    {
        const upgradedSkills: Map<DSkill, [number, VisibilityLevel]> = new Map();
        if (this.skills.has(DSkill._ALL)) {
            const [minProf, minMod, allVis] = this.skills.get(DSkill._ALL);
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
                    [
                        this.c.mod(StatForSkill.get(skill)) +
                        pbMod(this.c.pb, minProf) + minMod,
                        allVis
                    ]
                );
            }
        }

        for (const [skill, [profLevel, mod, vis]] of this.skills.entries()) {
            if (skill == DSkill._ALL) {
                continue;
            }
            upgradedSkills.set(skill,
                [
                    this.c.mod(StatForSkill.get(skill)) +
                    pbMod(this.c.pb, profLevel) + mod, vis
                ]);
        }
        return upgradedSkills;
    }

    public get dSkillRatings(): ReadonlyMap<DSkill, Rating>
    {
        const ratings: Map<DSkill, Rating> = new Map();
        for (const [skill, [value, _]] of this.upgradedSkills.entries()) {
            ratings.set(skill, DSkillsAspect.getRatingForSkillModifier(value));
        }
        return ratings;
    }
}