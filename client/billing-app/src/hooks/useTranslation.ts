import { useContext } from 'react';
import { LanguageContext, LanguageContextProps } from '../context/LanguageContext';
import translations from '../translations/translations.json';

type Translations = {
    [key: string]: {
        [key: string]: string;
    };
};

const typedTranslations: Translations = translations;

export const useTranslation = () => {
    const { language } = useContext(LanguageContext) as LanguageContextProps;

    const i18n = (key: string) => {
        return typedTranslations[language][key] || key;
    };

    return { i18n };
};