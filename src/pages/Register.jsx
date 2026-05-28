import { useState } from 'react';
import client from '../api/client';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', ticketType: 'free'
  });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await client.post('/register', form);
      setStatus('success');
      setMessage(res.data.message);
      setForm({ firstName: '', lastName: '', email: '', phone: '', ticketType: 'free' });
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  const inputStyle = {
    background: '#111', border: '1px solid #333', color: '#fafafa',
    borderRadius: '10px', padding: '14px 16px', width: '100%',
    fontSize: '14px', outline: 'none',
  };
  const labelStyle = { fontSize: '12px', letterSpacing: '0.08em', color: '#888', marginBottom: '6px', display: 'block' };

  return (
    <main className="min-h-screen px-6 pt-32 pb-20" style={{ background: '#0a0a0a' }}>
      <div className="max-w-xl mx-auto">

        <p className="text-xs tracking-widest mb-3 text-center" style={{ color: '#e91e8c' }}>JULY 2026</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3"
          style={{ color: '#fafafa' }}>Register to Attend</h1>
        <p className="text-center text-sm mb-12" style={{ color: '#888' }}>
          Secure your free spot at Godfest 2026.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5"
          style={{ background: '#0d0d0d', border: '1px solid #e91e8c22', borderRadius: '20px', padding: '32px' }}>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>FIRST NAME</label>
              <input name="firstName" value={form.firstName} onChange={handleChange}
                required placeholder="John" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>LAST NAME</label>
              <input name="lastName" value={form.lastName} onChange={handleChange}
                required placeholder="Doe" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>EMAIL ADDRESS</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              required placeholder="john@email.com" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>PHONE NUMBER</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
              placeholder="+233 XX XXX XXXX" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>TICKET TYPE</label>
            <select name="ticketType" value={form.ticketType} onChange={handleChange}
              style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="free">General Admission — Free</option>
            </select>
          </div>

          {status === 'success' && (
            <div className="rounded-xl p-4 text-sm text-center"
              style={{ background: '#0a2a0a', border: '1px solid #2a6a2a', color: '#6abf6a' }}>
              {message}
            </div>
          )}
          {status === 'error' && (
            <div className="rounded-xl p-4 text-sm text-center"
              style={{ background: '#2a0a0a', border: '1px solid #6a2a2a', color: '#bf6a6a' }}>
              {message}
            </div>
          )}

          <button type="submit" disabled={status === 'loading'}
            className="w-full py-4 rounded-full text-sm font-medium mt-2 transition-all duration-200 hover:opacity-90 disabled:opacity-50"
            style={{ background: '#e91e8c', color: '#fafafa' }}>
            {status === 'loading' ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </main>
  );
}