//PAGES
import Log from '../components/home/Log';
import logo from '../images/icon-above-font2.png';


//UTILS
import { useSelector } from 'react-redux';


const Home = () => {
    const getToken = window.localStorage.getItem("token")

    //Dispatch user infos
    const userData = useSelector((state) => state.userReducer);
    return (
        <div className='home'>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="home-container">
                {(!getToken) &&
                    <Log />
                }
                {(getToken)&&
                 <>
                    <p>Bienvenue {userData.username}</p>
                 </>
                }
            </div>
        </div>
    );
}
export default Home;