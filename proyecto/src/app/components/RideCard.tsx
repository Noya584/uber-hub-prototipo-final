import { Phone, Navigation } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Member } from '../types';
import { groups } from '../data/mockData';
import { useNavigate } from 'react-router';

interface RideCardProps {
  member: Member;
}

export function RideCard({ member }: RideCardProps) {
  const navigate = useNavigate();
  const group = groups.find((g) => g.id === member.group);
  const ride = member.currentRide;

  const getStatusInfo = () => {
    if (!ride || member.status === 'inactive') {
      return {
        label: 'Sin viaje',
        color: 'bg-[#9E9E9E]',
      };
    }

    if (ride.status === 'pendiente') {
      return {
        label: 'Pendiente',
        color: 'bg-[#FFC107]',
      };
    }

    if (ride.status === 'en-viaje') {
      return {
        label: 'En viaje',
        color: 'bg-[#06C167]',
      };
    }

    if (ride.status === 'conductor-en-camino') {
      return {
        label: 'Conductor en camino',
        color: 'bg-[#06C167]',
      };
    }

    if (ride.status === 'llegó') {
      return {
        label: 'Llegó',
        color: 'bg-[#06C167]',
      };
    }

    return { label: 'Sin viaje', color: 'bg-[#9E9E9E]' };
  };

  const status = getStatusInfo();

  return (
    <Card className="p-3 bg-white/5 border-white/10">
      <div className="flex items-start gap-2 mb-2">
        <Avatar className="w-8 h-8">
          <AvatarFallback style={{ backgroundColor: group?.color }}>{member.avatar}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{member.name}</div>
          <div className="text-xs text-white/60">{group?.name}</div>
        </div>
        <Badge className={`${status.color} text-white text-xs px-2 py-0 h-5`}>{status.label}</Badge>
      </div>

      {ride && member.status !== 'inactive' ? (
        <>
          {ride.status === 'pendiente' ? (
            <div className="mt-2">
              <p className="text-xs text-white/60 mb-2">Solicitud fuera de zona</p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 h-7 text-xs border-white/20">
                  Aprobar
                </Button>
                <Button variant="outline" className="flex-1 h-7 text-xs border-white/20">
                  Rechazar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-xs text-white/60 mb-2">{ride.destination}</div>
              <div className="text-xs mb-2">{ride.eta} min</div>

              {ride.progress > 0 && (
                <Progress value={ride.progress} className="mb-2 h-1" />
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-7 text-xs border-white/20"
                >
                  <Navigation className="w-3 h-3 mr-1" />
                  Ruta
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-7 text-xs border-white/20"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Llamar
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <Button
          variant="outline"
          className="w-full h-7 text-xs border-white/20 mt-2"
          onClick={() => navigate('/grupos/select-member')}
        >
          Pedir viaje
        </Button>
      )}
    </Card>
  );
}
