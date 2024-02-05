import { axiosReq } from '../api/axiosDefaults';

/**
 * Fetches more data from a paginated API and updates the state of the resource.
 * CREDIT: Code taken from Code Institute's 'Moments' walkthrough project
 *
 * @param {Object} resource - resource to be updated
 * @param {Function} setResource - function to update the resource
 */
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, curr) => {
        return acc.some((accResult) => accResult.id === curr.id)
          ? acc
          : [...acc, curr];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err);
  }
};

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
