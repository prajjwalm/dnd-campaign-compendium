import {
    DStat, ProficiencyLevel
} from "../../../homebrew/definitions/constants";


export interface IActionContext
{
    get pb(): number;
    mod(stat: DStat): number;
    hit(stat: DStat, { prof, mod }: { prof?: ProficiencyLevel, mod?: number }): string;
    dc (stat: DStat, { prof, mod }: { prof?: ProficiencyLevel, mod?: number }): string;
}
