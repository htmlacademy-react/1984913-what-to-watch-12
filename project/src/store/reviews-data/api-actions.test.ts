import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import { State } from '../../types/state';
import { ApiRoute } from '../../utils/constants';
import {makeFakeFilm, makeFakeNewReview, makeFakeReviews } from '../../utils/mocks';
import { fetchFilmReviews } from './api-actions';
import { postFilmReview } from './api-actions';
import { redirectToRoute } from '../action';

const mockReviews = makeFakeReviews();
const mockFilmId = makeFakeFilm().id;
const mockNewReview = makeFakeNewReview();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it(`should dispatch load reviews when GET ${ApiRoute.Reviews}`, async () => {
    mockAPI
      .onGet(ApiRoute.Reviews)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchFilmReviews(mockFilmId));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmReviews.pending.type,
      fetchFilmReviews.fulfilled.type
    ]);
  });
  it(`should post review when POST ${ApiRoute.Reviews}/filmId`, async () => {
    mockAPI
      .onPost(`${ApiRoute.Reviews}/${mockFilmId}`)
      .reply(200);
    const store = mockStore();
    await store.dispatch(postFilmReview({filmId:mockFilmId,review:mockNewReview}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postFilmReview.pending.type,
      redirectToRoute.type,
      postFilmReview.fulfilled.type,
    ]);
  });

});
