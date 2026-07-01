import { useNavigate, useLocation } from 'react-router';
import { Check, Star } from 'lucide-react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { MapView } from '../components/MapView';
import { Member } from '../types';
import { groups } from '../data/mockData';

export function DriverAssigned() {
  const navigate = useNavigate();
  const location = useLocation();
  const member: Member | undefined = location.state?.member;
  const group = groups.find(g => g.id === member?.group);
  const memberName = member?.name ?? 'el pasajero';

  return (
    <>
      <MapView />
      <Dialog open onOpenChange={() => navigate('/grupos')}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 max-w-md">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#06C167] flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-medium mb-1">Viaje confirmado para {memberName}</h2>
            <p className="text-sm text-white/60 mb-6">Se notificó a {memberName} por SMS</p>
            <Separator className="w-full mb-6 bg-white/10" />
            <div className="w-full">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-lg" style={{ backgroundColor: group?.color ?? '#06C167' }}>
                    {member?.avatar ?? 'C'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="font-medium">Carlos Mendez</div>
                  <div className="flex items-center gap-1 text-sm text-white/60">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>4.9</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded p-3 mb-4">
                <div className="text-sm text-white/60 mb-1">Vehículo</div>
                <div className="font-medium">Toyota Corolla Blanco</div>
                <div className="text-sm text-white/60">AB123CD</div>
              </div>
              <div className="text-center py-3 bg-white/5 rounded mb-6">
                <div className="text-sm text-white/60 mb-1">Tiempo de llegada</div>
                <div className="text-lg font-medium">Llega en 6 min</div>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1 border-white/20" onClick={() => navigate('/grupos')}>
                Ver en mapa
              </Button>
              <Button className="flex-1 bg-white text-black hover:bg-white/90" onClick={() => navigate('/grupos')}>
                Cerrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
