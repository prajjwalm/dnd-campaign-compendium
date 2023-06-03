/**
 * Class to be added to selected gamified equivalents of radios/checkboxes etc.
 * to indicate that they are selected.
 */
const SELECTED_CLASS_NAME = "selected";

/**
 * Setups up the .fancy_radio divs such that the .selected class is added to
 * whichever the user clicks.
 *
 * This, and all other such functions, are meant purely for UI and are not
 * attached to any other logic that may happen when the divs are clicked.
 *
 * @param $enclosingDiv Only the divs within this/these are affected. An empty
 *                      selector is fine. Null isn't.
 */
function setupRadios($enclosingDiv: JQuery)
{
    $enclosingDiv.on("click", ".selectable_radio_container", function () {
        $(this).children(".selectable.radio").removeClass(SELECTED_CLASS_NAME);
    });

    $enclosingDiv.on("click", ".selectable.radio", function (e) {
        e.stopPropagation();
        if ($(this).hasClass("selected")) {
            return;
        }
        $(this).siblings(".selectable.radio").removeClass(SELECTED_CLASS_NAME);
        $(this).addClass(SELECTED_CLASS_NAME);
    });
}

/**
 * Set up the gamified UI across the site.
 */
export function setupUI()
{
    const $workshop = $("#workshop");
    if ($workshop.length == 0) {
        return;
    }

    setupRadios($workshop);
}