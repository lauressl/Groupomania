import logo from '../images/icon.png';
import '../styles/app.scss';

function Header () {
    return(
        <header className="App-header">
        <h1>Groupomania</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    );
}

export default Header;