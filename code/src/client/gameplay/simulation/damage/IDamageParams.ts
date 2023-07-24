interface IDamageParams
{
    attacksPerRound: number;
    damagePerAttack: number;

    /**
     * A numerical measure of the probability to hit, taken from the hit modifier
     * or the save DC. As things stand we can just subtract the 'defense' from
     * this while computing expected damage.
     *
     * For to-hit attacks, we just specify the to-hit value.
     */
    accuracyRating: number;
}
