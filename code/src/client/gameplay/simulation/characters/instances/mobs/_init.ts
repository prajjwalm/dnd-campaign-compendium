import {AttackAbstraction}   from "../../../action/AttackAbstraction";
import {setupCluster}        from "./fiends/Cluster";
import {setupBrandGuiders}   from "./seaborn/BrandGuider";
import {setupDrifter}        from "./seaborn/Drifter";
import {setupEphremis}       from "./seaborn/Ephremis";
import {setupHarpooners}     from "./seaborn/Harpooner";
import {setupNetherseaBrand} from "./seaborn/NetherseaBrand";
import {setupPathShaper}     from "./seaborn/PathShaper";
import {setupPredators}      from "./seaborn/Predator";
import {setupShriekers}      from "./seaborn/Shrieker";
import {setupSlider}         from "./seaborn/Slider";
import {setupSpewers}        from "./seaborn/Spewer";
import {setupStoneCutter}    from "./seaborn/StoneCutter";
import {setupSucker}         from "./seaborn/Sucker";
import {setupSwarmCaller}    from "./seaborn/Swarmcaller";
import {setupUrchins}        from "./seaborn/Urchin";

export function setupMobs()
{
    const crTable = AttackAbstraction.generateCRTable();

    $("#cr_table").html(crTable);

    setupNetherseaBrand();
    setupSlider();
    setupDrifter();
    setupSucker();
    setupStoneCutter();
    setupUrchins();
    setupPredators();
    setupHarpooners();
    setupSpewers();
    setupShriekers();
    setupBrandGuiders();
    setupSwarmCaller();

    setupCluster();
    setupPathShaper();
}