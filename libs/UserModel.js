import Joi from 'joi';
import AWS from 'aws-sdk';

import vogels from './dynamoDB';

const users = vogels.define('users', {
  tableName: 'users',
  hashKey : 'userId',
  timestamps : false,
  schema: {
    userId: Joi.string(),
    name: Joi.string(),
    email: Joi.string().email()
  }
});

export default users;
