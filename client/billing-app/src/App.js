import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import './AppHeader.css';
import Login from './components/Login';
import Register from './components/Register';
import {AuthProvider} from './context/AuthContext';
import {ToastProvider} from "./context/ToastContext";
import {LanguageProvider} from './context/LanguageContext';
import Home from './components/Home';

export default function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <LanguageProvider>
                    <Router>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="*" element={<Home/>}/>
                        </Routes>
                    </Router>
                </LanguageProvider>
            </ToastProvider>
        </AuthProvider>
    );
}