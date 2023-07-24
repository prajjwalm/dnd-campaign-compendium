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
     * The file path (relative to assets/images/) of the character's token image.
     */
    get imgPath(): string;
}
