import React from 'react';
import {useTranslation} from '../hooks/useTranslation';
import './scss/User.scss';

const User = () => {
    const {i18n} = useTranslation();

    return (
        <div className="user">
            <h2 className="user__title">{i18n('user_data')}</h2>
            <form className="user__form">
                <label className="user__label">
                    {i18n('name')}:
                    <input type="text" className="user__input"/>
                </label>
                <label className="user__label">
                    {i18n('email')}:
                    <input type="email" className="user__input"/>
                </label>
                <label className="user__label">
                    {i18n('login')}:
                    <input type="text" className="user__input"/>
                </label>
                <label className="user__label">
                    {i18n('password')}:
                    <input type="password" className="user__input"/>
                </label>
                <button type="submit" className="user__button">{i18n('save')}</button>
            </form>
        </div>
    );
};

export default User;