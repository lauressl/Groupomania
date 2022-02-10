import logo from '../images/icon-above-font.png';
import '../styles/app.scss';

function Header () {
    return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>
    );
}

export default Header;