import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducer } from './reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  userReducer,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
