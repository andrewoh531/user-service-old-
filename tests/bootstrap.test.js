import vogels from '../libs/dynamoDB';
import UserModel from '../libs/UserModel';

function deleteUserModelTable(cb) {
  UserModel.deleteTable(err => {
    if (err) {
      console.log('Error deleting table: ', err);
    } else {
      console.log('Table has been deleted');
      cb();
    }
  });
}

before(done => {

  vogels.createTables(function(err) {
    if (err) {
      console.log('Error creating tables: ', err);
    } else {
      console.log('Table Users has been created');
      done();
    }
  });
});

after(done => {
  console.log('after');
  deleteUserModelTable(done);
});
