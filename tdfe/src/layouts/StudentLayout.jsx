import Navbar from "../components/layouts/NavBar";

export default function StudentLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow p-4">
                {children}
            </main>

            <footer className="bg-brand-100 p-2 text-center text-sm text-brand-500">
                © {new Date().getFullYear()} TeachDrop
            </footer>
        </div>
    );
}
