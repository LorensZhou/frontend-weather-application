import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import Button from '../../components/button/Button.jsx';
import Input from '../../components/input/Input.jsx';
import ErrorMessage from '../../components/errorMessage/ErrorMessage.jsx';
import Loading from '../../components/loading/Loading.jsx';

function SignUp() {
  // state voor het formulier
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // state voor functionaliteit
  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    toggleError(false);
    toggleLoading(true);
    setErrMessage("");

    try {
        const response =
          await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
        username: username,
        email: email,
        password: password,
        role: ["user"]
        });

      // als alles goed gegaan is, linken we door naar de login-pagina
      navigate("/signin");
    }
    catch(e) {
      console.error(e);
      toggleError(true);
      //controleer of de error message aanwezig is in de response van de server
      if(e.response) {
            setErrMessage(`Er is iets misgegaan. Probeer het opnieuw. ${e.response}`); // vul de error message met dat van de backend
      }
      else {
            setErrMessage("Er is iets misgegaan. Probeer het opnieuw."); //een generieke error message
      }
    }
    toggleLoading(false);
  }

  return (
      <>
        <section>
        <h1>Registreren</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
          harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
          doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?
        </p>
        <form onSubmit={handleSubmit}>

            <Input
                labelText="Emailadres:"
                type="email"
                id="email-field"
                name="email"
                value={email}
                required={true}
                handleChange={(e) => setEmail(e.target.value)}
            />

            <Input
                labelText="Gebruikersnaam:"
                type="text"
                name="username"
                id="username-field"
                value={username}
                required={true}
                handleChange={(e) => setUsername(e.target.value)}
            />

            <Input
                labelText="Wachtwoord:"
                type="password"
                id="password-field"
                name="password"
                value={password}
                minLength={6} //aantal karakters van het wachtwoord moet minimaal 6 zijn
                required={true}
                handleChange={(e) => setPassword(e.target.value)}
            />

          {error && <ErrorMessage
                   message={errMessage}/>}
            {loading && <Loading
                         loadingText="Een nieuwe account wordt aangemaakt..."/>}

          <Button
              type="submit"
              variant="primary"
              disabled={loading}
          >
            Registreren
          </Button>

        </form>
        </section>

            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;