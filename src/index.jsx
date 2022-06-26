import {StrictMode} from 'react';
import {render} from 'react-dom';
import './index.css';
import Main from './Main';

render(
  <StrictMode>
    <Main/>
  </StrictMode>,
  document.getElementById('root')
);
