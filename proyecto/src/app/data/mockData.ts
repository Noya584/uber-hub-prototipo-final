import { Group, Member, Ride, HistoryEntry, Expense, WeeklyExpense } from '../types';

export const rides: Ride[] = [
  {
    id: 'ride-1',
    memberId: 'sofia',
    origin: 'Av. Libertador 1234',
    destination: 'Colegio San Pedro',
    status: 'en-viaje',
    progress: 65,
    eta: 8,
    driver: { name: 'Carlos Mendez', photo: 'CM', rating: 4.9, vehicle: 'Toyota Corolla Blanco', plate: 'AB123CD' },
    category: 'Comfort',
    price: 3200,
  },
  {
    id: 'ride-2',
    memberId: 'luis',
    origin: 'Calle 45 #678',
    destination: 'Oficina Central',
    status: 'en-viaje',
    progress: 88,
    eta: 4,
    driver: { name: 'María González', photo: 'MG', rating: 4.8, vehicle: 'Chevrolet Cruze Negro', plate: 'XY789ZW' },
    category: 'UberX',
    price: 2800,
  },
  {
    id: 'ride-3',
    memberId: 'pablo',
    origin: 'Plaza Mayor',
    destination: 'Aeropuerto Internacional',
    status: 'pendiente',
    progress: 0,
    eta: 0,
    category: 'Black',
    price: 5500,
  },
];

// Familia
const familiaMembers: Member[] = [
  { id: 'sofia', name: 'Sofía', avatar: 'S', group: 'familia', status: 'active', role: 'Hija · 16 años', currentRide: rides[0] },
  { id: 'luis', name: 'Luis', avatar: 'L', group: 'familia', status: 'active', role: 'Padre', currentRide: rides[1] },
  { id: 'pablo', name: 'Pablo', avatar: 'P', group: 'familia', status: 'pending', role: 'Hijo · 14 años', currentRide: rides[2] },
  { id: 'juan', name: 'Juan', avatar: 'J', group: 'familia', status: 'inactive', role: 'Abuelo' },
];

// Trabajo
const trabajoMembers: Member[] = [
  { id: 'carolina', name: 'Carolina', avatar: 'C', group: 'trabajo', status: 'inactive', role: 'Diseñadora' },
  { id: 'matias', name: 'Matías', avatar: 'M', group: 'trabajo', status: 'inactive', role: 'Desarrollador' },
  { id: 'valentina', name: 'Valentina', avatar: 'V', group: 'trabajo', status: 'inactive', role: 'Product Manager' },
];

// Amigos
const amigosMembers: Member[] = [
  { id: 'diego', name: 'Diego', avatar: 'D', group: 'amigos', status: 'inactive', role: 'Amigo' },
  { id: 'isidora', name: 'Isidora', avatar: 'I', group: 'amigos', status: 'inactive', role: 'Amiga' },
  { id: 'camila', name: 'Camila', avatar: 'C', group: 'amigos', status: 'inactive', role: 'Amiga' },
];

export const members: Member[] = [...familiaMembers, ...trabajoMembers, ...amigosMembers];

export const groups: Group[] = [
  { id: 'familia', name: 'Familia', color: '#9C27B0', members: familiaMembers, activeRides: 2 },
  { id: 'trabajo', name: 'Trabajo', color: '#378ADD', members: trabajoMembers, activeRides: 0 },
  { id: 'amigos', name: 'Amigos', color: '#EF9F27', members: amigosMembers, activeRides: 0 },
];

export const historyEntries: HistoryEntry[] = [
  { date: '2025-06-08', passenger: 'Sofía', origin: 'Casa', destination: 'Colegio San Pedro', duration: '15 min', amount: 3200, driver: 'Carlos Mendez' },
  { date: '2025-06-08', passenger: 'Luis', origin: 'Casa', destination: 'Oficina Central', duration: '22 min', amount: 4100, driver: 'María González' },
  { date: '2025-06-07', passenger: 'Pablo', origin: 'Universidad', destination: 'Casa', duration: '18 min', amount: 2900, driver: 'Jorge Ruiz' },
  { date: '2025-06-07', passenger: 'Sofía', origin: 'Colegio San Pedro', destination: 'Casa', duration: '12 min', amount: 2600, driver: 'Ana López' },
  { date: '2025-06-06', passenger: 'Juan', origin: 'Casa', destination: 'Centro Comercial', duration: '25 min', amount: 3800, driver: 'Pedro Sánchez' },
  { date: '2025-06-06', passenger: 'Luis', origin: 'Oficina Central', destination: 'Restaurante La Plaza', duration: '10 min', amount: 2200, driver: 'Laura Martínez' },
];

export const expensesByGroup: Record<string, { expenses: Expense[]; weekly: WeeklyExpense[] }> = {
  familia: {
    expenses: [
      { member: 'Sofía', amount: 18500, rides: 12 },
      { member: 'Luis', amount: 24300, rides: 15 },
      { member: 'Pablo', amount: 15200, rides: 10 },
      { member: 'Juan', amount: 8900, rides: 6 },
    ],
    weekly: [
      { week: 'Semana 1', amount: 11200 },
      { week: 'Semana 2', amount: 14300 },
      { week: 'Semana 3', amount: 16500 },
      { week: 'Semana 4', amount: 18900 },
    ],
  },
  trabajo: {
    expenses: [
      { member: 'Carolina', amount: 12400, rides: 8 },
      { member: 'Matías', amount: 15800, rides: 10 },
      { member: 'Valentina', amount: 13400, rides: 7 },
    ],
    weekly: [
      { week: 'Semana 1', amount: 8200 },
      { week: 'Semana 2', amount: 9800 },
      { week: 'Semana 3', amount: 11200 },
      { week: 'Semana 4', amount: 12400 },
    ],
  },
  amigos: {
    expenses: [
      { member: 'Diego', amount: 7200, rides: 5 },
      { member: 'Isidora', amount: 6400, rides: 4 },
      { member: 'Camila', amount: 7200, rides: 3 },
    ],
    weekly: [
      { week: 'Semana 1', amount: 4200 },
      { week: 'Semana 2', amount: 5600 },
      { week: 'Semana 3', amount: 3800 },
      { week: 'Semana 4', amount: 7200 },
    ],
  },
};

export const expenses = expensesByGroup.familia.expenses;
export const weeklyExpenses = expensesByGroup.familia.weekly;
