/**
 * Defines an object that can be indexed. Hovering on it will display a snippet
 * in card style and clicking on it will navigate to some section of the page.
 */
abstract class Card {
    private static Index: Map<string, Card> = new Map<string, Card>();

    private static $floatingCard: JQuery;
    private static $cardGraveyard: JQuery;

    private static floatingCardWidth: number;
    private static floatingCardHeight: number;
    private static viewportWidthInPx: number;
    private static viewportHeightInPx: number;

    protected constructor() {
    }

    public static loadFromDOM(): void {
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

    public static verbose(s: string): string {
        return `<span class="verbose">${s}</span>`;
    }

    public static link(indexKey: string, displayText: string): string {
        return `<span class="card_link" data-index-key="${indexKey}">${displayText}</span>`
    }

    public static snapWindowDimensions(): void {
        const $window = $(window);
        this.viewportHeightInPx = $window.height();
        this.viewportWidthInPx = $window.width();
    }

    public static revealFloatingCard(): void {
        this.$floatingCard.show();
        this.floatingCardWidth = this.$floatingCard.width();
        this.floatingCardHeight = this.$floatingCard.height();
    }

    public static hideFloatingCard(): void {
        this.$floatingCard.hide();
    }

    public static moveFloatingCard(x:number, y:number): void {

        const postX: boolean = x + this.floatingCardWidth + 24 < this.viewportWidthInPx;
        const preX: boolean = x > this.floatingCardWidth + 24;

        const postY: boolean = y + this.floatingCardHeight + 24 < this.viewportHeightInPx;
        const preY: boolean = y > this.floatingCardHeight + 24;

        if (postX) {
            if (postY) {
                this.$floatingCard.css({
                    top: y + 12,
                    left: x + 12,
                });
            } else if (preY) {
                this.$floatingCard.css({
                    top: y - 12 - this.floatingCardHeight,
                    left: x + 12,
                });
            } else {
                this.$floatingCard.hide();
            }
        } else if (preX) {
            if (postY) {
                this.$floatingCard.css({
                    top: y + 12,
                    left: x - 12 - this.floatingCardWidth,
                });
            } else if (preY) {
                this.$floatingCard.css({
                    top: y - 12 - this.floatingCardHeight,
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

    public static getIndexible(key: string): Card {
        return this.Index.get(key);
    }

    public showCardFullSize(): void {
        this.$centralView.children().hide();

        const cardIndex = this.indexKey;
        const $existingCard = this.$centralView.children(`[data-index-key='${cardIndex}']`);
        if ($existingCard.length > 0) {
            $existingCard.show();
        } else {
            const $card = this.generateCard(false);
            this.$centralView.append($card);
            $card.show();
        }
    }

    public showCardFloating(): void {
        Card.$floatingCard.children().hide();

        const cardIndex = this.indexKey;
        const $existingCard = Card.$floatingCard.children(`[data-index-key='${cardIndex}']`);
        if ($existingCard.length > 0) {
            $existingCard.show();
        } else {
            const $card = this.generateCard(true);
            $card.addClass("floating");
            Card.$floatingCard.append($card);
            $card.show();
        }
    }

    protected registerSelf(): void {
        Card.Index.set(this.indexKey, this);
    }

    protected abstract generateCard(floating:boolean): JQuery;

    protected abstract get indexKey(): string;

    protected abstract get $centralView(): JQuery;
}


$(() => {
    Card.loadFromDOM();

    const $tokens = $("#tokens");
    $tokens.on("mouseenter", ".token", function (e) {
        const indexKey = $(this).data("indexKey");
        const indexible = Card.getIndexible(indexKey);
        Card.revealFloatingCard();
        indexible.showCardFloating();
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
        const indexible = Card.getIndexible(indexKey);

        indexible.showCardFullSize();
    });

    const $card_links = $(".page");
    $card_links.on("mouseenter", ".card_link", function (e) {
        const indexKey = $(this).data("indexKey");
        const indexible = Card.getIndexible(indexKey);

        console.log(indexKey, indexible);
        indexible.showCardFloating();
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
        const indexible = Card.getIndexible(indexKey);

        indexible.showCardFullSize();
    });


});
