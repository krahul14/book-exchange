import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/fileUtils';
import { Book } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const books: Book[] = await readData('books.json');
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const body = await req.json();
  const books: Book[] = await readData('books.json');
  const newBook: Book = { id: uuidv4(), status: 'available', ...body };
  books.push(newBook);
  await writeData('books.json', books);
  return NextResponse.json(newBook, { status: 201 });
}

export async function PUT(req: Request) {
  const updatedBook: Book = await req.json();
  const books: Book[] = await readData('books.json');
  const index = books.findIndex((b) => b.id === updatedBook.id);
  if (index === -1) return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  books[index] = { ...books[index], ...updatedBook };
  await writeData('books.json', books);
  return NextResponse.json(books[index]);
}

export async function PATCH(req: Request) {
  const { id } = await req.json();
  const books: Book[] = await readData('books.json');
  const book = books.find((b) => b.id === id);
  if (!book) return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  book.status = book.status === 'available' ? 'rented' : 'available';
  await writeData('books.json', books);
  return NextResponse.json(book);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const books: Book[] = await readData('books.json');
  const filtered = books.filter((b) => b.id !== id);
  await writeData('books.json', filtered);
  return NextResponse.json({ message: 'Deleted' });
}
