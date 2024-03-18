import {getEnumIterator} from "../../../../common/common";
import {NpcID}           from "../../../data/npcIndex";
import {OperatorAspect}  from "../aspects/OperatorAspect";
import {OpinionAspect}   from "../aspects/OpinionAspect";
import {Character}       from "../Character";
import {setupC1A1}       from "./c1/arc1/_init";
import {setupC1A2}       from "./c1/arc2/_init";
import {setupC2A1}       from "./c2/arc1/_init";
import {setupC2A2}       from "./c2/arc2/_init";

export function setupCharacters()
{
    setupC1A1();
    setupC1A2();
    setupC2A1();
    setupC2A2();

    for (const npcID of getEnumIterator(NpcID)) {
        const c = Character.get(npcID);
        if (!c) {
            continue;
        }
        c.finalize();
    }

    OpinionAspect.setupOpinionTable();
}