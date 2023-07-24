import {Card}         from "../../../../data/cards/card";
import {NpcId}        from "../../../../npcs/npcIndex";
import {Character}    from "../Character";
import {BaseAspect}   from "./BaseAspect";
import {ICard}        from "./ICard";
import {ICardFactory} from "./ICardFactory";
import {ICore}        from "./ICore";


/**
 * An aspect that provides a Character with the functionality to create a card
 * to render its basic information on the site.
 *
 * To be rendered correctly, the following aspects being supported are
 * mandatory -
 *  1. {@link ICore}
 *
 * And the following are optional -
 *
 */
export class CardAspect
    extends BaseAspect
    implements ICard,
               ICardFactory
{
    private static readonly defaultPrimaryImageName = "default";

    private readonly characterCore: ICore;

    /**
     * A map from token name to token image path.
     */
    private readonly images: Map<string, string>;

    /**
     * A list of the various meta tags this character can be associated with.
     */
    private readonly tags: string[];

    /**
     * Backing field to store the value of the {@link summary} set.
     */
    private _summary: string;

    /**
     * Backing field to store the value of the {@link story} set.
     */
    private _story: string;

    /**
     * CTOR.
     */
    constructor(c: Character)
    {
        super(c);
        this.characterCore = c;
        this.tags = [];
        this._story = "";

        this.images = new Map();
        this.images.set(CardAspect.defaultPrimaryImageName,
                        this.characterCore.imgPath);
    }

    /**
     * @inheritDoc
     */
    public getCardIndex(): string
    {
        return `[character|${this.id}]`;
    }

    /**
     * @inheritDoc
     */
    public generateCard(floating: boolean): string
    {
        let tokensHTML;
        if (!floating &&
            (this.images.size > 1 ||
            !this.images.has(CardAspect.defaultPrimaryImageName)))
        {
            const tokenImagesHTML = [];
            const tokenTagsHTML = [];
            let firstImage = true;
            for (const [tag, imgPath] of this.images.entries()) {
                tokenImagesHTML.push(
                    `<img src="./assets/images/${imgPath}" 
                          alt="[NULL]" 
                          class="token"
                          data-token="${tag}" 
                          style=${firstImage ? '""' : '"display: none;"'}>`
                );
                // [FutureScope] Move the above inline style to a class.
                // [FutureScope] Don't need both the classes tag, tag--selected.
                tokenTagsHTML.push(
                    `<span class="token_selector tag ${firstImage ? "tag--selected": ""}" 
                           data-token="${tag}">${tag}</span>`
                );

                firstImage = false;
            }
            tokensHTML = `<div class='tokens'>${tokenImagesHTML.join("")}</div>
                          <div>${tokenTagsHTML.join("")}</div>`;
        }
        else {
            tokensHTML = `<img src="./assets/images/${this.images.get(CardAspect.defaultPrimaryImageName)}" 
                               class="token" 
                               alt="[NULL]">`;
        }

        // todo: personality tags.

        const metaTagsHTML = this.tags
                                 .map(x => `<span class="tag">${x}</span>`)
                                 .join("");

        // [FutureScope] Update the classes used here to more organized variants.
        return `<div class="character_card"
                     data-index-key="${this.getCardIndex()}"
                     >
                    <div class="token_space">${tokensHTML}</div>
                    <div class="content">
                        <h5  class="name">${this.characterCore.name}</h5>
                        <div class="tags">${metaTagsHTML}</div>
                        <div class="details">${this._story}</div>
                        <div class="summary">${this._summary}</div>
                    </div>
                </div>`;
    }

    /**
     * @inheritDoc
     */
    public set summary(s: string)
    {
        this._summary = s;
    }

    /**
     * @inheritDoc
     */
    public set story(s: string)
    {
        this._story = s;
    }

    /**
     * @inheritDoc
     */
    public set primaryImageTitle(s: string)
    {
        // Who knows, we may someday add support to change the primary image.
        this.images.set(s, this.images.get(CardAspect.defaultPrimaryImageName));
        this.images.delete(CardAspect.defaultPrimaryImageName);
    }

    /**
     * @inheritDoc
     */
    public addAlternateImage(title: string, imgPath: string)
    {
        if (this.images.has(title)) {
            console.warn(`Image override for ${title}`);
        }
        this.images.set(title, imgPath);
    }

    /**
     * @inheritDoc
     */
    public addCardTag(tag: string)
    {
        this.tags.push(tag);
    }

    /**
     * @inheritDoc
     */
    public createLink(displayText?: string): string
    {
        return `<span class="card_link" 
                      data-index-key="${this.getCardIndex()}">
                    ${displayText ? displayText : this.characterCore.name}
                </span>`;
    }

    /**
     * @inheritDoc
     */
    public generatePrimaryToken(): string
    {
        return `<img src="./assets/images/${this.characterCore.imgPath}" 
                     class="token" 
                     alt="[NULL]" 
                     data-index-key="${this.getCardIndex()}">`;
    }

    /**
     * @inheritDoc
     */
    public finalize(): void
    {
        super.finalize();
        console.log("Registering card for", NpcId[this.id]);
        $("#tokens .token_space[data-campaign='2'][data-arc='1']").append(
            $(this.generatePrimaryToken())
        );
        Card.register(this);
    }
}