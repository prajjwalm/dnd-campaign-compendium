const idToNavIcon = new Map([
    ["charIdx",      [`<i class="fa-solid fa-address-book"></i>`]],
    ["material",     [`<i class="fa-solid fa-globe-stand"></i>`]],
    ["shards",       [`<i class="fa-duotone fa-solar-system"></i>`]],
    ["history",      [`<i class="fa-regular fa-timeline-arrow"></i>`]],
    ["rules",        [`<i class="fa-solid fa-gavel"></i>`]],
    ["interactions", [`<i class="fa-duotone fa-user-secret"></i>`]],
    ["beastiary",    [`<i class="fa-solid fa-swords"></i>`]],
])

export function setupNav()
{
    const $pageNav = $("#page_nav");

    $(".page").each(function () {
        const id = $(this).data("navId");
        $pageNav.append(
            `<div class="page_nav_link" data-nav-to="${id}">
                ${idToNavIcon.get(id)}${$(this).find(".page_header").text()}
            </div>`);
    });

    $pageNav.append("<div class='space_filler'></div>");

    $pageNav.on("click", ".page_nav_link", function () {
        const navTo = $(this).data("navTo");
        const $navTo = $(`.page[data-nav-id='${navTo}']`);
        $navTo[0].scrollIntoView({ behavior: "smooth" });
    });

}
