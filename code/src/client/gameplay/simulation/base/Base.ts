import {WorldLogs} from "./WorldLogs";

export function generateBaseDOM()
{
    return `
<div class="base_management">
    <div class="base_management__logs">
        <div class="base_management__logs__header">
        <div class="terminal_title">Adventure Logs and Updates</div>
            <div class="log_filters">
                <div class="log_tag tag_filter log_tag--info">INFO</div>
                <div class="log_tag tag_filter log_tag--notable">NOTABLE</div>
                <div class="log_tag tag_filter log_tag--important">IMPORTANT</div>
                <div class="log_tag tag_filter log_tag--critical disabled">CRITICAL</div>
            </div>
            <div class="intelligence">
                <span class="intelligence__label">Intelligence Level</span>
                <span class="intelligence__label">17%</span>
            </div>        
        </div>
        <div class="log_entries">
            ${WorldLogs.join("")}
        </div>    
    </div> 
    <div class="base_management__rating">
        <div class="terminal_title">Faction Ratings</div>
        <div class="dictionary">
            <div class="dictionary__row">
                <div class="dictionary__row__key">Honor</div>
                <div class="dictionary__row__value">0</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Notoriety</div>
                <div class="dictionary__row__value">0</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Military</div>
                <div class="dictionary__row__value">0</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Security</div>
                <div class="dictionary__row__value">0</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Information</div>
                <div class="dictionary__row__value">0</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Technology</div>
                <div class="dictionary__row__value">0</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Shardic Investiture</div>
                <div class="dictionary__row__value">0</div>
            </div>
            <div class="dictionary__row">
                <div class="dictionary__row__key">Eldritch Investiture</div>
                <div class="dictionary__row__value">0</div>
            </div>
        </div>
    </div> 
    <div class="base_management__buildings">
        <div class="terminal_title">Economy and Infrastructure</div>
    </div> 
    <div class="base_management__villagers">
        <div class="terminal_title">Villager Profiles</div>    
    </div>
    <div class="base_management__navigation"> 
        <div class="hide_base grunge_nav_button">Cognitive ReSequencing</div>    
        <div class="hide_base grunge_nav_button">Back to map</div>    
    </div>
</div>`;
}
