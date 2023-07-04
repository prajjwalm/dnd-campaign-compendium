import {CoreStat, Prof, ProficiencyLevel, Skill, SkillForStat, StatValue} from "../homebrew/definitions/constants";


export enum NpcId {
    Lucian,
    Ebenezar,
    Caelynn,
    Lesley,
    Irene,
    Ling,
    DaveRuhl,
    Ulrich,
    Lia,
    Conley,
    Vahareth,
    GOrder,
    LogosPlaywright,
    Mostima,
    Shimaken,
    Shimarin,
    Verrader,
    Fiest,
    Mouthpiece,
    Sanguinarch,
    DecroaSal,
    Baphomet,
    Kjerra,
    GDef,
    TraitorOthello,
    Mandy,
    Gen,
    Mumu,
    Shamare,
    Amaia,
    Lemuen,
    Lemuel,
    Eugrud,
    Andoain,
    Dusk,
    Dawn,
    Andri,
    Athlon,
    Bjorn,
    Cecelia,
    Coroto,
    Elysium,
    Erica,
    Genefe,
    Hav,
    Hina,
    Ingrid,
    Iona,
    Jaye,
    Jordi,
    Kastor,
    Petra,
    Roberta,
    Sasha,
    Sybilla,
    // ID_TAIHE,
    Tomasa,
    Verna,
    Vitacia,
    Yuki,
    Ezell,
}

// [FutureScope] Reconcile this with StatBlock params someday.

const _NpcIndex: Map<NpcId, Character> = new Map();
export const NpcIndex: ReadonlyMap<NpcId, Character> = _NpcIndex;

export class Character
{
    constructor(private readonly id: NpcId,
                private readonly statArray: number[],
                public readonly pb: Prof,
                public readonly skills: Map<Skill, [ProficiencyLevel, number]>,
                public readonly saves: Map<CoreStat, [ProficiencyLevel, number]>)
    {
        if (_NpcIndex.has(id)) {
            throw new Error(`Duplicate NPC creation for id ${id}`);
        }
        _NpcIndex.set(id, this);
    }

    public getStat(stat: CoreStat): StatValue
    {
        const val = this.statArray[stat];
        if (val == 0) {
            throw new Error("Undefined character stats");
        }
        return new StatValue(val);
    }

    public getSkillMod(skill: Skill, profOverride?: ProficiencyLevel)
    {
        let prof: ProficiencyLevel;
        let mod: number;
        if (!this.skills.has(skill)) {
            prof = ProficiencyLevel.None;
            mod = 0;
        }
        else {
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
        return this.getStat(SkillForStat.get(skill)).mod + this.pb.mod(prof) + mod;
    }

    public get passiveDeception()
    {
        return 10 + this.getSkillMod(Skill.Deception);
    }
}
