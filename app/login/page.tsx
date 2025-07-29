'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';

export default function LoginPage() {
  const [form, setForm] = useState({ name: '', pass: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // At the top inside useEffect
  useEffect(() => {
    const token = localStorage.getItem('csrf_token');
    if (token) {
      router.replace('/');
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { success, token, message } = await loginUser(form.name, form.pass);
    setMessage(success ? `✅ ${message}` : `❌ ${message}`);

    if (success && token) {
      localStorage.setItem('csrf_token', token);
      window.dispatchEvent(new Event('authChanged'));
      localStorage.setItem('username', form.name);
      router.replace('/');
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">🔄 Checking login status...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Username"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={form.pass}
          onChange={e => setForm({ ...form, pass: e.target.value })}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className={`w-full p-2 rounded text-white transition ${
            submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}
