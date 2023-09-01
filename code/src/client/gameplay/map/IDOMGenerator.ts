/**
 * If a class satisfies this interface then each of its objects can be used to
 * generate an HTML element, whose innerHTML would be returned by
 * {@link generateDOMString}. Note that the returned innerHTML would always have
 * the id attribute as {@link id}, so it is not advisable to instantiate two
 * elements using that innerHTML.
 */
export interface IDOMGenerator
{
    /**
     * A unique identifier for this element. May be used for maintaining an id
     * to element index and/or as the DOM element's ID attribute.
     */
    get id(): string;

    /**
     * Creates and returns the DOM string of the generated element as per the
     * current attributes of this object.
     */
    generateDOMString(): string;

    /**
     * Update the element as per its current properties.
     */
    refreshRenderedElement(): void;
}
