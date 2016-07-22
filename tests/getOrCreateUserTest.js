import tester from 'lambda-tester';
import {expect} from 'chai';

import UserModel from '../libs/UserModel';
import func from '../functions/getOrCreateUser/src/index';

describe('getOrCreateUser', () => {

  const payload = {
    userId: '123',
    name: 'Full Name Here',
    email: 'test@email.com'
  };

  it('should error when userId is not provided', () => {
    return tester(func)
      .event({})
      .expectError(err => {
        expect(err.message).to.equal('Missing userId parameter');
      });
  });

  it('should create user if user does not exists', done => {

    UserModel.getAsync(payload.userId)
      .then(res => {
        expect(res).to.equal.null;
        return tester(func)
          .event(payload)
          .expectResult(res => {
            expect(res).to.deep.equal(payload);
          });
      })
      .then(() => UserModel.getAsync(payload.userId))
      .then(res => {
        expect(JSON.parse(JSON.stringify(res))).to.deep.equal(payload);
        done();
      })
      .catch(done);
  });

   it('should retrieve existing user when user already exist', done => {
     const newUser = {
       userId: '123',
       name: 'SecondUser',
       email: 'second@user.com'
     };
     tester(func)
       .event(payload)
       .expectResult()
       .then(() => {
         return tester(func)
           .event(newUser)
           .expectResult(res => {
             expect(res).to.deep.equal(payload);
             done();
           });
       })
       .catch(done);
   });
});
