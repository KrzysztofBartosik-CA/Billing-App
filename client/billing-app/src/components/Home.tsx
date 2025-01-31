import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';
import './scss/Home.scss';

const Home = () => {
    const authContext = useContext(AuthContext);

    return (
        <div className="home">
            <Header />
            <div className="home__content">
                {/* Add your content here */}
            </div>
        </div>
    );
};

export default Home;