/**
 * Encapsulates all operations relating to the side panel. Given the need of
 * timeouts for proper animation, and the reuse of the content div among various
 * maps, this was complex enough to merit encapsulation.
 */
export class SidePanel
{
    /**
     * The base class for side panel objects.
     */
    private static readonly PANEL_CLASS_NAME = "ink_side_banner";

    /**
     * The class modifier indicating the panel should appear on the left side of
     * the screen. Adding this to the base class immediately moves the panel to
     * the left and beyond the screen and flips the artwork.
     */
    private static readonly MOD_LEFT = "--left";

    /**
     * The class modifier indicating the panel should appear on the right side
     * of the screen. Adding this to the base class immediately moves the panel
     * to the right and beyond the screen and flips the artwork.
     */
    private static readonly MOD_RIGHT = "--right";

    /**
     * The class modifier indicating the panel should now be visible. Adding
     * this to a left or right panel makes it slide into the screen, thus making
     * it visible to the user.
     */
    private static readonly MOD_VISIBLE = "--visible";

    /**
     * The dependant element that only has meaning as the content of this side
     * banner.
     */
    private static readonly SUB_ELEMENT_SUFFIX_CONTENT = "__content";

    /**
     * A panel that is to the left but not yet visible.
     */
    private static readonly LEFT_PANEL_CLASS_NAME =
        SidePanel.PANEL_CLASS_NAME + SidePanel.MOD_LEFT;

    /**
     * A panel that is to the right but not yet visible.
     */
    private static readonly RIGHT_PANEL_CLASS_NAME =
        SidePanel.PANEL_CLASS_NAME + SidePanel.MOD_RIGHT;

    /**
     * A visible panel to the left.
     */
    private static readonly VISIBLE_LEFT_PANEL_CLASS_NAME =
        SidePanel.LEFT_PANEL_CLASS_NAME + SidePanel.MOD_VISIBLE;

    /**
     * A visible panel to the right.
     */
    private static readonly VISIBLE_RIGHT_PANEL_CLASS_NAME =
        SidePanel.RIGHT_PANEL_CLASS_NAME + SidePanel.MOD_VISIBLE;

    /**
     * The class of the element having the content of this panel.
     */
    private static readonly CONTENT_ELEMENT_CLASS_NAME =
        SidePanel.PANEL_CLASS_NAME + SidePanel.SUB_ELEMENT_SUFFIX_CONTENT;

    /**
     * The animation time we've set for changes to occur. Each slide in/out
     * takes this long.
     */
    private static readonly SLIDE_TIME = 200;

    /**
     * Setting this as a class means the side banner would cover the whole
     * screen.
     */
    private static readonly FULL_SPAN = "full_span";

    /**
     * The element having the content of this panel.
     */
    private readonly $content: JQuery;

    /**
     * CTOR.
     *
     * @param $panel The JQuery selector of the element this instance would
     *               manage.
     */
    public constructor(private readonly $panel: JQuery)
    {
        this.$content = $panel.find(`.${SidePanel.CONTENT_ELEMENT_CLASS_NAME}`);
    }

    /**
     * Resets (hides, removes directionality and content of) this panel.
     */
    public reset()
    {
        this.hide(() => this.empty());
        this.$panel.removeClass(SidePanel.FULL_SPAN);
    }

    /**
     * If hidden, show. If visible, hide.
     */
    public toggle(left: boolean)
    {
        if (this.isVisible()) {
            this.hide(() => {});
        }
        else {
            this.show(left);
        }
    }

    /**
     * Only change the content and do nothing else.
     */
    public swapContent(newContent: string)
    {
        this.empty();
        this.$content.append(newContent);
    }

    /**
     * Changes the content of the panel, hiding and showing it if the direction
     * changes.
     */
    public swapContentAndReshow(left: boolean, newContent: string)
    {
        this.hideThenShow(left, () => {
            this.swapContent(newContent);
        })
    }

