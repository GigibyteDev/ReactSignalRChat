import './App.css';
import Header from './Components/Header';
import Login from './Components/Login';
import Messages from './Components/Messages';
import { useSelector } from 'react-redux';
import { RootDispatchType } from './Redux/Store/Store';

function App() {
  const connection = useSelector((state: RootDispatchType) => state.SignalR)

  return (
    <div>
      <Header />
      { connection.Room ? (
        <Messages />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
