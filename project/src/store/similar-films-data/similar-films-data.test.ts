import { SimilarFilmsState } from '../../types/state';
import { ReducerName } from '../../utils/constants';
import { makeFakeFilms } from '../../utils/mocks';
import { fetchSimilarFilms } from './api-actions';
import{similarFilmsData} from './similar-films';
const fakeFilms = makeFakeFilms();

describe(`Reducer: ${ReducerName.SimilarFilms}`,()=>{
  let state: SimilarFilmsState;
  beforeEach(()=>{
    state = {
      similarFilms: [],
      isSimilarFilmsLoading:false,
    };
  });
  it('without additional parameters should return initial state', ()=>{
    expect(similarFilmsData.reducer(undefined, {type: 'UNKNOWN_ACTION'})).toEqual(state);
  });

  describe('Api action: fetchSimilarFilms',()=>{
    it('should update loading status to "true" if is pending',()=>{
      expect(similarFilmsData.reducer(state,{type: fetchSimilarFilms.pending.type})).toEqual({similarFilms: [], isSimilarFilmsLoading:true});
    });
    it('should update loading status to "false" and similar films to loaded films if is fullfilled',()=>{
      expect(similarFilmsData.reducer(state,{type: fetchSimilarFilms.fulfilled.type, payload:fakeFilms})).toEqual({similarFilms: fakeFilms, isSimilarFilmsLoading:false});
    });
    it('should update loading status to "false" and similar films to empty array if an error occured',()=>{
      expect(similarFilmsData.reducer(state,{type: fetchSimilarFilms.rejected.type})).toEqual({similarFilms: [], isSimilarFilmsLoading:false});
    });
  });

});
