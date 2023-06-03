export type SupportedLanguage = 'en' | 'id';

export interface Localize {
  readonly i18n?: {
    readonly lang: SupportedLanguage | string;
  };
}
