import { Routes , Route} from 'react-router-dom';
import LobbyScreen from './screens/Lobby.jsx'
import './App.css'
import RoomPage from './screens/Room.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LobbyScreen />} />
        <Route path='/room/:roomId' element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
