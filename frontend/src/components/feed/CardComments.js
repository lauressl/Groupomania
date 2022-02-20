import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../utils";
import deleteLogo from "../../images/trash.svg";

const CardComments = ({ postComment }) => {
    console.log(postComment);
    const ipServ = process.env.REACT_APP_IP_SERVER;

    const dispatch = useDispatch();

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const [isDeleted, setisDeleted] = useState(false);
    const [commentId, setCommentId] = useState('')
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
                    console.log(res.data);
                    setisDeleted(true);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        deleteComment(commentId)
    }, [commentId])


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
                                            e.preventDefault();
                                            setisDeleted(true)
                                            setCommentId(comment.id)
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
