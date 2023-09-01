export enum MapVertexStatus
{
    Unknown,
    Neutral,
    Friendly,
    Safe,
    Combat,
    Emergency,
    Deadly,
    Black
}

export const MapVertexStatusDescriptions: Map<MapVertexStatus, string> = new Map([
    [MapVertexStatus.Unknown,   "Unknown"],
    [MapVertexStatus.Neutral,   "Neutral"],
    [MapVertexStatus.Friendly,  "Friendly"],
    [MapVertexStatus.Safe,      "Safe Zone"],
    [MapVertexStatus.Combat,    "Hostile"],
    [MapVertexStatus.Emergency, "High Risk Combat"],
    [MapVertexStatus.Deadly,    "Deadly"],
    [MapVertexStatus.Black,     "Black"],
]);
