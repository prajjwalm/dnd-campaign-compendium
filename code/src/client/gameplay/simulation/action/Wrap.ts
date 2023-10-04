import {D1, Dice, RollVariant} from "../../rolling/Dice";
import {
    DamageRollable, IRollable, NatRollable
}               from "../../rolling/Rollable";
import {
    Activation,
    Condition,
    CreatureSize,
    DamageType,
    Sense,
    DSkill,
    Speed,
    CSkill, senseStr
} from "../../data/constants";
import {Rating} from "../../data/Rarity";


/**
 * An index containing all active rollables.
 */
const _RollableIndex: Map<number, IRollable> = new Map();

/**
 * To prevent duplicate registration of the same rollable objects.
 */
const _ReverseRollableIndex: Map<IRollable, number> = new Map();

/**
 * We use this to assign new rollables to the index.
 */
let _lastRollableUID = 0;

/**
 * Register a new rollable.
 *
 * @return Its assigned UID.
 */
export function registerRollable(rollable: IRollable): number
{
    if (_ReverseRollableIndex.has(rollable)) {
        return _ReverseRollableIndex.get(rollable);
    }
    const uid = _lastRollableUID++;
    _RollableIndex.set(uid, rollable);
    _ReverseRollableIndex.set(rollable, uid);
    return uid;
}

/**
 * Wrap a rollable to an HTML string that goes into an action of a character
 * sheet. Takes care of registering the rollable too.
 */
export function wrapRoll(arg: number |
                              Dice |
                              [number, Dice] |
                              [number, Dice][] |
                              ReadonlyMap<Dice, number>): string
{

    let dice: Map<Dice, number> = null;
    if (arg instanceof Dice) {
        dice = new Map([[arg, 1]]);
    }
    else if (Array.isArray(arg)) {
        if (Array.isArray(arg[0])) {
            dice = new Map();
            for (const [count, die] of (arg as [number, Dice][])) {
                dice.set(die, (dice.has(die) ? dice.get(die) : 0) + count);
            }
        }
        else {
            let parsedArg = arg as [number, Dice];
            dice = new Map([[parsedArg[1], parsedArg[0]]]);
        }
    }
    else if (arg instanceof Map) {
        dice = arg;
    }

    let uid;
    const rollParts: any[] = [];
    if (dice) {
        dice = new Map(
            [...dice.entries()].sort(
                (a, b) => { return b[0].sides - a[0].sides;}
            )
        );
        for (const [die, count] of dice.entries()) {
            if (count == 0) {
                continue;
            }
            const sign = count > 0 ? (rollParts.length == 0 ? "" : "+") : "-";
            const diceStr = die.sides > 1 ? `d${die.sides}` : "";

            // Important note: count needn't be an integer. CC buffs rely on
            // that to stack together properly.
            rollParts.push(`${sign}${Math.abs(Math.round(count))}${diceStr}`);
        }
        uid = registerRollable(new DamageRollable(dice));
    } else if (typeof arg == "number") {
        rollParts.push((arg >= 0 ? "+" : "") + arg);
        uid = registerRollable(NatRollable.generate(arg));
    } else {
        throw new Error(`Unrecognized type of ${arg} (${typeof arg}) to wrap ` +
                        `roll over`);
    }

    // we don't need a reference as things stand since the new object is
    // stored against the index, but that needs changing.
    // For now cause of the duplicate check, we should get the original uid
    // here.
    const rollStringContent = rollParts.join("");

    return `<span class="rollable" data-rollable-uid="${uid}">${rollStringContent}</span>`;
}

/**
 * Wrap a {@link DamageType} into an HTML string.
 */
export function wrapDamageType(dt: DamageType): string
{
    if (dt > DamageType._NonStandard) {
        return `<span class="damage_type__nonstd">${DamageType[dt]}</span>`;
    } else {
        return `<span class="damage_type">${DamageType[dt]}</span>`;
    }
}

/**
 * Wrap a {@link Condition} into an HTML string.
 */
