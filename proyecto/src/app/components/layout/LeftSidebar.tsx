import { LayoutDashboard, Search, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { groups } from '../../data/mockData';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function LeftSidebar() {
  const [expandedGroup, setExpandedGroup] = useState('familia');
  const navigate = useNavigate();

  return (
    <div className="w-[200px] bg-black border-r border-white/10 flex flex-col h-full">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-[#06C167]" />
          <span className="font-medium">Uber Hub</span>
        </div>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Buscar miembro"
            className="pl-8 bg-white/5 border-white/10 text-sm h-8"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <div className="text-xs text-white/60 mb-2 px-1">Grupos</div>
        {groups.map((group) => (
          <div key={group.id} className="mb-2">
            <button
              onClick={() => setExpandedGroup(expandedGroup === group.id ? '' : group.id)}
              className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded text-sm"
            >
              {expandedGroup === group.id ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: group.color }}
              />
              <span className="flex-1 text-left">{group.name}</span>
            </button>

            {expandedGroup === group.id && group.members.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {group.members.map((member) => {
                  const statusColor =
                    member.status === 'active'
                      ? '#06C167'
                      : member.status === 'pending'
                        ? '#FFC107'
                        : '#9E9E9E';

                  return (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback
                            className="text-xs"
                            style={{ backgroundColor: group.color }}
                          >
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-black"
                          style={{ backgroundColor: statusColor }}
                        />
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

      <div className="p-3 border-t border-white/10">
        <Button
          variant="outline"
          className="w-full mb-3 border-white/20 text-xs h-8"
          onClick={() => navigate('/history')}
        >
          Ver todos los recorridos activos
        </Button>

        <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded cursor-pointer">
          <Avatar className="w-7 h-7">
            <AvatarFallback className="text-xs bg-[#06C167]">CM</AvatarFallback>
          </Avatar>
          <span className="text-xs flex-1">Coordinador</span>
          <Settings className="w-4 h-4 text-white/60" onClick={() => navigate('/settings')} />
        </div>
      </div>
    </div>
  );
}
