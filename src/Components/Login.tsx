import "../Styles/Login.css";
import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { CreateConnectionAction, JoinRoomAction } from "../Redux/Actions/SignalRConnectionActions";
import { RootDispatchType } from "../Redux/Store/Store";

const Login = () => {
  const dispatch = useDispatch();
  const connection = useSelector((state: RootDispatchType) => state.SignalR)
  const [userName, setUserName] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinRoom(userName, roomName);
  }

  const joinRoom = async (user: string, room: string) => {
    if (connection.Connection){
      connection.Connection.invoke("JoinRoom", connection.User?.username, room)
      dispatch(JoinRoomAction(room))
    }
    else{
      dispatch(CreateConnectionAction(user, room));
    }
  }

  return (
    <div className="formWrapper">
      <form className="loginForm" onSubmit={handleSubmit}>
        <input type="text" value={userName} placeholder="Username" onChange={(e) => setUserName(e.target.value)}></input>
        <input type="text" value={roomName} placeholder="Room" onChange={(e) => setRoomName(e.target.value)}></input>
        <button type="submit" disabled={userName === '' || roomName === ''}>Join Room</button>
      </form>
    </div>
  )
}

export default Login