export function wrapCondition(c: Condition): string
{
    if (c > Condition._NonStandard) {
        return `<span class="condition__nonstd">${Condition[c]}</span>`;
    } else {
        return `<span class="condition">${Condition[c]}</span>`;
    }
}

/**
 * Wrap a {@link DSkill} into an HTML string.
 */
export function wrapDSkill(s: DSkill): string
{
    if (s > DSkill._NonStandard) {
        return `<span class="d_skill__nonstd">${DSkill[s]}</span>`;
    } else {
        return `<span class="d_skill">${DSkill[s]}</span>`;
    }
}

/**
 * Wrap a {@link CSkill} into an HTML string.
 */
export function wrapCSkill(s: CSkill): string
{
    return `<span class="c_skill">${CSkill[s]}</span>`;
}

/**
 * Wrap a {@link CSkill}'s value into an HTML string.
 */
export function wrapCSkillValue(s: number): string
{
    return `<span class="c_skill_value">${s}</span>`;
}

/**
 * Wrap a {@link Rating} into an HTML string.
 */
export function wrapRating(r: Rating): string
{
    return `<span class="rating">${Rating[r]}</span>`;
}

/**
 * Wrap a {@link Speed} into an HTML string.
 */
export function wrapSpeed(s: Speed): string
{
    if (s > Speed._NonStandard) {
        return `<span class="speed__nonstd">${Speed[s]}</span>`;
    } else {
        return `<span class="speed">${Speed[s]}</span>`;
    }
}

/**
 * Wrap a {@link Sense} into an HTML string.
 */
export function wrapSense(s: Sense): string
{
    if (s > Sense._NonStandard) {
        return `<span class="sense__nonstd">${senseStr.get(s)}</span>`;
    } else {
        return `<span class="sense">${senseStr.get(s)}</span>`;
    }
}

/**
 * Wrap a {@link CreatureSize} into an HTML string.
 */
export function wrapCreatureSize(s: CreatureSize): string
{
    if (s > CreatureSize._NonStandard) {
        return `<span class="creatureSize__nonstd">${CreatureSize[s]}</span>`;
    } else {
        return `<span class="creatureSize">${CreatureSize[s]}</span>`;
    }
}

/**
 * Wrap a {@link Activation} into an HTML string.
 */
export function wrapActivation(s: Activation, plural: boolean = false): string
{
    const pluralSuffix = plural ? "s" : "";
    if (s > Activation._NonStandard) {
        return `<span class="activation__nonstd">${Activation[s]}${pluralSuffix}</span>`;
    } else {
        return `<span class="activation">${Activation[s]}${pluralSuffix}</span>`;
    }
}

/**
 * If this isn't called then all rollables are simply fancy HTML.
 */
export function enableRolling()
{
    const $toastZone = $("#toast-container");

    $("#beastiary").on("click", ".rollable", function (e) {
        const uid = $(this).data("rollableUid");
        const rollable = _RollableIndex.get(uid);

        let rollVariant = RollVariant.Normal;
        if (rollable instanceof NatRollable) {
            if (e.shiftKey) {
                rollVariant = e.altKey ? RollVariant.SuperAdvantage : RollVariant.Advantage;
            } else if (e.ctrlKey) {
                rollVariant = e.altKey ? RollVariant.SuperDisadvantage : RollVariant.Disadvantage;
            }
        } else if (rollable instanceof DamageRollable) {
            if (e.altKey) {
                rollVariant = RollVariant.Critical;
            }
        }

        rollable.roll(rollVariant);
        console.log(rollable.result);

        const buildupParts = [];
        for (const [dice, rolls] of rollable.parts.entries())
        {
            if (dice == D1) {
                continue;
            }
            for (const roll of rolls) {
                buildupParts.push(roll);
            }
        }

        console.log(buildupParts);
        const $toast = $(`
            <div class="toast">
                <div class="roll_result">${rollable.result}</div>
                <div class="roll_buildup">${buildupParts.join(", ")}</div>
            </div>`);

        $toast.hide();
        $toast.appendTo($toastZone);
        $toast.fadeIn(400);
        setTimeout(() => {
            $toast.fadeOut(400, () => {
                $toast.remove();
            });
        }, 3000);
    });
}
