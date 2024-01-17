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

export function EQ(a, b) {
    return Math.abs(a - b) < 0.00001;
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
    } else if (n % 10 == 2) {
        return n == 12 ? "th" : "nd";
    } else if (n % 10 == 3) {
        return n == 13 ? "th" : "rd";
    }
    return "th";
}

const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
];
const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
];
const teens = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
];

function convert_millions(num) {
    if (num >= 1000000) {
        return convert_millions(Math.floor(num / 1000000)) + " million " + convert_thousands(num % 1000000);
    } else {
        return convert_thousands(num);
    }
}

function convert_thousands(num) {
    if (num >= 1000) {
        return convert_hundreds(Math.floor(num / 1000)) + " thousand " + convert_hundreds(num % 1000);
    } else {
        return convert_hundreds(num);
    }
}

function convert_hundreds(num) {
    if (num > 99) {
        return ones[Math.floor(num / 100)] + " hundred " + convert_tens(num % 100);
    } else {
        return convert_tens(num);
    }
}

function convert_tens(num) {
    if (num < 10) return ones[num];
    else if (num >= 10 && num < 20) return teens[num - 10];
    else {
        return tens[Math.floor(num / 10)] + " " + ones[num % 10];
    }
}

export function numberToText(n: number) {
    return convert_millions(n);
}

export function updateMap<T>(m: Map<T, number>, key: T, val: number)
{
    m.set(key, (m.has(key) ? m.get(key) : 0) + val);
}