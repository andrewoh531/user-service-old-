import AWS from 'aws-sdk';
import vogels from 'dynogels-promisified';

if (process.env.NODE_ENV === 'test') {
  vogels.AWS.config.update({accessKeyId: 'stub', secretAccessKey: 'stub', region: "ap-southeast-2"});
}

const dynamo = initializeDynamoDB();
vogels.dynamoDriver(dynamo);

function initializeDynamoDB() {
  const options = {
    region: 'ap-southeast-2',
    apiVersion: '2012-08-10'
  };

  if (process.env.NODE_ENV === 'test') {
    options.endpoint = 'http://localhost:4567';
  }

  return new AWS.DynamoDB(options);
}

export default vogels;
