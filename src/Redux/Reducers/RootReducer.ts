import {combineReducers} from "redux";
import SignalRConnectionReducer from "../Reducers/SignalRConnectionReducer";

const RootReducer = combineReducers({
  SignalR: SignalRConnectionReducer
})

export default RootReducer;