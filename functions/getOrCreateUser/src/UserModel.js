import vogels from 'dynogels';
import Joi from 'joi';
import AWS from 'aws-sdk';

vogels.AWS.config.update({region: 'ap-southeast-2'});
//const dynamoDB = new AWS.DynamoDB();

const test = vogels.define('test', {
  tableName: 'test',
  hashKey : 'key',
  timestamps : false,
  schema : {
    key   : Joi.string(),
    value : Joi.string()
  }
});

export default test;
