import {NpcId}     from "../../../../data/npcIndex";
import {Character} from "../../Character";

export function setupInklings()
{
    const i1 = new Character(NpcId.InkInsecurity);

    i1.core.name = "Inkling: Insecurity";
    i1.core.imgPath = "mob_tokens/inkling/insecurity.png";
    i1.core.finalize();

    const i2 = new Character(NpcId.InkImpatience);

    i2.core.name = "Inkling: Impatience";
    i2.core.imgPath = "mob_tokens/inkling/impatience.png";
    i2.core.finalize();

    const i3 = new Character(NpcId.InkEnvy);

    i3.core.name = "Inkling: Envy";
    i3.core.imgPath = "mob_tokens/inkling/envy.png";
    i3.core.finalize();

    const i4 = new Character(NpcId.InkFury);

    i4.core.name = "Inkling: Fury";
    i4.core.imgPath = "mob_tokens/inkling/fury.png";
    i4.core.finalize();

    const i5 = new Character(NpcId.InkSloth);

    i5.core.name = "Inkling: Sloth";
    i5.core.imgPath = "mob_tokens/inkling/sloth.png";
    i5.core.finalize();

    const i6 = new Character(NpcId.InkArrogance);

    i6.core.name = "Inkling: Arrogance";
    i6.core.imgPath = "mob_tokens/inkling/arrogance.png";
    i6.core.finalize();

    const i7 = new Character(NpcId.InkFreedom);

    i7.core.name = "Inkling: Freedom";
    i7.core.imgPath = "mob_tokens/inkling/free.png";
    i7.core.finalize();
}
