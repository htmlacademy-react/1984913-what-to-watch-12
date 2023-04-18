import Logo from '../../components/logo/logo';
import './error-page.css';
import {Link, useLocation} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../utils/constants';

function ErrorPage():JSX.Element{
  const location = useLocation();
  const isErrorOnMainPage = location.pathname === AppRoute.Main;
  return(
    <div className="user-page">
      <Helmet>
        <title>WTW Error</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">Error</h1>
      </header>
      <div className="error-container user-page__content">
        <h1>404. Page not found</h1>
        { !isErrorOnMainPage &&
        <Link to='/'>Go back to main page</Link>}
      </div>

      <footer className="page-footer">
        <Logo isLight/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
export default ErrorPage;
