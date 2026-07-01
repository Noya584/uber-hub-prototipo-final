import { useEffect, useRef } from 'react';
import { members, groups } from '../data/mockData';

// Ubicaciones reales en Santiago de Chile
const memberLocations: Record<string, { lat: number; lng: number; destination?: { lat: number; lng: number } }> = {
  sofia: {
    lat: -33.4489,
    lng: -70.6693,
    destination: { lat: -33.4372, lng: -70.6506 }, // Providencia (simulando colegio)
  },
  luis: {
    lat: -33.4569,
    lng: -70.6483,
    destination: { lat: -33.4254, lng: -70.6149 }, // Las Condes (simulando oficina)
  },
  pablo: {
    lat: -33.4701,
    lng: -70.6441,
  },
  juan: {
    lat: -33.4612,
    lng: -70.6827,
  },
};

export function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Cargar Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Cargar Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = (window as any).L;
      if (!mapRef.current) return;

      // Inicializar mapa centrado en Santiago
      const map = L.map(mapRef.current, {
        center: [-33.4569, -70.6483],
        zoom: 13,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Tile layer oscuro estilo Uber
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      // Agregar marcadores y rutas por miembro
      members.forEach((member) => {
        const loc = memberLocations[member.id];
        const group = groups.find((g) => g.id === member.group);
        if (!loc || !group) return;

        const statusColor =
          member.status === 'active'
            ? '#06C167'
            : member.status === 'pending'
            ? '#FFC107'
            : '#9E9E9E';

        // Ícono personalizado con iniciales
        const icon = L.divIcon({
          className: '',
          html: `
            <div style="
              width: 36px; height: 36px;
              border-radius: 50%;
              background-color: ${group.color};
              border: 2px solid white;
              display: flex; align-items: center; justify-content: center;
              font-size: 13px; font-weight: 600; color: white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.5);
              position: relative;
            ">
              ${member.avatar}
              <div style="
                position: absolute; bottom: -2px; right: -2px;
                width: 10px; height: 10px;
                border-radius: 50%;
                background: ${statusColor};
                border: 1.5px solid black;
              "></div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);

        // Tooltip con nombre y ETA
        const tooltipContent = member.currentRide
          ? `<b>${member.name}</b> · ${member.currentRide.eta} min`
          : `<b>${member.name}</b> · Sin viaje`;

        marker.bindTooltip(tooltipContent, {
          permanent: false,
          direction: 'top',
          className: 'uber-tooltip',
        });

        // Ruta punteada si tiene viaje activo
        if (loc.destination && member.currentRide) {
          const routeLine = L.polyline(
            [
              [loc.lat, loc.lng],
              [loc.destination.lat, loc.destination.lng],
            ],
            {
              color: group.color,
              weight: 3,
              opacity: 0.7,
              dashArray: '8, 6',
            }
          ).addTo(map);

          // Ícono de destino (estrella)
          const destIcon = L.divIcon({
            className: '',
            html: `
              <div style="
                width: 22px; height: 22px;
                border-radius: 50%;
                background: white;
                border: 2px solid ${group.color};
                display: flex; align-items: center; justify-content: center;
                font-size: 10px;
                box-shadow: 0 1px 4px rgba(0,0,0,0.4);
              ">★</div>
            `,
            iconSize: [22, 22],
            iconAnchor: [11, 11],
          });

          L.marker([loc.destination.lat, loc.destination.lng], { icon: destIcon })
            .addTo(map)
            .bindTooltip(`Destino: ${member.currentRide.destination}`, { direction: 'top' });
        }
      });

      // CSS para tooltips estilo Uber
      const style = document.createElement('style');
      style.textContent = `
        .uber-tooltip {
          background: rgba(0,0,0,0.85) !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          color: white !important;
          font-size: 12px !important;
          padding: 4px 8px !important;
          border-radius: 4px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4) !important;
        }
        .uber-tooltip::before { display: none !important; }
        .leaflet-control-zoom a {
          background: #1a1a1a !important;
          color: white !important;
          border-color: rgba(255,255,255,0.15) !important;
        }
        .leaflet-control-attribution {
          background: rgba(0,0,0,0.6) !important;
          color: rgba(255,255,255,0.4) !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: rgba(255,255,255,0.4) !important; }
      `;
      document.head.appendChild(style);
    };

    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />

      {/* Leyenda */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-2 rounded text-xs space-y-1 z-[1000]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#06C167]" />
          <span>En viaje</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FFC107]" />
          <span>Pendiente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#9E9E9E]" />
          <span>Sin viaje</span>
        </div>
      </div>


    </div>
  );
}
