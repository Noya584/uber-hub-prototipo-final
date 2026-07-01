import { Users } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';

interface TopbarProps {
  groupName?: string;
  memberCount?: number;
  activeRides?: number;
}

export function Topbar({ groupName = 'Familia', memberCount = 4, activeRides = 2 }: TopbarProps) {
  const navigate = useNavigate();

  return (
    <div className="h-10 bg-black border-b border-white/10 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-white/60" />
        <span className="font-medium">{groupName}</span>
        <span className="text-xs text-white/60">
          {memberCount} miembros · {activeRides} viajes activos
        </span>
      </div>

      <Button
        className="h-7 bg-black border border-white/20 hover:bg-white/10 text-xs"
        onClick={() => navigate('/select-member')}
      >
        Pedir viaje
      </Button>
    </div>
  );
}
