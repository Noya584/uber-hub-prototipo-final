import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { LoginPage } from '../screens/LoginPage';

export function NavbarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, logout } = useAuth();

  // Si no hay sesión, mostrar login
  if (!username) return <LoginPage />;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <nav className="h-14 bg-black flex items-center px-8 gap-8 flex-shrink-0">
        {/* Logo */}
        <span
          className="text-white font-bold text-xl cursor-pointer mr-4"
          onClick={() => navigate('/')}
        >
          Uber
        </span>

        {/* Links */}
        <button
          onClick={() => navigate('/')}
          className={`text-sm font-medium transition-colors px-1 py-1 border-b-2 ${
            isActive('/') && location.pathname === '/'
              ? 'text-white border-white'
              : 'text-white/60 border-transparent hover:text-white'
          }`}
        >
          Inicio
        </button>

        <button
          onClick={() => navigate('/grupos')}
          className={`text-sm font-medium transition-colors px-1 py-1 border-b-2 ${
            isActive('/grupos')
              ? 'text-white border-white'
              : 'text-white/60 border-transparent hover:text-white'
          }`}
        >
          Grupos
        </button>

        {/* Usuario dinámico */}
        <div className="ml-auto flex items-center gap-4">
          <span className="text-white/60 text-sm">ES</span>
          <span className="text-white/60 text-sm">Ayuda</span>
          <div
            className="bg-white text-black text-sm font-medium px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/90 transition-colors"
            onClick={handleLogout}
            title="Cerrar sesión"
          >
            {username} ▾
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
