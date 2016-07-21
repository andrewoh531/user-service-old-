import UserModel from '../../../libs/UserModel';

function createUserIfNonExistent(event) {
  return (res) => {
    if (res === null) {
      return UserModel.createAsync(event);
    } else {
      return res;
    }
  };
}

export default function(event, ctx, cb) {
  if (event.userId) {
    UserModel.getAsync(event.userId)
      .then(createUserIfNonExistent(event))
      .then(res => cb(null, JSON.parse(JSON.stringify(res))))
      .catch(err => {
        console.error(`error calling UserModel.getAsync = ${JSON.stringify(err)}`);
      });
  } else {
    cb(new Error('Missing userId parameter'));
  }
}
