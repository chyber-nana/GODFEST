import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0d0d0d', borderTop: '1px solid #e91e8c33' }}
      className="px-6 py-12 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">

        <div>
          <p className="font-display text-2xl font-bold mb-2"
            style={{ color: '#e91e8c' }}>GODFEST</p>
          <p className="text-sm" style={{ color: '#888' }}>July 2026 — A celebration of faith.</p>
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium mb-1" style={{ color: '#e91e8c' }}>PAGES</p>
            {[['/', 'Home'], ['/register', 'Register'], ['/merch', 'Merch'], ['/donate', 'Support']].map(([to, label]) => (
              <Link key={to} to={to} className="text-sm" style={{ color: '#aaa' }}>{label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium mb-1" style={{ color: '#e91e8c' }}>CONTACT</p>
            <p className="text-sm" style={{ color: '#aaa' }}>godfest@email.com</p>
            <p className="text-sm" style={{ color: '#aaa' }}>+233 27 180 6600</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6"
        style={{ borderTop: '1px solid #222' }}>
        <p className="text-xs text-center" style={{ color: '#555' }}>
          © 2026 Godfest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}