import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { NavbarLayout } from './layouts/NavbarLayout';
import { HomePage } from './screens/HomePage';
import { GroupsPage } from './screens/GroupsPage';
import { MemberSelection } from './screens/MemberSelection';
import { Destination } from './screens/Destination';
import { DriverAssigned } from './screens/DriverAssigned';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<HomePage />} />
            <Route path="grupos" element={<GroupsPage />} />
            <Route path="grupos/select-member" element={<MemberSelection />} />
            <Route path="grupos/set-destination" element={<Destination />} />
            <Route path="grupos/driver-assigned" element={<DriverAssigned />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
