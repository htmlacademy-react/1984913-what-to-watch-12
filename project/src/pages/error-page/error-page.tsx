import Logo from '../../components/logo/logo';
import './error-page.css';
import {Link} from 'react-router-dom';

function ErrorPage():JSX.Element{
  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">Error</h1>
      </header>
      <div className="error-container user-page__content">
        <h1>404. Page not found</h1>

        <Link to='/'>Go back to main page.</Link>
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
