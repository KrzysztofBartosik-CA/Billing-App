import React, { useContext } from 'react';
        import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
        import './App.css';
        import './AppHeader.css';
        import Login from './components/Login';
        import Register from './components/Register';
        import { AuthProvider, AuthContext } from './context/AuthContext';
        import { ToastProvider } from "./context/ToastContext";
        import Home from './components/Home';

        function Root() {
            const authContext = useContext(AuthContext);

            if (!authContext || authContext.isAuthenticationInProgress) {
                return <div>Loading...</div>;
            }

            const element = authContext.isAuthenticated ? <Home /> : <Login />;

            return (
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={element} />
                    </Routes>
                </Router>
            );
        }

        export default function App() {
            return (
                <AuthProvider>
                    <ToastProvider>
                        <Root />
                    </ToastProvider>
                </AuthProvider>
            );
        }