'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', mobile: '', role: 'owner' });

  async function handleSubmit(e: any) {
    e.preventDefault();
    await fetch('/api/users', { method: 'POST', body: JSON.stringify(form) });
    router.push('/login');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded space-y-4 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold">Create Account</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <input placeholder="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} required />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })} className="border p-2 rounded w-full">
        <option value="owner">Owner</option>
        <option value="seeker">Seeker</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
}
