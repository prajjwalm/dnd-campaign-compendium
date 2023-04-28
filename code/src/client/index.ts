import {setupHistory}        from "./history";
import {setupNav}            from "./common/common";
import {setupCountries}      from "./data/country";
import {setupCards}          from "./data/cards/card";
import {setupCharacterCards} from "./data/cards/character";

// Test Suites.
import {test as rollableTest} from "./homebrew/common/rollable";

$(() => {
    setupNav();
    setupCards();
    setupCharacterCards()
    setupHistory();
    setupCountries();

    // Run tests.
    rollableTest()
});