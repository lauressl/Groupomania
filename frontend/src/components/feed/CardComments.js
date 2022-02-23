import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../utils";
import deleteLogo from "../../images/trash.svg";

const CardComments = ({ post }) => {
    const ipServ = process.env.REACT_APP_IP_SERVER;

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const [isDeleted, setisDeleted] = useState(false);
    const [postComment, setpostComment] = useState([]);

    const postId = post.id;
    //*****DELETE COMMENT*****/
    const deleteComment = async (id) => {
        try {
            await axios
                .delete(ipServ + `/api/feed/post/comment/${id}`, {
                    data: {
                        id: id,
                    },

                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    setisDeleted(true);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getComments = async (post) => {
        try {
            await axios.get(ipServ + `/api/feed/post/comment/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`
                    }
                })
                .then((res) => {
                    setpostComment(res.data.comments.rows);
                });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect((post) => {
        getComments(post)
    }, [post, isDeleted])


    return (
        <>
            {postComment.map((comment) => {
                return (
                    <div
                        className={
                            isDeleted ? "comment-container deleted" : "comment-container"
                        }
                        key={comment.id}
                    >

                        <div className="comment-header">
                            <div className="user">
                                <div className="user-pic">
                                    <img
                                        src={
                                            !isEmpty(usersData[0]) &&
                                            usersData
                                                .map((user) => {
                                                    if (user.id === comment.userId) return user.attachement;
                                                })
                                                .join("")
                                        }
                                        alt="userpost-pic"
                                    />
                                </div>
                                <div className="user-name">
                                    <p>
                                        {!isEmpty(usersData[0]) &&
                                            usersData
                                                .map((user) => {
                                                    if (user.id === comment.userId) return user.username;
                                                })
                                                .join("")}
                                    </p>
                                </div>
                            </div>
                            <span>{timestampParser(comment.createdAt)}</span>
                        </div>
                        <p className="comment-content">{comment.content}</p>

                        {(userData.id === comment.userId || userData.isAdmin === true) && (
                            <div className="btn-container">
                                <div
                                    onClick={(e) => {
                                        if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                                            let commentId = comment.id
                                            e.preventDefault();
                                            deleteComment(commentId)
                                        }
                                    }}
                                >
                                    <img src={deleteLogo} alt="delete-icon" />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default CardComments;
