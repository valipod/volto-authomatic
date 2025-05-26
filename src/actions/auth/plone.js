/**
 * Plone Login
 * @module actions/auth/plone
 */
import { PLONE_LOGOUT } from '../../constants/ActionTypes';

/**
 * Dispatches an action to log out from Plone auth.
 * Will be used to clear the leftover next_url from a possible previous OIDC login.
 * @function ploneLogout
 * @returns {Object} Plone log out.
 */
export function ploneLogout() {
  return {
    type: `${PLONE_LOGOUT}`,
  };
}
