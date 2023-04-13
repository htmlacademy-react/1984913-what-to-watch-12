import { FilmState } from '../../types/state';
import { ReducerName } from '../../utils/constants';
import { makeFakeFilm } from '../../utils/mocks';
import { fetchFilmById } from './api-actions';
import { filmData } from './film-data';

const fakeFilm = makeFakeFilm();

describe(`Reducer: ${ReducerName.Film}`,()=>{
  let state: FilmState;
  beforeEach(()=>{
    state = {
      film: null,
      isFilmLoading:false,
      hasError: false,
    };
  });
  it('without additional parameters should return initial state', ()=>{
    expect(filmData.reducer(undefined, {type: 'UNKNOWN_ACTION'})).toEqual(state);
  });

  describe('Api action: fetchFilmById',()=>{
    it('should update loading status to "true" if is pending',()=>{
      expect(filmData.reducer(state,{type: fetchFilmById.pending.type})).toEqual({film: null, isFilmLoading:true, hasError: false});
    });
    it('should update loading status to "false" and film to loaded film if is fullfilled',()=>{
      expect(filmData.reducer(state,{type: fetchFilmById.fulfilled.type, payload:fakeFilm})).toEqual({film: fakeFilm, isFilmLoading:false, hasError: false});
    });
    it('should update hasError flag if an error occured',()=>{
      expect(filmData.reducer(state,{type: fetchFilmById.rejected.type})).toEqual({film: null, isFilmLoading:false, hasError:true});
    });
  });

});
