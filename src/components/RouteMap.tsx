"use client";

import { useEffect, useRef } from "react";
import type { LayerGroup, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { site, spots, type TourDay } from "@/content/site";

/**
 * Draws one tour day: home → stops → home, with numbered pins and the km of each leg on the line.
 * Lines join the stops in order (not the exact road). The "Open route in Google Maps" link gives the road route.
 */
export default function RouteMap({ day }: { day: TourDay }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const layer = useRef<LayerGroup | null>(null);
  const L = useRef<typeof import("leaflet") | null>(null);

  const draw = () => {
    const Lf = L.current;
    const m = map.current;
    if (!Lf || !m) return;
    layer.current?.remove();
    const g = Lf.layerGroup().addTo(m);
    layer.current = g;

    const home: [number, number] = [site.geo.lat, site.geo.lng];
    const pts: [number, number][] = day.stops.map((t) => {
      const s = spots.find((x) => x.name === t.spot);
      return s ? [s.lat, s.lng] : home;
    });
    const path = [home, ...pts, home];
    const legs = [...day.stops.map((s) => s.legKm), day.returnKm];

    Lf.polyline(path, { color: "#1f3d2d", weight: 4, opacity: 0.85, dashArray: "8 8" }).addTo(g);

    // km label in the middle of each leg
    path.slice(0, -1).forEach((a, i) => {
      const b = path[i + 1];
      if (legs[i] < 8) return; // short hops: label would sit on top of the pins (shown in the list instead)
      // the drive home often runs alongside the outward road, so put its label nearer home to keep labels apart
      const t = i === path.length - 2 ? 0.8 : 0.5;
      Lf.marker([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], {
        icon: Lf.divIcon({ className: "", html: `<div class="ra-leg">${legs[i]} km</div>`, iconSize: [56, 22], iconAnchor: [28, 11] }),
        interactive: false,
        keyboard: false,
      }).addTo(g);
    });

    Lf.marker(home, {
      icon: Lf.divIcon({
        className: "",
        html: '<div class="ra-pin-home" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v11h14V9"/></svg></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      }),
      title: `${site.name} (start and finish)`,
      zIndexOffset: 1000,
    })
      .addTo(g)
      .bindPopup(`<strong>${site.name}</strong><br/>Start and finish`);

    pts.forEach((p, i) =>
      Lf.marker(p, {
        icon: Lf.divIcon({ className: "", html: `<div class="ra-pin">${i + 1}</div>`, iconSize: [28, 28], iconAnchor: [14, 14] }),
        title: day.stops[i].spot,
      })
        .addTo(g)
        .bindPopup(`<strong>${i + 1}. ${day.stops[i].spot}</strong><br/>${day.stops[i].time}`),
    );

    const fit = () => {
      m.invalidateSize();
      m.fitBounds(Lf.latLngBounds(path), { padding: [40, 40] });
    };
    fit();
    requestAnimationFrame(fit);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = (await import("leaflet")).default;
      if (cancelled || !el.current || map.current) return;
      L.current = mod;
      const m = mod.map(el.current, { scrollWheelZoom: false, zoomSnap: 0.25 });
      m.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
      mod
        .tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          maxZoom: 18,
          subdomains: "abcd",
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        })
        .addTo(m);
      map.current = m;
      draw();
    })();
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      layer.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  return <div ref={el} role="region" aria-label={`Route map: ${day.title}`} className="h-full w-full" />;
}