    /**
     * Clears the side banner, makes it cover the whole screen if it doesn't or
     * retreat back to the side if it does.
     *
     * This method only works if the banner is at least visible.
     */
    public toggleFullSpan(newContent: string)
    {
        if (!this.isVisible()) {
            return;
        }
        this.empty();
        this.$panel.toggleClass(SidePanel.FULL_SPAN);
        setTimeout(() => {
            this.$content.append(newContent);
        },
        SidePanel.SLIDE_TIME);
    }

    /**
     * Reveals the panel on the left/right side of the screen. Given that the
     * panel slides in, this operation concludes after a delay.
     *
     * @param left If true, the panel appears on the left side of the screen,
     *             otherwise it appears on the right side.
     *
     * @returns The time (in milliseconds) it would take for the operation to
     *          complete.
     */
    private show(left: boolean): number
    {
        if (this.isVisible()) {
            throw new Error("Show called on visible panel.");
        }

        this.$panel.removeClass(SidePanel.LEFT_PANEL_CLASS_NAME + " " +
                                SidePanel.RIGHT_PANEL_CLASS_NAME);

        const alignClassName =
            left ? SidePanel.LEFT_PANEL_CLASS_NAME :
            SidePanel.RIGHT_PANEL_CLASS_NAME;

        const visibleAlignClassName =
            left ? SidePanel.VISIBLE_LEFT_PANEL_CLASS_NAME :
            SidePanel.VISIBLE_RIGHT_PANEL_CLASS_NAME;

        this.$panel.addClass(alignClassName);
        setTimeout(() => this.$panel.addClass(visibleAlignClassName), 10);

        return 10 + SidePanel.SLIDE_TIME;
    }

    /**
     * Hides the panel if it is visible.
     *
     * @returns The time it takes to hide.
     */
    private hide(whenHidden: () => void): number
    {
        if (!this.isVisible()) {
            this.$panel.removeClass(SidePanel.LEFT_PANEL_CLASS_NAME + " " +
                                    SidePanel.RIGHT_PANEL_CLASS_NAME)
            whenHidden();
            return 0;
        }

        this.$panel.removeClass(SidePanel.VISIBLE_LEFT_PANEL_CLASS_NAME + " " +
                                SidePanel.VISIBLE_RIGHT_PANEL_CLASS_NAME);

        setTimeout(
            () => {
                this.$panel.removeClass(SidePanel.LEFT_PANEL_CLASS_NAME + " " +
                                        SidePanel.RIGHT_PANEL_CLASS_NAME);
                whenHidden();
            },
            SidePanel.SLIDE_TIME + 10
        );

        return SidePanel.SLIDE_TIME + 10;
    }

    /**
     * Hide the panel if it is visible then show it on the other side. Don't
     * hide or show if it is on the correct side.
     *
     * @param left Whether to show the panel on the left.
     * @param whenHidden Callback to execute when the panel is hidden.
     */
    private hideThenShow(left: boolean, whenHidden: () => void): void
    {
        const visibleAlignClassName =
            left ? SidePanel.VISIBLE_LEFT_PANEL_CLASS_NAME :
            SidePanel.VISIBLE_RIGHT_PANEL_CLASS_NAME;

        if (this.$panel.hasClass(visibleAlignClassName)) {
            whenHidden();
            return;
        }

        const timeToHide = this.hide(whenHidden);
        setTimeout(
            () => {
                this.show(left);
            },
            timeToHide + 10
        );
    }

    /**
     * Clear the side panel's contents.
     */
    private empty(): void
    {
        console.log("clearing the content.");
        this.$content.empty();
    }

    /**
     * @returns If this panel is visible now.
     */
    private isVisible(): boolean
    {
        return this.$panel.hasClass(SidePanel.VISIBLE_LEFT_PANEL_CLASS_NAME) ||
               this.$panel.hasClass(SidePanel.VISIBLE_RIGHT_PANEL_CLASS_NAME);
    }
}
