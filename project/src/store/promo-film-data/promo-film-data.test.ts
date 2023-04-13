import { PromoFilmState } from '../../types/state';
import { ReducerName } from '../../utils/constants';
import { makeFakeFilm } from '../../utils/mocks';
import { fetchPromoFilm } from './api-actions';
import { promoFilmData } from './promo-film-data';

const fakeFilm = makeFakeFilm();

describe(`Reducer: ${ReducerName.PromoFilm}`,()=>{
  let state: PromoFilmState;
  beforeEach(()=>{
    state = {
      promoFilm: null,
      isPromoFilmLoading:false,
    };
  });
  it('without additional parameters should return initial state', ()=>{
    expect(promoFilmData.reducer(undefined, {type: 'UNKNOWN_ACTION'})).toEqual(state);
  });

  describe('Api action: fetchPromoFilm',()=>{
    it('should update loading status to "true" if is pending',()=>{
      expect(promoFilmData.reducer(state,{type: fetchPromoFilm.pending.type})).toEqual({promoFilm: null, isPromoFilmLoading:true});
    });
    it('should update loading status to "false" and promo film to loaded film if is fullfilled',()=>{
      expect(promoFilmData.reducer(state,{type: fetchPromoFilm.fulfilled.type, payload:fakeFilm})).toEqual({promoFilm: fakeFilm, isPromoFilmLoading:false});
    });
    it('should update loading status to "false" if an error occured',()=>{
      expect(promoFilmData.reducer(state,{type: fetchPromoFilm.rejected.type})).toEqual({promoFilm: null, isPromoFilmLoading:false});
    });
  });

});
