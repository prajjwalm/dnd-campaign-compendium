/**
 * If a class satisfies this interface then each of its objects can be used to
 * generate an HTML element, whose innerHTML would be returned by
 * {@link generateDOMString}.
 */
export interface IDOMGenerator
{
    /**
     * Creates and returns the DOM string of the generated element as per the
     * current attributes of this object.
     */
    generateDOMString(): string;
}
