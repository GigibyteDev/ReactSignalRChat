import {HubConnection} from '@microsoft/signalr';

type Statuses = 'None' | 'Error' | 'Loading' | 'Success';

export const BEGIN_CONNECTION = "BEGIN_CONNECTION";
export const SUCCESSFULLY_CONNECTED = "SUCCESSFULLY_CONNECTED";
export const ADD_CONNECTION_METHOD = "ADD_CONNECTION_METHOD";
export const FAILED_TO_CONNECT = "FAILED_TO_CONNECT";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const INSTANTIATE_USER = "INSTANTIATE_USER";
export const USER_LOGOUT = "USER_LOGOUT";
export const JOIN_ROOM = "JOIN_ROOM";

export interface DefaultSignalRConnectionState {
  Connection: HubConnection | undefined,
  Status: Statuses,
  User: UserConnection | undefined,
  Room: string,
  Messages: MessageType[]
}

export type UserConnection = {
  userId: number,
  username: string,
  room: string
}

export type MessageType = {
  user: UserConnection,
  messageBody: string,
  id: number
}

interface BeginConnection {
  type: typeof BEGIN_CONNECTION,
};

interface SuccessfullyConnected {
  type: typeof SUCCESSFULLY_CONNECTED,
  payload: {
    connection: HubConnection,
    roomName: string
  }
};

interface FailedToConnect {
  type: typeof FAILED_TO_CONNECT,
};

interface AddConnectionMethod {
  type: typeof ADD_CONNECTION_METHOD,
  payload: {
    methodName: string,
    methodBody: (...args: any[]) => void
  }
}

interface AddMessage {
  type: typeof ADD_MESSAGE,
  payload: MessageType
}

interface InstantiateUser {
  type: typeof INSTANTIATE_USER,
  payload: {
    user: UserConnection,
    messages: MessageType[]
  }
}

interface UserLogout {
  type: typeof USER_LOGOUT
}

interface JoinRoom {
  type: typeof JOIN_ROOM,
  payload: string
}

export type SignalRDispatchTypes = BeginConnection | SuccessfullyConnected | FailedToConnect | AddConnectionMethod | AddMessage | InstantiateUser | UserLogout | JoinRoom