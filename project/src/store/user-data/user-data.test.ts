import { UserState } from '../../types/state';
import { AuthStatus, ReducerName } from '../../utils/constants';
import { makeFakeUser } from '../../utils/mocks';
import { checkAuth, login, logout } from './api-actions';
import { userData } from './user-data';

const fakeUser = makeFakeUser();

describe(`Reducer: ${ReducerName.User}`,()=>{
  let state: UserState;
  beforeEach(()=>{
    state = {
      authStatus:AuthStatus.Unknown,
      userData: null
    };
  });

  it('without additional parameters should return initial state', ()=>{
    expect(userData.reducer(undefined, {type: 'UNKNOWN_ACTION'})).toEqual(state);
  });

  describe('Api action: checkAuth', ()=>{
    it('should update authorizationStatus to authorized and save user data if checkAuth fulfilled', ()=>{
      expect(userData.reducer(state, {type: checkAuth.fulfilled.type, payload:fakeUser})).toEqual({authStatus:AuthStatus.Auth, userData: fakeUser });
    });
    it('should update authorizationStatus to not authorized if checkAuth rejected', ()=>{
      expect(userData.reducer(state, {type: checkAuth.rejected.type})).toEqual({authStatus:AuthStatus.NoAuth, userData: null });
    });
  });
  describe('Api action: login', ()=>{
    it('should update authorizationStatus to authorized and save user data if login fulfilled', ()=>{
      expect(userData.reducer(state, {type: login.fulfilled.type, payload:fakeUser})).toEqual({authStatus:AuthStatus.Auth, userData: fakeUser });
    });
    it('should update authorizationStatus to not authorized if login rejected', ()=>{
      expect(userData.reducer(state, {type: login.rejected.type})).toEqual({authStatus:AuthStatus.NoAuth, userData: null });
    });
  });
  describe('Api action: logout', ()=>{
    it('should update authorizationStatus to not authorized and remove user data if logout fulfilled', ()=>{
      expect(userData.reducer(state, {type: logout.fulfilled.type})).toEqual({authStatus:AuthStatus.NoAuth, userData: null });
    });
  });

});
