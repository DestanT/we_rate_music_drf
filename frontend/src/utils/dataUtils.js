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
    console.log(err);
  }
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem('refreshTokenTimestamp');
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp');
};
