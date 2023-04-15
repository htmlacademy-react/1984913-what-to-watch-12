import { Film, Films } from '../types/film';
import {lorem, image,internet, datatype, name, date } from 'faker';
import { FILMS_AMOUNT } from './constants';
import { UserData } from '../types/user-auth-data';
import { NewReview, Review, Reviews } from '../types/review';

const MOCK_DEFAULT_NUMBER = 1;
const MOCK_AMOUNT = 3;
const MOCK_SCORES_AMOUNT = 100;
const MOCK_REVIEWS_AMOUNT = 6;
const MockRating = {
  Min:1,
  Max:10,
  Precision: 0.1,
};
const MockReleaseDate = {
  Min:1980,
  Max:2023,
};
const getFakeFullName = ()=> `${name.firstName()} ${name.lastName()}`;
const fakeRating = datatype.number({min:MockRating.Min, max:MockRating.Max, precision:MockRating.Precision});

export const makeFakeFilm = (id = MOCK_DEFAULT_NUMBER):Film=>({
  id,
  name: lorem.sentence(MOCK_AMOUNT),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: internet.color(),
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
  description: lorem.sentences(MOCK_AMOUNT),
  rating: fakeRating,
  scoresCount: datatype.number(MOCK_SCORES_AMOUNT),
  director: getFakeFullName(),
  starring: Array.from({length:MOCK_AMOUNT}, ()=> getFakeFullName()),
  runTime: datatype.number(),
  genre: lorem.sentence(MOCK_DEFAULT_NUMBER),
  released: datatype.number({min:MockReleaseDate.Min, max:MockReleaseDate.Max}),
  isFavorite: datatype.boolean(),
});

export const makeFakeFilms = (amount = FILMS_AMOUNT):Films=> Array.from({length:amount},(_, i)=> makeFakeFilm(i + 1));

export const makeFakeUser = (id = MOCK_DEFAULT_NUMBER):UserData=>({
  avatarUrl: image.avatar(),
  email: internet.email(name.firstName(), name.lastName()),
  id,
  name: name.firstName(),
  token: lorem.sentence(MOCK_DEFAULT_NUMBER)
});

export const makeFakeReview = (id = MOCK_DEFAULT_NUMBER):Review=>({
  comment: lorem.sentence(MOCK_AMOUNT),
  date: date.past().toString(),
  id,
  rating: fakeRating,
  user: {
    id: datatype.number(MOCK_AMOUNT),
    name: name.firstName(),
  }});

export const makeFakeNewReview = ():NewReview=>({
  comment: lorem.sentence(MOCK_AMOUNT),
  rating: fakeRating,
});

export const makeFakeReviews = (amount = MOCK_REVIEWS_AMOUNT):Reviews=> Array.from({length:amount},(_, i)=> makeFakeReview(i + 1));
