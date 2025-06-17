import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/student.js';

export const authenticate = async (req, res, next) => {
  const authorization = req.get('Authorization');

  // console.log('Authorization:', authorization);

  if (!authorization) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authorization.split(' ')[0];
  const token = authorization.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};
