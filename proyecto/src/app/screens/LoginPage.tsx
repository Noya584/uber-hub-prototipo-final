import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      login(username.trim());
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        {/* Logo */}
        <div className="text-white font-bold text-4xl mb-10">Uber</div>

        <h1 className="text-white text-2xl font-semibold mb-2">Inicia sesión</h1>
        <p className="text-white/50 text-sm mb-8">Accede a tu panel de grupos</p>

        {/* Usuario */}
        <div className="mb-4">
          <label className="text-white/70 text-xs mb-1.5 block">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Ingresa tu usuario"
            className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/50 transition-colors"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-8">
          <label className="text-white/70 text-xs mb-1.5 block">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Ingresa tu contraseña"
            className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/50 transition-colors"
          />
        </div>

        {/* Botón */}
        <button
          onClick={handleLogin}
          disabled={!username.trim()}
          className="w-full bg-white text-black font-semibold py-3 rounded text-sm hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
