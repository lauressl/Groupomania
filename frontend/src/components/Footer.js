import logo from '../images/icon-left-font-monochrome-black.png'
import '../styles/footer.scss'

function Footer () {
    return(
        <footer className="app-footer">
            <img src={logo} className="app-footer-logo" alt="logo" />
        </footer>
    )
}
export default Footer;