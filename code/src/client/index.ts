import {setupGraphNav}                 from "./common/graphs_navigation";
import {languageMap}                   from "./gameplay/map/instances/languageMap";
import {setupLanguageGraph}            from "./gameplay/map/LanguageGraph";
import {test as testNpcOpinion}        from "./gameplay/opinions/NpcOpinions";
import {setupNav}                      from "./common/navigation";
import {setupCountries}                from "./gameplay/data/country";
import {devotionMap}                   from "./gameplay/map/instances/devotionMap";
import {skillMap}                      from "./gameplay/map/instances/skillMap";
import {setupMapGraph}                 from "./gameplay/map/MapGraph";
import {setupUpgradeGraph}             from "./gameplay/map/UpgradeGraph";
import {activateCombatScenarios}       from "./gameplay/scenarios/activateCombatScenarios";
import {enableRolling}                 from "./gameplay/simulation/action/Wrap";
import {setupBaseLogic}                from "./gameplay/simulation/base/Base";
import {CardAspect}                    from "./gameplay/simulation/characters/aspects/CardAspect";
import {setupNpcs}                     from "./gameplay/simulation/characters/instances/_init";
import {testDamageTree}                from "./gameplay/simulation/damage/DamageTree";
import {setupHistory}                  from "./gameplay/data/history";
import {test as testRollable}          from "./gameplay/rolling/Rollable";
import {renderContracts}               from "./gameplay/simulation/characters/legacy/contracts";
import {test as testStatSheetCreation} from "./gameplay/simulation/characters/legacy/sheet";


$(() => {
    testRollable();
    testNpcOpinion();
    testStatSheetCreation();
    testDamageTree();

    setupNpcs();

    setupNav();
    setupHistory();
    setupCountries();

    enableRolling();
    renderContracts();

    activateCombatScenarios();

    CardAspect.setupCardLogic();

    setupMapGraph($("#map_graph_area"), devotionMap);
    setupUpgradeGraph($("#skill_graph_area"), skillMap);
    setupLanguageGraph($("#language_graph_area"), languageMap);
    setupGraphNav();

    setupBaseLogic();
});