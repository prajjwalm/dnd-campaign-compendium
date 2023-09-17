import {GameTimestamp} from "../../GameTimestamp";


enum LogLevel
{
    INFO,
    NOTABLE,
    IMPORTANT,
    CRITICAL,
}


function log(time: GameTimestamp, level: LogLevel, msg: string)
{
    return `
    <div class="log_entry log_level--${LogLevel[level].toLowerCase()}">
        <div class="log_time">${time.generateDOMString()}</div>
        <div class="log_tag">${LogLevel[level]}</div>
        <div class="log_msg">${msg}</div>
    </div>`;
}


const WorldLogs =
[
    log(GameTimestamp.fromDays(0), LogLevel.INFO,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in sagittis neque."),

    log(GameTimestamp.fromDays(0), LogLevel.NOTABLE,
        "Integer ante arcu, imperdiet vitae convallis ut, ultrices tristique ante. In non " +
        "ligula a lacus aliquam iaculis quis iaculis augue."),

    log(GameTimestamp.fromDays(0), LogLevel.IMPORTANT,
        "Donec vitae faucibus purus."),

    log(GameTimestamp.fromDays(0), LogLevel.CRITICAL,
        "Mauris sit amet tempor lacus, id egestas leo. Morbi vel blandit nulla. Nulla commodo " +
        "augue dui, ac varius mi blandit et. In in laoreet purus. Vestibulum nec felis maximus, " +
        "lobortis nunc vitae, fringilla lorem. "),

    log(GameTimestamp.fromDays(1), LogLevel.INFO,
        "Phasellus sed suscipit metus, hendrerit bibendum risus. "),

    log(GameTimestamp.fromDays(1), LogLevel.INFO,
        "Sed pulvinar quis purus eget luctus. Quisque feugiat ipsum sit amet ex volutpat, et rutrum leo finibus."),

    log(GameTimestamp.fromDays(1), LogLevel.IMPORTANT,
        "Vivamus bibendum tellus sit amet arcu bibendum consequat. "),

    log(GameTimestamp.fromDays(2), LogLevel.NOTABLE,
        "Nullam et justo interdum, euismod purus ut, congue lacus. Praesent at tortor " +
        "nibh. Nunc porttitor dolor eu massa luctus, mattis fringilla metus hendrerit.")
];


export function generateWorldLogsPanel(): string
{
    return `
        <div class="world_logs">
            <div class="world_logs__header">
                <div class="terminal_title">Global Updates</div>
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
        `;
}