import AWS from 'aws-sdk';
import vogels from './vogelsPromisified';
import config from './config';

const dynamo = initializeDynamoDB();
vogels.dynamoDriver(dynamo);

function initializeDynamoDB() {
  const options = {
    region: config.get('awsRegion'),
    apiVersion: '2012-08-10'
  };

  if (config.get('dynamoDBEndpoint')) {
    options.endpoint = config.get('dynamoDBEndpoint');
  }

  return new AWS.DynamoDB(options);
}

export default vogels;
