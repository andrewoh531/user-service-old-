import Promise from 'bluebird';
import vogels from 'dynogels';

Promise.promisifyAll(require('dynogels/lib/table').prototype);
Promise.promisifyAll(require('dynogels/lib/item').prototype);
Promise.promisifyAll(require('dynogels/lib/query').prototype);
Promise.promisifyAll(require('dynogels/lib/scan').prototype);
Promise.promisifyAll(require('dynogels/lib/parallelScan').prototype);

var vogels_model = vogels.model;
vogels.model = function(name, model){
  if (model) { Promise.promisifyAll(model); }
  return vogels_model.apply(vogels, arguments);
};

Promise.promisifyAll(vogels);

export default vogels;
