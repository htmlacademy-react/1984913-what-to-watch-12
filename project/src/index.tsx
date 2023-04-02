import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockFilms } from './mocks/mock-films';
import { mockReviews } from './mocks/mock-reviews';
import { Provider } from 'react-redux';
import { store } from './store';

const AppData = {
  Films:mockFilms,
  Reviews:mockReviews
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App films = {AppData.Films} reviews={AppData.Reviews}/>
    </Provider>
  </React.StrictMode>,
);
