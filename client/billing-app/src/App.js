import React, {useContext, useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './AppHeader.css';
import translations from './translations/translations.json';
import Login from './components/Login';
import Register from './components/Register';
import {AuthProvider, AuthContext} from './context/AuthContext';
import {ToastProvider} from "./context/ToastContext";

const API_URL = 'http://localhost:2000/';
const REACT_URL = 'https://reactjs.org';

const getTranslation = (language, key) => {
    return translations[language][key];
};

const Dashboard = () => {
    const [data, setData] = useState('');
    const [language, setLanguage] = useState('en');
    const authContext = useContext(AuthContext);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.text())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const changeLanguage = (event) => {
        setLanguage(event.target.value);
    };

    if (!authContext) {
        return null;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>{data}</p>
                <a
                    className="App-link"
                    href={REACT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a>
                <p>{getTranslation(language, 'hello_label')}</p>
                <div className="language-select">
                    <select onChange={changeLanguage} value={language}>
                        <option value="en">English</option>
                        <option value="pl">Polski</option>
                        <option value="de">Deutsch</option>
                    </select>
                    <button onClick={authContext.logout}>Logout</button>
                </div>
            </header>
        </div>
    );
};

function Root() {
    const authContext = useContext(AuthContext);

    if (!authContext || authContext.isAuthenticationInProgress) {
        return <div>Loading...</div>;
    }

    const element = authContext.isAuthenticated ? <Dashboard/> : <Login/>;

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={element}/>
            </Routes>
        </Router>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <Root/>
            </ToastProvider>
        </AuthProvider>
    );
}