import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, toggleError] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    toggleError(false);

  }

  return (
      <>
        <h1>Inloggen</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email-field">
            Emailadres:
            <input
                type="email"
                id="email-field"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="password-field">
            Wachtwoord:
            <input
                type="password"
                id="password-field"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}

          <button
              type="submit"
              className="form-button"
          >
            Inloggen
          </button>
        </form>

        <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
      </>
  );
}

export default SignIn;