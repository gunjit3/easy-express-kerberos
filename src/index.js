import expressAuthNegotiate from 'express-auth-negotiate';
import easyKerberos from 'easy-kerberos';
import composable from 'composable-middleware';

export default () => composable()
  .use(expressAuthNegotiate())
  .use((req, res, next) => {
    easyKerberos(req.auth.token)
      .then(authData => {
        req.auth.username = authData.username;
        req.auth.principle = authData.principle;
        req.auth.serverResponse = authData.serverResponse;
        next();
      }, next);
  });