import {OpinionAspect} from "../aspects/OpinionAspect";
import {setupC1A1}     from "./c1/arc1/_init";
import {setupC2A1}     from "./c2/arc1/_init";

export function setupCharacters()
{
   setupC1A1();
   setupC2A1();

   OpinionAspect.setupOpinionTable();
}