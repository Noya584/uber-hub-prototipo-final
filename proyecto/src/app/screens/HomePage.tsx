import { useNavigate } from 'react-router';
import { historyEntries } from '../data/mockData';

const groupMeta: Record<string, { color: string; pillBg: string; pillText: string }> = {
  Familia: { color: '#9C27B0', pillBg: 'rgba(156,39,176,0.25)', pillText: '#d49ee8' },
  Trabajo: { color: '#378ADD', pillBg: 'rgba(55,138,221,0.25)', pillText: '#90bff0' },
  Amigos: { color: '#EF9F27', pillBg: 'rgba(239,159,39,0.25)', pillText: '#f5c97a' },
};

const enriched = [
  { ...historyEntries[0], group: 'Familia' },
  { passenger: 'Matías', origin: 'Estación Central', destination: 'Oficina Central', duration: '19 min', amount: 4400, group: 'Trabajo' },
  { ...historyEntries[2], group: 'Familia' },
  { passenger: 'Diego', origin: 'Barrio Italia', destination: 'Aeropuerto', duration: '31 min', amount: 3500, group: 'Amigos' },
  { ...historyEntries[4], group: 'Familia' },
  { passenger: 'Carolina', origin: 'Providencia', destination: 'Las Condes', duration: '14 min', amount: 2400, group: 'Trabajo' },
];

const totalGastado = enriched.reduce((sum, r) => sum + r.amount, 0);

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Hero izquierdo */}
      <div className="flex-1 flex flex-col justify-center px-16 bg-white">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
          Uber Hub · Gestión grupal
        </p>
        <h1 className="text-5xl font-bold text-black leading-tight mb-5" style={{ letterSpacing: -1.5 }}>
          Todos los viajes,<br />desde un lugar
        </h1>
        <p className="text-base text-gray-500 leading-relaxed mb-8" style={{ maxWidth: 340 }}>
          Coordina y paga los viajes de tu familia o equipo sin perder el hilo. Un solo gestor para todos.
        </p>
        <button
          onClick={() => navigate('/grupos')}
          className="flex items-center gap-2 bg-black text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
          style={{ width: 'fit-content' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Ir a Grupos
        </button>
      </div>

      {/* Panel derecho — fondo negro */}
      <div
        className="flex flex-col flex-shrink-0"
        style={{ width: 300, background: '#000', borderLeft: '1px solid #1a1a1a' }}
      >
        {/* Cabecera */}
        <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #1f1f1f' }}>
          <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
            Últimos viajes
          </p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
            Todos los grupos · junio 2025
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 8, padding: '10px 14px', borderBottom: '1px solid #1f1f1f' }}>
          <div style={{ flex: 1, background: '#111', border: '1px solid #222', borderRadius: 8, padding: '7px 10px' }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 3 }}>Total gastado</p>
            <p style={{ fontSize: 15, fontWeight: 500, color: '#fff' }}>
              ${totalGastado.toLocaleString('es-CL')}
            </p>
          </div>
          <div style={{ flex: 1, background: '#111', border: '1px solid #222', borderRadius: 8, padding: '7px 10px' }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 3 }}>Viajes</p>
            <p style={{ fontSize: 15, fontWeight: 500, color: '#06C167' }}>{enriched.length}</p>
          </div>
        </div>

        {/* Lista */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {enriched.map((ride, i) => {
            const meta = groupMeta[ride.group];
            const initials = ride.passenger.charAt(0);
            return (
              <div
                key={i}
                style={{ padding: '9px 14px', borderBottom: '1px solid #1a1a1a', cursor: 'pointer', transition: 'background 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#111')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: meta.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0,
                    }}>
                      {initials}
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 500, color: '#fff', lineHeight: 1 }}>{ride.passenger}</p>
                      <div style={{ marginTop: 3 }}>
                        <span style={{
                          fontSize: 9, fontWeight: 600, padding: '1px 5px', borderRadius: 4,
                          background: meta.pillBg, color: meta.pillText,
                        }}>
                          {ride.group}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>
                    ${ride.amount.toLocaleString('es-CL')}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: meta.color, flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 82 }}>
                    {ride.origin}
                  </span>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 82 }}>
                    {ride.destination}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>
                    {ride.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{ padding: '10px 14px', borderTop: '1px solid #1f1f1f', cursor: 'pointer' }}
          onClick={() => navigate('/grupos?tab=gastos')}
        >
          <span style={{ fontSize: 12, color: '#06C167', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Ver todos los gastos
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }}>
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
