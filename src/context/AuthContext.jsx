import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import {isValidToken} from '../helper/isValidToken';

export const AuthContext = createContext( null );

function AuthContextProvider( { children } ) {
  const [ auth, setAuth ] = useState( {
    isAuth: false,
    user: null,
    status: "pending",
  } );
  const navigate = useNavigate();
  console.log( "auth1", auth );

  // MOUNTING EFFECT
  useEffect( () => {
    // haal de JWT op uit Local Storage
    const storedToken = localStorage.getItem( "token" );
    // als de token bestaat en geldig is, log de gebruiker in
    if (storedToken && isValidToken(storedToken)) {
      const decoded = jwtDecode( storedToken );
      void fetchUserData(decoded.sub, storedToken);
    }
    else {
      //Als de token niet bestaat of ongeldig is, zet de status op done
      setAuth({
          isAuth: false,
          user: null,
          status: "done",
        } );
    }
  }, [] );

  const login = ( jwtToken ) =>{
    // zet de token in de Local Storage
    localStorage.setItem( "token", jwtToken );
    // decode de token zodat we de ID van de gebruiker hebben en data kunnen ophalen voor de context
    const decodedToken = jwtDecode( jwtToken );

    // geef de ID, token en redirect-link mee aan de fetchUserData functie (staat hieronder)
    void fetchUserData( decodedToken.sub, jwtToken, "/profile" );
    // link de gebruiker door naar de profielpagina
    // navigate('/profile');
  }

  // Omdat we deze functie in login- en het mounting-effect gebruiken, staat hij hier gedeclareerd!
  const fetchUserData = async ( id, jwtToken, redirectUrl ) =>{
    try {
      // haal gebruikersdata op met de token en id van de gebruiker
      const response = await axios.get( `http://localhost:3000/600/users/${ id }`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ jwtToken }`,
        },
      } );
      console.log("Gebruiker is ingelogd!:", jwtToken);
      // zet de gegevens in de state
      setAuth( {
        isAuth: true,
        user: {
          username: response.data.username,
          email: response.data.email,
          id: response.data.id,
        },
        status: "done",
      } );
      console.log("navigate bij login");
      // als er een redirectUrl is, ga daarheen
      if ( redirectUrl ) {
        navigate( redirectUrl );
      }

    } catch ( e ) {
      console.error( e );
      // ging er iets mis? Plaatsen we geen data in de state
      setAuth( {
        isAuth: false,
        user: null,
        status: "done",
      } );
    }
  }

  const logout = () =>{
    console.log( "Gebruiker is uitgelogd!" );
    localStorage.removeItem("token");
    setAuth( {
      isAuth: false,
      user: null,
      status: "done",
    } );
    navigate( "/" );
  }

  const contextData = {
    isAuth: auth.isAuth,
    user: auth.user,
    login: login,
    logout: logout,
  };

  return (
      <AuthContext.Provider value={ contextData }>
        { auth.status === "done" ? children : <p>Loading...</p> }
      </AuthContext.Provider>
  );
}

export default AuthContextProvider;