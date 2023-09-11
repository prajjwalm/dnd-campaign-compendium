import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";
import {setupAthlon}  from "./athlon";
import {setupCecilia} from "./cecilia";
import {setupCoroto}  from "./coroto";
import {setupDawn}    from "./dawn";
import {setupDusk}    from "./dusk";
import {setupElysium} from "./elysium";
import {setupErica}   from "./erica";
import {setupEzell}   from "./ezell";
import {setupHina}    from "./hina";
import {setupIona}    from "./iona";
import {setupJaye}    from "./jaye";
import {setupKastor}  from "./kastor";
import {setupRoberta} from "./roberta";
import {setupVerna}   from "./verna";
import {setupYuki}    from "./yuki";

export function setupC2A1()
{
    setupAthlon();
    setupCecilia();
    setupCoroto();
    setupDawn();
    setupDusk();
    setupElysium();
    setupErica();
    setupEzell();
    setupHina();
    setupIona();
    setupJaye();
    setupKastor();
    setupRoberta();
    setupVerna();
    setupYuki();

    $(function () {
        let npc: NpcID;
        for (npc of [NpcID.Athlon,
                     NpcID.Cecelia,
                     NpcID.Coroto,
                     NpcID.Dawn,
                     NpcID.Dusk,
                     NpcID.Elysium,
                     NpcID.Erica,
                     NpcID.Ezell,
                     NpcID.Hina,
                     NpcID.Iona,
                     NpcID.Jaye,
                     NpcID.Kastor,
                     NpcID.Roberta,
                     NpcID.Verna,
                     NpcID.Yuki,])
        {
            Character.get(npc).finalize();
        }
    })
}