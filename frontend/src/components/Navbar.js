import { Fragment } from 'react';
import navlinks from './navlinks.json'
import { NavLink } from 'react-router-dom';
import '../styles/navbar.scss'

function Navbar () {
    return(
        <div className='navbar'>
            <div className='navbar-links'>
                {navlinks.map((item, index) => (
                    <Fragment key={index + item.title}>
                        <li>
                            <>
                                {(item.link)
                                    ? <NavLink link to={{pathname:`${item.link}`}}>
                                        {item.title}
                                        </NavLink>
                                    : <h2>{item.title}</h2>
                                }
                            </>
                        </li>
                    </Fragment>
                ))
                }
            </div>
            <button className='navbar-btn-disconnect' onClick={(e) => {window.localStorage.clear(e); window.location.replace("/home");}}>Deconnexion</button>
        </div>
    );
};

export default Navbar;