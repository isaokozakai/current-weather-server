import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { devTokenKey } from '../constant';
import { Users } from '../database';

const tokenKey = process.env.TOKEN_KEY || devTokenKey;

export const register = async ({ name, password }: { name: string; password: string }) => {
  if (!(name && password)) {
    throw new Error('All input is required');
  }

  // check if user already exists
  const existingUser = await Users.findOne({ name });
  if (existingUser) {
    throw new Error('User already exists');
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
