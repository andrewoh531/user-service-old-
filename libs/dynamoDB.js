import AWS from 'aws-sdk';
import Promise from 'bluebird';
import vogels from 'dynogels';

Promise.promisifyAll(require('dynogels/lib/table').prototype);
Promise.promisifyAll(require('dynogels/lib/item').prototype);
Promise.promisifyAll(require('dynogels/lib/query').prototype);
Promise.promisifyAll(require('dynogels/lib/scan').prototype);
Promise.promisifyAll(require('dynogels/lib/parallelScan').prototype);

const vogels_model = vogels.model;
vogels.model = function(name, model){
  if (model) { Promise.promisifyAll(model); }
  return vogels_model.apply(vogels, arguments);
};

Promise.promisifyAll(vogels);

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
