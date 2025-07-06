import { Link } from 'react-router-dom';
import RegistrationForm from '../components/forms/RegistrationForm';

const Register = () => {
    return (
        <>
            <section>
                <div className='primary-container'>
                    <div className="pt-6">
                        <Link to="/dashboard" className="text-sm text-brand-400 underline hover:text-brand-500 transition-colors">
                            ←   Back to Dashboard
                        </Link>
                    </div>

                    <RegistrationForm />
                </div>
            </section>

            <footer className="bg-brand-100 text-center text-sm text-brand-500 py-3 mt-6 rounded">
                © {new Date().getFullYear()} TeachDrop
            </footer>
        </>
    )
}

export default Register;
