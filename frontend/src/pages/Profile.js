import '../styles/profile.scss'
import logo from '../images/logo-user.png';

function Profile () {
    return(
        <div className='profile'>
            <h1 className='profile-title'>Profil</h1>
                <div className='profile-container'>
                    <img src={logo} className="profile-logo" alt="logo" />
                    <h2 className='profile-subtitle'>Nom d'utilisateur :</h2>
                    <p></p>
                    <h2 className='profile-subtitle'>Email:</h2>
                    <p></p>
                </div>
        </div> 
    )
}

export default Profile;
