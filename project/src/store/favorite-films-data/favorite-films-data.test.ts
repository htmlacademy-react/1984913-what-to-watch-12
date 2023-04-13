import { FavoriteFilmsState } from '../../types/state';
import { ReducerName } from '../../utils/constants';
import { makeFakeFilms } from '../../utils/mocks';
import { fetchFavoriteFilms, postFavoriteFilm } from './api-actions';
import { favoriteFilmsData } from './favorite-films-data';

const fakeFilms = makeFakeFilms();
const fakeFavoriteFilm = {...fakeFilms[0], isFavorite: true};
const fakeDislikedFilm = {...fakeFilms[0], isFavorite: false};

describe(`Reducer: ${ReducerName.FavoriteFilms}`,()=>{
  let state: FavoriteFilmsState;
  beforeEach(()=>{
    state = {
      films: [],
      isFavoriteFilmsLoading: false,
    };
  });
  it('without additional parameters should return initial state', ()=>{
    expect(favoriteFilmsData.reducer(undefined, {type: 'UNKNOWN_ACTION'})).toEqual(state);
  });

  describe('Api action: fetchFavoriteFilms',()=>{
    it('should update loading status to "true" if is pending',()=>{
      expect(favoriteFilmsData.reducer(state,{type: fetchFavoriteFilms.pending.type})).toEqual({films: [], isFavoriteFilmsLoading:true});
    });
    it('should update loading status to "false" and favorite films to loaded films if is fullfilled',()=>{
      expect(favoriteFilmsData.reducer(state,{type: fetchFavoriteFilms.fulfilled.type, payload:fakeFilms})).toEqual({films: fakeFilms, isFavoriteFilmsLoading:false});
    });
    it('should update loading status to "false" and favorite films to empty array if an error occured',()=>{
      expect(favoriteFilmsData.reducer(state,{type: fetchFavoriteFilms.rejected.type})).toEqual({films: [], isFavoriteFilmsLoading:false});
    });
  });

  describe('Api action: postFavoriteFilm',()=>{
    it('should update favorite films if film is favorite', ()=>{
      expect(favoriteFilmsData.reducer(state, {type:postFavoriteFilm.fulfilled.type, payload:fakeFavoriteFilm})).toEqual({films:[fakeFavoriteFilm], isFavoriteFilmsLoading:false});
    });
    it('should not update favorite films if film is disliked', ()=>{
      expect(favoriteFilmsData.reducer(state, {type:postFavoriteFilm.fulfilled.type, payload:fakeDislikedFilm})).toEqual({films: [], isFavoriteFilmsLoading:false});
    });
    it('should not update favorite films if an error occured', ()=>{
      expect(favoriteFilmsData.reducer(state, {type:postFavoriteFilm.rejected.type})).toEqual({films: [], isFavoriteFilmsLoading:false});
    });
    it('should delete disliked film from favorite films', ()=>{
      expect(favoriteFilmsData.reducer(state, {type:postFavoriteFilm.fulfilled.type, payload:fakeDislikedFilm})).toEqual({films: [], isFavoriteFilmsLoading:false});
    });
  });
});
