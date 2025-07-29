'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', mail: '', pass: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  // At the top inside useEffect
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('csrf_token');
    if (token) {
      router.replace('/');
    } else {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { success, message } = await registerUser(form.name, form.mail, form.pass);
    setMessage(success ? `✅ ${message}` : `❌ ${message}`);

    if (success) {
      setForm({ name: '', mail: '', pass: '' });

      // Optional: Save email or username if needed
      localStorage.setItem('username', form.name);

      // Redirect to home page
      router.replace('/');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">🔄 Loading Register Page...</div>;
  }


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Username"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="email"
          placeholder="Email"
          value={form.mail}
          onChange={e => setForm({ ...form, mail: e.target.value })}
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
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}
