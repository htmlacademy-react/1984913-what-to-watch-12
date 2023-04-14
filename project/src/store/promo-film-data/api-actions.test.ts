import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import { State } from '../../types/state';
import { ApiRoute } from '../../utils/constants';
import { makeFakeFilm } from '../../utils/mocks';
import { fetchPromoFilm } from './api-actions';

const mockFilm = makeFakeFilm();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it(`should dispatch load promo film when GET ${ApiRoute.PromoFilm}`, async () => {
    mockAPI
      .onGet(`${ApiRoute.PromoFilm}`)
      .reply(200, mockFilm);

    const store = mockStore();
    await store.dispatch(fetchPromoFilm());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoFilm.pending.type,
      fetchPromoFilm.fulfilled.type
    ]);
  });
});
