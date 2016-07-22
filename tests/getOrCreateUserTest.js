import tester from 'lambda-tester';
import {expect} from 'chai';

import UserModel from '../libs/UserModel';
import func from '../functions/getOrCreateUserByFacebookId/src/index';

function expectQueryCount(fbId, count) {
  return UserModel
    .query(fbId)
    .usingIndex('FbIdIndex')
    .execAsync()
    .then(res => {
      expect(res.Count).to.equal(count);
    });
}

describe('getOrCreateUser', () => {

  const payload = {
    fbId: '1234',
    name: 'Full Name Here',
    email: 'test@email.com'
  };

  it('should error when userId is not provided', () => {
    return tester(func)
      .event({})
      .expectError(err => {
        expect(err.message).to.equal('Missing fbId parameter');
      });
  });

  it('should return error when name not provided', () => {
    return tester(func)
      .event({fbId: '1'})
      .expectError(err => {
        expect(err.message).to.equal('Missing name parameter');
      });
  });

  it('should return error when email not provided', () => {
    return tester(func)
      .event({fbId: '1', name: 'ao'})
      .expectError(err => {
        expect(err.message).to.equal('Missing email parameter');
      });
  });

  it('should create user if user does not exists', done => {

    expectQueryCount(payload.fbId, 0)
      .then(() => {
        return tester(func)
          .event(payload)
          .expectResult(res => {
            expect(res.fbId).to.equal(payload.fbId);
            expect(res.name).to.equal(payload.name);
            expect(res.email).to.equal(payload.email);
            expect(res.userId).to.be.ok;
          })
      })
      .then(() => expectQueryCount(payload.fbId, 1))
      .then(done)
      .catch(done);
  });

   it('should retrieve existing user when user already exist', done => {
     const newUser = {
       fbId: '1234',
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
             expect(res.fbId).to.equal(payload.fbId);
             expect(res.name).to.equal(payload.name);
             expect(res.email).to.equal(payload.email);
             expect(res.userId).to.be.ok;
             done();
           });
       })
       .catch(done);
   });

   it('should error when trying to save with extra parameters provided', done => {
     const payloadWithExtras = Object.assign({}, payload, {fbId: 'extras', a: 'a', b: 'b', c: 'c'});

     tester(func)
       .event(payloadWithExtras)
       .expectError(err => {
         expect(err.cause.name).to.equal('ValidationError');
         done();
       })
       .catch(done);
   })
});
