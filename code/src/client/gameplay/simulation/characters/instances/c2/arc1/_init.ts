import {NpcId}        from "../../../../../../npcs/npcIndex";
import {Character}    from "../../../Character";
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
        let npc: NpcId;
        for (npc of [NpcId.Athlon,
                     NpcId.Cecelia,
                     NpcId.Coroto,
                     NpcId.Dawn,
                     NpcId.Dusk,
                     NpcId.Elysium,
                     NpcId.Erica,
                     NpcId.Ezell,
                     NpcId.Hina,
                     NpcId.Iona,
                     NpcId.Jaye,
                     NpcId.Kastor,
                     NpcId.Roberta,
                     NpcId.Verna,
                     NpcId.Yuki,])
        {
            Character.get(npc).finalize();
        }
    })
}