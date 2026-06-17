import { useState, useRef } from "react";
import { MapPin, X, LocateFixed, Loader } from "lucide-react";
import { searchPlaces, reverseGeocode } from "@/features/map/services/mapboxService";
import { getCurrentPosition } from "@/features/map/services/geolocationService";

const LocationAutocomplete = ({ label, placeholder, icon, onSelect, showCurrentLocation = false }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [locating, setLocating] = useState(false);
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    clearTimeout(debounceRef.current);
    if (!val.trim()) { setSuggestions([]); return; }
    debounceRef.current = setTimeout(async () => {
      const results = await searchPlaces(val);
      setSuggestions(results);
    }, 300);
  };

  const handleSelect = (feature) => {
    const [longitude, latitude] = feature.center;
    setInput(feature.place_name);
    setSuggestions([]);
    onSelect({ label: feature.place_name, latitude, longitude });
  };

  const handleClear = () => {
    setInput("");
    setSuggestions([]);
    onSelect(null);
  };

  const handleUseCurrentLocation = async () => {
    setLocating(true);
    try {
      const { latitude, longitude } = await getCurrentPosition();
      const feature = await reverseGeocode(longitude, latitude);
      const locationLabel = feature?.place_name ?? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
      setInput(locationLabel);
      setSuggestions([]);
      onSelect({ label: locationLabel, latitude, longitude });
    } catch {
      alert("Could not get your location. Please allow location access.");
    } finally {
      setLocating(false);
    }
  };

  return (
    <div className="relative">
      <p className="text-[10px] text-zinc-400 font-medium mb-1 uppercase tracking-wide">{label}</p>
      <div
        className={`flex items-center gap-2 bg-zinc-100 rounded-xl px-3 py-2 border-2 transition-all ${
          isFocused ? "border-black bg-white shadow-sm" : "border-transparent"
        }`}
      >
        <span className="text-zinc-400 shrink-0">{icon}</span>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setSuggestions([]), 200);
          }}
          className="flex-1 bg-transparent outline-none text-xs font-medium text-black placeholder:text-zinc-400"
        />
        {input && (
          <button onClick={handleClear} className="text-zinc-400 hover:text-black transition">
            <X size={12} />
          </button>
        )}
        {showCurrentLocation && !input && (
          <button
            onClick={handleUseCurrentLocation}
            disabled={locating}
            title="Use my current location"
            className="text-zinc-400 hover:text-black transition"
          >
            {locating ? <Loader size={12} className="animate-spin" /> : <LocateFixed size={12} />}
          </button>
        )}
      </div>

      {/* Current location shortcut */}
      {isFocused && !input && showCurrentLocation && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <button
            onMouseDown={handleUseCurrentLocation}
            className="w-full px-3 py-2.5 text-left flex items-center gap-2 hover:bg-zinc-50 transition"
          >
            <LocateFixed size={12} className="text-blue-500 shrink-0" />
            <span className="text-xs text-blue-600 font-medium">Use my current location</span>
          </button>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {suggestions.map((f) => (
            <button
              key={f.id}
              onMouseDown={() => handleSelect(f)}
              className="w-full px-3 py-2 text-left flex items-start gap-2 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 transition"
            >
              <MapPin size={11} className="mt-0.5 text-zinc-400 shrink-0" />
              <span className="text-xs text-zinc-700 line-clamp-1">{f.place_name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;