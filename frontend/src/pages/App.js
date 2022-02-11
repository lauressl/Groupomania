
import '../styles/app.scss';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


//COMPONENTS
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';
import Feed from './Feed';
import Profile from './Profile';


function App() {

  const getToken = window.localStorage.getItem("token")
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              {(getToken) &&
               <>
                  <Route path="/Feed" element={<Feed />} />
                  <Route path="/Profile" element={<Profile />} />
               </>
              }
            </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
