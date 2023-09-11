/**
 * The core details every character must possess, as these are used in almost
 * each of the places where a character is referred to in the site.
 */
export interface ICore
{
    /**
     * The display name of this character.
     */
    get name(): string;

    /**
     * The file path of the character's token image.
     *
     * While setting, the directory must be specified wrt. assets/images.
     *
     * While using, the directory can be considered relative to the root (where
     * the html resides).
     */
    get imgPath(): string;
}
