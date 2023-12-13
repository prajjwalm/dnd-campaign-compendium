import {setupDrifter}        from "./seaborn/Drifter";
import {setupEphremis}       from "./seaborn/Ephremis";
import {setupHarpooner}      from "./seaborn/Harpooner";
import {setupHarpoonerN}     from "./seaborn/HarpoonerN";
import {setupNetherseaBrand} from "./seaborn/NetherseaBrand";
import {setupPredator}       from "./seaborn/Predator";
import {setupShriekerN}      from "./seaborn/ShriekerN";
import {setupSlider}         from "./seaborn/Slider";
import {setupStoneCutter}    from "./seaborn/StoneCutter";
import {setupSucker}         from "./seaborn/Sucker";
import {setupSwarmCaller}    from "./seaborn/Swarmcaller";
import {setupUrchin}         from "./seaborn/Urchin";
import {setupUrchinN}        from "./seaborn/UrchinN";

export function setupMobs()
{
    setupNetherseaBrand();
    setupEphremis();
    setupSlider();
    setupDrifter();
    // setupSucker();
    // setupStoneCutter();
    setupUrchin();
    setupUrchinN();
    // setupPredator();
    setupHarpooner();
    // setupHarpoonerN();
    setupShriekerN();
    setupSwarmCaller();
}