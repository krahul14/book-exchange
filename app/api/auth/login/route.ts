import { NextResponse } from 'next/server';
import { readData } from '@/lib/fileUtils';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const users = await readData('users.json');
  const user = users.find((u: any) => u.email === email && u.password === password);
  if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  return NextResponse.json(user);
}
