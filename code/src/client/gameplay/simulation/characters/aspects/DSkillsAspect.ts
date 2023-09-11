import {
    DSkill,
    ProficiencyLevel,
    Shown,
    StatForSkill,
    VisibilityLevel
}                      from "../../../data/constants";
import {
    Rating
}                      from "../../../data/Rarity";
import {IDOMGenerator} from "../../../IDomGenerator";
import {wrapRating, wrapRoll, wrapDSkill} from "../../action/Wrap";
import {Character}                        from "../Character";
import {AspectFactoryFlag}               from "./AspectFactoryFlag";
import {BaseAspect}                      from "./BaseAspect";
import {IDSkills}                        from "./IDSkills";
import {IDSkillsFactory}                 from "./IDSkillsFactory";
import {IDStats}                         from "./IDStats";


/**
 * Default implementation of a D&D skills aspect. Relies on the Stats and
 * Proficiency aspects to work.
 */
export class DSkillsAspect
    extends    BaseAspect
    implements IDSkills,
               IDSkillsFactory,
               IDOMGenerator
{
    /**
     * The skills this character is notable in.
     */
    private readonly skills: Map<DSkill, [ProficiencyLevel, number, VisibilityLevel]>;

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
    public setSkillProficiency(skill: DSkill,
                               visibility: VisibilityLevel,
                               proficiency: ProficiencyLevel = ProficiencyLevel.Prof,
                               mod: number = 0)
    {
        this.buildSentinel(AspectFactoryFlag.DSkillsSkillsDeclared,
                           AspectFactoryFlag.DSkillsSkillsFinalized);
        this.skills.set(skill, [proficiency, mod, visibility]);
    }

    /**
     * @inheritDoc
     */
    public getSkillMod(skill: DSkill, profOverride: ProficiencyLevel=null, tentative: boolean=false):
        [number, VisibilityLevel]
    {
        if (!tentative) {
            this.ensure(AspectFactoryFlag.DSkillsSkillsFinalized, true);
        }

        let prof: ProficiencyLevel;
        let mod: number;
        let vis: VisibilityLevel;
        if (!this.skills.has(skill)) {
            prof = ProficiencyLevel.None;
            mod = 0;
            vis = Shown;
        } else {
            [prof, mod, vis] = this.skills.get(skill);
        }
        if (profOverride) {
            prof = profOverride;
        }
        if (this.skills.has(DSkill._ALL)) {
            const [minProf, minMod, _] = this.skills.get(DSkill._ALL);
            if (prof < minProf) {
                prof = minProf;
            }
            if (mod < minMod) {
                mod = minMod;
            }
        }

        // TODO: better visibility handling.

        return [this.dStats.mod(StatForSkill.get(skill)) +
                this.dStats.pb.mod(prof) +
                mod,
                vis
        ];
    }

    /**
     * @inheritDoc
     */
    public finalizeSkills()
    {
        this.setupSentinel(AspectFactoryFlag.DSkillsSkillsFinalized);
    }

    public get upgradedSKills(): ReadonlyMap<DSkill, [number, VisibilityLevel]>
    {
        const upgradedSkills: Map<DSkill, [number, VisibilityLevel]> = new Map();
        if (this.skills.has(DSkill._ALL)) {
            const [minProf, minMod, allVis] = this.skills.get(DSkill._ALL);
            for (const skill of [DSkill.Acrobatics,
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
                                 DSkill.Survival])
            {
                upgradedSkills.set(
                    skill,
                    [this.dStats.mod(StatForSkill.get(skill)) +
                     this.dStats.pb.mod(minProf) + minMod,
                     allVis]
                );
            }
        }

        for (const [skill, [pb, mod, vis]] of this.skills.entries()) {
            upgradedSkills.set(skill,
                               [this.dStats.mod(StatForSkill.get(skill)) +
                                this.dStats.pb.mod(pb) + mod, vis]);
        }
        return upgradedSkills;
    }

    public generateDOMString(): string
    {
        let anySkillHidden = false;
        const skillList = [];
        for (const [skill, [mod, vis]] of this.upgradedSKills.entries()) {
            if (vis == VisibilityLevel.Hidden) {
                anySkillHidden = true;
            }
            else if (vis == VisibilityLevel.Hinted) {
                skillList.push(`${wrapDSkill(skill)} ???`);
            }
            else if (vis == VisibilityLevel.Vague) {
                skillList.push(`${wrapDSkill(skill)} ${wrapRating(DSkillsAspect.getRatingForSkillModifier(mod))}`);
            }
            else if (vis == VisibilityLevel.Shown) {
                skillList.push(`${wrapDSkill(skill)} ${wrapRoll(mod)}`);
            }
            else {
                throw new Error("Unknown visibility level.");
            }
        }
        return skillList.join(" ") +
               (anySkillHidden ? "<br/><span>Has skills not yet revealed.</span>" : "");
    }

    private static getRatingForSkillModifier(mod: number): Rating
    {
        if (mod < 0) {
            return Rating.F;
        }
        if (mod <= 1) {
            return Rating.E;
        }
        if (mod <= 3) {
            return Rating.D;
        }
        if (mod <= 5) {
            return Rating.C;
        }
        if (mod <= 8) {
            return Rating.B;
        }
        if (mod <= 12) {
            return Rating.A;
        }
        if (mod <= 16) {
            return Rating.S;
        }
        if (mod <= 20) {
            return Rating.SS;
        }
        return Rating.SSS;
    }
}