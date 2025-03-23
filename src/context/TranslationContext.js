import React, {createContext, useState, useEffect} from 'react';
import i18n from '../i18n/i18n';

export const TranslationContext = createContext({translationsLoaded: false});

export const TranslationProvider = ({children}) => {
  const [translationsLoaded, setTranslationsLoaded] = useState(
    i18n.isInitialized,
  );

  useEffect(() => {
    if (!translationsLoaded) {
      const onInitialized = () => setTranslationsLoaded(true);
      const onError = error =>
        console.error('Translation loading error:', error);

      i18n.on('initialized', onInitialized);
      i18n.on('failedLoading', onError);

      return () => {
        i18n.off('initialized', onInitialized);
        i18n.off('failedLoading', onError);
      };
    }
  }, [translationsLoaded]);

  return (
    <TranslationContext.Provider value={{translationsLoaded}}>
      {children}
    </TranslationContext.Provider>
  );
};
