export const waitForFinalEvent = (function () {
    const timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();
// Usage:
// $(window).resize(function () {
//     waitForFinalEvent(function(){
//       alert('Resize...');
//       //...
//     }, 500, "some unique string");
// });


export function setupNav() {
    const $pageNav = $("#page_nav");
    $(".page_header").each(function () {
        $(`<div class="page_nav_link" data-nav-to="${$(this).data("navId")}">${$(this).text()}</div>`)
            .appendTo($pageNav);
    });

    $pageNav.on("click", ".page_nav_link", function () {
        const navTo = $(this).data("navTo");
        const $navTo = $(`.page_header[data-nav-id='${navTo}']`);
        $navTo[0].scrollIntoView({ behavior: "smooth" });
    });
}
