import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from './Header';
import User from './User';
import Invoices from './Invoices';
import InvoiceDetails from './InvoiceDetails';
import AddInvoice from './AddInvoice';
import Welcome from "./Welcome";
import './scss/Home.scss';
import ChangePassword from "./ChangePassword";

const Home = () => {
    const {isAuthenticated, isAuthenticationInProgress} = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        if (isAuthenticationInProgress) {
            return <div>Loading...</div>;
        }
        navigate('/login');
    }

    return (
        <div className="home">
            <Header/>
            <div className="home__content">
                <Routes>
                    <Route path="user" element={<User/>}/>
                    <Route path="invoices" element={<Invoices/>}/>
                    <Route path="invoice/:id" element={<InvoiceDetails/>}/>
                    <Route path="add-invoice" element={<AddInvoice/>}/>
                    <Route path="change-password" element={<ChangePassword/>}/>
                    <Route path="*" element={<Welcome/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Home;