import { Link } from "react-router-dom";
import { aboutData } from "../static-data/AboutData";

export default function About() {
    return (
        <>
            <section className="min-h-screen flex flex-col justify-between max-w-4xl mx-auto p-6">

                {/* Back Link */}
                <div className="pt-6">
                    <Link to="/" className="text-sm text-brand-400 underline hover:text-brand-500 transition-colors">
                        ← Back to Login
                    </Link>
                </div>

                {/* About Content */}
                <div className="primary-container py-10 px-6 ">
                    <h1 className="text-3xl font-bold mb-4 text-brand-500">{aboutData.title}</h1>

                    <p className="text-gray-600 mb-6 leading-relaxed">{aboutData.description}</p>

                    <h2 className="text-xl font-semibold mb-3 text-brand-500">🔑 Key Features:</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {aboutData.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                {/* Footer */}
            </section>
            <footer className="bg-brand-100 text-center text-sm text-brand-500 py-3 mt-6 rounded">
                © {new Date().getFullYear()} TeachDrop
            </footer>
        </>
    );
}
