
import { Route, Navigate, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function App() {

    return (
        <>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/signin" element={<SignIn />}/>
                    <Route path="/signup" element={<SignUp />}/>
                </Routes>
            </div>
        </>
    );
}

export default App;