import {setupNav}                                 from "./common/common";
import {setupCards}                               from "./data/cards/card";
import {setupCharacterCards}                      from "./data/cards/character";
import {setupCountries}                           from "./data/country";
import {setupHistory}                             from "./history";
import {setupMonsters}                            from "./homebrew/monsters/instances";
import {setupUI}                                  from "./ui/setupUI";

// Test Suites.
import {enableRolling, test as testRollable}      from "./homebrew/common/rollable";
import {setupNpcOpinions, test as testNpcOpinion} from "./campaigns/npcOpinions";
import {test as testStatSheetCreation}            from "./homebrew/monsters/sheet";

$(() => {
    testRollable();
    testNpcOpinion();
    testStatSheetCreation();

    setupNav();
    setupCards();
    setupCharacterCards();
    setupHistory();
    setupCountries();
    setupNpcOpinions();
    setupMonsters();

    setupUI();

    enableRolling();
});