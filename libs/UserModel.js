import Joi from 'joi';

import vogels from './dynamoDB';

const users = vogels.define('users', {
  tableName: 'users',
  hashKey : 'userId',
  timestamps : false,
  schema: {
    userId: Joi.string(),
    name: Joi.string(),
    fbId: Joi.string(),
    email: Joi.string().email()
  },
  indexes : [{
    hashKey : 'fbId', name : 'FbIdIndex', type : 'global'
  }]
});

export default users;
