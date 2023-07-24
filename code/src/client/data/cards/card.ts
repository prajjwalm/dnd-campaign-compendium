import {waitForFinalEvent} from "../../common/common";
import {ICard}             from "../../gameplay/simulation/characters/aspects/ICard";


/**
 * Defines an object that can be indexed. Hovering on it will display a snippet
 * in card style and clicking on it will navigate to some section of the page.
 */
export abstract class Card
    implements ICard
{
    public static $commonCentralView: JQuery = null;

    public static $tokenSpace: JQuery = null;

    private static Index: Map<string, ICard> = new Map<string, ICard>();

    private static $floatingCard: JQuery;

    private static $cardGraveyard: JQuery;

    private static floatingCardWidth: number;

    private static floatingCardHeight: number;

    private static viewportWidthInPx: number;

    private static viewportHeightInPx: number;

    protected constructor()
    { }

    public static loadFromDOM(): void
    {
        Card.$commonCentralView = $("#character_idx .central_view");
        Card.$tokenSpace = $("#tokens");

        Card.$commonCentralView.on("click", ".token_selector", function () {
            const $tokens = $(this).parent().siblings(".tokens");
            $tokens.children().hide();
            $tokens.children(`[data-token='${$(this).data("token")}']`).show();
        });

        this.$floatingCard = $("#floating_card");
        this.$cardGraveyard = $("#card_graveyard");
        this.snapWindowDimensions();

        // noinspection JSDeprecatedSymbols
        $(window).resize(() => {
            waitForFinalEvent(() => {
                this.snapWindowDimensions();
            }, 500, "Indexible.loadFromDOM");
        });
    }

    public static verbose(s: string): string
    {
        return `<span class="verbose">${s}</span>`;
    }

    public static link(indexKey: string, displayText: string): string
    {
        return `<span class="card_link" data-index-key="${indexKey}">${displayText}</span>`
    }

    public static snapWindowDimensions(): void
    {
        const $window = $(window);
        this.viewportHeightInPx = $window.height();
        this.viewportWidthInPx = $window.width();
    }

    public static revealFloatingCard(): void
    {
        this.$floatingCard.show();
        this.floatingCardWidth = this.$floatingCard.width();
        this.floatingCardHeight = this.$floatingCard.height();
    }

    public static hideFloatingCard(): void
    {
        this.$floatingCard.hide();
    }

    public static moveFloatingCard(x: number, y: number): void
    {

        const postX: boolean = x + this.floatingCardWidth + 24 < this.viewportWidthInPx;
        const preX: boolean = x > this.floatingCardWidth + 24;

        const postY: boolean = y + this.floatingCardHeight + 24 < this.viewportHeightInPx;
        const preY: boolean = y > this.floatingCardHeight + 24;

        if (postX) {
            if (postY) {
                this.$floatingCard.css({
                    top : y + 12,
                    left: x + 12,
                });
            } else if (preY) {
                this.$floatingCard.css({
                    top : y - 12 - this.floatingCardHeight,
                    left: x + 12,
                });
            } else {
                this.$floatingCard.hide();
            }
        } else if (preX) {
            if (postY) {
                this.$floatingCard.css({
                    top : y + 12,
                    left: x - 12 - this.floatingCardWidth,
                });
            } else if (preY) {
                this.$floatingCard.css({
                    top : y - 12 - this.floatingCardHeight,
                    left: x - 12 - this.floatingCardWidth,
                });
            } else {
                this.$floatingCard.hide();
            }
        } else {
            // Risky? I don't expect the code to ever actually reach here, since
            // I'm not planning for mobile devices.
            this.$floatingCard.hide();
        }
    }

    public static getIndexible(key: string): ICard
    {
        return this.Index.get(key);
    }

    public static showCardFullSize(card: ICard): void
    {
        Card.$commonCentralView.children().hide();

        const cardIndex = card.getCardIndex();
        const $existingCard = Card.$commonCentralView.children(`[data-index-key='${cardIndex}']`);
        if ($existingCard.length > 0) {
            $existingCard.show();
        } else {
            const $card = $(card.generateCard(false));
            Card.$commonCentralView.append($card);
            $card.show();
        }
    }

    public static showCardFloating(card: ICard): void
    {
        Card.$floatingCard.children().hide();

        const cardIndex = card.getCardIndex();
        const $existingCard = Card.$floatingCard.children(`[data-index-key='${cardIndex}']`);
        if ($existingCard.length > 0) {
            $existingCard.show();
        } else {
            const $card = $(card.generateCard(true));
            $card.addClass("floating");
            Card.$floatingCard.append($card);
            $card.show();
        }
    }

    public static register(card: ICard): void
    {
        Card.Index.set(card.getCardIndex(), card);
    }

    public getCardIndex(): string
    {
        return this.indexKey;
    }

    protected abstract get indexKey(): string;

    public generatePrimaryToken(): string
    {
        throw new Error("Not implemented");
    }

    public createLink(displayText?: string): string
    {
        throw new Error("Not implemented");
    }

    public abstract generateCard(floating: boolean): string;
}


export function setupCards()
{
    Card.loadFromDOM();

    const $tokens = $("#tokens");
    $tokens.on("mouseenter", ".token", function (e) {
        const indexKey = $(this).data("indexKey");
        const card = Card.getIndexible(indexKey);
        Card.showCardFloating(card);
        Card.revealFloatingCard();
        Card.moveFloatingCard(e.clientX, e.clientY);
    });
    $tokens.on("mouseleave", ".token", function () {
        Card.hideFloatingCard();
    });
    $tokens.on("mousemove", ".token", function (e) {
        Card.moveFloatingCard(e.clientX, e.clientY);
    });
    $tokens.on("click", ".token", function () {
        Card.hideFloatingCard();

        const indexKey = $(this).data("indexKey");
        const card = Card.getIndexible(indexKey);
        Card.showCardFullSize(card);
    });

    const $card_links = $(".page");
    $card_links.on("mouseenter", ".card_link", function (e) {
        const indexKey = $(this).data("indexKey");
        const card = Card.getIndexible(indexKey);
        Card.showCardFloating(card);
        Card.revealFloatingCard();
        Card.moveFloatingCard(e.clientX, e.clientY);
    });
    $card_links.on("mouseleave", ".card_link", function () {
        Card.hideFloatingCard();
    });
    $card_links.on("mousemove", ".card_link", function (e) {
        Card.moveFloatingCard(e.clientX, e.clientY);
    });
    $card_links.on("click", ".card_link", function () {
        Card.hideFloatingCard();

        const indexKey = $(this).data("indexKey");
        const card = Card.getIndexible(indexKey);

        Card.showCardFullSize(card);
    });
}
