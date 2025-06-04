/**
 * Plone Login
 * @module actions/auth/plone
 */
import { PLONE_LOGIN } from '../../constants/ActionTypes';

/**
 * Dispatches an action to log in with a local Plone user.
 * Will be used to clear the leftover next_url from a possible previous OIDC login.
 * @function ploneLogin
 * @returns {Object} Plone log in.
 */
export function ploneLogin() {
  return {
    type: `${PLONE_LOGIN}`,
  };
}
