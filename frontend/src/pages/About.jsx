import { aboutData } from "../static-data/AboutData"

const About = () => {
    return (
        <section className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{aboutData.title}</h1>

            <p className="text-gray-600 mb-4">{aboutData.description}</p>

            <h2 className="text-xl font-semibold mb-2 text-gray-700">🔑 Key Features:</h2>
            <ul className="list-disc list-inside text-gray-600">
                {aboutData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </section>
    )
}

export default About
