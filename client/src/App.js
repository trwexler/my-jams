import react, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './views/Main';

function App() {
  
  const [user, setUser] = useState({});
  
  return (
    <div className="App">
      <Main user={user} setUser={setUser}/>
    </div>
  );
}

export default App;
