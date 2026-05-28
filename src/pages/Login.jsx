import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await client.post('/auth/login', form);
      localStorage.setItem('godfest_token', res.data.token);
      navigate('/dashboard');
    } catch {
      setError('Invalid username or password.');
    }
  };

  const inputStyle = {
    background: '#111', border: '1px solid #333', color: '#fafafa',
    borderRadius: '10px', padding: '14px 16px', width: '100%',
    fontSize: '14px', outline: 'none',
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#0a0a0a' }}>
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold text-center mb-8"
          style={{ color: '#fafafa' }}>Admin Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4"
          style={{ background: '#0d0d0d', border: '1px solid #e91e8c22', borderRadius: '20px', padding: '32px' }}>
          <input name="username" placeholder="Username" required
            onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
            style={inputStyle} />
          <input type="password" name="password" placeholder="Password" required
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            style={inputStyle} />
          {error && <p className="text-xs text-center" style={{ color: '#bf6a6a' }}>{error}</p>}
          <button type="submit"
            className="w-full py-4 rounded-full text-sm font-medium mt-2"
            style={{ background: '#e91e8c', color: '#fafafa' }}>
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}