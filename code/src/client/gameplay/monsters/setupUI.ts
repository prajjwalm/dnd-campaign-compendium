/**
 * Setups up the .fancy_radio divs within the depositary such that the .selected
 * class is added to whichever the user clicks.
 */
export function setupUI()
{
    const $enclosingDiv = $(`.page[data-nav-id="beastiary"]`);

    $enclosingDiv.find(".selectable_radio_container .selectable.radio .selected_only").hide();

    $enclosingDiv.on("click", ".selectable_radio_container", function () {
        $(this).children(".selectable.radio").removeClass("selected");
        $(this).children(".selectable.radio").find(".selected_only").hide();
    });

    $enclosingDiv.on("click", ".selectable.radio:not(.disabled)", function (e) {
        e.stopPropagation();
        const $this = $(this);
        if ($this.hasClass("selected")) {
            $this.removeClass("selected");
            $this.find(".selected_only").hide();
            return;
        }
        $this.siblings(".selectable.radio").removeClass("selected");
        $this.siblings(".selectable.radio").find(".selected_only").hide();
        $this.addClass("selected");
        setTimeout(() => $this.find(".selected_only").fadeIn(100), 200);
    });
}