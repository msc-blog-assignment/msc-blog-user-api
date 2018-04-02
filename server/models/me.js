'use strict';

module.exports = Me => {
  Me.me = (req, next) => {
    let AccessToken = Me.app.models.AccessToken;
    AccessToken.findForRequest(req, {}, (aux, accesstoken) => {
      let UserModel = Me.app.models.User;
      UserModel.findById(accesstoken.userId, (error, user) => {
        if (error) {
          return next(error);
        }

        next(error, {user});
      });
    });
  };

  Me.remoteMethod(
    'me',
    {
      accepts: {arg: 'req', type: 'object', http: {source: 'req'}},
      returns: {arg: 'info', type: 'object'},
      http: {path: '/', verb: 'get'}
    }
  );
};
