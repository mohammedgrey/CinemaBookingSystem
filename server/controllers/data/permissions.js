const roles = require('./roles');

const grantAll = () => {
  return {
    GET: 1,
    POST: 1,
    PUT: 1,
    DELETE: 1
  };
};
const prohibitAll = () => {
  return {
    GET: 0,
    POST: 0,
    PUT: 0,
    DELETE: 0
  };
};
const readOnly = () => {
  return {
    GET: 1,
    POST: 0,
    PUT: 0,
    DELETE: 0
  };
};
const grantAllWithNoEdit = () => {
  return {
    GET: 1,
    POST: 1,
    PUT: 0,
    DELETE: 1
  };
};

module.exports = {
  [roles.ADMIN]: {
    movies: grantAll(),
    users: grantAll(),
    reservations: grantAll(),
    rooms: grantAll()
  },
  [roles.MANAGER]: {
    movies: grantAll(),
    users: prohibitAll(),
    reservations: grantAll(),
    rooms: grantAll()
  },
  [roles.CUSTOMER]: {
    movies: readOnly(),
    users: prohibitAll(),
    reservations: grantAllWithNoEdit(), //if a user reserved a wrong seat and want to modify, he should DELETE his/her reservation and reserve a new seat
    rooms: prohibitAll()
  },
  [roles.GUEST]: {
    movies: readOnly(),
    users: prohibitAll(),
    reservations: prohibitAll(),
    rooms: prohibitAll()
  }
};
