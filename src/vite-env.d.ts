/// <reference types="vite/client" />

/**
 * Type definitions for environment variables
 * This provides autocomplete and type safety for import.meta.env
 */
interface ImportMetaEnv {
  readonly VITE_UNSPLASH_ACCESS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
