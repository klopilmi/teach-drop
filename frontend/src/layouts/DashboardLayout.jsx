import Navbar from "../components/layouts/NavBar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow p-4">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 text-sm text-gray-600 p-4 text-center">
                &copy; {new Date().getFullYear()} TeachDrop
            </footer>
        </div>
    );
}
