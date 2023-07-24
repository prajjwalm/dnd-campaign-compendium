// Test Suites.
import {test as testNpcOpinion}        from "./campaigns/opinions/npcOpinions";
import {setupNpcOpinions}              from "./campaigns/opinions/out";
import {setupNav}                      from "./common/common";
import {setupCards}                    from "./data/cards/card";
import {setupCharacterCards}           from "./data/cards/characterCard";
import {setupCountries}                from "./data/country";
import {enableRolling}                 from "./gameplay/simulation/action/Wrap";
import {
    setupCharacters
}                                      from "./gameplay/simulation/characters/instances/_init";
import {
    testDamageTree
}                                      from "./gameplay/simulation/damage/DamageTree";
import {setupHistory}                  from "./history";
import {test as testRollable}          from "./homebrew/common/rollable";
import {renderContracts}               from "./homebrew/monsters/contracts";
import {setupMonsters}                 from "./homebrew/monsters/instances";
import {test as testStatSheetCreation} from "./homebrew/monsters/sheet";
import {setupUI}                       from "./ui/setupUI";

$(() => {
    testRollable();

    setupCharacters();
    testNpcOpinion();
    testStatSheetCreation();
    testDamageTree();

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