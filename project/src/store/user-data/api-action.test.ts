import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import { State } from '../../types/state';
import { ApiRoute } from '../../utils/constants';
import { makeFakeUser } from '../../utils/mocks';
import { checkAuth, login, logout } from './api-actions';
import { redirectToRoute } from '../action';

const mockUser = makeFakeUser();
const mockPassword = '1a';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);
  it(`should set authorization status when check ${ApiRoute.Login}`, async () => {
    const store = mockStore();
    mockAPI
      .onGet(ApiRoute.Login)
      .reply(200, mockUser);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuth.pending.type,
      checkAuth.fulfilled.type
    ]);
  });

  it(`should dispatch login token data when POST ${ApiRoute.Login}`, async () => {
    mockAPI
      .onPost(ApiRoute.Login)
      .reply(200, {token: mockUser.token});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(login({email:mockUser.email, password:mockPassword}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      login.pending.type,
      redirectToRoute.type,
      login.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', mockUser.token);
  });

  it(`should dispatch logout when delete ${ApiRoute.Logout}`, async () => {
    mockAPI
      .onDelete(ApiRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logout());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logout.pending.type,
      logout.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });

});
