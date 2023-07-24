import {IQuestable} from "./IQuestable";

/**
 * Takes a character and applies a Questable API wrapper onto it.
 */
export class CharacterQuestableAPI
    implements IQuestable
{
    public get dps(): number {
        return 0;
    }
}
