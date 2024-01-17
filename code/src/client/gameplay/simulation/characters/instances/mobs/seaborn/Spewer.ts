import {Activation, CreatureSize, CRValue, DamageType, DStat, Prof, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                      from "../../../../../data/npcIndex";
import {D1, D4, D8}                                                                                 from "../../../../../rolling/Dice";
import {Action}                                                                                     from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                   from "../../../../action/Wrap";
import {Character}                                                                                  from "../../../Character";
import {CharacterVariant}                                                                           from "../../../CharacterVariant";


export function setupSpewers()
{
    const spewer = new Character(NpcID.Spewer);

    spewer.core.name = "Spewer";
    spewer.core.imgPath = "mob_tokens/seaborn/Spewer.png";

    spewer.dStats.initializeStats(17, 8, 21, 11, 9, 12);
    spewer.dStats.pb = Prof.get(3);

    spewer.dSKills.finalizeSkills();

    spewer.opinions.isOpinionated = false;

    const predHpDice = D8.countHavingE(40, spewer.CON);
    spewer.combat.addBioHpDice(predHpDice, D8);
    spewer.combat.computeHP();

    spewer.combat.setHeavyArmor(17);

    spewer.combat.setSave(DStat.Cha, ProficiencyLevel.Prof);
    spewer.combat.setSave(DStat.Con, ProficiencyLevel.Prof);

    spewer.combat.setSpeed(Speed.Walking, 20);
    spewer.combat.setSpeed(Speed.Swimming, 30);

    spewer.combat.setRes(DamageType.Poison,        100);
    spewer.combat.setRes(DamageType.Acid,         -100);
    spewer.combat.setRes(DamageType.Thunder,      -100);
    spewer.combat.setRes(DamageType.Fire,         -100);
    spewer.combat.setRes(DamageType.Lightning,    -100);

    spewer.combat.setSense(Sense.TremorSense, 5280);

    spewer.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Spiked Shell.</em></strong> 
        The spewer resides inside a dangerously spiked shell which grants 
        it additional +3 AC against ranged attacks. Instead, if any creature attempts a 
        melee attack against it and misses they take ${wrapRoll([c.ac - 10, D4])} 
        ${wrapDamageType(DamageType.Piercing)} damage. Furthermore, when it 
        retreats completely within its shell it gains +${c.ac - 10} AC, immunity
        from ${wrapDamageType(DamageType.Fire)}, ${wrapDamageType(DamageType.Lightning)}, 
        ${wrapDamageType(DamageType.Slashing)} and ${wrapDamageType(DamageType.Bludgeoning)}
        damages, but it cannot move or take most of its actions.</p>`
    ));

    spewer.combat.addAction(new Action(
        Activation.Action,
        c => `<strong><em>Nethersea Injection.</em></strong> The spewer deals 
        ${wrapRoll([[c.SemiProf, D8], [c.CON, D1]])}
        ${wrapDamageType(DamageType.Poison)} damage to ${c.Prof} non-seaborn 
        targets within a 1-mile range who are standing on the nethersea brand.
        Targets must make a DC ${c.dc(DStat.Con)} CON save, upon failure they 
        gain 1 level of <em>Menace: Cerluean Transfiguration</em>, if it doesn't
        already exceed ${c.Prof}. Upon success, they do not gain the said Menace
        and take half damage. (This roll may be made at adv/dis based on other 
        traits the target has.)`
    ));

    spewer.combat.addAction(new Action(
        Activation.BonusAction,
        _ => `<strong><em>Take Refuge.</em></strong> The spewer retreats into its shell.`
    ));

    spewer.combat.addAction(new Action(
        Activation.LegendaryAction,
        _ => `<strong><em>Emerge.</em></strong> The spewer has only one legendary action which it will always 
        take at the end of the turn of the creature preceding its own. It uses 
        this legendary action to emerge from its shell.`
    ));

    spewer.sheet.cr = new CRValue(3);
    spewer.sheet.size = CreatureSize.Medium;
    spewer.sheet.subtitle = " Seaborn, True Neutral";
    spewer.sheet.acDesc   = " (Shell)";
    spewer.sheet.category = "seaborn";

    spewer.finalize();



    const spewerN = new CharacterVariant(NpcID.SpewerN, NpcID.Spewer);

    spewerN.core.name = "Nourished Spewer";
    spewerN.core.imgPath = "mob_tokens/seaborn/SpewerN.png";

    spewerN.dStats.initializeStats(19, 6, 24, 14, 11, 16);
    spewerN.dStats.pb = Prof.get(5);

    spewerN.combat.addBioHpDice(predHpDice, D8);
    spewerN.combat.computeHP();

    spewerN.combat.setHeavyArmor(20);

    spewerN.sheet.cr    = new CRValue(10);
    spewerN.sheet.theme = "danger_1";

    spewerN.finalize();
}