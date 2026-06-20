export const DISPATCHER_ZONES = [
    { id: "HTC-01", name: "Hitech City" },
    { id: "GCB-02", name: "Gachibowli" },
    { id: "APT-03", name: "Airport Zone" },
  ];
  
  export const MOCK_AGENT_STEPS = [
    { type: "thought", content: "Hitech City demand/supply ratio is 2.4x. Rain expected soon." },
    {
      type: "tool",
      toolCall: {
        tool: "getDriverAvailability",
        input: { zoneId: "HTC-01" },
        output: { availableDrivers: 3, pendingRequests: 18 },
        durationMs: 42,
      },
    },
    {
      type: "tool",
      toolCall: {
        tool: "getWeatherForecast",
        input: { lat: 17.45, lng: 78.38 },
        output: { condition: "Rain", startsInMinutes: 25 },
        durationMs: 68,
      },
    },
    { type: "thought", content: "Activating surge pricing and notifying idle drivers." },
    {
      type: "tool",
      toolCall: {
        tool: "updateDynamicPricingMultiplier",
        input: { zoneId: "HTC-01", multiplier: 1.8 },
        output: { applied: true, newMultiplier: 1.8 },
        durationMs: 31,
      },
    },
    {
      type: "tool",
      toolCall: {
        tool: "notifyIdleDrivers",
        input: { zoneId: "HTC-01", radiusKm: 3 },
        output: { notified: 12 },
        durationMs: 55,
      },
    },
    {
      type: "outcome",
      outcome: {
        zoneId: "HTC-01",
        zoneName: "Hitech City",
        surgeMultiplier: 1.8,
        driversNotified: 12,
        etaImprovement: "~4 min faster pickup",
      },
    },
  ];


  /** @type {Record<string, { lat: number, lng: number, demandRatio: number, drivers: number, requests: number, multiplier: number, notified: number, eta: string, weather: string }>} */
export const ZONE_AGENT_PROFILES = {
  "HTC-01": {
    lat: 17.45,
    lng: 78.38,
    demandRatio: 2.4,
    drivers: 3,
    requests: 18,
    multiplier: 1.8,
    notified: 12,
    eta: "~4 min faster pickup",
    weather: "Rain in 25 min",
  },
  "GCB-02": {
    lat: 17.44,
    lng: 78.35,
    demandRatio: 1.6,
    drivers: 7,
    requests: 11,
    multiplier: 1.4,
    notified: 6,
    eta: "~2 min faster pickup",
    weather: "Clear, 31°C",
  },
  "APT-03": {
    lat: 17.24,
    lng: 78.43,
    demandRatio: 3.1,
    drivers: 2,
    requests: 24,
    multiplier: 2.2,
    notified: 18,
    eta: "~6 min faster pickup",
    weather: "Light rain in 40 min",
  },
};

/**
 * Build agent steps for a zone — mirrors future DispatcherRunResponse.steps
 * @param {string} zoneId
 * @returns {import("../api/contracts").DispatcherRunResponse["steps"]}
 */
export function getAgentStepsForZone(zoneId) {
  const zone = DISPATCHER_ZONES.find((z) => z.id === zoneId) ?? DISPATCHER_ZONES[0];
  const profile = ZONE_AGENT_PROFILES[zone.id] ?? ZONE_AGENT_PROFILES["HTC-01"];

  return [
    {
      type: "thought",
      content: `${zone.name} demand/supply ratio is ${profile.demandRatio}x. ${profile.weather}.`,
    },
    {
      type: "tool",
      toolCall: {
        tool: "getDriverAvailability",
        input: { zoneId: zone.id },
        output: {
          availableDrivers: profile.drivers,
          pendingRequests: profile.requests,
        },
        durationMs: 42,
      },
    },
    {
      type: "tool",
      toolCall: {
        tool: "getWeatherForecast",
        input: { lat: profile.lat, lng: profile.lng },
        output: { summary: profile.weather },
        durationMs: 68,
      },
    },
    {
      type: "thought",
      content: "Activating surge pricing and notifying idle drivers in nearby radius.",
    },
    {
      type: "tool",
      toolCall: {
        tool: "updateDynamicPricingMultiplier",
        input: { zoneId: zone.id, multiplier: profile.multiplier },
        output: { applied: true, newMultiplier: profile.multiplier },
        durationMs: 31,
      },
    },
    {
      type: "tool",
      toolCall: {
        tool: "notifyIdleDrivers",
        input: { zoneId: zone.id, radiusKm: 3 },
        output: { notified: profile.notified },
        durationMs: 55,
      },
    },
    {
      type: "outcome",
      outcome: {
        zoneId: zone.id,
        zoneName: zone.name,
        surgeMultiplier: profile.multiplier,
        driversNotified: profile.notified,
        etaImprovement: profile.eta,
      },
    },
  ];
}