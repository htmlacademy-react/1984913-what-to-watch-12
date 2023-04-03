import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockReviews } from './mocks/mock-reviews';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchFilmAction } from './store/api-actions';

store.dispatch(fetchFilmAction());

const AppData = {
  Reviews:mockReviews
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={AppData.Reviews}/>
    </Provider>
  </React.StrictMode>,
);
