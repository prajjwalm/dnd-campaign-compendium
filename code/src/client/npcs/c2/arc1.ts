import {CoreStat, Prof, ProficiencyLevel, Skill} from "../../homebrew/definitions/constants";
import {Character, NpcId}                        from "../npcIndex";


export function setupCharacters()
{
    new Character(NpcId.Hina, [13, 21, 24, 17, 8, 20], Prof.get(6),
                  new Map([
                      [Skill.Acrobatics,    [ProficiencyLevel.Expert, 0]],
                      [Skill.Deception,     [ProficiencyLevel.Prof,   0]],
                      [Skill.History,       [ProficiencyLevel.Expert, 0]],
                      [Skill.Intimidation,  [ProficiencyLevel.Prof,   0]],
                      [Skill.Investigation, [ProficiencyLevel.Prof,   0]],
                      [Skill.Medicine,      [ProficiencyLevel.Prof,   0]],
                      [Skill.Nature,        [ProficiencyLevel.Prof,   0]],
                      [Skill.Perception,    [ProficiencyLevel.Expert, 0]],
                      [Skill.Stealth,       [ProficiencyLevel.Expert, 0]],
                      [Skill.Survival,      [ProficiencyLevel.Expert, 0]],
                  ]),
                  new Map([
                      [CoreStat.Str, [ProficiencyLevel.Prof, 0]],
                      [CoreStat.Dex, [ProficiencyLevel.Prof, 0]],
                      [CoreStat.Con, [ProficiencyLevel.Prof, 0]],
                      [CoreStat.Int, [ProficiencyLevel.Half, 0]],
                      [CoreStat.Wis, [ProficiencyLevel.Half, 0]],
                      [CoreStat.Cha, [ProficiencyLevel.Half, 0]],
                  ]));

    new Character(NpcId.Roberta, [10, 13, 13, 19, 10, 16], Prof.get(4),
                  new Map([
                      [Skill._ALL,          [ProficiencyLevel.Half,   0]],
                      [Skill.Investigation, [ProficiencyLevel.Prof,   0]],
                      [Skill.Medicine,      [ProficiencyLevel.Expert, 0]],
                      [Skill.Nature,        [ProficiencyLevel.Prof,   0]],
                      [Skill.Performance,   [ProficiencyLevel.Prof,   0]],
                      [Skill.SlightOfHand,  [ProficiencyLevel.Expert, 0]],
                  ]),
                  new Map([
                      [CoreStat.Con, [ProficiencyLevel.Prof, 0]],
                      [CoreStat.Int, [ProficiencyLevel.Prof, 0]],
                  ]));

    new Character(NpcId.Elysium, [ 8, 18, 14, 15, 18, 10], Prof.get(5),
                  new Map([
                      [Skill.Insight,       [ProficiencyLevel.Prof,   0]],
                      [Skill.Perception,    [ProficiencyLevel.Expert, 5]], // Adv
                      [Skill.Investigation, [ProficiencyLevel.Prof,   0]],
                      [Skill.Medicine,      [ProficiencyLevel.Prof,   0]],
                      [Skill.Stealth,       [ProficiencyLevel.Expert, 0]],
                  ]),
                  new Map([
                      [CoreStat.Wis, [ProficiencyLevel.Prof, 0]],
                      [CoreStat.Cha, [ProficiencyLevel.Prof, 0]],
                  ]));

    new Character(NpcId.Ezell, [ 8, 20, 14, 10, 13, 16], Prof.get(4),
                  new Map([
                      // Todo
                  ]),
                  new Map([
                      // Todo
                  ]));


    new Character(NpcId.Yuki, [11, 12, 14,  8, 12, 20], Prof.get(4),
                  new Map([
                      // Todo
                  ]),
                  new Map([
                      [CoreStat.Str, [ProficiencyLevel.None, 5]],
                      [CoreStat.Dex, [ProficiencyLevel.None, 5]],
                      [CoreStat.Con, [ProficiencyLevel.None, 5]],
                      [CoreStat.Int, [ProficiencyLevel.None, 5]],
                      [CoreStat.Wis, [ProficiencyLevel.Prof, 5]],
                      [CoreStat.Cha, [ProficiencyLevel.Prof, 5]],
                  ]));


    new Character(NpcId.Athlon, [10, 20, 18,  8, 16, 10], Prof.get(4),
                  new Map([
                      // Todo
                  ]),
                  new Map([
                      // Todo
                  ]));


    new Character(NpcId.Verna, [18, 10, 16,  8, 10, 14], Prof.get(4),
                  new Map([
                      // Todo
                  ]),
                  new Map([
                      // Todo
                  ]));


    new Character(NpcId.Erica, [ 8,  8, 14, 12, 14, 20], Prof.get(4),
                  new Map([
                      [Skill._ALL,        [ProficiencyLevel.Half,   0]],
                      [Skill.Insight,     [ProficiencyLevel.Expert, 0]],
                      [Skill.Performance, [ProficiencyLevel.Expert, 0]],
                      [Skill.Perception,  [ProficiencyLevel.Prof,   0]],
                  ]),
                  new Map([
                      [CoreStat.Dex, [ProficiencyLevel.Prof, 0]],
                      [CoreStat.Cha, [ProficiencyLevel.Prof, 0]],
                  ]));


    new Character(NpcId.Cecelia, [ 6, 16,  8, 10, 14, 18], Prof.get(3),
                  new Map([
                      // Todo
                  ]),
                  new Map([
                      // Todo
                  ]));


    new Character(NpcId.Jaye, [16, 18, 16,  8, 12,  8], Prof.get(4),
                  new Map([
                      [Skill.Acrobatics,   [ProficiencyLevel.Prof,   0]],
                      [Skill.Athletics,    [ProficiencyLevel.Prof,   0]],
                      [Skill.Nature,       [ProficiencyLevel.Prof,   0]],
                      [Skill.Intimidation, [ProficiencyLevel.Prof,   5]],
                      [Skill.Stealth,      [ProficiencyLevel.Expert, 0]],
                      [Skill.SlightOfHand, [ProficiencyLevel.Expert, 0]],
                      [Skill.Survival,     [ProficiencyLevel.Expert, 0]],
                  ]),
                  new Map([
                      [CoreStat.Dex, [ProficiencyLevel.Prof, 0]],
                      [CoreStat.Con, [ProficiencyLevel.Half, 0]],
                      [CoreStat.Int, [ProficiencyLevel.Prof, 0]],
                  ]));

    new Character(NpcId.Dawn, [ 8,  8, 16, 11, 17, 18], Prof.get(4),
                  new Map([
                      [Skill._ALL,           [ProficiencyLevel.Half,   0]],
                      [Skill.AnimalHandling, [ProficiencyLevel.Prof,   0]],
                      [Skill.Deception,      [ProficiencyLevel.Prof,   0]],
                      [Skill.History,        [ProficiencyLevel.Prof,   0]],
                      [Skill.Insight,        [ProficiencyLevel.Prof,   0]],
                      [Skill.Medicine,       [ProficiencyLevel.Prof,   0]],
                      [Skill.Persuasion,     [ProficiencyLevel.Expert, 0]],
                      [Skill.Performance,    [ProficiencyLevel.Expert, 0]],
                      [Skill.Religion,       [ProficiencyLevel.Prof,   0]],
                      [Skill.SlightOfHand,   [ProficiencyLevel.Expert, 0]],
                      [Skill.Survival,       [ProficiencyLevel.Prof,   5]],  // Adv in finding/cooking food.
                  ]),
                  new Map([
                      [CoreStat.Dex, [ProficiencyLevel.Prof, 0]],
                      [CoreStat.Cha, [ProficiencyLevel.Prof, 0]],
                  ]));

    new Character(NpcId.Iona, [ 8, 10, 16, 17, 11, 12], Prof.get(2),
                  new Map([
                      // Todo
                  ]),
                  new Map([
                      // Todo
                  ]));

    new Character(NpcId.Kastor, [16, 14, 14,  8, 11, 14], Prof.get(3),
                  new Map([
                      // Todo
                  ]),
                  new Map([
                      // Todo
                  ]));

    new Character(NpcId.Coroto, [14, 12, 14, 13, 12, 17], Prof.get(3),
                  new Map([
                      [Skill.Deception,    [ProficiencyLevel.Expert, 0]],
                      [Skill.Intimidation, [ProficiencyLevel.Prof,   0]],
                      [Skill.Nature,       [ProficiencyLevel.Prof,   0]],
                      [Skill.Performance,  [ProficiencyLevel.Prof,   0]],
                      [Skill.Persuasion,   [ProficiencyLevel.Expert, 0]],
                      [Skill.Stealth,      [ProficiencyLevel.Prof,   0]],
                  ]),
                  new Map([
                      [CoreStat.Dex, [ProficiencyLevel.Prof, 0]],
                      [CoreStat.Int, [ProficiencyLevel.Prof, 0]],
                  ]));
}