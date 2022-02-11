import logo from '../images/icon-above-font2.png';
import '../styles/header.scss';

function Header () {
    return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>
    );
}

export default Header;