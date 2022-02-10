import '../styles/navbar.scss'
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Profile from '../pages/Profile';
import Feed from '../pages/Feed';
import Home from '../pages/Home';


function Navbar2 () {
    return(
        <div className='navbar'>
            <Fragment >
                <NavLink exact to={<Home />}>Accueil</NavLink>
                <NavLink exact to={<Feed />}>Feed</NavLink>
                <NavLink exact to={<Profile />}>Profile</NavLink>
            </Fragment>
        </div>
    );
};

export default Navbar2;