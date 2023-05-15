import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { BrowserRouter } from 'react-router-dom';
import { Container } from './module/container/Container';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Container>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Container>,
);
