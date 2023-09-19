import {NpcID}                     from "../../data/npcIndex";
import {Character}                 from "../characters/Character";
import {generateAchievementsPanel} from "./Achievements";
import {generateBuildingsPanel}    from "./buildingInstances";
import {generateOperatorProfile}   from "./Operator";

export function generateBaseDOM()
{
    return `
<div class="base_management">
    <div class="base_management__logs">
        ${generateAchievementsPanel()}
    </div> 
    <div class="base_management__rating">
        <div class="terminal_title">Faction Ratings</div>
        <div class="ratings_dictionary">
            <div class="dictionary__row">
                <div class="dictionary__row__key">Recognition</div>
                <div class="dictionary__row__value">Unknown nobodies</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Honor</div>
                <div class="dictionary__row__value">5</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Notoriety</div>
                <div class="dictionary__row__value">0</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Intelligence Level</div>
                <div class="dictionary__row__value">20</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Internal Security</div>
                <div class="dictionary__row__value">0</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Offensive capbilities</div>
                <div class="dictionary__row__value">8</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Defenses</div>
                <div class="dictionary__row__value">0</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Shardic Investiture</div>
                <div class="dictionary__row__value">33</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Eldritch Investiture</div>
                <div class="dictionary__row__value">17</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Technology</div>
                <div class="dictionary__row__value">15</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Culture</div>
                <div class="dictionary__row__value">7</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Economy</div>
                <div class="dictionary__row__value">2</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Amentities</div>
                <div class="dictionary__row__value">6</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">General Morale</div>
                <div class="dictionary__row__value">-25</div>
            </div>
        </div>
    </div> 
    <div class="base_management__buildings">
        ${generateBuildingsPanel()}
    </div> 
    <div class="base_management__villagers">
        ${generateOperatorProfile(Character.get(NpcID.Hina))}    
    </div>
    <div class="base_management__navigation"> 
        <div class="cog_reseq grunge_nav_button">Cognitive ReSequencing</div>    
        <div class="hide_base grunge_nav_button">Back to map</div>    
    </div>
</div>`;
}
