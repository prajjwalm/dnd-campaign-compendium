/**
 * Returns the zone the rating belongs to. This zone is used while rendering,
 * i.e. it is shown on the site, hence the export.
 *
 * It may be also used to influence forgetfulness and forgiveness. For the
 * latter, it may be used to determine buffers while for the former it acts as
 * a barrier. That's why it can't be on the rendering code either.
 */
export function getZone(rating: number)
{
    return Math.sign(rating) * Math.floor((Math.abs(rating) + 2) / 3);
}