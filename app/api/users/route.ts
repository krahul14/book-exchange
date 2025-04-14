import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/fileUtils';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/types';

export async function GET() {
  const users: User[] = await readData('users.json');
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const users: User[] = await readData('users.json');
  const exists = users.find((u) => u.email === body.email);
  if (exists) return NextResponse.json({ message: 'User already exists' }, { status: 409 });

  const newUser: User = { id: uuidv4(), ...body };
  users.push(newUser);
  await writeData('users.json', users);
  return NextResponse.json(newUser, { status: 201 });
}
