export const DISPUTE_QUICK_PROMPTS = [
    {
      type: "OVERCHARGE",
      label: "Overcharge",
      message: "I was charged ₹684 but the app showed ₹520",
    },
    {
      type: "CANCELLATION_FEE",
      label: "Cancellation fee",
      message: "Why was I charged ₹50 for cancelling 2 minutes after booking?",
    },
    {
      type: "LOST_ITEM",
      label: "Lost item",
      message: "I left my phone in the car after ride AR-2847",
    },
  ];
  
  export const MOCK_RIDE_CONTEXT = {
    rideId: "AR-2847",
    pickup: "Rajiv Gandhi International Airport",
    dropoff: "DBS Technology Services, Gachibowli",
    startedAt: "Today, 9:15 AM",
    completedAt: "Today, 10:02 AM",
    quotedFare: 520,
    chargedFare: 684,
    paymentStatus: "PAID",
  };
  
  export const MOCK_POLICY_CITATIONS = [
    {
      docId: "policy-fare-4.2",
      title: "Cancellation & Fare Policy §4.2",
      snippet:
        "Fare adjustments may apply when actual route distance or toll charges exceed the initial estimate by more than 15%.",
      score: 0.91,
    },
    {
      docId: "policy-refund-2.1",
      title: "Refund Rules §2.1",
      snippet:
        "Partial refunds are issued when verified overcharge is due to route deviation or toll inclusion not shown at booking.",
      score: 0.87,
    },
  ];
  
  export const MOCK_RESOLUTION = {
    decision: "PARTIAL_REFUND",
    refundAmount: 164,
    confidence: 0.89,
    reasoning:
      "Ride logs show a longer route (+6.2 km) and one toll. Policy §4.2 allows partial adjustment for verified route variance.",
  };
  
  export const MOCK_ASSISTANT_MESSAGE =
    "Based on your ride logs and our fare policy, you qualify for a partial refund of ₹164. The extra charge is linked to route deviation and toll inclusion.";