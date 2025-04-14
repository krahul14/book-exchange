import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <main className="max-w-full mx-auto">{children}</main>
      </body>
    </html>
  );
}
