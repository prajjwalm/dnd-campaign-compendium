/**
 * The interface of the aspect the Character must implement to have their
 * details viewable in a card (as part of the character index).
 *
 * Note that this is a 'UI layer' interface and doesn't expose anything which
 * other aspects could use. That is intentional. If there were anything which
 * this would expose and others could use, it would probably be better to keep
 * it in a different aspect and refer to it in an implementation of this
 * interface.
 *
 * Eventually NPCs may not be the only things we display in cards, then it is
 * highly likely that this would extend a generic card interface.
 */
export interface ICard
{
    /**
     * An index to uniquely identify the card. We cannot use the NPC id here
     * since we may have cards for things other than NPCs too in the future.
     */
    getCardIndex(): string;

    /**
     * The primary way to view the card would be to hover over its token or
     * click it. This returns the string that forms the token's HTML.
     */
    generatePrimaryToken(): string;

    /**
     * Returns a link with the given text which can be embedded elsewhere.
     * Hovering on the link or clicking it is another way to view the card.
     */
    createLink(displayText?: string): string;

    /**
     * Returns an HTML string which when rendered would form the card's content.
     * The same HTML may be rendered in both a static context and a floating
     * card context and should be designed keeping that in mind.
     */
    generateCard(floating: boolean): string;
}
