// SOURCE: https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api
import React, { useEffect, useRef } from 'react';

function SpotifyPlayer() {
  const playerRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const options = {
        width: '100%',
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5',
      };

      const callback = (EmbedController) => {};

      IFrameAPI.createController(playerRef.current, options, callback);
    };
  }, []);

  return <div ref={playerRef}></div>;
}

export default SpotifyPlayer;
