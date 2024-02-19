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
export const codeVerifier = generateRandomString(64);
export const getCodeChallenge = async () => {
  const hashed = await sha256(codeVerifier);
  return base64encode(hashed);
};

// Redirect URI
export let redirectUri;
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  redirectUri = 'http://localhost:3000/spotify-search';
} else {
  redirectUri =
    'https://we-rate-music-react-f931068bb6db.herokuapp.com/spotify-search';
}

// Refreshing the access token
export const getRefreshToken = async () => {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem('refresh_token');
  const url = 'https://accounts.spotify.com/api/token';

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };
  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);
  localStorage.setItem('refresh_token', response.refresh_token);
};
