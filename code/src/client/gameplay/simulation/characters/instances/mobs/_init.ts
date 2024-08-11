import {AttackAbstraction}   from "../../../action/AttackAbstraction";
import {setupCluster}        from "./fiends/Cluster";
import {setupMummyLord}      from "./misc/MummyLordWeakDormant";
import {setupBrandGuiders}   from "./seaborn/BrandGuider";
import {setupDrifter}        from "./seaborn/Drifter";
import {setupEphremis}       from "./seaborn/Ephremis";
import {setupHarpooners}     from "./seaborn/Harpooner";
import {setupNetherseaBrand} from "./seaborn/NetherseaBrand";
import {setupPathShaper}     from "./seaborn/PathShaper";
import {setupPincers}        from "./seaborn/Pincer";
import {setupPredators}      from "./seaborn/Predator";
import {setupShriekers}      from "./seaborn/Shrieker";
import {setupSkimmer}        from "./seaborn/Skimmer";
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
    setupEphremis();
    setupSlider();
    setupDrifter();
    setupSucker();
    setupSkimmer();
    setupStoneCutter();
    setupUrchins();
    setupPredators();
    setupPincers();
    setupHarpooners();
    setupSpewers();
    setupShriekers();
    setupBrandGuiders();
    setupSwarmCaller();

    setupCluster();
    setupPathShaper();

    setupMummyLord();
}