import { Plus, Edit, Trash } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { members } from '../data/mockData';
import { Separator } from '../components/ui/separator';

export function Settings() {
  return (
    <div className="h-full overflow-auto p-6">
      <h1 className="text-xl font-medium mb-6">Configurar grupo · Familia</h1>

      <Card className="bg-white/5 border-white/10 mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Miembros del grupo</CardTitle>
            <Button size="sm" className="bg-[#06C167] hover:bg-[#06C167]/90 h-8">
              <Plus className="w-4 h-4 mr-1" />
              Agregar miembro
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-[#9C27B0]">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-white/60">{member.role}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400">
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10 mb-6">
        <CardHeader>
          <CardTitle className="text-base">Restricciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Restringir zonas</Label>
              <p className="text-sm text-white/60">Limitar viajes a zonas específicas</p>
            </div>
            <Switch />
          </div>
          <Separator className="bg-white/10" />
          <div className="flex items-center justify-between">
            <div>
              <Label>Restringir horarios</Label>
              <p className="text-sm text-white/60">Definir horarios permitidos</p>
            </div>
            <Switch />
          </div>
          <Separator className="bg-white/10" />
          <div className="flex items-center justify-between">
            <div>
              <Label>Aprobar viajes costosos</Label>
              <p className="text-sm text-white/60">Requerir aprobación para viajes &gt; $5000</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10 mb-6">
        <CardHeader>
          <CardTitle className="text-base">Método de pago del grupo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <Label className="text-sm mb-1.5">Tarjeta</Label>
              <Input
                value="•••• •••• •••• 4242"
                className="bg-white/5 border-white/10"
                readOnly
              />
            </div>
            <Button variant="outline" className="border-white/20">
              Cambiar método de pago
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-[#06C167] hover:bg-[#06C167]/90">Guardar cambios</Button>
      </div>
    </div>
  );
}
