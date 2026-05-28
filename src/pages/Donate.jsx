import { useState } from 'react';
import client from '../api/client';

const AMOUNTS = [50, 100, 200, 500, 1000];

export default function Donate() {
  const [form, setForm] = useState({
    name: '', email: '', amount: '', type: 'donation', message: ''
  });
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState('');

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await client.post('/donate', { ...form, amount: Number(form.amount) });
      setStatus('success');
      setMsg(res.data.message);
      setForm({ name: '', email: '', amount: '', type: 'donation', message: '' });
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.message || 'Something went wrong.');
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

        <p className="text-xs tracking-widest mb-3 text-center" style={{ color: '#e91e8c' }}>GIVE</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3"
          style={{ color: '#fafafa' }}>Support Godfest</h1>
        <p className="text-center text-sm mb-12" style={{ color: '#888' }}>
          Your generosity makes this program possible. Every contribution counts.
        </p>

        {/* Type toggle */}
        <div className="flex rounded-full p-1 mb-8"
          style={{ background: '#111', border: '1px solid #333' }}>
          {['donation', 'sponsorship'].map(t => (
            <button key={t} type="button"
              onClick={() => setForm(p => ({ ...p, type: t }))}
              className="flex-1 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200"
              style={{
                background: form.type === t ? '#e91e8c' : 'transparent',
                color: form.type === t ? '#fafafa' : '#888',
              }}>
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5"
          style={{ background: '#0d0d0d', border: '1px solid #e91e8c22', borderRadius: '20px', padding: '32px' }}>

          <div>
            <label style={labelStyle}>FULL NAME</label>
            <input name="name" value={form.name} onChange={handleChange}
              required placeholder="Your name" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>EMAIL</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              required placeholder="your@email.com" style={inputStyle} />
          </div>

          {/* Quick amount buttons */}
          <div>
            <label style={labelStyle}>AMOUNT (GH₵)</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {AMOUNTS.map(a => (
                <button key={a} type="button"
                  onClick={() => setForm(p => ({ ...p, amount: String(a) }))}
                  className="px-4 py-2 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: form.amount === String(a) ? '#e91e8c' : '#111',
                    color: form.amount === String(a) ? '#fafafa' : '#888',
                    border: '1px solid #333',
                  }}>
                  GH₵ {a}
                </button>
              ))}
            </div>
            <input type="number" name="amount" value={form.amount} onChange={handleChange}
              required placeholder="Or enter custom amount" style={inputStyle} min="1" />
          </div>

          <div>
            <label style={labelStyle}>MESSAGE (OPTIONAL)</label>
            <textarea name="message" value={form.message} onChange={handleChange}
              placeholder="Leave an encouraging word..." rows={3}
              style={{ ...inputStyle, resize: 'none' }} />
          </div>

          {status === 'success' && (
            <div className="rounded-xl p-4 text-sm text-center"
              style={{ background: '#0a2a0a', border: '1px solid #2a6a2a', color: '#6abf6a' }}>
              {msg}
            </div>
          )}
          {status === 'error' && (
            <div className="rounded-xl p-4 text-sm text-center"
              style={{ background: '#2a0a0a', border: '1px solid #6a2a2a', color: '#bf6a6a' }}>
              {msg}
            </div>
          )}

          <button type="submit" disabled={status === 'loading'}
            className="w-full py-4 rounded-full text-sm font-medium mt-2 transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: '#e91e8c', color: '#fafafa' }}>
            {status === 'loading' ? 'Submitting...' : `Give ${form.amount ? 'GH₵ ' + form.amount : 'Now'}`}
          </button>
        </form>
      </div>
    </main>
  );
}