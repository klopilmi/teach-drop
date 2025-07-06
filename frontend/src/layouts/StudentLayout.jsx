export default function StudentLayout({ children }) {
    return (
        <div className="min-h-screen">
            <header className="bg-green-600 text-white p-4">Student Header</header>
            <main className="p-4">{children}</main>
        </div>
    );
}