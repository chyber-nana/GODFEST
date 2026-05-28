import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const links = [
  { to: '/',          label: 'Home' },
  { to: '/register',  label: 'Register' },
  { to: '/merch',     label: 'Merch' },
  { to: '/donate',    label: 'Support' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: '#0a0a0a', borderBottom: '1px solid #e91e8c33' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold"
          style={{ color: '#e91e8c', letterSpacing: '0.25em' }}>
          GODFEST
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link key={to} to={to}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: pathname === to ? '#e91e8c' : '#fafafa' }}>
              {label}
            </Link>
          ))}
          <Link to="/register"
            className="text-sm font-medium px-5 py-2 rounded-full transition-all duration-200"
            style={{ background: '#e91e8c', color: '#fafafa' }}>
            Register Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}>
          <span style={{ background: '#e91e8c' }} className="block w-6 h-0.5 transition-all"/>
          <span style={{ background: '#e91e8c' }} className="block w-6 h-0.5 transition-all"/>
          <span style={{ background: '#e91e8c' }} className="block w-6 h-0.5 transition-all"/>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden pt-4 pb-2 flex flex-col gap-4 px-6">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              className="text-sm font-medium"
              style={{ color: pathname === to ? '#e91e8c' : '#fafafa' }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}