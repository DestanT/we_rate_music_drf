import { createContext, useContext, useState } from 'react';

export const SpotifyPlayerUriContext = createContext();
export const SetSpotifyPlayerUriContext = createContext();

export const useSpotifyPlayerUri = () => useContext(SpotifyPlayerUriContext);
export const useSetSpotifyPlayerUri = () =>
  useContext(SetSpotifyPlayerUriContext);

export const SpotifyPlayerUriProvider = ({ children }) => {
  const [spotifyPlayerUri, setSpotifyPlayerUri] = useState(
    'spotify:album:1VrravzsxruIeQf1cuE6zB'
  );

  return (
    <SpotifyPlayerUriContext.Provider value={spotifyPlayerUri}>
      <SetSpotifyPlayerUriContext.Provider value={setSpotifyPlayerUri}>
        {children}
      </SetSpotifyPlayerUriContext.Provider>
    </SpotifyPlayerUriContext.Provider>
  );
};