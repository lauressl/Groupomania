import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timestampParser } from "../utils";
import logoPicture from "../../images/picture.svg";
import { addPosts, getPosts } from "../../action/post.actions";

const NewPost = () => {
    const [post, setpost] = useState("");
    const [postPicture, setpostPicture] = useState(null);
    const [postPicturePreview, setpostPicturePreview] = useState(null);

    const [file, setfile] = useState();
    const userData = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();

    const handlePicture = (e) => {
        setpostPicture(e.target.files[0]);
        setpostPicturePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handlePost = async () => {
        if ((post.trim()) || postPicture) {
            const data = new FormData();
            data.append('content', post);
            if (file) data.append("file", file);
            data.append('attachement', postPicture);

            await dispatch(addPosts(data));
            dispatch(getPosts());
            cancelPost();
        } else {
            alert("Veuillez créer un post")
        }
    };

    const cancelPost = () => {
        setpost('');
        setpostPicture(null);
        setpostPicturePreview(null);
        setfile();
    };

    return (
        <div className="post-container">
            <div className="post-form">
                <label>
                    Publier :
                    <textarea
                        name="content"
                        id="content"
                        placeholder="Que voulez vous poster ?"
                        onChange={(e) => setpost(e.target.value)}
                        value={post}
                    />
                </label>
                {post || postPicture ? (
                    <div className="card-container">
                        <div className="card-header">
                            <div className="user">
                                <div className='user-picture'>
                                    <img src={userData.attachement} alt="user-pic" />
                                </div>

                                <div className="user-name">
                                    <h3>{userData.username}</h3>
                                </div>
                            </div>
                            <span>{timestampParser(Date.now())}</span>
                        </div>
                        <div className="card-content">
                            <p>{post}</p>
                            <div className='pic-container'>
                                <img src={postPicturePreview} alt="" className='card-pic' />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="footer-form">
                <div className="icon">
                    <img src={logoPicture} alt="img" />
                    <label>
                        Ajouter:
                        <input
                            type="file"
                            id="file-upload"
                            name="file"
                            accept="jpg jpeg png"
                            onChange={(e) => handlePicture(e)}
                        />
                    </label>
                </div>
                <div className="btn-send">
                    {post || postPicture ? (
                        <button className="cancel" onClick={cancelPost}>Annuler</button>
                    ) : null
                    }
                    <button className="send" onClick={handlePost}>Envoyer</button>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
