import "fake-indexeddb/auto"; // for indexedDB
import { Crypto } from "@peculiar/webcrypto";

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // Deprecated
    removeListener: () => {}, // Deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Polyfill crypto.subtle
if (!globalThis.crypto) {
  globalThis.crypto = new Crypto();
} else if (!globalThis.crypto.subtle) {
  (globalThis.crypto as any).subtle = new Crypto().subtle;
}
