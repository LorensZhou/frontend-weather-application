
import './CityDetailPage.css';
import {Link, useParams} from 'react-router-dom';
import cities from "../../constants/cities.js";
import Button from "../../components/button/Button.jsx";

function CityDetailPage() {
    const {id} = useParams();

    const {name, inhabitants} = cities.find((city) => {
        return city.number.toString() === id;
    });

    const fetchWeatherData = async () => {

    }

    return (
        <div>
            <Button  type="button"
                     onClick={fetchWeatherData}
                     variant="primary">
                ophalen weervoorspelling per uur
            </Button>

            <div className="header-forecast"><p>De stad is {name} met {inhabitants} inwoners</p></div>

            <Link to="/cities" className="back-link">
                <p>Terug naar de overzichtspagina</p>
            </Link>

        </div>
    );
}

export default CityDetailPage;