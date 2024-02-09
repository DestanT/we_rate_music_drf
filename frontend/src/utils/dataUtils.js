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
