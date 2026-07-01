export type RideStatus = 'en-viaje' | 'pendiente' | 'conductor-en-camino' | 'llegó' | 'sin-viaje';
export type MemberStatus = 'active' | 'pending' | 'inactive';
export type RideCategory = 'UberX' | 'Comfort' | 'Black';

export interface Driver {
  name: string;
  photo: string;
  rating: number;
  vehicle: string;
  plate: string;
}

export interface Ride {
  id: string;
  memberId: string;
  origin: string;
  destination: string;
  status: RideStatus;
  progress: number;
  eta: number;
  driver?: Driver;
  category: RideCategory;
  price: number;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  group: string;
  status: MemberStatus;
  role?: string;
  currentRide?: Ride;
}

export interface Group {
  id: string;
  name: string;
  color: string;
  members: Member[];
  activeRides: number;
}

export interface HistoryEntry {
  date: string;
  passenger: string;
  origin: string;
  destination: string;
  duration: string;
  amount: number;
  driver: string;
}

export interface Expense {
  member: string;
  amount: number;
  rides: number;
}

export interface WeeklyExpense {
  week: string;
  amount: number;
}
