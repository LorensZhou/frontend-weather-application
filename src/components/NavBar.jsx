
import logo from '../assets/weather-icon.png';
import { useNavigate, Link } from 'react-router-dom';

function NavBar() {

    const navigate = useNavigate();

    return (
        <nav>
            <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Weather Application
            </h3>
          </span>
            </Link>

                <button
                    type="button"
                >
                    Log uit
                </button>

                <div>
                    <button
                        type="button"
                        onClick={() => navigate('/signin')}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/signup')}
                    >
                        Registreren
                    </button>
                </div>

        </nav>
    );
}

export default NavBar;