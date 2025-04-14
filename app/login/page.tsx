'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  async function handleLogin(e: any) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(form)
    });
    if (!res.ok) return alert('Invalid login!');
    const user = await res.json();
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/dashboard');
  }

  return (
    <form onSubmit={handleLogin} className="bg-white shadow-md p-6 rounded space-y-4 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold">Login</h2>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
