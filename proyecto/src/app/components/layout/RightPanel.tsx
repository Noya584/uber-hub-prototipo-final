import { members } from '../../data/mockData';
import { RideCard } from '../RideCard';

export function RightPanel() {
  return (
    <div className="w-[210px] bg-black border-l border-white/10 overflow-y-auto">
      <div className="p-3 border-b border-white/10">
        <h3 className="text-sm font-medium">Recorridos activos</h3>
      </div>

      <div className="p-3 space-y-3">
        {members.map((member) => (
          <RideCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
