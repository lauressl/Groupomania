import Login from '../components/home/Login';
import Signup from '../components/home/Signup';
import '../styles/home.scss';

const Home = () => {
    const getToken = window.localStorage.getItem("token")
    return (
        <div className='home'>
            <h1 className='home-title'>Bienvenue sur le forum de Groupomania</h1>
            <div className="home-container">
                {(!getToken) &&
                <>
                    <Signup/>
                    <Login/>
                </>
                }
                {(getToken)&&
                 <>
                    <p>Retrouvez vos actualités sur le feed</p>
                 </>
                }
            </div>
        </div>
    );
}
export default Home;