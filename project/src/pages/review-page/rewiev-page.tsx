import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import ReviewForm from '../../components/review-form/review-form';
import UserBlock from '../../components/user-block/user-block';
import { Films } from '../../types/film';
import { getCurrentFilm } from '../../utils/utils';
import { useParams} from 'react-router-dom';

type ReviewPageProps = {
  films:Films;
}

function ReviewPage ({films}:ReviewPageProps):JSX.Element{
  const {id:filmId} = useParams();
  const id = filmId ? +filmId : 0;
  const film = getCurrentFilm(films, id) || films[0];
  const {name, backgroundImage, posterImage} = film;
  return(
    <section className="film-card film-card--full">
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

      <ReviewForm/>

    </section>
  );
}
export default ReviewPage;
