
import cities from '../../constants/cities.js';
import './CitiesPage.css';
import {Link} from 'react-router-dom';
import Button from '../../components/button/Button.jsx';


function CitiesPage() {
    return (
        <div>
            <h1>Steden Pagina</h1>
            <p>Hier komt de functionaliteit voor de stad pagina.</p>
            <form>
                <input type="text" placeholder="Zoekterm" />
                <Button type="submit"
                        variant="primary">
                    Zoeken stad
                </Button>
            </form>
            <div className="cities-container">
                <ul>
                    {cities.map((city)=>{
                        return (
                            <div className="city-item" key={city.number}>
                                <li>
                                    <p>{city.number}. <Link to={`/cities/${city.number}`}>{city.name}</Link>, inwoners aantal: {city.inhabitants}
                                    </p>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default CitiesPage;