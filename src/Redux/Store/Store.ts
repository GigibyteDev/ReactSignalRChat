import RootReducer from "../Reducers/RootReducer";
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';

export const Store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootDispatchType = ReturnType<typeof RootReducer>