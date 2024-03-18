import {IBaseAspectFactory} from "./IBaseAspectFactory";


/**
 * The factory interface needed to set up a {@link Character}'s {@link ICard}
 * aspect.
 */
export interface ICardFactory
    extends IBaseAspectFactory
{
    // Note that we only add stuff here which would specifically be used to
    // create the card only, and nowhere else. Anything which could be used
    // elsewhere should go in some other factory. See the docs of ICard for
    // details.

    /**
     * Sets the campaign/arc to decide which section to display this character
     * under. Thought of making this primary, but doesn't really concern any
     * other aspect tbh.
     */
    setCampaignArc(c: number, a: number);

    /**
     * Set a one-liner (actually around 7-liner) HTML summary of the character,
     * intended to be read at a glance.
     *
     * This is mandatory for creating a card.
     */
    set summary(s: () => string);

    /**
     * Set a full page length HTML story around a character, intended to be read
     * at leisure. This need be set only for very important NPCs.
     */
    set story(s: () => string);

    /**
     * Set a title for the primary image. Particularly relevant if we have
     * alternate images and don't want the primary to be referred to as
     * something like 'default'.
     */
    set primaryImageTitle(s: string);

    /**
     * Add an alternate image to be rendered alongside the primary image in the
     * expanded card.
     */
    addAlternateImage(title: string, imgPath: string);

    /**
     * Add a tag describing the character to be shown on the tag.
     */
    addCardTag(tag: string);
}