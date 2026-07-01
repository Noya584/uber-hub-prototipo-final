import { Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { historyEntries } from '../data/mockData';

export function History() {
  return (
    <div className="h-full overflow-auto p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium">Historial · Familia</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20">
            <Filter className="w-4 h-4 mr-2" />
            Fecha
          </Button>
          <Button variant="outline" size="sm" className="border-white/20">
            <Filter className="w-4 h-4 mr-2" />
            Persona
          </Button>
          <Button variant="outline" size="sm" className="border-white/20">
            <Filter className="w-4 h-4 mr-2" />
            Monto
          </Button>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>Fecha</TableHead>
              <TableHead>Pasajero</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Conductor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyEntries.map((entry, index) => (
              <TableRow key={index} className="border-white/10">
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.passenger}</TableCell>
                <TableCell>{entry.origin}</TableCell>
                <TableCell>{entry.destination}</TableCell>
                <TableCell>{entry.duration}</TableCell>
                <TableCell>${entry.amount.toLocaleString()}</TableCell>
                <TableCell>{entry.driver}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <Button variant="outline" size="sm" className="border-white/20" disabled>
          Anterior
        </Button>
        <Button variant="outline" size="sm" className="border-white/20 bg-[#06C167]/20">
          1
        </Button>
        <Button variant="outline" size="sm" className="border-white/20">
          Siguiente
        </Button>
      </div>
    </div>
  );
}
