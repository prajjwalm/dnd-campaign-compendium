import {Card}         from "../../../card";
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

    /**
     * Setup runtime handling common to all cards.
     */
    public static setupCardLogic()
    {
        $(".central_view").on("click", ".tag", function () {
            $(this).siblings(".tag").removeClass("tag--selected");
            $(this).addClass("tag--selected");

            const token = $(this).data("token");
            const $tokens = $(this).parent().siblings(".tokens");

            console.log($tokens.find(`.token[data-token="${token}"]`));
            console.log(token);

            $tokens.find(".token").hide();
            $tokens.find(`.token[data-token="${token}"]`).show();
        });
    }

    /**
     * A map from token name to token image path.
     */
    private readonly images: Map<string, string>;

    /**
     * A list of the various meta tags this character can be associated with.
     */
    private readonly tags: string[];

    /**
     * The title of the primary image of this character.
     */
    private primaryImageName: string;

    /**
     * Backing field to store the value of the {@link summary} set.
     */
    private _summary: () => string;

    /**
     * Backing field to store the value of the {@link story} set.
     */
    private _story: () => string;

    /**
     * The campaign number in which this character first appears.
     */
    private campaign: number;

    /**
     * The arc number in which this character first appears.
     */
    private arc: number;

    /**
     * CTOR.
     */
    constructor(c: Character)
    {
        super(c);
        this.tags = [];
        this._summary = () => "???";
        this._story = () => "";

        this.images = new Map();
        this.primaryImageName = CardAspect.defaultPrimaryImageName;
        this.images.set(this.primaryImageName, this.c.imgPath);
    }

    public duplicate(other: Character): this
    {
        const aspect = new CardAspect(other);
        aspect._story   = null;
        aspect._summary = null;
        aspect.primaryImageName = this.primaryImageName;
        for (const [name, path] of this.images.entries()) {
            aspect.images.set(name, path);
        }
        return aspect as this;
    }

    /**
     * @inheritDoc
     */
    public getCardIndex(): string
    {
        return `[character|${this.c.id}]`;
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
                    `<img src="${imgPath}" 
                          alt="[NULL]" 
                          class="token"
                          data-token="${tag}" 
                          style=${firstImage ? '""' : '"display: none;"'}>`
                );
                tokenTagsHTML.push(
                    `<span class="token_selector tag ${firstImage ? "tag--selected" : ""}" 
                           data-token="${tag}">${tag}</span>`
                );

                firstImage = false;
            }
            tokensHTML = `<div class='tokens'>${tokenImagesHTML.join("")}</div>
                          <div>${tokenTagsHTML.join("")}</div>`;
        } else {
            tokensHTML = `<img src="${this.images.get(this.primaryImageName)}" 
                               class="token" 
                               alt="[NULL]">`;
        }

        // todo: personality tags.

        const metaTagsHTML = this.tags
                                 .map(x => `<span class="tag">${x}</span>`)
                                 .join("");

        // [FutureScope] Update the classes used here to more organized
        // variants.
        return `<div class="character_card"
                     data-index-key="${this.getCardIndex()}"
                     >
                    <div class="token_space">${tokensHTML}</div>
                    <div class="content">
                        <h5  class="name">${this.c.name}</h5>
                        <div class="tags">${metaTagsHTML}</div>
                        <div class="details">${this._story()}</div>
                        <div class="summary">${this._summary()}</div>
                    </div>
                </div>`;
    }

    /**
     * @inheritDoc
     */
    public addAlternateImage(title: string, imgPath: string)
    {
        if (this.images.has(title)) {
            console.warn(`Image override for ${title}`);
        }
        this.images.set(title, `./assets/images/${imgPath}`);
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
                      data-index-key="${this.getCardIndex()}">${displayText ? displayText : this.c.name}</span>`;
    }

    /**
     * @inheritDoc
     */
    public generatePrimaryToken(): string
    {
        return `<img src="${this.c.imgPath}" 
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
        $(`#tokens .token_space[data-campaign='${this.campaign}'][data-arc='${this.arc}']`)
            .append(
                $(this.generatePrimaryToken())
            );
        Card.register(this);
    }

    /**
     * @inheritDoc
     */
    public setCampaignArc(c: number, a: number)
    {
        this.campaign = c;
        this.arc = a;
        this.tags.push(`Campaign ${c} <span class='verbose'>Arc ${a}</span>`);
    }

    /**
     * @inheritDoc
     */
    public set summary(s: () => string)
    {
        this._summary = s;
    }

    /**
     * @inheritDoc
     */
    public set story(s: () => string)
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
        this.primaryImageName = s;
        this.images.delete(CardAspect.defaultPrimaryImageName);
    }
}