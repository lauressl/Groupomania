import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../action/post.actions';
import deleteLogo from '../../images/trash.svg';


const DeleteCard = ({id, userId}) => {
    const dispatch = useDispatch();
    const deleteQuote = () => {
        dispatch(deletePost(id, userId))
    }

  return (
    <div onClick={() => {
        if(window.confirm("Voulez-vous supprimer cet article ?")){
            deleteQuote();
        }
    }}
    >
        <img src={deleteLogo} alt="delete-icon"/>
    </div>
  )
}

export default DeleteCard;