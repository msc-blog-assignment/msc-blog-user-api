'use strict';

module.exports = app => {
  let ds = app.datasources.db;

  ds.autoupdate(err => {
    if (err) throw err;

    createBootstrapUsers();
  });

  function createBootstrapUsers() {
    let user = app.models.user;

    user.findOne({where: {username: 'test'}}, (error, response) => {
      if (response) {
        return;
      }

      user.create([
        {
          username: 'username',
          password: 'password',
          email: 'test6@test.com',
          emailVerified: true
        }
      ]);
    });
  }
};
