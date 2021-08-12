/**
 * LoginAuthomatic container.
 * @module components/LoginAuthomatic/LoginAuthomatic
 */
import React, { useEffect } from 'react';
import { authomaticLogin } from '../../actions';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const messages = defineMessages({
  oAuthLoginFailed: {
    id: 'Login Failed',
    defaultMessage: 'Login Failed',
  },
  oAuthLoginFailedContent: {
    id: 'Authentication failed.',
    defaultMessage: 'Authentication failed.',
  },
});

/**
 * LoginAuthomatic function.
 * @function LoginAuthomatic
 * @returns {JSX.Element} Markup of the LoginAuthomatic page.
 */
function LoginAuthomatic({ intl }) {
  const query = useLocation().search;
  const { provider } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.authomaticRedirect.session);
  const userSession = useSelector((state) => state.userSession);
  const isLoading = userSession.login.loading;
  const error = userSession.login.error;
  const token = userSession.token;

  useEffect(() => {
    dispatch(authomaticLogin(provider, query, session));
  }, [dispatch, provider, query, session]);

  useEffect(() => {
    if (token) {
      history.push('/');
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
      }
    }
  }, [token, history]);

  useEffect(() => {
    if (error) {
      history.push('/login');
      if (!toast.isActive('loginFailed')) {
        toast.error(
          <Toast
            error
            title={intl.formatMessage(messages.oAuthLoginFailed)}
            content={intl.formatMessage(messages.oAuthLoginFailedContent)}
          />,
          { autoClose: false, toastId: 'loginFailed' },
        );
      }
    }
  }, [error, history, intl]);

  return (
    <div id="page-login">
      <Container text>
        <Dimmer active={isLoading}>
          <Loader size={'huge'}>
            <FormattedMessage
              id="Authenticating"
              defaultMessage="Authenticating"
            />
          </Loader>
        </Dimmer>
      </Container>
    </div>
  );
}

export default injectIntl(LoginAuthomatic);
