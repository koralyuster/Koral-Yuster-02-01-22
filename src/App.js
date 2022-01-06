import './App.css';
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Main from './components/Main';
import Favorite from './components/Favorite';

function App() {

  return (
    <div className="App">
      <nav>
        <Link to="/" className="logo">Weather<span>.24</span></Link>
        <div className="wrapper">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/favorite">Favorite</NavLink>
        </div>
      </nav>

      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/favorite' element={<Favorite />} />
      </Routes>

      <footer>
        Made By Koral Yuster 2022 &#169;
      </footer>
    </div>
  );
}

export default App;
