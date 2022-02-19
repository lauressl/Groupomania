
import '../styles/index.scss';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

//COMPONENTS
import Navbar from '../components/Navbar';
import Home from './Home';
import Feed from './Feed';
import Profile from './Profile';
import { useDispatch } from 'react-redux';
import { getUser } from '../action/user.actions';
import { UidContext } from '../components/AppContext';
import FeedHome from './FeedHome';
import NavbarLinks from '../components/NavbarLinks';



function App() {

  const [uid, setuid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setuid(window.localStorage.getItem("uid"));
    if (uid)
      dispatch(getUser(uid))
  }, [uid]);


  const getToken = window.localStorage.getItem("token")

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />

              {(getToken) &&
                <>
                  {/* <Route path="/Feed" element={<Feed />} /> */}
                  <Route path="/FeedHome" element={<FeedHome />} />
                  <Route path="/Profile" element={<Profile />} />
                </>
              }
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UidContext.Provider>
  );
}

export default App;
