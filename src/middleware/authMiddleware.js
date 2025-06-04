import { debounce } from 'lodash';
import Cookies from 'universal-cookie';

const reload = debounce((store) => {
  const cookies = new Cookies();
  if (cookies.get('slo_triggered_reload')) {
    cookies.remove('slo_triggered_reload', { path: '/' });
    // If the cookie 'slo_triggered' is set, we reload the page
    // to acklowledge the expired auth_token
    // timeouts present to allow the state to update
    setTimeout(() => {
      window.location.reload();
    }, 1000)};
  }, 500);

export const authMiddleware = (middlewares) => [
  (store) => (next) => (action) => {
    reload(store);
    
    return next(action);
  },
  ...middlewares,
];

export default authMiddleware;