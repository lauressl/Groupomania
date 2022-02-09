
import '../styles/app.scss';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';

//COMPONENTS
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Home from './Home';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/Accueil" exact component={Home} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
