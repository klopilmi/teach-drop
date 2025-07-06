export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#22577A] text-white p-4">Dashboard Header</header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-200 p-4 text-center">Footer</footer>
    </div>
  );
}