import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Users } from '../database';

const tokenKey = process.env.TOKEN_KEY || 'auth-token-key';

export const register = async ({ name, password }: { name: string; password: string }) => {
  if (!(name && password)) {
    throw Error('All input is required');
  }

  // at least one number, one lowercase and one uppercase letter
  // at least six characters
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    throw Error(
      'Password must be at least six characters and contain at least one number, one lowercase and one uppercase letter',
    );
  }

  // check if user already exists
  const existingUser = await Users.findOne({ name });
  if (existingUser) {
    throw Error('User already exists');
  }

  // encrypt user password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // create user in database
  const { insertedId } = await Users.insertOne({ name, password: encryptedPassword });

  // create token
  const token = jwt.sign({ id: name }, tokenKey, {
    expiresIn: '2h',
  });

  const user = await Users.findOne({ _id: insertedId });

  return { ...user, id: user!._id, token };
};

export const login = async ({ name, password }: { name: string; password: string }) => {
  if (!(name && password)) {
    throw new Error('All input is required');
  }

  const user = await Users.findOne({ name });
  if (_.isEmpty(user)) {
    throw new Error('User does not exist');
  }

  const isMatch = await bcrypt.compare(password, user!.password);

  if (!isMatch) {
    new Error('Invalid credentials');
  }

  // create token
  const token = jwt.sign({ id: name }, tokenKey, {
    expiresIn: '2h',
  });

  return { ...user, id: user!._id, token };
};
