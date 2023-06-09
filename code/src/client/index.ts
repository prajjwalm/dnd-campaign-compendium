import {setupNav}            from "./common/common";
import {setupCards}          from "./data/cards/card";
import {setupCharacterCards} from "./data/cards/character";
import {setupCountries}      from "./data/country";
import {renderContracts}     from "./homebrew/monsters/contracts";
import {setupMonsters}       from "./homebrew/monsters/instances";
import {setupUI}             from "./ui/setupUI";
import {setupHistory}        from "./history";

// Test Suites.
import {setupNpcOpinions, test as testNpcOpinion} from "./campaigns/npcOpinions";
import {enableRolling, test as testRollable}      from "./homebrew/common/rollable";
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
    renderContracts();
});