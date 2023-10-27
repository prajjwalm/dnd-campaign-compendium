import {setupEphremis}       from "./seaborn/Ephremis";
import {setupHarpooner}      from "./seaborn/Harpooner";
import {setupHarpoonerN}     from "./seaborn/HarpoonerN";
import {setupNetherseaBrand} from "./seaborn/NetherseaBrand";
import {setupShriekerN}      from "./seaborn/ShriekerN";
import {setupSlider}         from "./seaborn/Slider";
import {setupSwarmCaller}    from "./seaborn/Swarmcaller";
import {setupUrchin}         from "./seaborn/Urchin";
import {setupUrchinN}        from "./seaborn/UrchinN";

export function setupMobs()
{
    setupNetherseaBrand();
    setupEphremis();
    setupSlider();
    setupUrchin();
    setupUrchinN();
    setupHarpooner();
    setupHarpoonerN();
    setupShriekerN();
    setupSwarmCaller();
}