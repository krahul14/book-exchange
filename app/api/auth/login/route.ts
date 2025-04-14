import { NextResponse } from 'next/server';
import { readData } from '@/lib/fileUtils';
import { User } from '@/types';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const users: User[] = await readData('users.json');
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  return NextResponse.json(user);
}
