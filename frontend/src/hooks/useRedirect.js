import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useCurrentUser } from '../contexts/CurrentUserContext';

/**
 * useRedirect hook: redirects users based on their logged in status
 */
export const useRedirect = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const userAuthStatus = currentUser ? 'loggedIn' : 'loggedOut';

  useEffect(() => {
    const handleMount = async () => {
      // if user is logged in and on signin/signup page, redirect to profile page
      if (
        (history.location.pathname === '/signin' ||
          history.location.pathname === '/signup') &&
        userAuthStatus === 'loggedIn'
      ) {
        history.push(`/profile/${currentUser.pk}`);
      }
      try {
        await axios.post('/dj-rest-auth/token/refresh/');
        // if userAuthStatus is logged in, do nothing
        if (userAuthStatus === 'loggedIn') {
          return;
        }
      } catch (err) {
        // if user is not logged in, redirect to home/welcome page
        if (userAuthStatus === 'loggedOut') {
          history.push('/');
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus, currentUser.pk]);
};
