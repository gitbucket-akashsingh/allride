/**
 * POST /api/v1/ai/disputes/resolve
 *
 * @typedef {"OVERCHARGE"|"CANCELLATION_FEE"|"LOST_ITEM"} DisputeType
 *
 * @typedef {Object} DisputeResolveRequest
 * @property {DisputeType} disputeType
 * @property {string} [rideId]
 * @property {string} message
 * @property {string} [conversationId]
 *
 * @typedef {Object} RideContext
 * @property {string} rideId
 * @property {string} pickup
 * @property {string} dropoff
 * @property {string} startedAt
 * @property {string} completedAt
 * @property {number} quotedFare
 * @property {number} chargedFare
 * @property {string} paymentStatus
 *
 * @typedef {Object} PolicyCitation
 * @property {string} docId
 * @property {string} title
 * @property {string} snippet
 * @property {number} score
 *
 * @typedef {Object} Resolution
 * @property {"FULL_REFUND"|"PARTIAL_REFUND"|"DENIED"|"ESCALATE"} decision
 * @property {number} [refundAmount]
 * @property {number} confidence
 * @property {string} reasoning
 *
 * @typedef {Object} DisputeResolveResponse
 * @property {string} conversationId
 * @property {RideContext} rideContext
 * @property {PolicyCitation[]} policyCitations
 * @property {Resolution} resolution
 * @property {string} assistantMessage
 */

/**
 * POST /api/v1/ai/dispatcher/run
 *
 * @typedef {Object} DispatcherRunRequest
 * @property {string} zoneId
 *
 * @typedef {Object} ToolCall
 * @property {string} tool
 * @property {Object} input
 * @property {Object} output
 * @property {number} durationMs
 *
 * @typedef {Object} ZoneOutcome
 * @property {string} zoneId
 * @property {string} zoneName
 * @property {number} surgeMultiplier
 * @property {number} driversNotified
 * @property {string} etaImprovement
 *
 * @typedef {Object} DispatcherRunResponse
 * @property {string} runId
 * @property {string} zoneId
 * @property {Array<{type:"thought"|"tool"|"outcome", content?:string, toolCall?:ToolCall, outcome?:ZoneOutcome}>} steps
 */

export {};