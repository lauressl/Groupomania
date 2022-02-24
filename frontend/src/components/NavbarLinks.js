import { NavLink } from 'react-router-dom';
import logoNews from '../images/news.svg';

function NavbarLinks() {
    const getToken = window.localStorage.getItem("token");

    return (

        <div className='navbarLinks'>
            {(getToken) &&
                <>
                    <NavLink link to={{ pathname: "/FeedHome" }}><img src={logoNews} alt="navbarLinks-logo" /></NavLink>
                </>
            }
        </div>
    );
};

export default NavbarLinks;