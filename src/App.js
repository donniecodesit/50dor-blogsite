import './App.css';
import HomePage from './Componenets/HomePage';
import NavBar from './Componenets/NavBar';
import Blogs from './Componenets/Blogs';
import { useSelector } from 'react-redux';
import { selectSignedIn } from './Features/userSlice';

function App() {
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <div className="App">
      <NavBar />
      <HomePage />
      {isSignedIn && <Blogs />}
    </div>
  );
}

export default App;
