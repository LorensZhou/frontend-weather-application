import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';
import './SignIn.css';
import Button from '../../components/button/Button.jsx';
import Input from '../../components/input/Input.jsx';
import ErrorMessage from '../../components/errorMessage/ErrorMessage.jsx';
import Loading from '../../components/loading/Loading.jsx';

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    toggleError(false);
    toggleLoading(true);

    try {
      const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
        username: username,
        password: password,
      });

      // geef de JWT token aan de login-functie van de context mee
      if(response.status === 200) {
        //aanroep van login functie uit AuthContext
        login(response.data.accessToken);
      }

    } catch(e) {
      console.error(e);
      toggleError(true);
    }
    toggleLoading(false);
  }

  return (
      <>
        <section>
        <h1>Inloggen</h1>
            <p>Hier kunt je inloggen met je gegevens. Als je ingelogd bent, dan heb je toegang tot functionaliteiten om weergegevens op te zoeken.</p>
        <form onSubmit={handleSubmit}>
          <Input
                labelText="Gebruikersnaam:"
                type="text"
                id="username-field"
                name="username"
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
              minLength={6}
              required={true}
              handleChange={(e) => setPassword(e.target.value)}
          />

          {error && <ErrorMessage
                     message="Combinatie van emailadres en wachtwoord is onjuist"/>}
            {loading && <Loading
                         loadingText="De inloggegevens worden gecontroleerd..."/>}

          <Button
              type="submit"
              variant="primary"
             >
            Inloggen
          </Button>
        </form>
        </section>

        <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
      </>
  );
}

export default SignIn;