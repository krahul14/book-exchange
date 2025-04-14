'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
  const initial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  const [hovered, setHovered] = useState(false);

  function signOut() {
    localStorage.removeItem('user');
    router.push('/');
  }

  return (
    <nav className="flex justify-between items-center mb-6 w-full bg-white shadow p-4 rounded-lg">
      <h2 className="text-xl font-bold text-blue-700">📖 Book Exchange</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={signOut}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-b-full"
        >
          {hovered ? 'Sign Out' : initial}
        </button>
      </div>
    </nav>
  );
}