import {
    DStat,
    ProficiencyLevel, Skill, StatForSkill
} from "../../../../homebrew/definitions/constants";
import {Character}         from "../Character";
import {AspectFactoryFlag} from "./AspectFactoryFlag";
import {BaseAspect}        from "./BaseAspect";
import {IDSkills}          from "./IDSkills";
import {IDSkillsFactory}   from "./IDSkillsFactory";
import {IDStats}           from "./IDStats";


/**
 * Default implementation of a D&D skills aspect. Relies on the Stats and
 * Proficiency aspects to work.
 */
export class DSkillsAspect
    extends    BaseAspect
    implements IDSkills,
               IDSkillsFactory
{
    /**
     * The skills this character is notable in.
     */
    private readonly skills: Map<Skill, [ProficiencyLevel, number]>;

    /**
     * A reference to the {@link IDStats} of the character, we'll need this to
     * implement this aspect.
     */
    private readonly dStats: IDStats;

    /**
     * CTOR.
     */
    constructor(private readonly c: Character)
    {
        super(c);
        this.dStats = c;
        this.skills = new Map();
    }

    /**
     * @inheritDoc
     */
    public setSkillProficiency(skill: Skill,
                               proficiency: ProficiencyLevel = ProficiencyLevel.Prof,
                               mod: number = 0)
    {
        this.buildSentinel(AspectFactoryFlag.SkillsDeclared,
                           AspectFactoryFlag.SkillsFinalized);
        this.skills.set(skill, [proficiency, mod]);
    }

    /**
     * @inheritDoc
     */
    public upgradeSkillProficiency(skill: Skill,
                                   proficiency: ProficiencyLevel = ProficiencyLevel.Prof,
                                   mod: number = 0)
    {
        this.buildSentinel(AspectFactoryFlag.SkillsDeclared,
                           AspectFactoryFlag.SkillsFinalized);
        if (this.skills.has(skill)) {
            const [existingProf, existingMod] = this.skills.get(skill);
            if (proficiency < existingProf || mod < existingMod) {
                throw new Error("This isn't a skill upgrade.");
            }
        }
        this.setSkillProficiency(skill, proficiency, mod);
    }

    /**
     * @inheritDoc
     */
    public getSkillMod(skill: Skill, profOverride?: ProficiencyLevel): number
    {
        this.ensure(AspectFactoryFlag.SkillsFinalized, false);

        let prof: ProficiencyLevel;
        let mod: number;
        if (!this.skills.has(skill)) {
            prof = ProficiencyLevel.None;
            mod = 0;
        } else {
            [prof, mod] = this.skills.get(skill);
        }
        if (profOverride) {
            prof = profOverride;
        }
        if (this.skills.has(Skill._ALL)) {
            const [minProf, minMod] = this.skills.get(Skill._ALL);
            if (prof < minProf) {
                prof = minProf;
            }
            if (mod < minMod) {
                mod = minMod;
            }
        }

        return this.dStats.mod(StatForSkill.get(skill)) +
               this.dStats.pb.mod(prof) +
               mod;
    }

    /**
     * @inheritDoc
     */
    public finalizeSkills()
    {
        this.setupSentinel(AspectFactoryFlag.SkillsFinalized);
    }

    public get upgradedSKills(): ReadonlyMap<Skill, number>
    {
        const upgradedSkills: Map<Skill, number> = new Map();
        if (this.skills.has(Skill._ALL)) {
            const [minProf, minMod] = this.skills.get(Skill._ALL);
            for (const skill of [Skill.Acrobatics,
                                 Skill.AnimalHandling,
                                 Skill.Arcana,
                                 Skill.Athletics,
                                 Skill.Deception,
                                 Skill.History,
                                 Skill.Insight,
                                 Skill.Intimidation,
                                 Skill.Investigation,
                                 Skill.Medicine,
                                 Skill.Nature,
                                 Skill.Perception,
                                 Skill.Performance,
                                 Skill.Persuasion,
                                 Skill.Religion,
                                 Skill.SlightOfHand,
                                 Skill.Stealth,
                                 Skill.Survival])
            {
                upgradedSkills.set(
                    skill,
                    this.dStats.mod(StatForSkill.get(skill)) +
                    this.dStats.pb.mod(minProf) + minMod
                );
            }
        }

        for (const [skill, [pb, mod]] of this.skills.entries()) {
            upgradedSkills.set(skill,
                               this.dStats.mod(StatForSkill.get(skill)) +
                               this.dStats.pb.mod(pb) + mod);
        }
        return upgradedSkills;
    }
}