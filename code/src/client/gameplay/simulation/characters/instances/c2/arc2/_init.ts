import {setupCellinia} from "./cellinia";
import {setupElliot}   from "./elliot";
import {setupGnosis}   from "./gnosis";
import {setupMaaya}    from "./maaya";
import {setupRuzaki}   from "./ruzaki";
import {setupShuo}     from "./shuo";
import {setupTeiai}    from "./teiai";
import {setupYoeric}   from "./yoeric";

export function setupC2A2()
{
    setupRuzaki();
    setupElliot();
    setupYoeric();
    setupTeiai();
    setupShuo();
    setupGnosis();
    setupCellinia();
    setupMaaya();
}
