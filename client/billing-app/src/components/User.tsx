import React from 'react';
import './scss/User.scss';

const User = () => {
    return (
        <div className="user">
            <h2 className="user__title">User Data</h2>
            <form className="user__form">
                <label className="user__label">
                    Name:
                    <input type="text" className="user__input" />
                </label>
                <label className="user__label">
                    Email:
                    <input type="email" className="user__input" />
                </label>
                <label className="user__label">
                    Login:
                    <input type="text" className="user__input" />
                </label>
                <label className="user__label">
                    Password:
                    <input type="password" className="user__input" />
                </label>
                <button type="submit" className="user__button">Save</button>
            </form>
        </div>
    );
};

export default User;