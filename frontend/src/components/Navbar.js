import { Fragment } from 'react';
import navlinks from './navlinks.json'
import { NavLink } from 'react-router-dom';
import '../styles/navbar.scss'

function Navbar () {
    const getToken = window.localStorage.getItem("token")
    return(
        <div className='navbar'>
            <div className='navbar-links'>
                <li>
                    <NavLink link to={{pathname:"/home"}}>Accueil</NavLink>
                    {(getToken) && 
                        <>
                            <NavLink link to={{pathname:"/feed"}}>Actus</NavLink>
                            <NavLink link to={{pathname:"/profile"}}>Profil</NavLink>
                        </>
                    }
                </li>
            </div>
            <button className='navbar-btn-disconnect' onClick={(e) => {window.localStorage.clear(e); window.location.replace("/home");}}>Deconnexion</button>
        </div>
    );
};

export default Navbar;