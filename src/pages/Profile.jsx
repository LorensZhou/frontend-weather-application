
import { Link } from 'react-router-dom';

function Profile() {

  return (
      <>
        <h1>Profielpagina</h1>
        <section>
          <h2>Gegevens</h2>
          <p><strong>Gebruikersnaam:</strong> naam gebruiker</p>
          <p><strong>Email:</strong> email gebruiker</p>
        </section>

        {/*Als er keys in ons object zitten hebben we data, en dan renderen we de content*/}

            <section>
              <h2>Strikt geheime profiel-content</h2>
              <h3>titel</h3>
              <p>inhoud</p>
            </section>

        <p>Terug naar de <Link to="/">Homepagina</Link></p>
      </>
  );
}

export default Profile;