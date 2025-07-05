import LoginForm from "../components/forms/LoginForm"

const Home = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center align-center gap-4 text-brand-500">
            <div className="primary-container text-center flex flex-col justify-center align-center gap-4">
                <h1 className="w-full font-bold text-2xl">👋 Welcome to TeachDrop!</h1>
                <span className="w-full text-center">🎉 Happy to have you here!</span>
                <LoginForm />
            </div>
        </section>
    )
}

export default Home
