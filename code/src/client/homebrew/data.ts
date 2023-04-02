(() => {
    // 'Heart' effects are effects that play around with your hp. Like always, keep them simple.

    const flameHeartFlavour = `
    The fires from the depths of hell course through your veins, bestowing unto you the fiendish vitality of an arch-
    devil. However, these flames are predatory. Once unleashed, they will not, cannot, be contained. They will burn you
    from within even as they grant you the vigour to burn everything without...`;

    const flameHeartDesc = `
    <p>As a bonus action, you encrust your heart with the soul of hellfire. Your hp re-fills to its maximum value, then you
    gain an additional 200 temp hp. However, you take 6d20 continuous damage, which increases by a 6d20 at the start of 
    each of your subsequent turns, to a maximum of 30d20 damage. This damage is hellfire.</p>
    <p>While burning under hellfire, all attacks you make with - i. unarmed strikes, ii. spells dealing fire damage, 
    iii. rare or better weapons attuned to you and iv. weapons summoned by spells or melee spell attacks deal an extra 
    hellfire damage equal to the number of d20s of your continuous self-damage. This hellfire damage has a 5ft AoE.<p/>
    <p>Once activated, this cannot be deactivated until you fall unconscious, when the hellfire immediately stops. After you
    wake up again, you must roll one hit die and reduce your maximum hp by the amount rolled. HP lost this way cannot be 
    restored by anything short of a wish spell.</p>`;

    const heartOfTheFlame = {
        "name"             : "Heart of the flame",
        "elementalAffinity": "fire",
        "racialAffinity"   : "devils",
        "flavour"          : flameHeartFlavour,
        "description"      : flameHeartDesc,
    };

    const voidHeartFlavour = `
    Underneath the black and cold stars, you stare into the void of the darkest reaches of the shadowfell, allowing your
    soul to comfort in its emptiness. Aeons ago, an immortal walked this path to become the first higher vampire, the 
    original, the SanguineArch. Now your soul does the same, walking into the night, into a world that cannot hold...`;

    const voidHeartDesc = `
    <p>As a bonus action, you open your heart to the innermost darkness of the shadowfell. Immediately as you do this, 
    your hp falls to zero. You then roll a d4. Every creature other than you within 20ft of you looses 2 + the number 
    rolled (max) hp, and you gain temp hp equal to the number of creatures times the number rolled. On every subsequent 
    turn of yours, the dice you roll increases - until it caps at 1d12 - as does the range and constant modifier, to 
    60ft and +6 respectively.<p/>
    <p>On the first turn that the effect doesn't find any victims it ends, and you loose all tmp HP gained. While the 
    effect is active you are considered a (higher) vampire and cannot heal in any way that doesn't involve reducing the 
    max HP of some other creature. Max HP lost by this effect cannot be restored by any way short of the wish spell.</p>`;

    const heartOfTheVoid = {
        "name"             : "Heart of the Void",
        "elementalAffinity": "necrotic",
        "racialAffinity"   : "vampires",
        "flavour"          : voidHeartFlavour,
        "description"      : voidHeartDesc,
    };

})();