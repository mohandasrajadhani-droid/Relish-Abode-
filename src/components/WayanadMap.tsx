"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { directionsLink, site, spots } from "@/content/site";

/** Interactive Wayanad map: the homestay plus nearby places. Leaflet + free CARTO/OpenStreetMap tiles, no API key. */
export default function WayanadMap({ active, onSelect }: { active: number | null; onSelect: (i: number) => void }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef<Marker[]>([]);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el.current || map.current) return;

      const m = L.map(el.current, { scrollWheelZoom: false, zoomSnap: 0.25, zoomControl: true, attributionControl: true });
      map.current = m;
      m.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 18,
        subdomains: "abcd",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(m);

      L.marker([site.geo.lat, site.geo.lng], {
        icon: L.divIcon({
          className: "",
          html: '<div class="ra-pin-home" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v11h14V9"/></svg></div>',
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        }),
        zIndexOffset: 1000,
        title: site.name,
        alt: `${site.name} homestay`,
      })
        .addTo(m)
        .bindPopup(
          `<strong>${site.name}</strong><br/>Your stay in Puliyarmala<br/><a href="${site.mapsPinLink}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>`,
        );

      markers.current = spots.map((s, i) =>
        L.marker([s.lat, s.lng], {
          icon: L.divIcon({ className: "", html: `<div class="ra-pin">${i + 1}</div>`, iconSize: [28, 28], iconAnchor: [14, 14] }),
          title: s.name,
          alt: s.name,
        })
          .addTo(m)
          .bindPopup(
            `<strong>${s.name}</strong><br/>About ${s.km} km from us<br/><a href="${directionsLink(s.query)}" target="_blank" rel="noopener noreferrer">Directions</a>`,
          )
          .on("click", () => onSelectRef.current(i)),
      );

      const bounds = L.latLngBounds([[site.geo.lat, site.geo.lng], ...spots.map((s) => [s.lat, s.lng] as [number, number])]);
      m.fitBounds(bounds, { padding: [24, 24] });
      requestAnimationFrame(() => {
        m.invalidateSize();
        m.fitBounds(bounds, { padding: [24, 24] });
      });
    })();
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      markers.current = [];
    };
  }, []);

  useEffect(() => {
    if (active === null || !map.current) return;
    const mk = markers.current[active];
    if (!mk) return;
    markers.current.forEach((x, i) => x.getElement()?.firstElementChild?.classList.toggle("is-active", i === active));
    map.current.flyTo(mk.getLatLng(), Math.max(map.current.getZoom(), 11), { duration: 0.6 });
    mk.openPopup();
  }, [active]);

  return (
    <div
      ref={el}
      role="region"
      aria-label="Map of Wayanad showing Relish Abode and nearby places to visit"
      className="h-full w-full"
    />
  );
}
