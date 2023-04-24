import {setupHistory}        from "./history";
import {setupNav}            from "./common/common";
import {setupCountries}      from "./data/country";
import {setupCards}          from "./data/cards/card";
import {setupCharacterCards} from "./data/cards/character";

$(() => {
    setupNav();
    setupCards();
    setupCharacterCards()
    setupHistory();
    setupCountries();
});