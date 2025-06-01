import { useRef, useEffect, useState } from 'react';
import logo from '../../assets/weather-icon.png';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import Button from '../button/Button.jsx';

function NavBar({isAuth, logout}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false); // Close the dropdown after navigation
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    //checken of we op de login pagina zitten
    const isSignInPage = location.pathname === "/signin";

    return (
        <header>
        <nav>
            <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Weather App
            </h3>
          </span>
            </Link>

            {isAuth ?
                (<div className="logged-in-buttons">
                    <div id="logout-button-cont">
                    <Button
                        type="button"
                        onClick={logout}
                        variant="primary">
                        Log uit
                    </Button>
                    </div>

                    <div className="dropdown-menu-container">
                        <Button onClick={handleToggle}
                                type="button"
                                variant = "primary">
                            zoek menu
                        </Button>
                        {isOpen && (
                            <div ref={dropdownRef} className="dropdown-menu">
                                <Button
                                    type="button"
                                    variant = "primary"
                                    onClick={() => handleNavigation("/currentWeather")}>
                                    zoeken huidige weer
                                </Button>
                                <Button
                                    type="button"
                                    variant = "primary"
                                    onClick={() => handleNavigation("/forecast")}>
                                    zoeken weer voorspelling
                                </Button>
                                <Button
                                    type="button"
                                    variant = "primary"
                                    onClick={() => handleNavigation("/cities")}>
                                    zoeken op een stad/locatie
                                </Button>
                            </div>
                        )}
                      </div>
                    </div>
                    )
                    :
                    (<div className="auth-buttons">
                        {!isSignInPage && (<Button
                            type="button"
                            variant = "primary"
                            onClick={() => navigate("/signin")}>
                            Log in
                        </Button>)
                        }

                        <Button
                            type="button"
                            variant = "primary"
                            onClick={() => navigate("/signup")}>
                            Registreren
                        </Button>
                    </div>
                    )
                    }
                </nav>
        </header>
                );
            }

export default NavBar;