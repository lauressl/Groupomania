import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../utils";
import logoPicture from "../../images/picture.svg"

const NewPost = () => {
    const [isLoading, setisLoading] = useState(true);
    const [post, setpost] = useState("");
    const [postPicture, setpostPicture] = useState(null);
    const [file, setfile] = useState();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = () => { };

    const handlePost = () => { };

    const cancelPost = () => {
        setpost('');
        setpostPicture(null);
        setfile();
    };


    useEffect(() => {
        if (isEmpty(userData)) setisLoading(false);
    }, [userData]);

    return (
        <div className="post-container">
            <div className="post-form">
                <textarea
                    name="content"
                    id="content"
                    placeholder="Que voulez vous poster ?"
                    onChange={(e) => setpost(e.target.value)}
                    value={post}
                />
                {post || postPicture ? (
                    <li className="card-container">
                        <div className="card-left">
                            <img src={userData.attachement} alt="user-pic" />
                        </div>
                        <div className="card-right">
                            <div className="card-header">
                                <div className="pseudo">
                                    <h3>{userData.username}</h3>
                                </div>
                                <span>{timestampParser(Date.now())}</span>
                            </div>
                            <div className="content">
                                <p>{post}</p>
                                <img src={postPicture} alt="" />
                            </div>
                        </div>
                    </li>
                ) : null}
            </div>

            <div className="footer-form">
                <div className="icon">
                    <img src={logoPicture} alt="img" />
                    <input
                        type="file"
                        id="file-upload"
                        name="file"
                        accept=".jpg .jpeg .png"
                        onChange={(e) => handlePicture(e)}
                    />
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
