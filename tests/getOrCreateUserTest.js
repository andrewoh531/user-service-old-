import tester from 'lambda-tester';
import {expect} from 'chai';
import func from '../functions/getOrCreateUser/src/index';

describe('getOrCreateUser', () => {

  const payload = {
    userId: 'a',
    name: 'Andrew Oh',
    email: 'andrewoh@dius.com.au'
  };

  it('should error when userId is not provided', () => {
    return tester(func)
      .event({})
      .expectError(err => {
        expect(err.message).to.equal('Missing userId parameter');
      });
  });

  it('should get user when user already exists', () => {
    return tester(func)
      .event(payload)
      .expectResult(res => {
        expect(res).to.deep.equal({key: 'a', value: 'oh'});
      });
  });

  // it('should create user when user does not exist', () => {
  //   const newUser = Object.assign({}, payload, {userId: 'newUserId'});
  //   return tester(func)
  //     .event(payload)
  //     .expectResult(res => {
  //       expect(res).to.deep.equal({key: 'a', value: 'oh'});
  //       // console.log(`res = ${JSON.stringify(res)}`);
  //     });
  // });
});
