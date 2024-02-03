// Normalises data from the Spotify API to match the format of DRF's API
export function normaliseSpotifyData(data) {
  return {
    added_on: null,
    average_rating: null,
    id: data.id,
    iframe_uri: data.uri,
    image: data.images[0]?.url,
    is_owner: null,
    owner: null,
    rating_id: null,
    ratings_count: null,
    title: data.name,
    url: data.external_urls.spotify,
  };
}
