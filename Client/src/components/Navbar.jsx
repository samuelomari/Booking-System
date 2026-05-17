import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-400 font-semibold'
      : 'text-slate-400 hover:text-white transition-colors';

  return (
    <nav className='bg-slate-900 border-b border-slate-800 sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between'>
        <Link to='/' className='text-2xl font-extrabold text-indigo-400 tracking-tight'>
          🎟 TicketHub
        </Link>

        <div className='hidden md:flex items-center gap-6'>
          <NavLink to='/events' className={linkClass}>Events</NavLink>

          {isAdmin && (
            <NavLink to='/events/new' className={linkClass}>+ Add Event</NavLink>
          )}

          {user ? (
            <>
              <NavLink to='/dashboard' className={linkClass}>Dashboard</NavLink>
              <span className='rounded-full bg-indigo-900 px-3 py-1 text-xs font-semibold text-indigo-300'>
                {isAdmin ? 'Admin' : 'User'}
              </span>
              <button
                onClick={() => logout().catch(console.error)}
                className='bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to='/login' className={linkClass}>Login</NavLink>
              <NavLink
                to='/register'
                className='bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition'
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        <button
          className='md:hidden text-slate-400 hover:text-white focus:outline-none'
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className='md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 flex flex-col gap-4'>
          <NavLink to='/events' className={linkClass} onClick={() => setMenuOpen(false)}>Events</NavLink>

          {isAdmin && (
            <NavLink to='/events/new' className={linkClass} onClick={() => setMenuOpen(false)}>+ Add Event</NavLink>
          )}

          {user ? (
            <>
              <NavLink to='/dashboard' className={linkClass} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
              <span className='text-sm text-slate-500'>{user.email}</span>
              <button
                onClick={() => { logout().catch(console.error); setMenuOpen(false); }}
                className='bg-red-600 text-white text-sm px-4 py-2 rounded-lg'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to='/login' className={linkClass} onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink
                to='/register'
                className='bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg text-center'
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
