// client/billing-app/src/components/Home.tsx
import React, {useContext} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import Header from './Header';
import User from './User';
import Invoices from './Invoices';
import InvoiceDetails from './InvoiceDetails';
import AddInvoice from './AddInvoice';
import Welcome from "./Welcome";
import './scss/Home.scss';

const Home = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if (!authContext?.isAuthenticated) {
        if (!authContext || authContext.isAuthenticationInProgress) {
            return <div>Loading...</div>;
        }
    }

    if (!authContext.isAuthenticated) {
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
                    <Route path="*" element={<Welcome />}/>
                </Routes>
            </div>
        </div>
    );
};

export default Home;