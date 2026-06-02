import { useState } from "react";
import useMapStore from "@/features/map/store/mapStore";
import RideMap from "@/features/map/components/RideMap";

// ── Mapbox geocoding helper ─────────────────────────────────────────────────
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

async function geocodeAddress(query) {
  if (!MAPBOX_TOKEN || !query.trim()) return null;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query,
  )}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.features?.length) {
    const [longitude, latitude] = data.features[0].center;
    return { latitude, longitude, label: data.features[0].place_name };
  }
  return null;
}

// ── Suggestion fetcher ──────────────────────────────────────────────────────
async function fetchSuggestions(query) {
  if (!MAPBOX_TOKEN || query.length < 2) return [];
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query,
  )}.json?access_token=${MAPBOX_TOKEN}&limit=5&types=place,address,poi`;
  const res = await fetch(url);
  const data = await res.json();
  return data.features || [];
}

// ── Main Component ──────────────────────────────────────────────────────────
function RiderHomePage() {
  const [pickupInput, setPickupInput] = useState("");
  const [dropInput, setDropInput] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null); // null | "searching" | "booked"

  const setPickup = useMapStore((s) => s.setPickup);
  const setDestination = useMapStore((s) => s.setDestination);
  const eta = useMapStore((s) => s.eta);
  const distance = useMapStore((s) => s.distance);
  const pickup = useMapStore((s) => s.pickup);
  const destination = useMapStore((s) => s.destination);

  // Pickup input change
  const handlePickupChange = async (e) => {
    const val = e.target.value;
    setPickupInput(val);
    const suggestions = await fetchSuggestions(val);
    setPickupSuggestions(suggestions);
  };

  // Drop input change
  const handleDropChange = async (e) => {
    const val = e.target.value;
    setDropInput(val);
    const suggestions = await fetchSuggestions(val);
    setDropSuggestions(suggestions);
  };

  // Select pickup suggestion
  const selectPickup = (feature) => {
    const [longitude, latitude] = feature.center;
    setPickup({ latitude, longitude });
    setPickupInput(feature.place_name);
    setPickupSuggestions([]);
  };

  // Select drop suggestion
  const selectDrop = (feature) => {
    const [longitude, latitude] = feature.center;
    setDestination({ latitude, longitude });
    setDropInput(feature.place_name);
    setDropSuggestions([]);
  };

  // Book ride handler
  const handleBookRide = async () => {
    if (!pickupInput || !dropInput) return;
    setLoading(true);
    try {
      // If coordinates not yet set via suggestion, geocode now
      if (!pickup) {
        const p = await geocodeAddress(pickupInput);
        if (p) setPickup(p);
      }
      if (!destination) {
        const d = await geocodeAddress(dropInput);
        if (d) setDestination(d);
      }
      setBookingStatus("searching");
      // Simulate driver search (replace with real API call)
      setTimeout(() => setBookingStatus("booked"), 3000);
    } finally {
      setLoading(false);
    }
  };

  const canBook = pickupInput.trim() && dropInput.trim();

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 64px)",
        width: "100%",
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      {/* ── LEFT PANEL ───────────────────────────────────────────── */}
      <div
        style={{
          width: "380px",
          minWidth: "340px",
          background: "linear-gradient(180deg, #111827 0%, #0f172a 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          padding: "28px 24px",
          gap: "20px",
          overflowY: "auto",
          zIndex: 10,
        }}
      >
        {/* Title */}
        <div>
          <h2
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Book Your Ride 🚕
          </h2>
          <p
            style={{ color: "#6b7280", fontSize: "13px", margin: "6px 0 0 0" }}
          >
            Enter locations and hit Book Now
          </p>
        </div>

        {/* ── PICKUP INPUT ── */}
        <div style={{ position: "relative" }}>
          <label
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
            }}
          >
            📍 Pickup Location
          </label>
          <input
            type="text"
            placeholder="Enter pickup location..."
            value={pickupInput}
            onChange={handlePickupChange}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1.5px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#f59e0b")}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.1)";
              setTimeout(() => setPickupSuggestions([]), 200);
            }}
          />
          {/* Pickup Suggestions */}
          {pickupSuggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#1f2937",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                marginTop: "6px",
                zIndex: 50,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              {pickupSuggestions.map((f) => (
                <button
                  key={f.id}
                  onMouseDown={() => selectPickup(f)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    color: "#d1d5db",
                    fontSize: "13px",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(245,158,11,0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <span>📍</span>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.place_name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── DROP INPUT ── */}
        <div style={{ position: "relative" }}>
          <label
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
            }}
          >
            🏁 Drop Location
          </label>
          <input
            type="text"
            placeholder="Enter drop location..."
            value={dropInput}
            onChange={handleDropChange}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1.5px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#ef4444")}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.1)";
              setTimeout(() => setDropSuggestions([]), 200);
            }}
          />
          {/* Drop Suggestions */}
          {dropSuggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#1f2937",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                marginTop: "6px",
                zIndex: 50,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              {dropSuggestions.map((f) => (
                <button
                  key={f.id}
                  onMouseDown={() => selectDrop(f)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    color: "#d1d5db",
                    fontSize: "13px",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <span>🏁</span>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.place_name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── ETA & DISTANCE CARD (shows when route is drawn) ── */}
        {(eta || distance) && (
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <div
              style={{
                flex: 1,
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "14px",
                padding: "14px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#f59e0b",
                  fontSize: "22px",
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                {eta ? `${Math.round(eta)} min` : "--"}
              </p>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "11px",
                  margin: "4px 0 0 0",
                }}
              >
                ETA
              </p>
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "14px",
                padding: "14px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#818cf8",
                  fontSize: "22px",
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                {distance ? `${(distance / 1000).toFixed(1)} km` : "--"}
              </p>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "11px",
                  margin: "4px 0 0 0",
                }}
              >
                Distance
              </p>
            </div>
          </div>
        )}

        {/* ── RIDE TYPE SELECTOR ── */}
        <div>
          <label
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "10px",
            }}
          >
            🚗 Ride Type
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { icon: "🚕", label: "Standard", price: "₹" },
              { icon: "🚙", label: "Premium", price: "₹₹" },
              { icon: "🚐", label: "XL", price: "₹₹₹" },
            ].map((type, i) => (
              <button
                key={type.label}
                style={{
                  flex: 1,
                  padding: "12px 8px",
                  borderRadius: "14px",
                  border:
                    i === 0
                      ? "1.5px solid #f59e0b"
                      : "1.5px solid rgba(255,255,255,0.08)",
                  background:
                    i === 0
                      ? "rgba(245,158,11,0.12)"
                      : "rgba(255,255,255,0.03)",
                  color: i === 0 ? "#f59e0b" : "#9ca3af",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: "22px" }}>{type.icon}</span>
                <span style={{ fontSize: "11px", fontWeight: 700 }}>
                  {type.label}
                </span>
                <span style={{ fontSize: "11px" }}>{type.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── BOOK NOW BUTTON ── */}
        {bookingStatus === null && (
          <button
            onClick={handleBookRide}
            disabled={!canBook || loading}
            style={{
              padding: "16px",
              borderRadius: "16px",
              border: "none",
              background: canBook
                ? "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
                : "rgba(255,255,255,0.06)",
              color: canBook ? "white" : "#4b5563",
              fontSize: "16px",
              fontWeight: 800,
              cursor: canBook ? "pointer" : "not-allowed",
              letterSpacing: "0.3px",
              transition: "all 0.3s",
              transform: canBook ? "none" : "none",
              boxShadow: canBook ? "0 8px 24px rgba(245,158,11,0.3)" : "none",
            }}
            onMouseEnter={(e) => {
              if (canBook) e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {loading ? "📡 Locating..." : "🚀 Book Now"}
          </button>
        )}

        {/* ── SEARCHING STATUS ── */}
        {bookingStatus === "searching" && (
          <div
            style={{
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid rgba(245,158,11,0.2)",
                borderTop: "3px solid #f59e0b",
                borderRadius: "50%",
                margin: "0 auto 12px",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ color: "#f59e0b", fontWeight: 700, margin: 0 }}>
              Searching for drivers...
            </p>
            <p
              style={{
                color: "#6b7280",
                fontSize: "12px",
                margin: "6px 0 0 0",
              }}
            >
              This usually takes 10–30 seconds
            </p>
          </div>
        )}

        {/* ── BOOKED STATUS ── */}
        {bookingStatus === "booked" && (
          <div
            style={{
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>✅</div>
            <p
              style={{
                color: "#4ade80",
                fontWeight: 800,
                margin: 0,
                fontSize: "16px",
              }}
            >
              Ride Booked!
            </p>
            <p
              style={{
                color: "#6b7280",
                fontSize: "12px",
                margin: "6px 0 0 0",
              }}
            >
              Driver is on the way
            </p>
            <button
              onClick={() => setBookingStatus(null)}
              style={{
                marginTop: "12px",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#9ca3af",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Book Another Ride
            </button>
          </div>
        )}
      </div>

      {/* ── RIGHT PANEL — MAP ─────────────────────────────────────── */}

      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <RideMap />
      </div>

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #4b5563; }
      `}</style>
    </div>
  );
}

export default RiderHomePage;
