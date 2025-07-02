import React from 'react';
import cities from '../../constants/cities.js';
import './CitiesPage.css';
import dutchNumberFormat from '../../helper/dutchNumberFormat.js';
import {Link} from 'react-router-dom';

function CitiesPage() {
    return (
        <div>
            <section className="outer-container">
                <div className="inner-container text-container">
            <h1>Steden Pagina</h1>
            <p>Hieronder staan de steden in Zuid-Holland met meer dan 10.000 inwoners.</p>
            <p>Door op de link te klikken wordt u gestuurd naar de detailpagina waar de weervoorspellingen worden getoond. </p>
            </div>
                </section>
            <section className="outer-container">
            <div className="inner-container text-container">
                <ul>
                    {cities.map((city)=>{
                        return (
                            <div className="city-item" key={city.number}>
                                <li>
                                    <p>{city.number}. <Link to={`/cities/${city.number}`}>{city.name}</Link>, inwoners aantal: {dutchNumberFormat(city.inhabitants)}
                                    </p>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
            </section>
        </div>
    );
}

export default CitiesPage;