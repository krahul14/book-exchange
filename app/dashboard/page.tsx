"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BookCard from "@/components/BookCard"
import Navbar from "@/components/Navbar"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [books, setBooks] = useState<any[]>([])
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    contact: "",
    cover: "",
  })
  const [editId, setEditId] = useState<string | null>(null)

  async function fetchBooks() {
    const res = await fetch("/api/books")
    const data = await res.json()
    setBooks(data)
  }

  useEffect(() => {
    const data = localStorage.getItem("user")
    if (!data) return router.push("/login")
    setUser(JSON.parse(data))
  }, [])

  useEffect(() => {
    if (user) fetchBooks()
  }, [user])

  async function handleSubmit(e: any) {
    e.preventDefault()

    const method = editId ? "PUT" : "POST"

    const payload = editId
      ? { ...form, id: editId, ownerId: user.id }
      : { ...form, ownerId: user.id }

    await fetch("/api/books", {
      method,
      body: JSON.stringify(payload),
    })

    setForm({ title: "", author: "", genre: "", contact: "", cover: "" })
    setEditId(null)
    fetchBooks()
  }

  async function handleDelete(id: string) {
    await fetch("/api/books", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
    fetchBooks()
  }

  async function handleToggle(id: string) {
    await fetch("/api/books", { method: "PATCH", body: JSON.stringify({ id }) })
    fetchBooks()
  }

  if (!user) return null

  return (
    <div>
      <Navbar />
      {user.role === "owner" && (
        <div className="p-10 rounded-lg shadow mb-8 w-full ">
          <h2 className="text-xl font-semibold mb-4">Add / Edit Book</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <input
              placeholder="Genre"
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
            />
            <input
              placeholder="Contact"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />
            <input
              placeholder="Cover Image URL"
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
            />
            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                className={`px-6 py-2 rounded text-white ${
                  editId
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {editId ? "Save Changes" : "Add Book"}
              </button>
            </div>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null)
                  setForm({
                    title: "",
                    author: "",
                    genre: "",
                    contact: "",
                    cover: "",
                  })
                }}
                className="ml-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-10">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            userId={user.id}
            onEdit={(b) => {
              setEditId(b.id)
              setForm(b)
            }}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  )
}
