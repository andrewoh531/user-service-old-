import test from './UserModel';

export default function(event, ctx, cb) {

  //
  // test.get('a')
  //   .then(res => {
  //     console.log(`res = ${JSON.stringify(res)}`);
  //     cb(res);
  //   })
  //   .catch(err => {
  //     console.log(`err = ${JSON.stringify(err)}`);
  //   })

  // dynamoDB.listTables(cb);

  if (event.userId) {
    test.get(event.userId, function (err, res) {
        // console.log(`key = ${JSON.stringify(res.get('key'))}`);
        cb(null, { key: res.get('key'), value: res.get('value') });
    });
  } else {
    cb(new Error('Missing userId parameter'));
  }
}
