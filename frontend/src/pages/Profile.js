
import { useDispatch } from 'react-redux';
import { deletedUser } from '../action/user.actions';
import UpdateProfile from '../components/profile/UpdateProfile';
import deleteLogo from '../images/trash.svg';


function Profile() {

    const dispatch = useDispatch();

    const deleteUser = (userId) => {
        dispatch(deletedUser(userId))
        window.localStorage.removeItem("token")
    }

    return (
        <div className='profile'>
            <h1>Profile</h1>

            <>
                <UpdateProfile />
                <div className='btn-container' onClick={() => {
                    if (window.confirm("Voulez-vous supprimer le profil ?")) {
                        deleteUser();
                        window.location.replace("/home");
                    }
                }}
                >
                    <img src={deleteLogo} alt='delete-logo' />
                </div>
            </>


        </div>
    )
};

export default Profile;
