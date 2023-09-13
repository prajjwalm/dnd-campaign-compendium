// Test Suites.
import {setupGraphNav}           from "./common/graphs_navigation";
import {test as testNpcOpinion}  from "./gameplay/opinions/NpcOpinions";
import {setupNav}                from "./common/navigation";
import {setupCards}              from "./gameplay/data/cards/card";
import {setupCharacterCards}     from "./gameplay/data/cards/characterCard";
import {setupCountries}          from "./gameplay/data/country";
import {devotionMap}             from "./gameplay/map/instances/devotionMap";
import {skillMap}                from "./gameplay/map/instances/skillMap";
import {setupMapGraph}           from "./gameplay/map/MapGraph";
import {setupUpgradeGraph}       from "./gameplay/map/UpgradeGraph";
import {activateCombatScenarios} from "./gameplay/scenarios/activateCombatScenarios";
import {enableRolling}           from "./gameplay/simulation/action/Wrap";
import {CardAspect}                    from "./gameplay/simulation/characters/aspects/CardAspect";
import {setupCharacters}               from "./gameplay/simulation/characters/instances/_init";
import {setupMobs}                     from "./gameplay/simulation/characters/instances/mobs/_init";
import {testDamageTree}       from "./gameplay/simulation/damage/DamageTree";
import {setupHistory}         from "./gameplay/data/history";
import {test as testRollable} from "./gameplay/rolling/Rollable";
import {renderContracts}               from "./gameplay/monsters/contracts";
import {setupMonsters}                 from "./gameplay/monsters/instances";
import {test as testStatSheetCreation} from "./gameplay/monsters/sheet";
import {setupUI}                       from "./gameplay/monsters/setupUI";

$(() => {
    testRollable();
    testNpcOpinion();
    testStatSheetCreation();
    testDamageTree();

    setupMonsters();
    setupCharacters();
    setupMobs();

    setupNav();
    setupCards();
    setupCharacterCards();
    setupHistory();
    setupCountries();

    setupUI();

    enableRolling();
    renderContracts();

    activateCombatScenarios();

    CardAspect.setupCardLogic();

    setupMapGraph($("#map_graph_area"), devotionMap);
    setupUpgradeGraph($("#skill_graph_area"), skillMap);
    setupGraphNav();
});