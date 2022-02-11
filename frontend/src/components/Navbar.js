import { Fragment } from 'react';
import navlinks from './navlinks.json'
import { NavLink } from 'react-router-dom';
import '../styles/navbar.scss'

function Navbar () {
    return(
        <div className='navbar'>
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
    );
};

export default Navbar;