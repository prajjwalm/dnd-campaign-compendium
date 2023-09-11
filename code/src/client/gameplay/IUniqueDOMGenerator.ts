import {IDOMGenerator} from "./IDomGenerator";


/**
 * If a class satisfies this interface then each of its objects can be used to
 * generate an HTML element, whose innerHTML would be returned by
 * {@link generateDOMString}. Note that the returned innerHTML would always have
 * the id attribute as {@link id}, so it is not advisable to instantiate two
 * elements using that innerHTML.
 */
export interface IUniqueDOMGenerator
    extends IDOMGenerator
{
    /**
     * A unique identifier for this element. May be used for maintaining an id
     * to element index and/or as the DOM element's ID attribute.
     */
    get id(): string;

    /**
     * Update the element as per its current properties.
     */
    refreshRenderedElement(): void;
}
