import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import { State } from '../../types/state';
import { ApiRoute, FilmStatusToCode } from '../../utils/constants';
import { makeFakeFilms } from '../../utils/mocks';
import { fetchFavoriteFilms, postFavoriteFilm } from './api-actions';

const mockFilms = makeFakeFilms();
const mockFavoriteFilm = { ...mockFilms[0], isFavorite: true };
const mockDislikedFilm = { ...mockFilms[0], isFavorite: false };

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it(`should dispatch load favorite films when GET ${ApiRoute.Favorite}`, async () => {
    mockAPI
      .onGet(ApiRoute.Favorite)
      .reply(200, mockFilms);

    const store = mockStore();
    await store.dispatch(fetchFavoriteFilms());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteFilms.pending.type,
      fetchFavoriteFilms.fulfilled.type
    ]);
  });
  it(`should add film to favorite when POST ${ApiRoute.Favorite}/filmId/status`, async () => {
    const filmId = mockDislikedFilm.id;
    const status = FilmStatusToCode.Favorite;
    mockAPI
      .onPost(`${ApiRoute.Favorite}/${filmId}/${status}`)
      .reply(200);
    const store = mockStore();
    await store.dispatch(postFavoriteFilm({filmId, status}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postFavoriteFilm.pending.type,
      postFavoriteFilm.fulfilled.type,
    ]);
  });
  it(`should remove film from favorite when POST ${ApiRoute.Favorite}/filmId/status`, async () => {
    const filmId = mockFavoriteFilm.id;
    const status = FilmStatusToCode.Disliked;
    mockAPI
      .onPost(`${ApiRoute.Favorite}/${filmId}/${status}`)
      .reply(200);
    const store = mockStore();
    await store.dispatch(postFavoriteFilm({filmId, status}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postFavoriteFilm.pending.type,
      postFavoriteFilm.fulfilled.type,
    ]);
  });
});
