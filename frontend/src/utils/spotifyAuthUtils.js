// SOURCE: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

// Code verifier
const generateRandomString = (length) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

// Code challenge
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// Exports
export const clientId = '51c949a050b74ceba5688d10a1c7f5f1';
export const redirectUri = 'http://localhost:3000/spotify-search';
export const codeVerifier = generateRandomString(64);
export const getCodeChallenge = async () => {
  const hashed = await sha256(codeVerifier);
  return base64encode(hashed);
};
