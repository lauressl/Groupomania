import { NavLink } from 'react-router-dom';
import logo from '../images/icon-left-font-monochrome-white.png'
import { useSelector } from 'react-redux';

function Navbar() {
    const getToken = window.localStorage.getItem("token");
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <img src={logo} alt="navbar-logo" className="logo" />
            </div>
            <div className='navbar-right'>
                {(getToken) &&
                    <>
                        <NavLink className='navbar-right-link' link to={{ pathname: "/profile" }}>Bienvenue {userData.username}</NavLink>
                        <button className='navbar-btn-disconnect' onClick={(e) => { window.localStorage.clear(e); window.location.replace("/home"); }}>Deconnexion</button>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;