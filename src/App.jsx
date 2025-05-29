import {useContext} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Profile from './pages/profile/Profile.jsx';
import Home from './pages/home/Home.jsx';
import SignIn from './pages/signin/SignIn.jsx';
import SignUp from './pages/signup/SignUp.jsx';
import './App.css';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/navbar/NavBar.jsx';
import CitiesPage from "./pages/citiesPage/CitiesPage.jsx";

function App() {
    const { isAuth } = useContext(AuthContext);
    return (
        <>
            <NavBar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login"/>}/>
                    <Route path="/signin" element={<SignIn />}/>
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/cities" element={<CitiesPage />}/>
                </Routes>
            </div>
        </>
    );
}

export default App;