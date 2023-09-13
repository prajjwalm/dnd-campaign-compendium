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

export const MapVertexStatusIcons: Map<MapVertexStatus, string> = new Map([
    [MapVertexStatus.Unknown,   `<i class="fa-solid fa-circle-question"></i>`],
    [MapVertexStatus.Neutral,   `<i class="fa-solid fa-scale-balanced"></i>`],
    [MapVertexStatus.Friendly,  `<i class="fa-solid fa-handshake"></i>`],
    [MapVertexStatus.Safe,      `<i class="fa-solid fa-house-turret"></i>`],
    [MapVertexStatus.Combat,    `<i class="fa-solid fa-swords"></i>`],
    [MapVertexStatus.Emergency, `<i class="fa-regular fa-biohazard"></i>`],
    [MapVertexStatus.Deadly,    `<i class="fa-solid fa-skull-crossbones"></i>`],
    [MapVertexStatus.Black,     `<i class="fa-solid fa-scythe"></i>`],
]);
