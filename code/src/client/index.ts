import {setupNpcOpinions}                       from "./campaigns/opinions/out";
import {setupNav}                               from "./common/common";
import {setupCards}                             from "./data/cards/card";
import {setupCharacterCards}                    from "./data/cards/characterCard";
import {setupCountries}                         from "./data/country";
import {setupHistory}                           from "./history";
import {renderContracts}                        from "./homebrew/monsters/contracts";
import {setupCharacters as setupCharactersC2A1} from "./npcs/c2/arc1";
import {setupUI}                                from "./ui/setupUI";
import {setupMonsters}                          from "./homebrew/monsters/instances";

// Test Suites.
import {test as testNpcOpinion}                 from "./campaigns/opinions/npcOpinions";
import {test as testStatSheetCreation}          from "./homebrew/monsters/sheet";
import {enableRolling, test as testRollable}    from "./homebrew/common/rollable";

$(() => {
    testRollable();
    testNpcOpinion();
    testStatSheetCreation();

    setupCharactersC2A1();

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