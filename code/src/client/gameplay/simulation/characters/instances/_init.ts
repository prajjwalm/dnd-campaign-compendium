import {CardAspect}          from "../aspects/CardAspect";
import {OpinionAspect}       from "../aspects/OpinionAspect";
import {SheetAspect}         from "../aspects/SheetAspect";
import {setupC1A1}           from "./c1/arc1/_init";
import {setupC1A2}           from "./c1/arc2/_init";
import {setupC2A1}           from "./c2/arc1/_init";
import {setupC2A2}           from "./c2/arc2";
import {setupCluster}        from "./mobs/fiends/Cluster";
import {setupInklings}       from "./mobs/inklings";
import {setupMummyLord}      from "./mobs/misc/MummyLordWeakDormant";
import {setupBrandGuiders}   from "./mobs/seaborn/BrandGuider";
import {setupDrifter}        from "./mobs/seaborn/Drifter";
import {setupEphremis}       from "./mobs/seaborn/Ephremis";
import {setupFathomKing}     from "./mobs/seaborn/FathomKing";
import {setupFounders}       from "./mobs/seaborn/Founder";
import {setupHarpooners}     from "./mobs/seaborn/Harpooner";
import {setupNetherseaBrand} from "./mobs/seaborn/NetherseaBrand";
import {setupPathShaper}     from "./mobs/seaborn/PathShaper";
import {setupPincers}        from "./mobs/seaborn/Pincer";
import {setupPredators}      from "./mobs/seaborn/Predator";
import {setupShriekers}      from "./mobs/seaborn/Shrieker";
import {setupSkimmer}        from "./mobs/seaborn/Skimmer";
import {setupSlider}         from "./mobs/seaborn/Slider";
import {setupSpewers}        from "./mobs/seaborn/Spewer";
import {setupStoneCutter}    from "./mobs/seaborn/StoneCutter";
import {setupSucker}         from "./mobs/seaborn/Sucker";
import {setupSwarmCaller}    from "./mobs/seaborn/Swarmcaller";
import {setupUrchins}        from "./mobs/seaborn/Urchin";


export function setupNpcs()
{
    setupC1A1();
    setupC1A2();
    setupC2A1();
    setupC2A2();

    setupInklings();
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
    setupFounders();
    setupHarpooners();
    setupSpewers();
    setupShriekers();
    setupBrandGuiders();
    setupSwarmCaller();
    setupCluster();
    setupPathShaper();
    setupFathomKing();
    setupMummyLord();

    CardAspect.setupCharacterCards();
    OpinionAspect.setupOpinionTable();
    SheetAspect.setupBeastiary();
}