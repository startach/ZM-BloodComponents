import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import 'bootstrap/dist/css/bootstrap.min.css';
import DirectionProvider, {DIRECTIONS} from 'react-with-direction/dist/DirectionProvider';

import './i18n';

let languageSelected = localStorage.getItem('i18nextLng');
// console.log(languageSelected,' languageaaaaa');
// console.log(i18next.dir(languageSelected).toUpperCase());




ReactDOM.render(
  <React.StrictMode>
    <DirectionProvider direction={languageSelected === 'en' ? DIRECTIONS.LTR : DIRECTIONS.RTL}>
      <Suspense fallback={(<div>Loading</div>)}>
        <App />
      </Suspense>
    </DirectionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
