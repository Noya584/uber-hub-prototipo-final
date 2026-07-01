# Implementation Plan: Uber Hub Multi-Screen Dashboard

## Context

Building a comprehensive Uber Hub dashboard application that allows coordinators to manage group rides across multiple members. The application features:

- **9 distinct screens/views**: Main dashboard, member selection, origin/destination input, driver assignment, live tracking, arrival notifications, history table, expense analytics, and group settings
- **Fixed 3-column layout**: 200px left sidebar, flexible center map/content area, 210px right panel, 40px topbar
- **Dark Uber-style theme**: Black (#000000) background, white text, green accent (#06C167)
- **Multi-group management**: Users can manage multiple groups (Family, Work, Friends) with color-coded members
- **Real-time ride tracking**: Show active rides, pending requests, and member statuses with progress bars
- **Modal overlays**: Centered modals for ride booking flow
- **Analytics**: History tables and expense charts

This is a frontend prototype with mock data to demonstrate the complete user flow from requesting a ride to tracking delivery and viewing analytics.

## Implementation Approach

### 1. Architecture Overview

**Technology Stack:**
- React with TypeScript for component structure
- React Router for multi-screen navigation
- Existing shadcn/ui components (Button, Dialog, Card, Avatar, Badge, Progress, Table, Chart, etc.)
- Tailwind CSS with custom Uber color tokens
- Recharts for expense visualization
- Mock data for all user/ride information

**Navigation Strategy:**
Use React Router with route-based navigation for the 9 main views:
- `/` - Main dashboard (Screen 1)
- `/select-member` - Member selection modal (Screen 2)
- `/set-destination` - Origin/destination input (Screen 3)
- `/driver-assigned` - Driver confirmation (Screen 4)
- `/tracking` - Live ride tracking (Screen 5)
- `/arrival` - Arrival notification (Screen 6)
- `/history` - Ride history table (Screen 7)
- `/expenses` - Expense dashboard (Screen 8)
- `/settings` - Group settings (Screen 9)

Modal screens (2-4, 6) will render as Dialog overlays on top of the main dashboard view.

### 2. Component Structure

**Core Layout Components:**
- `MainLayout.tsx` - Fixed 3-column layout container with Sidebar, Topbar, content area, and RightPanel
- `LeftSidebar.tsx` - 200px fixed width, contains logo, search, groups, members list
- `Topbar.tsx` - 40px fixed height, contextual header with group info and action buttons
- `RightPanel.tsx` - 210px fixed width, shows active ride cards
- `MapView.tsx` - Flexible center area with map visualization, member pins, routes

**Screen Components:**
- `Dashboard.tsx` - Main view (Screen 1) combining MapView + ride cards
- `MemberSelectionModal.tsx` - Member picker dialog (Screen 2)
- `DestinationModal.tsx` - Origin/destination input with category selector (Screen 3)
- `DriverAssignedModal.tsx` - Confirmation with driver details (Screen 4)
- `TrackingView.tsx` - Updated dashboard with live ride progress (Screen 5)
- `ArrivalNotification.tsx` - Toast/banner notification (Screen 6)
- `HistoryView.tsx` - Table replacing map area (Screen 7)
- `ExpensesView.tsx` - Charts and analytics (Screen 8)
- `SettingsView.tsx` - Group configuration form (Screen 9)

**Shared UI Components (reusing existing ui/):**
- Avatar with initials and color indicators
- Badge for status pills (En viaje, Pendiente, Sin viaje)
- Card for member/ride cards in right panel
- Button for all actions (Pedir viaje, Aprobar, Rechazar, etc.)
- Progress for ride tracking bars
- Dialog for modal overlays
- Input for search and form fields
- Table for history display
- Chart components (Recharts) for expense visualization
- RadioGroup for member selection
- Select for ride category picker
- Switch/Toggle for settings
- Separator for visual dividers

**Data Components:**
- `mockData.ts` - All sample data (groups, members, rides, history, expenses)
- `types.ts` - TypeScript interfaces for Member, Group, Ride, etc.

### 3. Color & Styling System

**Custom Uber Theme Tokens** (add to `src/styles/theme.css`):
```css
--uber-black: #000000;
--uber-white: #FFFFFF;
--uber-green: #06C167;
--uber-gray-bg: #F6F6F6;
--uber-gray-text: #757575;

/* Status colors */
--status-active: #06C167; /* green - en viaje */
--status-pending: #FFC107; /* yellow - pendiente */
--status-inactive: #9E9E9E; /* gray - sin viaje */
--status-purple: #9C27B0; /* Familia */
--status-work-green: #4CAF50; /* Trabajo */
--status-friends-yellow: #FFC107; /* Amigos */
```

**Dark Mode Application:**
Override root background to pure black for Uber aesthetic, white text throughout.

### 4. Layout Implementation

**3-Column Fixed Layout:**
Use CSS Grid or Flexbox (not ResizablePanel since widths are fixed):

```tsx
<div className="h-screen flex flex-col bg-uber-black text-white">
  <Topbar /> {/* 40px height */}
  <div className="flex-1 flex overflow-hidden">
    <LeftSidebar /> {/* 200px width */}
    <main className="flex-1"> {/* Flexible */}
      {/* Map or content area */}
    </main>
    <RightPanel /> {/* 210px width */}
  </div>
</div>
```

### 5. Map Visualization

**Approach:**
Create a custom MapView component with:
- Placeholder map background (dark neutral image or solid color with grid lines)
- Absolutely positioned member pins (colored circles with avatars)
- SVG dotted lines for route visualization
- Tooltip overlays on hover (member name + ETA)
- Legend component (En viaje, Pendiente, Sin viaje)
- Action button (Ver gastos)

**No external map library needed** - use positioned div elements with CSS transforms for simplicity.

### 6. State Management

**Simple React state** (no Redux/Context needed for prototype):
- Route navigation via React Router
- Local state in components for modal open/close
- Mock data imported from `mockData.ts`
- URL params for selected member/ride

### 7. Key Features by Screen

**Screen 1 - Main Dashboard:**
- Left sidebar with expandable "Familia" group showing 4 members (Sofía, Luis, Pablo, Juan)
- Map with 4 pins, 2 route lines (Sofía 65% progress, Luis 88% progress)
- Right panel with 4 ride cards (2 active, 1 pending approval, 1 no ride)
- Topbar showing "Familia · 4 miembros · 2 viajes activos"

**Screens 2-4 - Ride Booking Flow:**
- Modal overlays with semi-transparent dark backdrop
- Step 1: Member selection with radio buttons
- Step 2: Origin/destination input with category selector (UberX, Comfort, Black)
- Step 3: Driver confirmation with photo, name, rating, vehicle info

**Screen 5 - Live Tracking:**
- Same as Screen 1 but updated with conductor arrival status
- Animated pin position (or different position)
- Progress bar at 15%, pill "Conductor en camino"

**Screen 6 - Arrival Notification:**
- Green banner notification in top-right corner
- "Sofía llegó a Colegio San Pedro · 07:42am"
- Updated ride card with 100% progress, "Llegó" status

**Screen 7 - History Table:**
- Replace map with full-width table
- Columns: Fecha, Pasajero, Origen, Destino, Duración, Monto, Conductor
- Filters in topbar (date, person, amount)
- Pagination at bottom

**Screen 8 - Expense Dashboard:**
- Replace map with chart area
- Bar chart: weekly spending for June 2025
- Pie chart or list: breakdown by person
- Individual member expense cards

**Screen 9 - Settings:**
- Replace map with form
- Member list with edit/delete actions
- Add member button
- Restriction toggles for zones/hours
- Payment method configuration

### 8. Mock Data Structure

```typescript
interface Member {
  id: string;
  name: string;
  avatar: string; // initials
  group: string;
  status: 'active' | 'pending' | 'inactive';
  role?: string;
  currentRide?: Ride;
}

interface Group {
  id: string;
  name: string;
  color: string; // purple, green, yellow
  members: Member[];
  activeRides: number;
}

interface Ride {
  id: string;
  memberId: string;
  origin: string;
  destination: string;
  status: 'en-viaje' | 'pendiente' | 'conductor-en-camino' | 'llegó';
  progress: number; // 0-100
  eta: number; // minutes
  driver?: {
    name: string;
    photo: string;
    rating: number;
    vehicle: string;
    plate: string;
  };
  category: 'UberX' | 'Comfort' | 'Black';
  price: number;
}

interface HistoryEntry {
  date: string;
  passenger: string;
  origin: string;
  destination: string;
  duration: string;
  amount: number;
  driver: string;
}

interface Expense {
  member: string;
  amount: number;
  rides: number;
}
```

### 9. Critical Files to Create

**Layout:**
- `src/app/layouts/MainLayout.tsx` - Core 3-column structure
- `src/app/components/layout/LeftSidebar.tsx` - Member/group navigation
- `src/app/components/layout/Topbar.tsx` - Contextual header
- `src/app/components/layout/RightPanel.tsx` - Active rides panel

**Screens:**
- `src/app/screens/Dashboard.tsx` - Main view
- `src/app/screens/MemberSelection.tsx` - Modal screen 2
- `src/app/screens/Destination.tsx` - Modal screen 3
- `src/app/screens/DriverAssigned.tsx` - Modal screen 4
- `src/app/screens/Tracking.tsx` - Screen 5
- `src/app/screens/History.tsx` - Screen 7
- `src/app/screens/Expenses.tsx` - Screen 8
- `src/app/screens/Settings.tsx` - Screen 9

**Components:**
- `src/app/components/MapView.tsx` - Map visualization
- `src/app/components/MemberPin.tsx` - Map pin component
- `src/app/components/RideCard.tsx` - Right panel card
- `src/app/components/GroupSection.tsx` - Sidebar group display
- `src/app/components/ArrivalNotification.tsx` - Success banner
- `src/app/components/ExpenseChart.tsx` - Chart wrapper

**Data:**
- `src/app/data/mockData.ts` - All sample data
- `src/app/types/index.ts` - TypeScript interfaces

**Routing:**
- `src/app/App.tsx` - Update with React Router setup

**Styling:**
- `src/styles/theme.css` - Add Uber color tokens

### 10. Routing Setup

Install and configure React Router:

```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="select-member" element={<MemberSelection />} />
      <Route path="set-destination" element={<Destination />} />
      <Route path="driver-assigned" element={<DriverAssigned />} />
      <Route path="tracking" element={<Tracking />} />
      <Route path="history" element={<History />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### 11. Icons

Use Lucide React icons:
- `LayoutDashboard` - Logo/dashboard icon
- `Search` - Search input
- `MapPin` - Location pins
- `Phone` - Call button
- `Navigation` - Route button
- `Wallet` - Expense icon
- `Settings` - Settings icon
- `Check` - Success checkmarks
- `X` - Close buttons
- `Plus` - Add member
- `Edit`, `Trash` - Edit/delete actions
- `ChevronDown`, `ChevronRight` - Expand/collapse

### 12. Responsive Considerations

While the spec shows desktop fixed widths, ensure:
- Mobile: Stack layout vertically, hide right panel in drawer
- Tablet: Reduce sidebar width, collapse by default
- Use `useIsMobile` hook from ui/use-mobile.ts

### 13. Verification Plan

**Manual Testing Steps:**
1. Start dev server and navigate to `http://localhost:5173`
2. Verify main dashboard loads with:
   - Left sidebar showing "Familia" group with 4 members
   - Map with 4 colored pins (Sofía purple, Luis green, Pablo yellow, Juan gray)
   - Right panel showing 4 ride cards with correct statuses
   - Black background, white text throughout
3. Click "Pedir viaje" button → verify member selection modal opens
4. Select Sofía → click "Continuar" → verify destination modal opens
5. Fill destination → select "Comfort" → verify driver assigned modal shows
6. Close modal → verify returns to dashboard
7. Navigate to `/history` → verify table displays with sample data
8. Navigate to `/expenses` → verify charts render with Recharts
9. Navigate to `/settings` → verify form displays
10. Check responsive behavior at mobile width
11. Verify all buttons, inputs, and interactive elements work
12. Verify color theme matches Uber specification (black bg, green accents)

**Component Testing:**
- Test each modal opens/closes correctly
- Test navigation between all 9 screens
- Test status badge colors match spec
- Test progress bars update visually
- Test table pagination (if implemented)
- Test chart responsiveness

**Visual QA:**
- Verify layout maintains 200px / flexible / 210px columns
- Verify topbar is exactly 40px height
- Verify all text is readable on black background
- Verify member pins have correct colors (purple, green, yellow, gray)
- Verify status pills use correct colors (green=active, yellow=pending, gray=inactive)

## Summary

This implementation creates a production-quality Uber Hub dashboard prototype with 9 distinct screens, modal-based ride booking flow, real-time tracking visualization, and analytics. The approach maximizes reuse of existing shadcn/ui components while adding custom Uber styling and layout structure. All screens are functional with mock data to demonstrate the complete user journey.

**Estimated Complexity:** Medium-High (multiple interconnected screens, custom map visualization, routing setup, extensive UI composition)

**Key Success Factors:**
- Proper routing configuration with React Router
- Consistent use of existing UI components
- Custom Uber theme integration
- Clean component hierarchy and data flow
- Responsive layout that works across screen sizes
