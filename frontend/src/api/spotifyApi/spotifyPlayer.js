// SOURCE: https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api
import React, { useEffect, useRef, useState } from 'react';
import { useSpotifyPlayerUri } from '../../contexts/SpotifyPlayerUriContext';

function SpotifyPlayer() {
  const playerRef = useRef();
  const spotifyPlayerUri = useSpotifyPlayerUri();
  const [embedController, setEmbedController] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const options = {
        width: '100%',
        height: '352px', // 352px is the minimum height before the player resizes to a smaller size
        uri: spotifyPlayerUri,
      };

      const callback = (EmbedController) => {
        setEmbedController(EmbedController);
      };

      IFrameAPI.createController(playerRef.current, options, callback);
    };
  }, []);

  useEffect(() => {
    if (embedController) {
      embedController.loadUri(spotifyPlayerUri);
    }
  }, [spotifyPlayerUri, embedController]);

  return <div ref={playerRef}></div>;
}

export default SpotifyPlayer;
