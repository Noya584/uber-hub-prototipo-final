import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { members, groups } from '../data/mockData';
import { MapView } from '../components/MapView';

export function MemberSelection() {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState('juan');
  const [search, setSearch] = useState('');

  const availableMembers = members.filter(m => m.status !== 'active' && m.status !== 'pending');
  const filtered = availableMembers.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    const member = members.find(m => m.id === selectedMember);
    navigate('/grupos/set-destination', { state: { member } });
  };

  return (
    <>
      <MapView />
      <Dialog open onOpenChange={() => navigate('/grupos')}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle>¿Para quién es el viaje?</DialogTitle>
          </DialogHeader>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Buscar miembro"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-white/5 border-white/10"
            />
          </div>

          <RadioGroup value={selectedMember} onValueChange={setSelectedMember}>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {groups.map(group => {
                const groupFiltered = filtered.filter(m => m.group === group.id);
                if (groupFiltered.length === 0) return null;
                return (
                  <div key={group.id}>
                    <div className="text-xs text-white/40 uppercase tracking-wider px-1 py-1.5 font-medium">
                      {group.name}
                    </div>
                    {groupFiltered.map(member => (
                      <Label
                        key={member.id}
                        htmlFor={member.id}
                        className={`flex items-center gap-3 p-3 rounded border cursor-pointer mb-1 ${
                          selectedMember === member.id
                            ? 'border-[#06C167] bg-[#06C167]/10'
                            : 'border-white/10 hover:bg-white/5'
                        }`}
                      >
                        <RadioGroupItem value={member.id} id={member.id} />
                        <Avatar className="w-9 h-9">
                          <AvatarFallback style={{ backgroundColor: group.color }}>
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-white/50">{member.role}</div>
                        </div>
                      </Label>
                    ))}
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="text-center text-white/40 text-sm py-6">
                  No hay miembros disponibles
                </div>
              )}
            </div>
          </RadioGroup>

          {members.some(m => m.status === 'active' || m.status === 'pending') && (
            <p className="text-xs text-white/30 mt-1">
              Los miembros con un viaje activo no están disponibles
            </p>
          )}

          <div className="flex gap-2 mt-3">
            <Button variant="outline" className="flex-1 border-white/20" onClick={() => navigate('/grupos')}>
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-white text-black hover:bg-white/90"
              onClick={handleContinue}
              disabled={!selectedMember}
            >
              Continuar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
