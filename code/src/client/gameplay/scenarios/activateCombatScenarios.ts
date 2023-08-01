export function activateCombatScenarios()
{
    $("#combat").on("click", ".combat_picker__item", function () {
        $(".combat_picker__item").removeClass("combat_picker__item--selected");
        $(this).addClass("combat_picker__item--selected");
        $(".combat_scenario").hide();
        $(`.combat_scenario[data-combat-id="${$(this).data("pickerId")}"]`).show();
    });
}
