import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router';
import { Search, Settings, ChevronDown, ChevronRight, Users, Map, Wallet } from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { groups, members } from '../data/mockData';
import { MapView } from '../components/MapView';
import { Expenses } from './Expenses';
import { RideCard } from '../components/RideCard';

export function GroupsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedGroup, setExpandedGroup] = useState('familia');
  const [activeTab, setActiveTab] = useState<'mapa' | 'gastos'>(
    searchParams.get('tab') === 'gastos' ? 'gastos' : 'mapa'
  );

  // Mantener sincronizado el tab activo con el query param (?tab=gastos) del navbar
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    setActiveTab(tabParam === 'gastos' ? 'gastos' : 'mapa');
  }, [searchParams]);

  const handleTabChange = (tab: 'mapa' | 'gastos') => {
    setActiveTab(tab);
    setSearchParams(tab === 'gastos' ? { tab: 'gastos' } : {});
  };

  // Si estamos en una subruta (select-member, etc), mostrar el Outlet
  const isSubRoute = location.pathname !== '/grupos';
  if (isSubRoute) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Topbar de grupos */}
      <div className="h-10 bg-black border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2 text-white">
          <Users className="w-4 h-4 text-white/60" />
          <span className="font-medium text-sm">Familia</span>
          <span className="text-xs text-white/60">· 4 miembros · 2 viajes activos</span>
        </div>
        <Button
          className="h-7 bg-white text-black hover:bg-white/90 text-xs font-medium"
          onClick={() => navigate('/grupos/select-member')}
        >
          Pedir viaje
        </Button>
      </div>

      {/* Layout principal de 3 columnas */}
      <div className="flex flex-1 overflow-hidden bg-black text-white">

        {/* Sidebar izquierdo — Grupos */}
        <div className="w-48 bg-black border-r border-white/10 flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                placeholder="Buscar miembro"
                className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs text-white placeholder:text-white/30 outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-2">
            <div className="text-xs text-white/40 mb-2 px-1 uppercase tracking-wider">Grupos</div>
            {groups.map((group) => (
              <div key={group.id} className="mb-1">
                <button
                  onClick={() => setExpandedGroup(expandedGroup === group.id ? '' : group.id)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded text-sm"
                >
                  {expandedGroup === group.id
                    ? <ChevronDown className="w-3 h-3 text-white/40" />
                    : <ChevronRight className="w-3 h-3 text-white/40" />
                  }
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: group.color }} />
                  <span className="flex-1 text-left text-xs">{group.name}</span>
                  <span className="text-xs text-white/30">{group.members.length}</span>
                </button>

                {expandedGroup === group.id && group.members.length > 0 && (
                  <div className="ml-3 mt-1 space-y-0.5">
                    {group.members.map((member) => {
                      const statusColor =
                        member.status === 'active' ? '#06C167'
                        : member.status === 'pending' ? '#FFC107'
                        : '#9E9E9E';
                      return (
                        <div key={member.id} className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded cursor-pointer">
                          <div className="relative">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-xs" style={{ backgroundColor: group.color, fontSize: '9px' }}>
                                {member.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-black" style={{ backgroundColor: statusColor }} />
                          </div>
                          <span className="text-xs">{member.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-white/10">
            <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded cursor-pointer">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs bg-[#06C167]" style={{ fontSize: '9px' }}>CM</AvatarFallback>
              </Avatar>
              <span className="text-xs flex-1">Coordinador</span>
              <Settings className="w-3 h-3 text-white/40" />
            </div>
          </div>
        </div>

        {/* Centro — Mapa o Gastos con pestañas arriba, bien visibles */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Pestañas arriba, grandes y destacadas */}
          <div className="flex-shrink-0 flex justify-center py-3 bg-black border-b border-white/10">
            <div className="flex bg-white/5 rounded-full p-1 gap-1">
              <button
                onClick={() => handleTabChange('mapa')}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'mapa'
                    ? 'bg-white text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Map className="w-4 h-4" />
                Mapa
              </button>
              <button
                onClick={() => handleTabChange('gastos')}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'gastos'
                    ? 'bg-white text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Wallet className="w-4 h-4" />
                Gastos
              </button>
            </div>
          </div>

          {/* Vista activa */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'mapa' ? (
              <MapView />
            ) : (
              <div className="h-full overflow-auto bg-black">
                <Expenses />
              </div>
            )}
          </div>
        </div>

        {/* Panel derecho — Viajes */}
        <div className="w-52 bg-black border-l border-white/10 flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-white/10">
            <h3 className="text-xs font-medium text-white/80">Recorridos activos</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {members.map((member) => (
              <RideCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
