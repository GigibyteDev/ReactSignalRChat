import "../Styles/Messages.css";
import React, {useState} from 'react';
import { useSelector} from 'react-redux';
import {RootDispatchType} from "../Redux/Store/Store";

const Messages = () => {
  const connection = useSelector((state :RootDispatchType ) => state.SignalR);
  const [messageToSend, setMessageToSend] = useState<string>("");
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (connection.Connection){
      connection.Connection.invoke("SendMessage", 
        messageToSend
      )
      setMessageToSend("");
    }
  }

  const messageClass = (userId: number): string => {
    if (userId === connection.User?.userId){
      return "message-send"
    }

    if (userId !== 0){
      return "message-receive"
    }

    return ""
  }

  const alignMessageLogic = (userId: number): string => {
    if (userId === connection.User?.userId){
      return "messageWrapper-send"
    }

    if (userId !== 0){
      return "messageWrapper-receive"
    }

    return ""
  }

  const handleLogOut = () => {
    if (connection.Connection){
      connection.Connection.invoke("LeaveRoom");
    }
  }

  return (
    <div className="chatWindowWrapper">
      <div className="messagesWrapper">
        <span className="roomTitle">Room: {connection.Room}</span>
        <div className="messages">
          { connection.Messages.map((message, index) => {
            return (
              <div key={message.id} className={`messageWrapper ${alignMessageLogic(message.user.userId)}`}>
                <div className="messageAndSenderWrapper">
                  { index !== 0 ? (
                    <>
                      {connection.Messages[index - 1].user.userId !== message.user.userId && (
                        <span className="messageSender">{`${message.user.username}`}</span>
                      )}
                    </>
                  ) : (
                    <span className="messageSender">{`${message.user.username}`}</span>
                  )}
                  <div className={`message ${messageClass(message.user.userId)}`}>
                    {`${message.messageBody}`}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="leaveRoomButtonWrapper">
          <button type="button" className="leaveRoomButton" onClick={handleLogOut}>Leave Room</button>
        </div>
        <form className="messageInputForm" onSubmit={handleOnSubmit}>
          <input value={messageToSend} type="text" className="messageInput" placeholder="Send Message..." onChange={(e) => setMessageToSend(e.target.value)}/>
          <button type="submit" className="sendMessageButton">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Messages