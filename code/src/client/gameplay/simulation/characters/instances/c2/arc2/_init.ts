import {setupCellinia} from "./cellinia";
import {setupElliot}   from "./elliot";
import {setupGnosis}   from "./gnosis";
import {setupMaaya}    from "./maaya";
import {setupRuzaki}   from "./ruzaki";
import {setupShuo}     from "./shuo";

export function setupC2A2()
{
    setupRuzaki();
    setupElliot();
    setupShuo();
    setupGnosis();
    setupCellinia();
    setupMaaya();
}
