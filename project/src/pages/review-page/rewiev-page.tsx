import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import ReviewForm from '../../components/review-form/review-form';
import UserBlock from '../../components/user-block/user-block';
import { useNavigate, useParams} from 'react-router-dom';
import ErrorPage from '../error-page/error-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilm } from '../../store/film-data/selectors';
import { NewReview } from '../../types/review';
import { postFilmReview } from '../../store/comments-data/api-actions';
import { getSpecificPath } from '../../utils/utils';
import { AppRoute } from '../../utils/constants';


function ReviewPage ():JSX.Element{
  const film = useAppSelector(getFilm);
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if(!id ){
    return <ErrorPage/>;
  }
  const filmId = +id;


  const handleReviewSubmit = (review: NewReview) => {
    dispatch(postFilmReview({filmId, review}));
    const path = getSpecificPath(`${AppRoute.Film}/:id`, +filmId).concat('?tab=Reviews');
    navigate(path);
  };

  if(!film){
    return <ErrorPage/>;
  }

  const {name, backgroundImage, backgroundColor, posterImage} = film;
  return(
    <section className="film-card film-card--full" style={{backgroundColor}}>
      <Helmet>
        <title>WTW Add Review</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a href='/' className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <UserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <ReviewForm onReviewSubmit ={handleReviewSubmit}/>

    </section>
  );
}
export default ReviewPage;
