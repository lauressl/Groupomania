import { NavLink } from 'react-router-dom';
import logo from '../images/icon.png';
import logoConnect from '../images/logout.svg';
import logoNews from '../images/news.svg';


import { useSelector } from 'react-redux';

function Navbar() {
    const getToken = window.localStorage.getItem("token");
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <img src={logo} alt="navbar-logo" className="logo" />
                {(getToken) &&
                    <>
                        <NavLink link to={{ pathname: "/FeedHome" }}><img src={logoNews} alt="navbarLinks-logo" className="logo" /></NavLink>
                    </>
                }
            </div>
            <div className='navbar-right'>
                {(getToken) &&
                    <>
                        <NavLink className='navbar-right-link' link to={{ pathname: "/profile" }}>Bienvenue {userData.username}</NavLink>
                        <button onClick={(e) => { window.localStorage.clear(e); window.location.replace("/home"); }}><img src={logoConnect} alt="navbarLinks-logo" /></button>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;