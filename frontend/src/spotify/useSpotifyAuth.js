// SOURCE: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
import { useEffect } from 'react';
import {
  clientId,
  codeVerifier,
  getCodeChallenge,
  redirectUri,
} from '../utils/spotifyAuthUtils';

export const useSpotifyAuth = () => {
  const spotifyAuthentication = async () => {
    const scope = 'user-read-private user-read-email streaming';
    const authUrl = new URL('https://accounts.spotify.com/authorize');

    // generated in utils/spotifyAuthUtils.js
    window.localStorage.setItem('code_verifier', codeVerifier);

    const codeChallenge = await getCodeChallenge();

    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  const getToken = async (code) => {
    // stored from spotifyAuthentication()
    let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const url = 'https://accounts.spotify.com/api/token';
    const body = await fetch(url, payload);
    const response = await body.json();

    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
    } else {
      console.log('Error: ', response);
    }
  };

  const handleAuthentication = async () => {
    await spotifyAuthentication();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    if (code) {
      window.localStorage.setItem('code', code);
      getToken(code);
    }
  }, []);

  return { handleAuthentication };
};
