import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import { State } from '../../types/state';
import { ApiRoute } from '../../utils/constants';
import { makeFakeFilms } from '../../utils/mocks';
import { fetchSimilarFilms } from './api-actions';

const mockFilms = makeFakeFilms();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it(`should dispatch load similar films when GET ${ApiRoute.SimilarFilms}`, async () => {
    mockAPI
      .onGet(ApiRoute.SimilarFilms)
      .reply(200, mockFilms);

    const store = mockStore();
    await store.dispatch(fetchSimilarFilms(mockFilms[0].id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilms.pending.type,
      fetchSimilarFilms.fulfilled.type
    ]);
  });

});
