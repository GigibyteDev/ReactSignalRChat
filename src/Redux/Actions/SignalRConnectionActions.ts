import {ServiceURI, ChatURI} from "../../Util/constants";
import {SignalRDispatchTypes, BEGIN_CONNECTION, SUCCESSFULLY_CONNECTED, FAILED_TO_CONNECT, ADD_CONNECTION_METHOD, ADD_MESSAGE, INSTANTIATE_USER, MessageType, UserConnection, USER_LOGOUT, JOIN_ROOM} from "./SignalRConnectionTypes";
import { Dispatch } from "redux";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

const AddMessage = (message: MessageType) => async (dispatch: Dispatch<SignalRDispatchTypes>) => {
  console.log(message);
  dispatch({
    type: ADD_MESSAGE,
    payload: message
  })
}

const InstantiateUser = (userConnection: UserConnection, messages: MessageType[]) => async (dispatch: Dispatch<SignalRDispatchTypes>) => {
  dispatch({
    type: INSTANTIATE_USER,
    payload: {
      user: userConnection,
      messages
    }
  })
}

export const JoinRoomAction = (roomName: string) => async (dispatch: Dispatch<SignalRDispatchTypes>) => {
  dispatch({
    type: JOIN_ROOM,
    payload: roomName
  })
}

export const CreateConnectionAction = (userName: string, roomName: string) => async (dispatch: Dispatch<SignalRDispatchTypes>) => {
  try{
    dispatch({
      type: BEGIN_CONNECTION
    });

    const connection = new HubConnectionBuilder()
          .withUrl(ServiceURI + ChatURI)
          .configureLogging(LogLevel.Information)
          .build();

    connection.on("ReceiveMessage", (message: MessageType) => {
      AddMessage(message)(dispatch);
    })

    connection.on("InstantiateUser", (userId: number, messages: MessageType[]) => {
      InstantiateUser({userId, username: userName, room: roomName} as UserConnection, messages)(dispatch);
    })

    connection.on("UserLoggedOut", () => {
      dispatch({
        type: USER_LOGOUT
      })
    })
    
    await connection.start();
    
    dispatch({
      type: SUCCESSFULLY_CONNECTED,
      payload: {
        connection,
        roomName
      }
    })

    await connection.invoke("JoinRoom", userName, roomName)
  }
  catch (ex) {
    dispatch({
      type: FAILED_TO_CONNECT
    })
  }
}

export const AddConnectionMethodAction = (methodName: string, methodBody: (...args: any[]) => void) => async (dispatch: Dispatch<SignalRDispatchTypes>) => {
  try{
    dispatch({
      type: ADD_CONNECTION_METHOD,
      payload: {
        methodName,
        methodBody
      }
    });
  }
  catch (ex) {
    console.log(ex);
  }
}