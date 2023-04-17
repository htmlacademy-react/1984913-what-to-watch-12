import { FilmsState } from '../../types/state';
import { DEFAULT_GENRE, ReducerName } from '../../utils/constants';
import { makeFakeFilms } from '../../utils/mocks';
import { changeGenre } from './action';
import { fetchFilms } from './api-actions';
import { filmsData } from './films-data';

const fakeFilms = makeFakeFilms();
const fakeGenre = fakeFilms[0].genre;

describe(`Reducer: ${ReducerName.Films}`, () => {
  let state: FilmsState;
  beforeEach(() => {
    state = {
      genre: DEFAULT_GENRE,
      films: [],
      isFilmsLoading: false,
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(filmsData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  describe('Action: changeGenre', () => {
    it('should update genre to provided value', () => {
      expect(filmsData.reducer(state, { type: changeGenre, payload: fakeGenre })).toEqual({ ...state, genre: fakeGenre });
    });
  });

  describe('Api action: fetchFilms', () => {
    it('should update loading status to "true" if is pending', () => {
      expect(filmsData.reducer(state, { type: fetchFilms.pending.type })).toEqual({ ...state, isFilmsLoading: true });
    });
    it('should update loading status to "false" and films to loaded films if is fullfilled', () => {
      expect(filmsData.reducer(state, { type: fetchFilms.fulfilled.type, payload: fakeFilms })).toEqual({ ...state, films: fakeFilms });
    });
    it('should update loading status to "false" and films to empty array if an error occured', () => {
      expect(filmsData.reducer(state, { type: fetchFilms.rejected.type })).toEqual(state);
    });
  });
});
