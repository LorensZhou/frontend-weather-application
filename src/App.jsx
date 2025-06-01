import { useContext } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import Profile from './pages/profile/Profile.jsx';
import Home from './pages/home/Home.jsx';
import SignIn from './pages/signin/SignIn.jsx';
import SignUp from './pages/signup/SignUp.jsx';
import './App.css';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/navbar/NavBar.jsx';
import CitiesPage from './pages/citiesPage/CitiesPage.jsx';
import CityDetailPage from './pages/cityDetailPage/CityDetailPage.jsx';
import NotFound from './pages/notFound/NotFound.jsx';

function App() {
    const { isAuth, logout } = useContext(AuthContext);

    return (
        <>
            <NavBar
            isAuth = {isAuth}
            logout = {logout}
            />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/signin"/>}/>
                    <Route path="/signin" element={<SignIn />}/>
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/cities" element={<CitiesPage />}/>
                    <Route path="/cities/:id" element={<CityDetailPage />}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;