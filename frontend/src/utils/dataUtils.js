/**
 * Normalises data from the Spotify API to match the format of DRF's API
 *
 * @param {Object} - data from the Spotify API
 * @returns {Object} - normalised data for the Playlist component
 */
export function normaliseSpotifyData(data) {
  return {
    spotify_id: data.id,
    title: data.name,
    image: data.images[0]?.url,
    url: data.external_urls.spotify,
    iframe_uri: data.uri,

    id: null,
    owner: null,
    is_owner: null,
    added_on: null,
    average_rating: null,
    rating_id: null,
    ratings_count: null,
  };
}
