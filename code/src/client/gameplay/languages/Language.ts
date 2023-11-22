import {ELanguageTag} from "./ELanguageTag";


export class Language
{
    public constructor(public readonly name: string,
                       public readonly difficulty: number,
                       public readonly parents: Language[],
                       public readonly tags: ELanguageTag[])
    {}
}
