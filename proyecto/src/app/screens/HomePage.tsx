import { useNavigate } from 'react-router';
import { historyEntries } from '../data/mockData';

const groupMeta: Record<string, { color: string; pillBg: string; pillText: string }> = {
  Familia: { color: '#9C27B0', pillBg: '#f3e8fb', pillText: '#6a1b9a' },
  Trabajo: { color: '#378ADD', pillBg: '#e6f1fb', pillText: '#0c447c' },
  Amigos: { color: '#EF9F27', pillBg: '#faeeda', pillText: '#633806' },
};

// Enriquecer historial con grupo y duración para el mockup
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
    <div className="flex items-center justify-center min-h-[calc(100vh-56px)] bg-gray-100 px-6">
      {/* Ventana flotante */}
      <div
        className="flex flex-col overflow-hidden bg-white"
        style={{
          width: '100%',
          maxWidth: 860,
          borderRadius: 16,
          border: '0.5px solid #e0e0e0',
          boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
        }}
      >
        {/* Topbar interno de la ventana */}
        <div
          className="flex items-center px-8 gap-8 flex-shrink-0 bg-black"
          style={{ height: 52 }}
        >
          <span
            className="text-white font-bold text-lg cursor-pointer mr-2"
            onClick={() => navigate('/')}
          >
            Uber
          </span>
          <span className="text-white text-sm font-medium border-b-2 border-white pb-0.5 cursor-pointer">
            Inicio
          </span>
          <span
            className="text-white/55 text-sm font-medium border-b-2 border-transparent hover:text-white cursor-pointer transition-colors"
            onClick={() => navigate('/grupos')}
          >
            Grupos
          </span>
          <div className="ml-auto flex items-center gap-5">
            <span className="text-white/55 text-sm">ES</span>
            <span className="text-white/55 text-sm">Ayuda</span>
            <div className="bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer">
              Coordinador ▾
            </div>
          </div>
        </div>

        {/* Cuerpo de la ventana */}
        <div className="flex" style={{ height: 460 }}>
          {/* Hero izquierdo */}
          <div className="flex-1 flex flex-col justify-center px-14">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
              Uber Hub · Gestión grupal
            </p>
            <h1 className="text-4xl font-bold text-black leading-tight mb-4" style={{ letterSpacing: -1 }}>
              Todos los viajes,<br />desde un lugar
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-7" style={{ maxWidth: 310 }}>
              Coordina y paga los viajes de tu familia o equipo sin perder el hilo. Un solo gestor para todos.
            </p>
            <button
              onClick={() => navigate('/grupos')}
              className="flex items-center gap-2 bg-black text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-gray-900 transition-colors"
              style={{ width: 'fit-content' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Ir a Grupos
            </button>
          </div>

          {/* Panel derecho — últimos viajes */}
          <div
            className="flex flex-col flex-shrink-0"
            style={{ width: 288, borderLeft: '0.5px solid #e8e8e8', background: '#fafafa' }}
          >
            {/* Cabecera */}
            <div style={{ padding: '13px 14px 9px', borderBottom: '0.5px solid #e8e8e8' }}>
              <p className="text-gray-400 font-medium uppercase" style={{ fontSize: 10, letterSpacing: '0.06em', marginBottom: 2 }}>
                Últimos viajes
              </p>
              <p className="text-gray-400" style={{ fontSize: 10 }}>
                Todos los grupos · junio 2025
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderBottom: '0.5px solid #e8e8e8' }}>
              <div style={{ flex: 1, background: '#fff', border: '0.5px solid #e8e8e8', borderRadius: 8, padding: '7px 10px' }}>
                <p style={{ fontSize: 10, color: '#999', marginBottom: 2 }}>Total gastado</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: '#111' }}>
                  ${totalGastado.toLocaleString('es-CL')}
                </p>
              </div>
              <div style={{ flex: 1, background: '#fff', border: '0.5px solid #e8e8e8', borderRadius: 8, padding: '7px 10px' }}>
                <p style={{ fontSize: 10, color: '#999', marginBottom: 2 }}>Viajes</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: '#111' }}>{enriched.length}</p>
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
                    style={{ padding: '9px 12px', borderBottom: '0.5px solid #eee', cursor: 'pointer' }}
                    className="hover:bg-gray-50 transition-colors"
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
                          <p style={{ fontSize: 12, fontWeight: 500, color: '#111', lineHeight: 1 }}>{ride.passenger}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <span style={{
                              fontSize: 9, fontWeight: 600, padding: '1px 5px', borderRadius: 4,
                              background: meta.pillBg, color: meta.pillText,
                            }}>
                              {ride.group}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>
                        ${ride.amount.toLocaleString('es-CL')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#666' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: meta.color, flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 82 }}>
                        {ride.origin}
                      </span>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 82 }}>
                        {ride.destination}
                      </span>
                      <span style={{ marginLeft: 'auto', fontSize: 10, color: '#aaa', flexShrink: 0 }}>
                        {ride.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div
              style={{ padding: '9px 12px', borderTop: '0.5px solid #e8e8e8', cursor: 'pointer' }}
              onClick={() => navigate('/grupos?tab=gastos')}
            >
              <span className="text-blue-600 hover:underline" style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                Ver todos los gastos
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
