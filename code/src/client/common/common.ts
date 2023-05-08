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

/**
 * Simple memoization implementation. Should only be used if we anticipate a lot
 * of calls to the same method with the same arguments.
 */
export function memoize<A extends Function>(fn: A): A
{
    const memoizedArguments = new Map();

    // This <any> cast is due to ts handling 'Function' differently from
    // (...args: any[]) => any. This was the simplest way I could resolve this.
    // See:
    //  https://stackoverflow.com/questions/28998417/create-a-generic-function-returning-a-function-with-the-same-signature
    //  https://stackoverflow.com/questions/64380905/difference-between-function-and-args-any-any
    return <any>function(...args) {
        if (memoizedArguments.has(args)) {
            return memoizedArguments.get(args);
        }
        const result = fn(args);
        memoizedArguments.set(args, result);
        return result;
    }
}

function _getEnumLength(en: object) {
    // Noting that ts compiles enums into val/idx->idx/val objects...
    return Object.keys(en).length / 2;
}

/**
 * Returns the number of elements in a purely numerical enum.
 */
export const getEnumLength = memoize(_getEnumLength);

function* _getEnumIterator(args) {
    // WHAT THE ACTUAL FUCK? WHY THE [0]?
    for (let item in args[0]) {
        if (isNaN(Number(item))) {
            continue;
        }
        yield Number(item);
    }
}

/**
 * Returns the iterator over the numerical values in an enum, i.e. an iterator
 * over say [0, 1, 2, 3, ...] which is identical to [en.ElemA, en.elemB, ...].
 */
export const getEnumIterator = memoize(_getEnumIterator);


export function getNumberSuffix(n: number) {
    if (n < 0) {
        throw new Error("Suffixes not supported for negative numbers");
    }
    if (n % 10 == 1) {
        return n == 11 ? "th" : "st";
    }
    else if (n % 10 == 2) {
        return n == 12 ? "th" : "nd";
    }
    else if (n % 10 == 3) {
        return n == 13 ? "th" : "rd";
    }
    return "th";
}
