import Login from '../components/home/Login';
import Signup from '../components/home/Signup';
import '../styles/home.scss';

const Home = () => {
    return (
        <div className='home'>
            <h1 className='home-title'>Bienvenue sur le forum de Groupomania</h1>
            <div className="home-container">
                <Signup/>
                <Login/>
            </div>
        </div>
    );
}
export default Home;