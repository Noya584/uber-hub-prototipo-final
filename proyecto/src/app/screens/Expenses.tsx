import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { expensesByGroup, groups } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const memberColors: Record<string, string> = {
  familia: '#9C27B0',
  trabajo: '#378ADD',
  amigos: '#EF9F27',
};

export function Expenses() {
  const [activeGroup, setActiveGroup] = useState('familia');
  const data = expensesByGroup[activeGroup];
  const group = groups.find(g => g.id === activeGroup);
  const total = data.expenses.reduce((s, e) => s + e.amount, 0);
  const totalRides = data.expenses.reduce((s, e) => s + e.rides, 0);
  const avg = totalRides > 0 ? Math.round(total / totalRides) : 0;

  return (
    <div className="h-full overflow-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-medium">Gastos · Junio 2025</h1>
        <div className="flex gap-2">
          {groups.map(g => (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                activeGroup === g.id
                  ? 'bg-white text-black border-white font-medium'
                  : 'border-white/20 text-white/60 hover:text-white hover:border-white/40'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm">Gasto por semana</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={data.weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} stroke="rgba(255,255,255,0.2)" />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} stroke="rgba(255,255,255,0.2)" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: 12 }} />
                <Bar dataKey="amount" fill="#06C167" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm">Desglose por persona</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="space-y-2.5">
              {data.expenses.map(expense => (
                <div key={expense.member} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                      style={{ backgroundColor: memberColors[activeGroup] ?? '#9C27B0' }}>
                      {expense.member[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{expense.member}</div>
                      <div className="text-xs text-white/50">{expense.rides} viajes</div>
                    </div>
                  </div>
                  <div className="font-medium text-sm">${expense.amount.toLocaleString('es-CL')}</div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-white/10 mt-1">
                <span className="text-xs text-white/50">Total del grupo</span>
                <span className="font-medium text-sm">${total.toLocaleString('es-CL')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-3">
            <div className="text-lg font-medium">{totalRides}</div>
            <div className="text-xs text-white/50 mt-0.5">Viajes este mes</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-3">
            <div className="text-lg font-medium">${avg.toLocaleString('es-CL')}</div>
            <div className="text-xs text-white/50 mt-0.5">Promedio por viaje</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-3">
            <div className="text-lg font-medium">{data.expenses.length}</div>
            <div className="text-xs text-white/50 mt-0.5">Miembros activos</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
