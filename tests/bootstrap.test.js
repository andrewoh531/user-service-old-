import vogels from '../libs/dynamoDB';
import UserModel from '../libs/UserModel';

function createTables(done) {
  vogels.createTablesAsync()
    .then(() => {
      console.log('DynamoDB tables recreated');
      done();
    })
    .catch(err => {
      console.log('Error recreating tables: ', err);
      done(err);
    });
}

before(done => {
  UserModel.deleteTableAsync()
    .then(() => createTables(done))
    .catch(() => createTables(done));
});

