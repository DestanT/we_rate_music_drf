// CREDIT: Code taken from Code Institute's 'Moments' walkthrough project
import { axiosReq } from '../api/axiosDefaults';
import jwtDecode from 'jwt-decode';

/**
 * Fetches more data from a paginated API and updates the state of the resource.
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
    // console.log(err);
  }
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem('refreshTokenTimestamp');
};

export const removeLocalStorageItems = () => {
  localStorage.removeItem('refreshTokenTimestamp');
  localStorage.removeItem('code');
  localStorage.removeItem('code_verifier');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Used in StarRating.js to calculate the average rating and update the state
// Considers the fact that an existing rating is being updated
export function calculateAverageRatingPUT(prevState, rating, selectedValue) {
  return (
    (prevState.average_rating * prevState.ratings_count -
      rating +
      selectedValue) /
    prevState.ratings_count
  );
}

// Used in StarRating.js to calculate the average rating and update the state
// Considers the fact that a new rating is being added
export function calculateAverageRatingPOST(prevState, selectedValue) {
  return (
    (prevState.average_rating * prevState.ratings_count + selectedValue) /
    (prevState.ratings_count + 1)
  );
}
