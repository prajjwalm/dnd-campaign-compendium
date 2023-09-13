import {SidePanel} from "../gameplay/map/SidePanel";

export function setupGraphNav()
{
    $("#graph_labels").on("click", ".graph_label", function () {
        if ($(this).hasClass("selected")) {
            return;
        }
        const $sideBanner = $("#side_banner");
        const sidePanel = new SidePanel($sideBanner);

        $(".graph_label").removeClass("selected");
        $(this).addClass("selected");

        $(".graph_area").hide();
        $(`#${$(this).data("graphId")}`).show();

        sidePanel.reset();
    });
}