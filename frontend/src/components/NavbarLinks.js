import { NavLink } from 'react-router-dom';
import logo from '../images/news.svg'
import { useSelector } from 'react-redux';

function NavbarLinks() {
    const getToken = window.localStorage.getItem("token");

    return (

        <div className='navbarLinks'>
            {(getToken) &&
                <>
                    <NavLink link to={{ pathname: "/FeedHome" }}><img src={logo} alt="navbarLinks-logo" /></NavLink>
                </>
            }
        </div>
    );
};

export default NavbarLinks;