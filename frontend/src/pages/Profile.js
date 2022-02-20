
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletedUser } from '../action/user.actions';
import UpdateProfile from '../components/profile/UpdateProfile';
import deleteLogo from '../images/trash.svg';


function Profile() {

    //Dispatch user infos
    const userData = useSelector((state) => state.userReducer);

    const [isdeleted, setisdeleted] = useState(false);
    const dispatch = useDispatch();

    const deleteUser = (userId) => {
        dispatch(deletedUser(userId))
        setisdeleted(true)
        window.localStorage.removeItem("token")
    }

    return (
        <div className='profile'>
            {isdeleted &&
                <p>Profil supprimé</p>
            }
            {!isdeleted &&
                <>
                    <UpdateProfile />
                    <div className='btn-container' onClick={() => {
                        if (window.confirm("Voulez-vous supprimer le profil ?")) {
                            deleteUser();
                        }
                    }}
                    >
                        <img src={deleteLogo} alt='delete-logo' />
                    </div>
                </>
            }


        </div>
    )
};

export default Profile;
