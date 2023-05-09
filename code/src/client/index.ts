import {setupNav}               from "./common/common";
import {setupCards}             from "./data/cards/card";
import {setupCharacterCards}    from "./data/cards/character";
import {setupCountries}         from "./data/country";
import {setupHistory}           from "./history";

// Test Suites.
import {setupNpcOpinions, test as testNpcOpinion} from "./campaigns/npcOpinions";
import {test as testRollable}                     from "./homebrew/common/rollable";
import {test as testStatSheetCreation}            from "./homebrew/monsters/monster";

$(() => {
    testRollable();
    testNpcOpinion();
    testStatSheetCreation();

    setupNav();
    setupCards();
    setupCharacterCards();
    setupHistory();
    setupCountries();
    setupNpcOpinions()
});