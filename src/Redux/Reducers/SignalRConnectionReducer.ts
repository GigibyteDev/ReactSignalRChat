import {DefaultSignalRConnectionState, SignalRDispatchTypes, BEGIN_CONNECTION, SUCCESSFULLY_CONNECTED, FAILED_TO_CONNECT, ADD_CONNECTION_METHOD, ADD_MESSAGE, INSTANTIATE_USER, USER_LOGOUT, JOIN_ROOM} from '../Actions/SignalRConnectionTypes';

const defaultState: DefaultSignalRConnectionState = {
  Connection: undefined,
  Status: 'None',
  User: undefined,
  Room: '',
  Messages: []
}

const SignalRConnectionReducer = (state: DefaultSignalRConnectionState = defaultState, action: SignalRDispatchTypes): DefaultSignalRConnectionState => {
  switch (action.type){
    case BEGIN_CONNECTION:
      return {
        ...state,
        Status: 'Loading'
      }
    case SUCCESSFULLY_CONNECTED: 
    return {
      ...state,
      Connection: action.payload.connection,
      Status: 'Success',
      Room: action.payload.roomName
    }
    case FAILED_TO_CONNECT: 
      return {
        ...state,
        Status: 'Error'
      }
    case ADD_CONNECTION_METHOD:
      const connection = state.Connection;
      if (connection){
        connection.on(action.payload.methodName, action.payload.methodBody);
      }
      return {
        ...state,
        Connection: connection
      }
    case ADD_MESSAGE:
      return {
        ...state,
        Messages: [...state.Messages, action.payload]
      }
    case INSTANTIATE_USER:
      return {
        ...state,
        Messages: action.payload.messages,
        User: action.payload.user
      }
    case USER_LOGOUT:
      return {
        ...state,
        Messages: [],
        Room: ''
      }
    case JOIN_ROOM:
      return {
        ...state,
        Room: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export default SignalRConnectionReducer;