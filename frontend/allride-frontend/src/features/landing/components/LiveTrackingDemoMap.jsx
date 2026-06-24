import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import Map, { Marker, Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import { getDirections } from "@/features/map/services/directionsService";
import {
  DEMO_PICKUP,
  DEMO_DESTINATION,
  DEMO_MAP_VIEW,
  DEMO_ROUTE_GEOJSON,
} from "@/features/landing/constants/liveTrackingDemoData";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const HAS_MAPBOX = Boolean(MAPBOX_TOKEN);

function getPointAlongLine(coordinates, t) {
  if (!coordinates?.length) return null;

  const clamped = Math.min(1, Math.max(0, t));
  const last = coordinates.length - 1;
  const pos = clamped * last;
  const i = Math.floor(pos);
  const frac = pos - i;

  if (i >= last) {
    const [lng, lat] = coordinates[last];
    return { longitude: lng, latitude: lat, bearing: 0 };
  }

  const [lng1, lat1] = coordinates[i];
  const [lng2, lat2] = coordinates[i + 1];
  const longitude = lng1 + (lng2 - lng1) * frac;
  const latitude = lat1 + (lat2 - lat1) * frac;
  const bearing = (Math.atan2(lng2 - lng1, lat2 - lat1) * 180) / Math.PI;

  return { longitude, latitude, bearing };
}

function MapLoadingPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <p className="text-xs text-zinc-400">Loading map…</p>
      </div>
    </div>
  );
}

function CssDemoMap() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_35%_45%,#3b82f6_0%,transparent_55%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,#f59e0b_0%,transparent_45%)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 300 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M 55 310 Q 95 240 130 200 T 210 95"
          stroke="#3b82f6"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>

      <div className="absolute bottom-[22%] left-[18%] flex flex-col items-center">
        <div className="h-3 w-3 rounded-full bg-green-500 ring-4 ring-green-500/30" />
        <span className="mt-1 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold text-white/90">
          {DEMO_PICKUP.short}
        </span>
      </div>

      <div className="absolute top-[22%] right-[16%] flex flex-col items-center">
        <div className="h-3 w-3 rounded-full bg-red-500 ring-4 ring-red-500/30" />
        <span className="mt-1 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold text-white/90">
          {DEMO_DESTINATION.short}
        </span>
      </div>

      <motion.div
        className="absolute top-[42%] left-[48%] flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-lg"
        animate={{ x: [0, 12, 24, 12, 0], y: [0, -8, -14, -8, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <Car size={16} className="text-white" />
      </motion.div>
    </div>
  );
}

function MapboxDemoMap() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [routeGeoJson, setRouteGeoJson] = useState(DEMO_ROUTE_GEOJSON);
  const [carPos, setCarPos] = useState(() =>
    getPointAlongLine(DEMO_ROUTE_GEOJSON.coordinates, 0.35)
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const result = await getDirections(DEMO_PICKUP, DEMO_DESTINATION);
        if (!cancelled && result?.geometry?.coordinates?.length) {
          setRouteGeoJson(result.geometry);
          setCarPos(getPointAlongLine(result.geometry.coordinates, 0.35));
        }
      } catch {
        /* keep fallback route */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Resize only on window resize — NOT on scroll (prevents flicker)
  useEffect(() => {
    const resizeMap = () => mapRef.current?.resize();

    window.addEventListener("resize", resizeMap);
    resizeMap();

    return () => window.removeEventListener("resize", resizeMap);
  }, [mapReady]);

  // Throttled car animation (20fps) — less React re-render jank
  useEffect(() => {
    const coords = routeGeoJson?.coordinates;
    if (!coords?.length) return;

    const start = performance.now();
    let frameId;
    let lastUpdate = 0;

    const tick = (now) => {
      if (now - lastUpdate > 50) {
        const elapsed = (now - start) / 1000;
        const t = 0.2 + ((elapsed % 14) / 14) * 0.65;
        setCarPos(getPointAlongLine(coords, t));
        lastUpdate = now;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [routeGeoJson]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {!mapReady && <MapLoadingPlaceholder />}

      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          mapReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <Map
          ref={mapRef}
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={DEMO_MAP_VIEW}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          style={{ width: "100%", height: "100%" }}
          dragPan={false}
          scrollZoom={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          keyboard={false}
          attributionControl={false}
          antialias
          fadeDuration={300}
          onLoad={() => {
            setMapReady(true);
            requestAnimationFrame(() => mapRef.current?.resize());
          }}
        >
          <Source
            id="demo-route"
            type="geojson"
            data={{
              type: "Feature",
              properties: {},
              geometry: routeGeoJson,
            }}
          >
            <Layer
              id="demo-route-glow"
              type="line"
              paint={{
                "line-color": "#3b82f6",
                "line-width": 10,
                "line-opacity": 0.35,
                "line-blur": 2,
              }}
            />
            <Layer
              id="demo-route-line"
              type="line"
              paint={{
                "line-color": "#3b82f6",
                "line-width": 5,
              }}
            />
          </Source>

          <Marker
            longitude={DEMO_PICKUP.longitude}
            latitude={DEMO_PICKUP.latitude}
            anchor="bottom"
          >
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 ring-4 ring-green-500/40" />
              <span className="mt-1 whitespace-nowrap rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-white">
                {DEMO_PICKUP.short}
              </span>
            </div>
          </Marker>

          <Marker
            longitude={DEMO_DESTINATION.longitude}
            latitude={DEMO_DESTINATION.latitude}
            anchor="bottom"
          >
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 ring-4 ring-red-500/40" />
              <span className="mt-1 whitespace-nowrap rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-white">
                {DEMO_DESTINATION.short}
              </span>
            </div>
          </Marker>

          {carPos && (
            <Marker
              longitude={carPos.longitude}
              latitude={carPos.latitude}
              anchor="center"
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-lg"
                style={{ transform: `rotate(${carPos.bearing ?? 0}deg)` }}
              >
                <Car size={16} className="text-white" />
              </div>
            </Marker>
          )}
        </Map>
      </div>
    </div>
  );
}

function LiveTrackingDemoMap() {
  return HAS_MAPBOX ? <MapboxDemoMap /> : <CssDemoMap />;
}

export default LiveTrackingDemoMap;