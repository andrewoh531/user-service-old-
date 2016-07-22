import vogels from '../libs/dynamoDB';
import UserModel from '../libs/UserModel';

before(done => {
  vogels.createTablesAsync()
    .then(() => {
      console.log('DynamoDB tables recreated');
      done();
    })
    .catch(err => {
      console.log('Error recreating tables: ', err);
      done(err);
    });
});

after(done => {
  UserModel.deleteTableAsync()
    .then(() => {
      console.log('successfully deleted tables');
      done();
    })
    .catch(err => {
      console.log(`error deleting tables: ${JSON.stringify(err)}`);
      done();
    });
});

