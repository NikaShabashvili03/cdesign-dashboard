const supportedLngs = ['en', 'ka', 'ru'] as const;
type SupportedLang = typeof supportedLngs[number];

const pathDetector: any = {
  name: 'path',
  lookup() {
    const lang = window.location.pathname.split('/')[1];
    return supportedLngs.includes(lang as SupportedLang) ? lang : undefined;
  },
  cacheUserLanguage() {},
};

export default pathDetector