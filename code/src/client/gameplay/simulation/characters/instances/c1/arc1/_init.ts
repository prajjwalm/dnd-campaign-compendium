import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";
import {setupCaelynn}  from "./caelynn";
import {setupDave}     from "./dave";
import {setupEbenezar} from "./ebenezar";
import {setupIrene}    from "./irene";
import {setupLesley}   from "./lesley";
import {setupLia}      from "./lia";
import {setupLing}     from "./ling";
import {setupLucian}   from "./lucian";
import {setupMaster}   from "./master";
import {setupUlrich}   from "./ulrich";
import {setupVahareth} from "./vahareth";

export function setupC1A1()
{
    setupLucian();
    setupEbenezar();
    setupCaelynn();
    setupLesley();
    setupIrene();
    setupLing();
    setupDave();
    setupUlrich();
    setupLia();
    setupVahareth();
    setupMaster();

    $(function () {
        for (const npc of [NpcID.Lucian,
                           NpcID.Ebenezar,
                           NpcID.Caelynn,
                           NpcID.Lesley,
                           NpcID.Irene,
                           NpcID.Ling,
                           NpcID.DaveRuhl,
                           NpcID.Ulrich,
                           NpcID.Lia,
                           NpcID.Vahareth,
                           NpcID.TheMaster,
                           ])
        {
            Character.get(npc).finalize();
        }
    })
}