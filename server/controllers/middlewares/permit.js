const AppError = require('../../utils/appError');
const permissions = require('../data/permissions');
const catchAsync = require('./../../utils/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
  const documentName = req.originalUrl.split('/')[3];
  const currentUser = req.user;
  const friendlyActionMessage = {
    GET: 'view',
    POST: 'add',
    PUT: 'edit',
    DELETE: 'delete'
  };

  if (!permissions[currentUser.role][documentName][req.method])
    return next(
      new AppError(
        `A user with a/n ${currentUser.role} role doesn't have permission to ${
          friendlyActionMessage[req.method]
        } ${documentName}`,
        401
      )
    );

  next();
});
