export default function Home() {
  return (
    <section className="min-h-screen bg-gradient-to-br w-full from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-md">
          📚 P2P Book Exchange
        </h1>
        <p className="text-lg text-gray-700">
          Share, discover, and borrow books with your community.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">Get Started</a>
          <a href="/login" className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800">Login</a>
        </div>
      </div>
    </section>
  );
}
