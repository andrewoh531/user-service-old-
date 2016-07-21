import UserModel from '../../../libs/UserModel';

export default function(event, ctx, cb) {

  if (event.userId) {
    UserModel.get(event.userId, function (err, res) {
        if (res === null) {
          UserModel.create(event, (err, user) => {
            const response = {
              userId: user.get('userId'),
              name: user.get('name'),
              email: user.get('email')
            };
            cb(null, response);
          });

        } else {
          cb(null, res);
        }
    });
  } else {
    cb(new Error('Missing userId parameter'));
  }
}
