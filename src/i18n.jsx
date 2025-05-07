import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome to ANT Bus',
      contact: 'Contact Us',
      offer: 'Offer',
      support: 'Support',
      liveTracking: 'Live Tracking',
      faq: 'FAQ',
      wallet: 'Wallet',
      // Add more keys...
    },
  },
  hi: {
    translation: {
      welcome: 'ANT बस में आपका स्वागत है',
      contact: 'संपर्क करें',
      offer: 'ऑफ़र',
      support: 'सहायता',
      liveTracking: 'लाइव ट्रैकिंग',
      faq: 'अक्सर पूछे जाने वाले प्रश्न',
      wallet: 'बटुआ',
      // Add more keys...
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
