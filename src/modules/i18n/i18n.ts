import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import ICU from 'i18next-icu';

void i18n
  .use(ICU)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
    postProcess: ['customProcessor'],
  });

i18n.on('initialized', () => {
  if (i18n.services.formatter) {
    i18n.services.formatter.add('customProcessor', value => {
      if (typeof value === 'string') {
        return value.replace(/\$\{(\w+)\}/g, '{$1}');
      }
      return value;
    });
  }
});

export default i18n;
