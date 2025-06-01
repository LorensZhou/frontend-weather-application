import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';
import './Profile.css';
import SearchableInput from '../../components/searchableInput/SearchableInput.jsx';
import cities from '../../constants/cities.js';
import getLocalStorageCities from '../../helper/getLocalStorageCities.js';
import Loading from '../../components/loading/Loading.jsx';
import ErrorMessage from '../../components/errorMessage/ErrorMessage.jsx';
import Button from "../../components/button/Button.jsx";

function Profile() {
    const [profileData, setProfileData] = useState({});
    const { user } = useContext(AuthContext);
    const cityNames = cities.map(city => city.name);
    const cityKeys = ["city1", "city2", "city3", "city4", "city5", "city6"];

    const [error, toggleError]  = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [saveBtnDisabled, tglSaveBtnDisabled] = useState(true);

    const [city1, setCity1] = useState("");
    const [city2, setCity2] = useState("");
    const [city3, setCity3] = useState("");
    const [city4, setCity4] = useState("");
    const [city5, setCity5] = useState("");
    const [city6, setCity6] = useState("");

    const [city1Disabled, tglCity1Disabled] = useState(true);
    const [city2Disabled, tglCity2Disabled] = useState(true);
    const [city3Disabled, tglCity3Disabled] = useState(true);
    const [city4Disabled, tglCity4Disabled] = useState(true);
    const [city5Disabled, tglCity5Disabled] = useState(true);
    const [city6Disabled, tglCity6Disabled] = useState(true);

    const handleSearch1 = (value) => setCity1(value);
    const handleSearch2 = (value) => setCity2(value);
    const handleSearch3 = (value) => setCity3(value);
    const handleSearch4 = (value) => setCity4(value);
    const handleSearch5 = (value) => setCity5(value);
    const handleSearch6 = (value) => setCity6(value);

    function handleEditCities() {

    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

    }

    useEffect(() => {
        //disable opslaan button bij mounting
        tglSaveBtnDisabled(true);

        // we halen de pagina-content op in de mounting-cycle
        async function fetchProfileData() {
            toggleError(false);
            toggleLoading(true);

            // haal de token uit de Local Storage om in het GET-request te bewijzen dat we geauthoriseerd zijn
            const token = localStorage.getItem("token");

            try {
                const result = await axios.get("http://localhost:3000/660/private-content", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileData(result.data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        void fetchProfileData();

        //haal de cities uit de local storage geef het weer in de invulvelden
        const citiesFromStorage = getLocalStorageCities(cityKeys);

        //neem de waarden over van de local storage
        if (citiesFromStorage.city1 !== undefined) setCity1(citiesFromStorage.city1); else setCity1("");
        if (citiesFromStorage.city2 !== undefined) setCity2(citiesFromStorage.city2); else setCity2("");
        if (citiesFromStorage.city3 !== undefined) setCity3(citiesFromStorage.city3); else setCity3("");
        if (citiesFromStorage.city4 !== undefined) setCity4(citiesFromStorage.city4); else setCity4("");
        if (citiesFromStorage.city5 !== undefined) setCity5(citiesFromStorage.city5); else setCity5("");
        if (citiesFromStorage.city6 !== undefined) setCity6(citiesFromStorage.city6); else setCity6("");

    }, []);

    useEffect(() => {
        if (!city1Disabled) {
            tglSaveBtnDisabled(false);
        }
    }, [city1Disabled]);

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>

            {/*Als er keys in ons object zitten hebben we data, en dan renderen we de content*/}
            {Object.keys(profileData).length > 0 &&
                <section>
                    <h2>Strikt geheime profiel-content</h2>
                    <h3>{profileData.title}</h3>
                    <p>{profileData.content}</p>
                </section>
            }
            <h2>Opslaan favoriete plaatsen</h2>
            <p>Hier komt de functionaliteit voor toevoegen, verwijderen en aanpassen van
                favoriete plaatsen die kan worden gebruikt voor de zoekfunctie.</p>
            {loading && <Loading loadingText="De data van de gebruiker wordt opgehaald....."/>}
            {error && <ErrorMessage message="Er is een fout opgetreden bij het ophalen van de gebruiker data."/> }

            <section className="search-section">
                <form className="search-form-flex" onSubmit={handleSubmit}>
                    <div className="search-inputs-flex">
                        <div className="search-input-wrapper">
                            <SearchableInput
                                items={cityNames}
                                onSearch={handleSearch1}
                                label="plaats 1"
                                inputId="city1"
                                inputName="city1"
                                initialValue={city1}
                                maxSuggestions={20}
                                disabled={city1Disabled}
                            />
                        </div>
                        <div className="search-input-wrapper">
                            <SearchableInput
                                items={cityNames}
                                onSearch={handleSearch2}
                                label="plaats 2"
                                inputId="city2"
                                inputName="city2"
                                initialValue={city2}
                                maxSuggestions={20}
                                disabled={city2Disabled}
                            />
                        </div>
                        <div className="search-input-wrapper">
                            <SearchableInput
                                items={cityNames}
                                onSearch={handleSearch3}
                                label="plaats 3"
                                inputId="city3"
                                inputName="city3"
                                initialValue={city3}
                                maxSuggestions={20}
                                disabled={city3Disabled}
                            />
                        </div>
                        <div className="search-input-wrapper">
                            <SearchableInput
                                items={cityNames}
                                onSearch={handleSearch4}
                                label="plaats 4"
                                inputId="city4"
                                inputName="city4"
                                initialValue={city4}
                                maxSuggestions={20}
                                disabled={city4Disabled}
                            />
                        </div>
                        <div className="search-input-wrapper">
                            <SearchableInput
                                items={cityNames}
                                onSearch={handleSearch5}
                                label="plaats 5"
                                inputId="city5"
                                inputName="city5"
                                initialValue={city5}
                                maxSuggestions={20}
                                disabled={city5Disabled}
                            />
                        </div>
                        <div className="search-input-wrapper">
                            <SearchableInput
                                items={cityNames}
                                onSearch={handleSearch6}
                                label="plaats 6"
                                inputId="city6"
                                inputName="city6"
                                initialValue={city6}
                                maxSuggestions={20}
                                disabled={city6Disabled}
                            />
                        </div>
                    </div>
                    <div className="button-container-flex">
                        <Button type="submit"
                                variant="secundary"
                                disabled = {saveBtnDisabled}>Opslaan plaatsen</Button>
                        <Button type="button"
                                variant="secundary"
                                onClick={handleEditCities}>Wijzigen plaatsen</Button>
                    </div>
                </form>
            </section>
            <div className="link-container">
                <p>Terug naar de <Link to="/">Homepagina</Link></p>
            </div>
        </>
    );
}

export default Profile;